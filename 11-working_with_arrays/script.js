"use strict";
const account1 = {
    owner: "Jonas Schmedtmann",
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2,
    pin: 1111,
};
const account2 = {
    owner: "Jessica Davis",
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};
const account3 = {
    owner: "Steven Thomas Williams",
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};
const account4 = {
    owner: "Sarah Smith",
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};
const account5 = {
    owner: "Jonas Xman",
    movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
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
    ],
    currency: "EUR",
    locale: "pt-PT", // de-DE
};
const account6 = {
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
const accounts = [account1, account2, account3, account4, account5, account6];
let currentAccount;
let sorted = false;
// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");
const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");
const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");
const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");
const currencies = new Map([
    ["USD", "United States dollar"],
    ["EUR", "Euro"],
    ["GBP", "Pound sterling"],
]);
// BANKIST APP
const createUsername = (username) => username
    .trim()
    .toLowerCase()
    .split(" ")
    .map((el) => el[0])
    .join("");
accounts.forEach((acc) => {
    acc.username = createUsername(acc.owner);
});
const displayMovements = (account, sort = false) => {
    containerMovements.innerHTML = "";
    const movements = sort
        ? account.movements.slice().sort((a, b) => a - b)
        : account.movements;
    movements.forEach((mov, idx) => {
        const typeOfMov = mov > 0 ? "deposit" : "withdrawal";
        const html = `
<div class="movements__row">
  <div class="movements__type movements__type--${typeOfMov}">${idx} ${typeOfMov}</div>
  <!-- <div class="movements__date">3 days ago</div> -->
  <div class="movements__value">${mov}€</div>
</div>
`;
        containerMovements.insertAdjacentHTML("afterbegin", html);
    });
};
const calcSetBalance = (account) => {
    account.balance = account.movements.reduce((acc, mov) => acc + mov);
    labelBalance.textContent = account.balance + "€";
};
const calcSetIncomes = (account) => {
    labelSumIn.textContent =
        account.movements.filter((m) => m > 0).reduce((acc, m) => m + acc) + "€";
};
const calcSetOuts = (account) => {
    labelSumOut.textContent =
        account.movements.filter((m) => m < 0).reduce((acc, m) => m + acc) + "€";
};
const calcSetInterest = (account) => {
    labelSumInterest.textContent =
        account.movements
            .filter((dep) => dep > 0)
            .map((dep) => (dep * account.interestRate) / 100)
            .filter((interest) => interest > 1)
            .reduce((acc, interest) => acc + interest) + "€";
};
const updateUI = (account) => {
    displayMovements(account);
    calcSetBalance(account);
    calcSetIncomes(account);
    calcSetOuts(account);
    calcSetInterest(account);
};
btnLogin.addEventListener("click", (e) => {
    e.preventDefault();
    currentAccount = accounts.find((acc) => acc.username === inputLoginUsername.value);
    if (currentAccount?.pin === Number(inputLoginPin.value)) {
        labelWelcome.textContent = `Welcome back ${currentAccount.owner.split(" ")[0]}`;
        containerApp.style.opacity = "1";
        updateUI(currentAccount);
        inputLoginUsername.value = inputLoginPin.value = "";
        inputLoginPin.blur();
        inputLoginUsername.blur();
    }
});
btnTransfer.addEventListener("click", (e) => {
    e.preventDefault();
    const amount = Number(inputTransferAmount.value);
    const receiverAcc = accounts.find((acc) => acc.username === inputTransferTo.value);
    if (receiverAcc &&
        amount > 0 &&
        amount <= currentAccount.balance &&
        receiverAcc.username !== currentAccount.username) {
        currentAccount.movements.push(-amount);
        receiverAcc.movements.push(amount);
        updateUI(currentAccount);
    }
    else {
        alert("Invalid transfer");
    }
    inputTransferAmount.value = inputTransferTo.value = "";
});
btnLoan.addEventListener("click", (e) => {
    e.preventDefault();
    const amount = Number(inputLoanAmount.value);
    if (amount > 0 &&
        currentAccount.movements.some((dep) => dep >= amount * 0.1)) {
        currentAccount.movements.push(amount);
        updateUI(currentAccount);
    }
    else {
        alert(`
You can receive a loan only if you have a 
deposit that is greater than 10% of a requested loan -
you must have a deposit at least ${amount * 0.1} €
`);
    }
});
btnClose.addEventListener("click", (e) => {
    e.preventDefault();
    if (inputCloseUsername.value === currentAccount.username &&
        Number(inputClosePin.value) === currentAccount.pin) {
        const idx = accounts.findIndex((acc) => acc.username === currentAccount.username);
        accounts.splice(idx, 1);
        containerApp.style.opacity = "0";
    }
    else {
        alert("Invalid data");
    }
    inputCloseUsername.value = inputClosePin.value = "";
});
btnSort.addEventListener("click", (e) => {
    e.preventDefault();
    sorted = !sorted;
    displayMovements(currentAccount, sorted);
});
