"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var budget = Object.freeze([
    { value: 250, description: "Sold old TV 📺", user: "jonas" },
    { value: -45, description: "Groceries 🥑", user: "jonas" },
    { value: 3500, description: "Monthly salary 👩‍💻", user: "jonas" },
    { value: 300, description: "Freelancing 👩‍💻", user: "jonas" },
    { value: -1100, description: "New iPhone 📱", user: "jonas" },
    { value: -20, description: "Candy 🍭", user: "matilda" },
    { value: -125, description: "Toys 🚂", user: "matilda" },
    { value: -1800, description: "New Laptop 💻", user: "jonas" },
]);
var spendingLimits = Object.freeze({
    jonas: 1500,
    matilda: 100,
});
// spendingLimits.jay = 300;
var getLimit = function (limits, userLower) { var _a; return (_a = limits === null || limits === void 0 ? void 0 : limits[userLower]) !== null && _a !== void 0 ? _a : 0; };
var addExpense = function (state, limits, value, description, user) {
    if (user === void 0) { user = "jonas"; }
    var userLower = user.toLowerCase();
    return value <= getLimit(limits, userLower)
        ? __spreadArray(__spreadArray([], state, true), [{ value: -value, description: description, user: userLower }], false) : state;
};
var newBudget1 = addExpense(budget, spendingLimits, 10, "Pizza 🍕");
var newBudget2 = addExpense(newBudget1, 100, "Going to movies 🍿", "Matilda");
var newBudget3 = addExpense(newBudget2, 200, "Stuff", "Jay");
console.log(newBudget1);
console.log(newBudget2);
console.log(newBudget3);
var checkExpensesHigherThanLimit = function (state, limits) {
    return state.map(function (entry) {
        return entry.value < -getLimit(limits, entry.user)
            ? __assign(__assign({}, entry), { flag: "limit" }) : entry;
    });
};
var newBudget4 = checkExpensesHigherThanLimit(newBudget3, spendingLimits);
console.log(newBudget4);
var logBigExpenses = function (state, bitLimit) {
    console.log(state
        .reduce(function (acc, entry) {
        return entry.value <= -bitLimit
            ? "".concat(acc, " ").concat(entry.description.slice(-2), "  / ")
            : "".concat(acc);
    }, "")
        .slice(0, -2));
};
logBigExpenses(newBudget4, 100);
