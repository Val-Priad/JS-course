"use strict";

/* // EXPLANATION

const reduceToOneWord = (str: string) => {
  return str.replace(/\s/g, "");
};

const makeUppercase = (str: string) => {
  return str.toUpperCase();
};

const transformer = (str: string, fn) => {
  console.log(`Original str: ${str}`);
  console.log(`Transformed str: ${fn(str)}`);
  console.log(`Transformed by: ${fn.name}`);
};

console.log(transformer("abo dfls dlfjslj sdlkfj", makeUppercase));
console.log(transformer("abo dfls dlfjslj sdlkfj", reduceToOneWord));

const powerBy = (power) => (value) => value ** power;

let a = powerBy(5);
console.log(a(2));
a = powerBy(3);
console.log(a(7));

const b = {
  a: [],
  adEl(el) {
    this.a.push(el);
  },
};
const c = { a: [] };
console.log(b);
console.log(c);
const adEl = b.adEl;
console.log("__________");
adEl.call(b, "bob");
adEl.call(c, "anton");
console.log(b, c);

const lufthansa = {
  planes: [],
  buyPlane() {
    console.log(this);
    this.planes++;
    console.log(this.planes);
  },
};

const btn: HTMLElement = document.querySelector(".buy");
btn.addEventListener("click", lufthansa.buyPlane.bind(lufthansa));

const addTax = (rate, value) => value + value * rate;
const createAddTax = (rate) => (value) => value + value * rate;

const addVat = addTax.bind(null, 0.23);
const addVat2 = createAddTax(0.23);
console.log(addVat(100));
console.log(addVat(23));
console.log(addVat2(100));
console.log(addVat2(23));
*/

/* // CHALLENGE #1

const poll = {
  question: "What is your favorite programming language?",
  options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
  answers: new Array(4).fill(0),
};

const displayResults = () => {
  let type = prompt(
    "How do you want to see the results?\nPrompt `array` or `string`"
  );
  if (type === "string") {
    alert(...poll.answers);
  } else if (type === "array") {
    alert(poll.answers);
  } else {
    alert("Wrong type, can be only string or array");
  }
};

const registerNewAnswer = () => {
  let pollMsg = poll.question + "\n";
  for (const option of poll.options) {
    pollMsg += `\t${option}\n`;
  }
  pollMsg += "( Write option number )";

  const answer = Number(prompt(pollMsg));
  if (typeof answer == "number" && answer >= 0 && answer <= 3) {
    poll.answers[answer]++;
  }
  displayResults();
};

const pollEl: HTMLElement = document.querySelector(".poll");
pollEl.addEventListener("click", registerNewAnswer);
*/

/* // CHALLENGE #2
(function () {
  const header = document.querySelector("h1");
  header.style.color = "red";
  document.body.addEventListener("click", () => (header.style.color = "blue"));
})();
*/
