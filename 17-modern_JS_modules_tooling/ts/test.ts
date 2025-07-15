console.log("test");

const shippingCost = 10;
export const cart = [];

export default () => {
  console.log("Obeme");
};

export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product}`);
};

addToCart("banana", 5);
console.log(cart);
