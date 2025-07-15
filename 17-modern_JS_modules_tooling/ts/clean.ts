"use strict";

type budgetEl = {
  value: number;
  description: string;
  user: string;
  flag?: string;
};
const budget: readonly budgetEl[] = Object.freeze([
  { value: 250, description: "Sold old TV 📺", user: "jonas" },
  { value: -45, description: "Groceries 🥑", user: "jonas" },
  { value: 3500, description: "Monthly salary 👩‍💻", user: "jonas" },
  { value: 300, description: "Freelancing 👩‍💻", user: "jonas" },
  { value: -1100, description: "New iPhone 📱", user: "jonas" },
  { value: -20, description: "Candy 🍭", user: "matilda" },
  { value: -125, description: "Toys 🚂", user: "matilda" },
  { value: -1800, description: "New Laptop 💻", user: "jonas" },
]);

const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});

// spendingLimits.jay = 300;

const getLimit = (limits, userLower) => limits?.[userLower] ?? 0;

const addExpense = function (
  state,
  limits,
  value,
  description,
  user = "jonas"
) {
  let userLower = user.toLowerCase();
  return value <= getLimit(limits, userLower)
    ? [...state, { value: -value, description: description, user: userLower }]
    : state;
};

const newBudget1 = addExpense(budget, spendingLimits, 10, "Pizza 🍕");
const newBudget2 = addExpense(
  newBudget1,
  100,
  "Going to movies 🍿",
  "Matilda"
);
const newBudget3 = addExpense(newBudget2, 200, "Stuff", "Jay");
console.log(newBudget1);
console.log(newBudget2);
console.log(newBudget3);

const checkExpensesHigherThanLimit = (state: budgetEl[], limits) =>
  state.map((entry) =>
    entry.value < -getLimit(limits, entry.user)
      ? { ...entry, flag: "limit" }
      : entry
  );

const newBudget4 = checkExpensesHigherThanLimit(newBudget3, spendingLimits);
console.log(newBudget4);

const logBigExpenses = function (state: budgetEl[], bitLimit) {
  console.log(
    state
      .reduce(
        (acc, entry) =>
          entry.value <= -bitLimit
            ? `${acc} ${entry.description.slice(-2)}  / `
            : `${acc}`,
        ""
      )
      .slice(0, -2)
  );
};

logBigExpenses(newBudget4, 100);
