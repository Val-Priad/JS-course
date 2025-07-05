/*
let js = "amazing";
console.log(10 + 20 + 33);
*/

/*
let javaScriptIsFun = true;
console.log(typeof true);
console.log(typeof 24);
console.log(typeof 24.24);
console.log(typeof "2");
console.log(typeof "aboba");

console.log(typeof javaScriptIsFun)
javaScriptIsFun = "Yes!";
console.log(typeof javaScriptIsFun)

let aboba;
console.log(aboba);
console.log(typeof aboba)


console.log(typeof null)
*/

/*
// Use only when we need to mutate a variable
let age = 30;
age = 31;
console.log(age)

// Use const as many as possible
const birthYear = 1990;
// birthYear = 22; -> error

// Avoid using var!
var job = "Programmer";
jog = "Teacher";
*/

/*
const now = 2037;
const ageVal = now - 1991;
const ageSasha = now - 2006;
console.log(ageVal, ageSasha);

console.log(ageVal * 2, ageVal / 3, ageVal ** 5)

const hello = "hello";
const world = "world";
const helloWorld = hello + " " + world;
console.log(helloWorld)

let x = 10 + 5;
x += 10;
x *= 20;
x++;
x--;

// >, <, >=, <=
console.log(ageVal > ageSasha);
const isFullAge = ageSasha >= 18;
console.log(isFullAge);
*/

/*
const now = 2037;
const ageVal = now - 1991;
const ageSasha = now - 2006;
console.log((ageVal + ageSasha) / 2);
*/

/*
const massMark = 78;
const heightMark = 1.69;
const massJohn = 92;
const heightJohn = 1.95;

const BMIMark = massMark / (heightMark * heightMark);
const BMIJohn = massJohn / (heightJohn * heightJohn);
const markHigherBMI = BMIMark > BMIJohn;

console.log(BMIMark);
console.log(BMIJohn);
console.log(markHigherBMI);
*/

/*
const firstName = "Valerii";
const surname = "Priadchenko";
const age = 18;
const valText = "Hi, I'm " + firstName + " " + surname + ", my age is " + age;
console.log(valText);

const betterText = `Hi, I'm ${firstName} ${surname}, my age is ${age}`;
console.log(betterText);

console.log(`String with 
multiple
lines`)
*/

/*
const age = 15;
if (age >= 18) {
    console.log("Sarah can start driving license =)")
} else {
    console.log("Sarah can't start driving license :(")
    console.log(`Sarah must wait ${18 - age} year(s)`)
}

const birthYear = 1919;
let century;
if (birthYear <= 2000) {

    century = 20;
} else {
    century = 21;
}
console.log(century);
*/

/*
const massMark = 78;
const heightMark = 1.69;
const massJohn = 92;
const heightJohn = 1.95;

const BMIMark = massMark / (heightMark * heightMark);
const BMIJohn = massJohn / (heightJohn * heightJohn);
console.log(BMIMark, BMIJohn);

if (BMIMark > BMIJohn) {
    console.log(`Mark's BMI (${BMIMark}) higher than John's (${BMIJohn})!`)
} else {
    console.log(`John's BMI (${BMIJohn}) is higher than Mark's (${BMIMark})!`)
}
*/

/*
// type conversion
let inputYear = "1919";
console.log(20 + inputYear)

// type coercion
console.log(`I am ${23} years old`);
console.log('20' - '10' - 3);  // 7
console.log('20' + '10' + 3);  // 20103
console.log('23' * '2');  // 46

// 5 falsy values: 0, '', undefined, null, Nan
const age = 18;

// strict use as many as possible
if (age === 18) console.log("You just became an adult :D")

// loose avoid using (never use) it because of it's weird behavior
if (age == 18) console.log("You just became an adult :D")

const favorite = prompt("What is your favorite number?")
console.log(typeof favorite)
*/

/*
const scoreDolphins = (96 + 108 + 89) / 3;
const scoreKoalas = (88 + 91 + 110) / 3;
if (scoreDolphins > scoreKoalas) {
    console.log("Dolphins win the trophy")
} else if (scoreKoalas > scoreDolphins) {
    console.log("Koalas win the trophy")
} else {
    console.log("Both win the trophy")
}
*/

/*
const day = "monday"
switch (day) {
    case "monday":  // day === monday?
        console.log()
        break
    case "tuesday":
        console.log()
        break
    case "wednesday":
        console.log()
        break
    case "thursday":
    case "friday":
        console.log()
        break
    case "sunday":
        console.log()
        break
    case "saturday":
        console.log()
        break
    default:
        console.log()
}
*/

/*
const age = 18;
age >= 18 ? console.log("I will drink wine") : console.log("I will drink milk");
*/
const bill = 275;
const tip = bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2
console.log(`The bill was ${bill}, the tip was ${tip}, and the total value ${bill + tip}`)