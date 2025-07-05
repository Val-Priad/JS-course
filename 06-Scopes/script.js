"use strict";
const jessica = {
    firstName: "jessica",
    lastName: "williams",
    age: 27,
    family: ["Bob", "Sum"],
};
// SHALLOW COPY
// const marriedJessica = { ...jessica };
// DEEP COPY
const marriedJessica = structuredClone(jessica);
marriedJessica.lastName = "Davis";
marriedJessica.family.push("Mother");
console.log("Before", jessica);
console.log("After", marriedJessica);
