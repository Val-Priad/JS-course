"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToCart = exports.cart = void 0;
console.log("test");
var shippingCost = 10;
exports.cart = [];
exports.default = (function () {
    console.log("Obeme");
});
var addToCart = function (product, quantity) {
    exports.cart.push({ product: product, quantity: quantity });
    console.log("".concat(quantity, " ").concat(product));
};
exports.addToCart = addToCart;
(0, exports.addToCart)("banana", 5);
console.log(exports.cart);
