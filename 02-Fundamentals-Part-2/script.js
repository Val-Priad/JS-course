"use strict";

/*
let hasDriversLicense = false;
const passTest = true;

if (passTest) hasDriversLicense = true;
if (hasDriversLicense) console.log("I can drive");
*/

/*
function logger(data) {
    console.log(data)
}

// calling / running/ invoking function
logger("banaa")
*/

/*
// function declaration
function calcAge1(birthYear) {
    return 2037 - birthYear;
}

// function expression
const calcAge2 = function (birthYear) {
    return 2037 - birthYear;
}

// arrow function
const calcAge3 = birthYear => 2037 - birthYear

// big arrow function
// so it's a function that takes birthYear as
// argument
const getYearsUntilRetirement = (birthYear, firstName) => {
    const age = 2025 - birthYear;
    return `${firstName} retires in ${65 - age}`;
}
console.log(calcAge1(1991));
console.log(calcAge2(1991));
console.log(calcAge3(1991));
console.log(getYearsUntilRetirement(2006, "Valerii"))
*/

/*
function checkWinner(avgDolphins, avgKoalas) {
    if (avgDolphins > avgKoalas * 2) {
        console.log(`Dolphins win (${avgDolphins} vs. ${avgKoalas})`)
    } else if (avgKoalas > avgDolphins * 2) {
        console.log(`Koalas win (${avgKoalas} vs. ${avgDolphins})`)
    } else {
        console.log(`No team wins...`)
    }
}

const calcAverage = (a, b, c) => (a + b + c) / 3;
const scoreDolphins = calcAverage(44, 23, 71)
const scoreKoalas = calcAverage(65, 54, 49)
checkWinner(scoreDolphins, scoreKoalas)
*/

/*
const friends = ["Michael", "Steven", "Peter"]
const test = ["Val", 18, true, []]
// const friends = new Array("Michael", "Steven", "Peter")
console.log(friends)
console.log(test)
console.log(friends.length)
console.log(friends.sort())
console.log(friends[friends.length - 1])

// unshift = add an element to the beginning of an array
// shift = remove an element in the beginning of an array
test.unshift("aboba")
test.shift("aboba")
console.log(test)

console.log(test.indexOf("Val"))
console.log(test.includes("Val"))
*/

/*

function calcTip(bill) {
    if (bill >= 50 && bill <= 300) {
        return bill * 0.15
    }
    return bill * 0.2
}

const bills = [125, 555, 44]
const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])]
const totals = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]]
console.log(bills)
console.log(tips)
console.log(totals)

*/

/*
const person = {
    firstName: "Valerii",
    lastName: "Priadchenko",
    birthYear: 2006,
    job: "unemployed",
    calcAge() {
        this.age = new Date().getFullYear() - this.birthYear
        return this.age;
    },
    getSummary() {
        return (`Full name: ${this.firstName} ${this.lastName}
Age: ${this.age}
Job: ${this.job}`)
    }
}

console.log(person.calcAge())
console.log(person.age)
console.log(person.getSummary())
*/

/*
const mark = {
    fullName: "Mark Miller",
    mass: 78,
    height: 1.69,
    calcBMI() {
        this.bmi = this.mass / (this.height * this.height)
        return this.bmi
    }
}
const john = {
    fullName: "John Smith",
    mass: 92,
    height: 1.95,
    calcBMI() {
        this.bmi = this.mass / (this.height * this.height)
        return this.bmi
    }

}
if (john.calcBMI() > mark.calcBMI()) {
    console.log(`John Smith's BMI (${john.bmi}) is higher than Mark Miller's (${mark.bmi})!`)
} else {
    console.log(`Mark Miller's BMI (${mark.bmi}) is higher than John Smith's (${john.bmi})!`)
}
*/
/*
for (let i = 1; i <= 10; i++) {
    console.log(`Lifting weights repetition ${i} 🏋️`)
}
const types = []
const elements = ['a', true, undefined, 24]
elements.forEach(element => {
    types.push(typeof element)
});
console.log(types)

const years = [1991, 2007, 1969, 2020];
const ages = [];
const curYear = new Date().getFullYear()
for (let i = 0; i < years.length; i++) {
    ages.push(curYear - years[i])
}
console.log(ages)

for (let i = years.length; i >= 0; i--) {
    console.log(years[i])
}

for (let i = 1; i <= 3; i++) {
    console.log(`Doing exercise ${i}`)
    for (let j = 1; j <= 5; j++) {
        console.log(`       Doing rep ${j}`)
    }
}
*/
/*
let i = 1
while (i <= 10) {
    console.log(`Rep ${i}`)
    i++
}
*/

/*
let dice = Math.trunc(Math.random() * 6) + 1
let counter = 1
while (dice !== 6) {
    counter++
    dice = Math.trunc(Math.random() * 6) + 1
}
console.log(`It took ${counter} times to get 6`)
*/
/*
function calcAverage(arr) {
  return arr.reduce((total, el) => total + el, 0) / arr.length;
}

function calcTip(bill) {
  if (bill >= 50 && bill <= 300) {
    return bill * 0.15;
  }
  return bill * 0.2;
}
const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [];
const totals = [];

for (let i = 0; i < bills.length; i++) {
  let tip = calcTip(bills[i]);
  tips.push(tip);
  totals.push(tip + bills[i]);
}

console.log(calcAverage(totals));
*/

/*
1. Make sure you understand the problem
2. Divide and conquer - split a problem into sub problems
3. Make a research if you have unknowns
4. Write pseudo-code
*/
/*

const temperatures = [17, 21, 23];

function printForecast(temperatures) {
  let forecast = "";
  for (let i = 0; i < temperatures.length; i++) {
    forecast += `... ${temperatures[i]}°C in ${i + 1} days `;
  }
  forecast += "...";
  console.log(forecast);
  return forecast;
}
printForecast(temperatures);
*/
/*
function getDaysWorked(week) {
  let counter = 0;
  week.forEach(el => {
    if (el === 0) {
      counter++;
    }
  });
  return 7 - counter;
}
function analyzeWeek(week) {
  const sum = week.reduce((total, hours) => (total += hours));
  const avgHours = sum / 7;
  const maxHours = Math.max(...week);
  const daysWorked = getDaysWorked(week);
  const isFullTime = sum >= 35;
  return [sum, avgHours, maxHours, daysWorked, isFullTime];
}

const testData = [7.5, 8, 6.5, 0, 8.5, 4, 0];
console.log(analyzeWeek(testData));
*/
