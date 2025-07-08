"use strict";

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

const accounts = [account1, account2, account3, account4, account5, account6];
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
/* 

This time, Julia and Kate are studying the activity levels of different dog breeds.

YOUR TASKS:
✅ 1. Store the the average weight of a "Husky" in a variable "huskyWeight"
✅ 2. Find the name of the only breed that likes both "running" and "fetch" ("dogBothActivities" variable)
✅ 3. Create an array "allActivities" of all the activities of all the dog breeds
✅ 4. Create an array "uniqueActivities" that contains only the unique activities (no activity repetitions). HINT: Use a technique with a special data structure that we studied a few sections ago.
✅ 5. Many dog breeds like to swim. What other activities do these dogs like? Store all the OTHER activities these breeds like to do, in a unique array called "swimmingAdjacent".
✅ 6. Do all the breeds have an average weight of 10kg or more? Log to the console whether "true" or "false".
✅ 7. Are there any breeds that are "active"? "Active" means that the dog has 3 or more activities. Log to the console whether "true" or "false".
✅ BONUS: What's the average weight of the heaviest breed that likes to fetch? HINT: Use the "Math.max" method along with the ... operator.

TEST DATA:
*/
/*
const breeds = [
  {
    breed: "German Shepherd",
    averageWeight: 32,
    activities: ["fetch", "swimming"],
  },
  {
    breed: "Dalmatian",
    averageWeight: 24,
    activities: ["running", "fetch", "agility"],
  },
  {
    breed: "Labrador",
    averageWeight: 28,
    activities: ["swimming", "fetch"],
  },
  {
    breed: "Beagle",
    averageWeight: 12,
    activities: ["digging", "fetch"],
  },
  {
    breed: "Husky",
    averageWeight: 26,
    activities: ["running", "agility", "swimming"],
  },
  {
    breed: "Bulldog",
    averageWeight: 36,
    activities: ["sleeping"],
  },
  {
    breed: "Poodle",
    averageWeight: 18,
    activities: ["agility", "fetch"],
  },
];

const huskyWeight = breeds.find((el) => el.breed === "Husky").averageWeight;
const dogBothActivities = breeds.find(
  (el) => el.activities.includes("running") && el.activities.includes("fetch")
);
const allActivities = [...new Set(breeds.flatMap((el) => el.activities))];
console.log(huskyWeight);
console.log(dogBothActivities.breed);
console.log(allActivities);
const swimmingAdjacent = [
  ...new Set(
    breeds
      .filter((el) => el.activities.includes("swimming"))
      .flatMap((el) => el.activities)
      .filter((activity) => activity !== "swimming")
  ),
];
console.log(swimmingAdjacent);
console.log(breeds.every((breed) => breed.averageWeight >= 10));
console.log(breeds.some((breed) => breed.activities.length >= 3));

console.log(
  Math.max(
    ...breeds
      .filter((breed) => breed.activities.includes("fetch"))
      .map((breed) => breed.averageWeight)
  )
);
*/

/* Creating array based on formula 
const z = Array.from({ length: 100 }, () => Math.trunc(Math.random() * 6 + 1));
console.log(z);
let movementsUI = Array.from(
  document.querySelectorAll(".movements__value"),
  (el) => +(el.textContent.replace("€", ""))
);
console.log(movementsUI);
*/
/*
const bankDepositSum = accounts.reduce(
  (acc, account) =>
    account.movements
      .filter((mov) => mov > 0)
      .reduce((acc, dep) => dep + acc) + acc,
  0
);
console.log(bankDepositSum);

const bankDepositsHigherThan1000Dollars = accounts.reduce(
  (acc, account) =>
    account.movements.reduce((acc, dep) => (dep >= 1000 ? ++acc : acc), 0) +
    acc,
  0
);
console.log(bankDepositsHigherThan1000Dollars);

const sums = accounts
  .flatMap((account) => account.movements)
  .reduce(
    (acc, mov) => {
      // mov > 0 ? (acc.depositsSum += mov) : (acc.withdrawalsSum += mov);
      acc[mov > 0 ? "depositsSum" : "withdrawalsSum"] += mov;
      return acc;
    },
    { depositsSum: 0, withdrawalsSum: 0 }
  );

console.log(sums);
const convertToTitleCase = (title: string) => {
  const capitalize = (word) => word[0].toUpperCase() + word.slice(1);
  const exceptions = new Set([
    "a",
    "to",
    "the",
    "an",
    "but",
    "or",
    "on",
    "in",
    "with",
    "and",
  ]);
  return capitalize(
    title
      .split(" ")
      .map((word) => (exceptions.has(word) ? word : capitalize(word)))
      .join(" ")
  );
};

console.log(convertToTitleCase("This is a nice title"));
console.log(convertToTitleCase("and here is another title with an example"));
*/

// Coding Challenge #5
/* 
Julia and Kate are still studying dogs. 
This time they are want to figure out if the dogs in their are eating too much or too little food.

- Formula for calculating recommended food portion: 
recommendedFood = weight ** 0.75 * 28. 
(The result is in grams of food, and the weight needs to be in kg)
- Eating too much means the dog's current food portion is larger 
than the recommended portion, and eating too little is the opposite.
- Eating an okay amount means the dog's current food portion is within 
a range 10% above and below the recommended portion (see hint).

YOUR TASKS:
✅ 1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion (recFood) and add it to the object as a new property. Do NOT create a new array, simply loop over the array (We never did this before, so think about how you can do this without creating a new array).
✅ 2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple users, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
✅ 3. Create an array containing all owners of dogs who eat too much (ownersTooMuch) and an array with all owners of dogs who eat too little (ownersTooLittle).
✅ 4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
✅ 5. Log to the console whether there is ANY dog eating EXACTLY the amount of food that is recommended (just true or false)
✅ 6. Log to the console whether ALL of the dogs are eating an OKAY amount of food (just true or false)
✅ 7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
✅ 8. Group the dogs into the following 3 groups: 'exact', 'too-much' and 'too-little', based on whether they are eating too much, too little or the exact amount of food, based on the recommended food portion.
✅ 9. Group the dogs by the number of owners they have
✅ 10. Sort the dogs array by recommended food portion in an ascending order. Make sure to NOT mutate the original array!


HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

GOOD LUCK 😀
*/
/*
type dog = {
  weight: number;
  curFood: number;
  owners: string[];
  recFood?: number;
};

const dogs: dog[] = [
  { weight: 22, curFood: 250, owners: ["Alice", "Bob"] },
  { weight: 8, curFood: 200, owners: ["Matilda"] },
  { weight: 13, curFood: 275, owners: ["Sarah", "John", "Leo"] },
  { weight: 18, curFood: 244, owners: ["Joe"] },
  { weight: 32, curFood: 340, owners: ["Michael"] },
];

dogs.forEach((dog) => {
  dog.recFood = Math.round(dog.weight ** 0.75 * 28 * 100) / 100;
});
console.log(dogs);
const sarahDog = dogs.find((dog) => dog.owners.includes("Sarah"));
sarahDog.curFood > sarahDog.recFood
  ? console.log("Eating too much")
  : console.log("Eating too little");

const ownersTooMuch = dogs
  .filter((dog) => dog.curFood > dog.recFood)
  .map((dog) => dog.owners);
const ownersTooLittle = dogs
  .filter((dog) => dog.curFood < dog.recFood)
  .map((dog) => dog.owners);

console.log(ownersTooMuch.flat().join(" and ") + "'s dogs eat too much!");
console.log(ownersTooLittle.flat().join(" and ") + "'s dogs eat too little!");
console.log(dogs.some((dog) => dog.curFood === dog.recFood));
const eatsOkay = (dog) =>
  dog.curFood >= dog.recFood * 0.9 && dog.curFood <= dog.recFood * 1.1;

console.log(dogs.every((dog) => eatsOkay(dog)));
console.log(dogs.filter((dog) => eatsOkay(dog)));
console.log(
  Object.groupBy(dogs, (dog) => {
    if (dog.curFood === dog.recFood) {
      return "exact";
    } else if (dog.curFood < dog.recFood) {
      return "too-little";
    } else if (dog.curFood > dog.recFood) {
      return "too-much";
    } else {
      return "unexpected group";
    }
  })
);
console.log(Object.groupBy(dogs, (dog) => dog.owners.length));
console.log(dogs.toSorted((a, b) => a.recFood - b.recFood));
*/

// Learning Math and Number methods
/*
console.log(Number.isInteger("20.34px"));
console.log(Math.PI * Number.parseFloat("10px") ** 2);

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

console.log(randomInt(2, 3));

console.log(Math.floor(Math.random() * (0 - -5 + 1)) + -5);
*/
