"use strict";

alert(`
You can test this app using the following accounts:

Account 1
  User: jx  
  PIN: 1111

Account 2
  User: jm  
  PIN: 2222

To transfer money to someone, make sure to use 'jm' or 'js' as the recipient username accordingly.
`);

// Data
type IAccount = {
  owner: string;
  movements: number[];
  interestRate: number;
  pin: number;
  username?: string;
  balance?: number;
  movementsDates?: string[];
  currency?: string;
  locale?: string;
};

/* // Old accounts
const account1: IAccount = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2,
  pin: 1111,
};

const account2: IAccount = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3: IAccount = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4: IAccount = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};
*/

const account5: IAccount = {
  owner: "Jonas Xman",
  movements: [
    200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300, 300, 3000,
  ],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
    "2025-07-05T20:15:33.035Z",
    "2025-07-07T20:15:33.035Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account6: IAccount = {
  owner: "Jessica Muches",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account5, account6];
let currentAccount: IAccount, currentTimer;
let sorted = false;

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp: HTMLElement = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername: HTMLInputElement = document.querySelector(
  ".login__input--user"
);
const inputLoginPin: HTMLInputElement = document.querySelector(
  ".login__input--pin"
);
const inputTransferTo: HTMLInputElement =
  document.querySelector(".form__input--to");
const inputTransferAmount: HTMLInputElement = document.querySelector(
  ".form__input--amount"
);
const inputLoanAmount: HTMLInputElement = document.querySelector(
  ".form__input--loan-amount"
);
const inputCloseUsername: HTMLInputElement = document.querySelector(
  ".form__input--user"
);
const inputClosePin: HTMLInputElement =
  document.querySelector(".form__input--pin");

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

// BANKIST APP

const createUsername = (username: string) =>
  username
    .trim()
    .toLowerCase()
    .split(" ")
    .map((el) => el[0])
    .join("");

accounts.forEach((acc) => {
  acc.username = createUsername(acc.owner);
});

const accountsAreUnique = (accounts: IAccount[]) => {
  const usernames = accounts.map((acc) => acc.username);
  return usernames.length === new Set(usernames).size;
};

if (!accountsAreUnique(accounts)) {
  alert("You can't use the program, there is duplicate usernames in accounts");
}

const daysPassed = (date1, date2) =>
  Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

/* // getFormattedDate fn
const getFormattedDate = (date: Date) => {
  return `${(date.getDate() + "").padStart(2, "0")}/${(
    date.getMonth() +
    1 +
    ""
  ).padStart(2, "0")}/${date.getFullYear()}, ${date.getHours()}:${(
    date.getMinutes() + ""
  ).padStart(2, "0")}`;
};
*/

const updateTimeLogIn = (account) => {
  labelDate.textContent = new Intl.DateTimeFormat(account.locale, {
    hour: "numeric",
    minute: "numeric",
    day: "numeric",
    month: "numeric",
    year: "numeric",
    // weekday: "long",
  }).format(new Date());
};

const getFormattedDateForMovements = (account, date: Date) => {
  const timeDelta = daysPassed(new Date(), date);
  if (timeDelta === 0) return `today`;
  else if (timeDelta === 1) return `yesterday`;
  else if (timeDelta < 4) return `${timeDelta} days ago`;
  return new Intl.DateTimeFormat(account.locale).format(date);
};

const getFormattedCurrency = (account, value) =>
  new Intl.NumberFormat(account.locale, {
    style: "currency",
    currency: account.currency,
  }).format(value);

const displayMovements = (account: IAccount, sort = false) => {
  containerMovements.innerHTML = "";
  const combinedMovementsAndDates = account.movements.map((value, idx) => ({
    value,
    date: account.movementsDates.at(idx),
  }));

  const movements = sort
    ? combinedMovementsAndDates.slice().sort((a, b) => a.value - b.value)
    : combinedMovementsAndDates;

  movements.forEach((mov, idx) => {
    let movementDate: any = new Date(mov.date);
    movementDate = getFormattedDateForMovements(account, new Date(mov.date));
    const formattedCurrency = getFormattedCurrency(account, mov.value);
    const typeOfMov = mov.value > 0 ? "deposit" : "withdrawal";
    const html = `
<div class="movements__row">
  <div class="movements__type movements__type--${typeOfMov}">${idx} ${typeOfMov}</div>
  <div class="movements__date">${movementDate}</div> 
  <div class="movements__value">${formattedCurrency}</div>
</div>
`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcSetBalance = (account: IAccount) => {
  account.balance = account.movements.reduce((acc, mov) => acc + mov);
  labelBalance.textContent = getFormattedCurrency(account, account.balance);
};

const calcSetIncomes = (account: IAccount) => {
  labelSumIn.textContent = getFormattedCurrency(
    account,
    account.movements.filter((m) => m > 0).reduce((acc, m) => m + acc)
  );
};

const calcSetOuts = (account: IAccount) => {
  labelSumOut.textContent = getFormattedCurrency(
    account,
    account.movements.filter((m) => m < 0).reduce((acc, m) => m + acc)
  );
};

const calcSetInterest = (account: IAccount) => {
  labelSumInterest.textContent = getFormattedCurrency(
    account,
    account.movements
      .filter((dep) => dep > 0)
      .map((dep) => (dep * account.interestRate) / 100)
      .filter((interest) => interest > 1)
      .reduce((acc, interest) => acc + interest)
  );
};

const updateUI = (account: IAccount) => {
  updateTimeLogIn(account);
  displayMovements(account);
  calcSetBalance(account);
  calcSetIncomes(account);
  calcSetOuts(account);
  calcSetInterest(account);
};

const startLogOutTimer = () => {
  // Set time to 5 minutes
  let timer = 600;
  let minutes;
  let seconds;
  const tick = () => {
    minutes = Math.floor(timer / 60) + "";
    seconds = (timer % 60) + "";
    labelTimer.textContent = `${minutes.padStart(2, "0")}:${seconds.padStart(
      2,
      "0"
    )}`;
    if (timer <= 0) {
      clearInterval(interval);
      currentAccount = undefined;
      containerApp.style.opacity = "0";
      labelWelcome.textContent = `Log in to get started`;
    }
    timer--;
  };
  tick();
  const interval = setInterval(tick, 1000);
  return interval;
};

const resetTimer = () => {
  clearInterval(currentTimer);
  currentTimer = startLogOutTimer();
};

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  if (currentAccount?.pin === +inputLoginPin.value) {
    if (currentTimer) clearInterval(currentTimer);
    currentTimer = startLogOutTimer();
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = "1";
    updateUI(currentAccount);
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();
    inputLoginUsername.blur();
  }
});

btnTransfer.addEventListener("click", (e) => {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  if (
    receiverAcc &&
    amount > 0 &&
    amount <= currentAccount.balance &&
    receiverAcc.username !== currentAccount.username
  ) {
    const transferDate = new Date().toISOString();
    currentAccount.movements.push(-amount);
    currentAccount.movementsDates.push(transferDate);
    receiverAcc.movements.push(amount);
    receiverAcc.movementsDates.push(transferDate);
    updateUI(currentAccount);
  } else {
    alert("Invalid transfer");
  }
  inputTransferAmount.value = inputTransferTo.value = "";
  resetTimer();
});

btnLoan.addEventListener("click", (e) => {
  e.preventDefault();
  const amount = Math.floor(+inputLoanAmount.value);
  if (
    amount > 0 &&
    currentAccount.movements.some((dep) => dep >= amount * 0.1)
  ) {
    currentAccount.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    updateUI(currentAccount);
  } else {
    alert(`
You can receive a loan only if you have a 
deposit that is greater than 10% of a requested loan -
you must have a deposit at least ${amount * 0.1} ${currentAccount.currency}
`);
  }
  resetTimer();
});

btnClose.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const idx = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    accounts.splice(idx, 1);
    containerApp.style.opacity = "0";
  } else {
    alert("Invalid data");
  }
  inputCloseUsername.value = inputClosePin.value = "";
});

btnSort.addEventListener("click", (e) => {
  e.preventDefault();
  sorted = !sorted;
  displayMovements(currentAccount, sorted);
  resetTimer();
});

// labelDate.textContent = getFormattedDate(new Date());

/* // LOCALE FROM BROWSER
labelDate.textContent = new Intl.DateTimeFormat(navigator.language, {
  hour: "numeric",
  minute: "numeric",
  day: "numeric",
  month: "long",
  year: "numeric",
  weekday: "long",
}).format(new Date());
*/

// BANKIST APP END

// Coding Challenge #4
