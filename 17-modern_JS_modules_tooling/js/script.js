"use strict";
// import "./test.js"; // RUNS THE CODE INSIDE THE SCRIPT
// console.log("importing module");
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { addToCart, cart } from "./test.js"; // EXPORTS WITHOUT RENAMING
// addToCart("potato", 20);
// console.log(cart);
// import { addToCart, cart as add, c } from "./test.js"; // EXPORTS WITH RENAMING
// add("potato", 20);
// console.log(c);
// import * as ShoppingCart from "./test.js"; // EXPORTS ALL WITH NAMESPACE ShoppingCart
// ShoppingCart.addToCart("potato", 20);
// console.log(ShoppingCart.cart);
var test_js_1 = require("./test.js"); // EXPORTS DEFAULT WITH GIVEN NAME
(0, test_js_1.default)();
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
require("regenerator-runtime");
require("core-js/stable");
var cloneDeep_js_1 = require("../../node_modules/lodash-es/cloneDeep.js");
// import Swal from "../../node_modules/sweetalert2";
var nestedAr = [[[[1, 2, 3, 4]]]];
var badCopy = __spreadArray([], nestedAr, true);
badCopy[0][0][0][3] = 8;
console.log(nestedAr);
console.log(badCopy);
var goodCopy = (0, cloneDeep_js_1.default)(nestedAr);
goodCopy[0][0][0][3] = 666;
console.log(goodCopy);
Promise.resolve("Aboba");
