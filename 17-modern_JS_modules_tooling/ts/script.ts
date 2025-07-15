// import "./test.js"; // RUNS THE CODE INSIDE THE SCRIPT
// console.log("importing module");

// import { addToCart, cart } from "./test.js"; // EXPORTS WITHOUT RENAMING
// addToCart("potato", 20);
// console.log(cart);

// import { addToCart, cart as add, c } from "./test.js"; // EXPORTS WITH RENAMING
// add("potato", 20);
// console.log(c);

// import * as ShoppingCart from "./test.js"; // EXPORTS ALL WITH NAMESPACE ShoppingCart
// ShoppingCart.addToCart("potato", 20);
// console.log(ShoppingCart.cart);

import printObeme from "./test.js"; // EXPORTS DEFAULT WITH GIVEN NAME
printObeme();

// TOP LEVEL AWAIT IN MODULES ONLY WORKS WHEN SCRIPT TYPE IS
// SET TO MODULE: <script type="module" src=""></script>
/*
const res = await fetch(
  "https://jsonplaceholder.typicode.com/posts/1/comments"
);
const data = await res.json();
console.log(data);

console.log();
*/
// NO ONE NEVER DOES LIKE THIS IT IS DONE WITH BUNDLER ALL THE TIME!!!
import "regenerator-runtime";
import "core-js/stable";
import cloneDeep from "../../node_modules/lodash-es/cloneDeep.js";

// import Swal from "../../node_modules/sweetalert2";
const nestedAr = [[[[1, 2, 3, 4]]]];
const badCopy = [...nestedAr];
badCopy[0][0][0][3] = 8;
console.log(nestedAr);
console.log(badCopy);

const goodCopy = cloneDeep(nestedAr);
goodCopy[0][0][0][3] = 666;
console.log(goodCopy);

Promise.resolve("Aboba");
