"use strict";

const books = [
  {
    title: "Algorithms",
    author: ["Robert Sedgewick", "Kevin Wayne"],
    publisher: "Addison-Wesley Professional",
    publicationDate: "2011-03-24",
    edition: 4,
    keywords: [
      "computer science",
      "programming",
      "algorithms",
      "data structures",
      "java",
      "math",
      "software",
      "engineering",
    ],
    pages: 976,
    format: "hardcover",
    ISBN: "9780321573513",
    language: "English",
    programmingLanguage: "Java",
    onlineContent: true,
    thirdParty: {
      goodreads: {
        rating: 4.41,
        ratingsCount: 1733,
        reviewsCount: 63,
        fiveStarRatingCount: 976,
        oneStarRatingCount: 13,
      },
    },
    highlighted: true,
  },
  {
    title: "Structure and Interpretation of Computer Programs",
    author: [
      "Harold Abelson",
      "Gerald Jay Sussman",
      "Julie Sussman (Contributor)",
    ],
    publisher: "The MIT Press",
    publicationDate: "2022-04-12",
    edition: 2,
    keywords: [
      "computer science",
      "programming",
      "javascript",
      "software",
      "engineering",
    ],
    pages: 640,
    format: "paperback",
    ISBN: "9780262543231",
    language: "English",
    programmingLanguage: "JavaScript",
    onlineContent: false,
    thirdParty: {
      goodreads: {
        rating: 4.36,
        ratingsCount: 14,
        reviewsCount: 3,
        fiveStarRatingCount: 8,
        oneStarRatingCount: 0,
      },
    },
    highlighted: true,
  },
  {
    title: "Computer Systems: A Programmer's Perspective",
    author: ["Randal E. Bryant", "David Richard O'Hallaron"],
    publisher: "Prentice Hall",
    publicationDate: "2002-01-01",
    edition: 1,
    keywords: [
      "computer science",
      "computer systems",
      "programming",
      "software",
      "C",
      "engineering",
    ],
    pages: 978,
    format: "hardcover",
    ISBN: "9780130340740",
    language: "English",
    programmingLanguage: "C",
    onlineContent: false,
    thirdParty: {
      goodreads: {
        rating: 4.44,
        ratingsCount: 1010,
        reviewsCount: 57,
        fiveStarRatingCount: 638,
        oneStarRatingCount: 16,
      },
    },
    highlighted: true,
  },
  {
    title: "Operating System Concepts",
    author: ["Abraham Silberschatz", "Peter B. Galvin", "Greg Gagne"],
    publisher: "John Wiley & Sons",
    publicationDate: "2004-12-14",
    edition: 10,
    keywords: [
      "computer science",
      "operating systems",
      "programming",
      "software",
      "C",
      "Java",
      "engineering",
    ],
    pages: 921,
    format: "hardcover",
    ISBN: "9780471694663",
    language: "English",
    programmingLanguage: "C, Java",
    onlineContent: false,
    thirdParty: {
      goodreads: {
        rating: 3.9,
        ratingsCount: 2131,
        reviewsCount: 114,
        fiveStarRatingCount: 728,
        oneStarRatingCount: 65,
      },
    },
  },
  {
    title: "Engineering Mathematics",
    author: ["K.A. Stroud", "Dexter J. Booth"],
    publisher: "Palgrave",
    publicationDate: "2007-01-01",
    edition: 14,
    keywords: ["mathematics", "engineering"],
    pages: 1288,
    format: "paperback",
    ISBN: "9781403942463",
    language: "English",
    programmingLanguage: null,
    onlineContent: true,
    thirdParty: {
      goodreads: {
        rating: 4.35,
        ratingsCount: 370,
        reviewsCount: 18,
        fiveStarRatingCount: 211,
        oneStarRatingCount: 6,
      },
    },
    highlighted: true,
  },
  {
    title: "The Personal MBA: Master the Art of Business",
    author: "Josh Kaufman",
    publisher: "Portfolio",
    publicationDate: "2010-12-30",
    keywords: ["business"],
    pages: 416,
    format: "hardcover",
    ISBN: "9781591843528",
    language: "English",
    thirdParty: {
      goodreads: {
        rating: 4.11,
        ratingsCount: 40119,
        reviewsCount: 1351,
        fiveStarRatingCount: 18033,
        oneStarRatingCount: 1090,
      },
    },
  },
  {
    title: "Crafting Interpreters",
    author: "Robert Nystrom",
    publisher: "Genever Benning",
    publicationDate: "2021-07-28",
    keywords: [
      "computer science",
      "compilers",
      "engineering",
      "interpreters",
      "software",
      "engineering",
    ],
    pages: 865,
    format: "paperback",
    ISBN: "9780990582939",
    language: "English",
    thirdParty: {
      goodreads: {
        rating: 4.7,
        ratingsCount: 253,
        reviewsCount: 23,
        fiveStarRatingCount: 193,
        oneStarRatingCount: 0,
      },
    },
  },
  {
    title: "Deep Work: Rules for Focused Success in a Distracted World",
    author: "Cal Newport",
    publisher: "Grand Central Publishing",
    publicationDate: "2016-01-05",
    edition: 1,
    keywords: ["work", "focus", "personal development", "business"],
    pages: 296,
    format: "hardcover",
    ISBN: "9781455586691",
    language: "English",
    thirdParty: {
      goodreads: {
        rating: 4.19,
        ratingsCount: 144584,
        reviewsCount: 11598,
        fiveStarRatingCount: 63405,
        oneStarRatingCount: 1808,
      },
    },
    highlighted: true,
  },
];

/* // Data needed for a later exercise
const flights =
  "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30";

const italianFoods = new Set([
  "pasta",
  "gnocchi",
  "tomatoes",
  "olive oil",
  "garlic",
  "basil",
]);

const mexicanFoods = new Set([
  "tortillas",
  "beans",
  "rice",
  "tomatoes",
  "avocado",
  "garlic",
]);
*/

/* UNPACKING
const arr = [2, 3, 4];
const [a, b, c] = arr;
console.log(a, b, c);

let [first, , second] = restaurant.categories;
console.log(first, second);
[second, first] = [first, second];
console.log(first, second);
*/

/* // DESTRUCTING ARRAYS

// TASK 1.1
const books = ["Atlas shrugged", "War and piece"];
let [firstBook, secondBook] = books;
console.log(firstBook, secondBook);
// Atlas shrugged War and piece

// TASK 1.2
books.push("Who will cry when you die?");
let thirdBook;
[firstBook, , thirdBook] = books;
console.log(firstBook, thirdBook);
// Atlas shrugged Who will cry when you die?

// TASK 1.3
const ratings = [
  ["rating", 4.19],
  ["ratingsCount", 144584],
];
let [[, rating], [, ratingsCount]] = ratings;
console.log(rating, ratingsCount);

// TASK 1.4
const ratingStars = [63405, 1808];
let [fiveStarRatings = 0, oneStarRatings = 0, threeStarRatings = 0] =
  ratingStars;
console.log(fiveStarRatings, oneStarRatings, threeStarRatings);
*/

/* // DESTRUCTING OBJECTS


// TASK 2.1
const books = [
  {
    title: "Atlas shrugged",
    author: "Ain Rend",
    ISBN: 154545,
    keywords: ["Obama", "Food", "Japan"],
  },
  {},
  {},
  {},
  {},
  {},
  {},
  {
    title: "Algorithms",
    thirdParty: {
      goodreads: {
        rating: 4.41, // <-- HERE
        ratingsCount: 1733,
        reviewsCount: 63,
        fiveStarRatingCount: 976,
        oneStarRatingCount: 13,
      },
    },
  },
];
let [{ title, author, ISBN }] = books;
console.log(title, author, ISBN);

// TASK 2.2
let [{ keywords: tags }] = books;
console.log(tags);

// TASK 2.3
let { programmingLanguage: language = "unknown" } = books[6];

// TASK 2.4
({ title, author } = books[0]);

// TASK 2.5
let {
  thirdParty: {
    goodreads: { rating },
  },
} = books[7];
console.log(rating);
*/

/* // SPREAD OPERATOR

// TASK 3.1
const books = [
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
  },
  {
    title: "Good Omens",
    author: ["Neil Gaiman", "Terry Pratchett"],
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
  },
  {
    title: "The Cuckoo's Calling",
    author: ["Robert Galbraith", "J.K. Rowling"],
  },
  {
    title: "1984",
    author: "George Orwell",
  },
];

let bookAuthors = [...books[0].author, ...books[1].author];
console.log(bookAuthors);

const spellWord = word => {
  console.log(...word);
};
console.log(spellWord("foo"));

*/

/* // REST OPERATOR

// TASK 4.1
const library = {
  books: [
    {
      title: "Clean Code",
      author: ["Robert C. Martin", "Dean Wampler"],
      publisher: "Prentice Hall",
      keywords: ["software engineering", "best practices", "clean code"],
    },
    {
      title: "Design Patterns",
      author: [
        "Erich Gamma",
        "Richard Helm",
        "Ralph Johnson",
        "John Vlissides",
      ],
      publisher: "Addison-Wesley",
      keywords: ["design", "patterns", "software architecture"],
    },
    {
      title: "Artificial Intelligence: A Modern Approach",
      author: ["Stuart Russell", "Peter Norvig"],
      publisher: "Pearson",
      keywords: ["AI", "machine learning", "intelligence"],
    },
  ],
};

let [mainKeyword, ...other] = library.books[0].keywords;
console.log(mainKeyword, other);

// TASK 4.2
let { publisher: bookPublisher, ...restOfTheBook } = library.books[1];
console.log(bookPublisher, restOfTheBook);

// TASK 4.3
const printBookAuthorsCount = (title: string, ...authors: string[]) => {
  console.log(`The book "${title}" has ${authors.length} authors`);
};

printBookAuthorsCount(library.books[0].title, ...library.books[0].author);
printBookAuthorsCount(library.books[1].title, ...library.books[1].author);
*/

/* // SHORT CIRCUITING (&& and ||)
const library = {
  books: [
    {
      title: "Clean Code",
      author: ["Robert C. Martin", "Dean Wampler"],
      publisher: "Prentice Hall",
      keywords: ["software engineering", "best practices", "clean code"],
      programmingLanguage: ["Java"],
      onlineContent: true,
      edition: 5,
    },
    {
      title: "Design Patterns",
      author: [
        "Erich Gamma",
        "Richard Helm",
        "Ralph Johnson",
        "John Vlissides",
      ],
      publisher: "Addison-Wesley",
      keywords: ["design", "patterns", "software architecture"],
      programmingLanguage: ["C++", "Smalltalk", "Java"],
      edition: 3,
    },
    {
      title: "Artificial Intelligence: A Modern Approach",
      author: ["Stuart Russell", "Peter Norvig"],
      publisher: "Pearson",
      keywords: ["AI", "machine learning", "intelligence"],
      programmingLanguage: ["LISP", "Python", "Prolog"],
      onlineContent: false,
    },
  ],
};

// TASK 5.1
const hasExamplesInJava = (...languages: string[]): boolean | string => {
  return languages.includes("Java") || "no data available";
};

console.log(hasExamplesInJava(...library.books[0].programmingLanguage));
console.log(hasExamplesInJava(...library.books[1].programmingLanguage));
console.log(hasExamplesInJava(...library.books[2].programmingLanguage));

// TASK 5.2
library.books.forEach(book => {
  book.onlineContent && console.log(`${book.title} provides online content`);
});

// TASK 6.1
library.books.forEach(book => {
  book.onlineContent ??
    console.log(`${book.title} no data about its online content`);
});

// TASK 7.1
library.books.forEach(book => {
  book.edition ??= 1;
});

// TASK 7.2
library.books.forEach(book => {
  books.highlighted &&= !book.thirdParty.goodreads.rating < 4.2
})

console.log(library.books);
*/

/* // CHALLENGE #1

const playersTeam1 = [
  "Messi",
  "Neymar",
  "Mbappe",
  "Verratti",
  "Ramos",
  "Hakimi",
  "Marquinhos",
  "Donnarumma",
  "Kimpembe",
  "Danilo",
  "Nuno Mendes",
];

const playersTeam2 = [
  "Ronaldo",
  "Bruno Fernandes",
  "Bernardo Silva",
  "Rúben Dias",
  "Pepe",
  "João Cancelo",
  "Diogo Jota",
  "João Félix",
  "Rui Patrício",
  "Renato Sanches",
  "William Carvalho",
];

let [gk, ...otherPlayers] = playersTeam1;
console.log(gk, otherPlayers);
let allPlayers = [...playersTeam1, ...playersTeam2];
console.log(allPlayers);
let playersTeam1Final = [...playersTeam1, "Thiago", "Coutinho", "Perisic"];
console.log(playersTeam1Final);

const game = {
  team1: "Bayern Munich",
  team2: "Borrussia Dortmund",
  players: [
    [
      "Neuer",
      "Pavard",
      "Martinez",
      "Alaba",
      "Davies",
      "Kimmich",
      "Goretzka",
      "Coman",
      "Muller",
      "Gnarby",
      "Lewandowski",
    ],
    [
      "Burki",
      "Schulz",
      "Hummels",
      "Akanji",
      "Hakimi",
      "Weigl",
      "Witsel",
      "Hazard",
      "Brandt",
      "Sancho",
      "Gotze",
    ],
  ],
  score: "4:0",
  scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
  date: "Nov 9th, 2037",
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

let { team1, x: draw, team2 } = game.odds;
console.log(team1, draw, team2);

const printGoals = (...players: string[]) => {
  players.forEach(player => {
    let scoredTimes = game.scored.reduce(
      (accumulator, value) =>
        value === player ? accumulator + 1 : accumulator,
      0
    );
    scoredTimes && console.log(`${player} scored ${scoredTimes} times`);
  });
};

printGoals(...game.players[0], ...game.players[1]);
*/

/* // LOOPING ARRAYS
let someAr = ["a", "b", "c", "d"];
for (const value of someAr) console.log(value);
for (const [idx, value] of someAr.entries()) console.log(idx, value);

// TASK 8.1
let books = [
  { pages: 18, authors: ["a", "b"] },
  { pages: 20, authors: ["c", "d"] },
];
let pageSum = 0;
for (const book of books) pageSum += book.pages;
console.log(pageSum);

// TASK 8.2
let allAuthors = [];
for (const book of books) allAuthors.push(...book.authors);
console.log(allAuthors);

// TASK 8.3
for (const [idx, author] of allAuthors.entries())
  console.log(`${idx + 1}. ${author}`);
*/

/* // ENHANCED OBJECT LITERALS
type BookKey = "title" | "author" | "publisher";
type BookValue = string | string[];

const bookData: [BookKey, BookValue][] = [
  ["title", "Computer Networking: A Top-Down Approach"],
  ["author", ["James F. Kurose", "Keith W. Ross"]],
  ["publisher", "Addison Wesley"],
];

const newBook = {
  [bookData[0][0]]: bookData[0][1],
  [bookData[1][0]]: bookData[1][1],
  [bookData[2][0]]: bookData[2][1],
};

const pages = 880;

const newBook2 = {
  title: "The C Programming Language",
  author: ["Brian W. Kernighan", "Dennis M. Ritchie"],
  pages,
};
*/

/* // OPTIONAL CHAINING

const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

let weekdays = ["mon", "tue", "wed", "thu", "fri", "sat", "san"];
for (const day of weekdays) {
  const open = restaurant.openingHours[day]?.open ?? "-";
  console.log(`The restaurant opens at ${open} on ${day}`);
}

console.log(restaurant.order?.(0, 1) ?? "Method does not exist");

// TASK 10.1
const library = {
  books: [
    {
      title: "Clean Code",
      author: ["Robert C. Martin", "Dean Wampler"],
      publisher: "Prentice Hall",
      keywords: ["software engineering", "best practices", "clean code"],
    },
    {
      title: "Design Patterns",
      author: [
        "Erich Gamma",
        "Richard Helm",
        "Ralph Johnson",
        "John Vlissides",
      ],
      publisher: "Addison-Wesley",
      keywords: ["design", "patterns", "software architecture"],
    },
    {
      title: "Artificial Intelligence: A Modern Approach",
      author: ["Stuart Russell", "Peter Norvig"],
      publisher: "Pearson",
      keywords: ["AI", "machine learning", "intelligence"],
    },
  ],
};

const getFirstKeyword = book => book?.keywords?.[0];

getFirstKeyword(library.books[0]);
for (const book of library.books) {
  console.log(getFirstKeyword(book));
}
console.log(getFirstKeyword({}));
*/

/* // LOOPING OBJECTS: OBJECT KEYS, VALUES AND ENTRIES
const books = [
  {
    title: "Atlas shrugged",
    author: "Ain Rend",
    ISBN: 154545,
    keywords: ["Obama", "Food", "Japan"],
  },
  {},
  {},
  {},
  {},
  {},
  {},
  {
    title: "Algorithms",
    thirdParty: {
      goodreads: {
        rating: 4.41, // <-- HERE
        ratingsCount: 1733,
        reviewsCount: 63,
        fiveStarRatingCount: 976,
        oneStarRatingCount: 13,
      },
    },
  },
];

// TASK 11.1
const entries = [];
for (const key of Object.keys(books[books.length - 1].thirdParty.goodreads))
  entries.push([key]);
console.log(...entries);

// TASK 11.2
const values = Object.values(books[books.length - 1].thirdParty.goodreads);
for (const [idx, value] of values.entries()) entries[idx].push(value);
console.log(entries);

// TASK 11.3
const entries2 = Object.entries(books[books.length - 1].thirdParty.goodreads);
console.log(entries2);
*/

/* // CHALLENGE #2
const game = {
  team1: "Bayern Munich",
  team2: "Borrussia Dortmund",
  players: [
    [
      "Neuer",
      "Pavard",
      "Martinez",
      "Alaba",
      "Davies",
      "Kimmich",
      "Goretzka",
      "Coman",
      "Muller",
      "Gnarby",
      "Lewandowski",
    ],
    [
      "Burki",
      "Schulz",
      "Hummels",
      "Akanji",
      "Hakimi",
      "Weigl",
      "Witsel",
      "Hazard",
      "Brandt",
      "Sancho",
      "Gotze",
    ],
  ],
  score: "4:0",
  scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
  date: "Nov 9th, 2037",
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

for (const [idx, surname] of game.scored.entries())
  console.log(`Goal ${idx + 1}: ${surname}`);

for (const [key, value] of Object.entries(game.odds)) {
  game[key] && console.log(`Odd of victory ${game[key]}: ${value}`);
}

const scores = {};
for (const surname of game.scored) {
  scores[surname] = game.scored.reduce(
    (acc, value) => (value === surname ? acc + 1 : acc),
    0
  );
}
console.log(scores);
*/

/* // SETS
const library = {
  books: [
    {
      title: "Clean Code",
      author: ["Robert C. Martin", "Dean Wampler"],
      publisher: "Prentice Hall",
      keywords: ["software engineering", "best practices", "clean code"],
    },
    {
      title: "Design Patterns",
      author: [
        "Erich Gamma",
        "Richard Helm",
        "Ralph Johnson",
        "John Vlissides",
      ],
      publisher: "Addison-Wesley",
      keywords: ["design", "patterns", "software architecture"],
    },
    {
      title: "Artificial Intelligence: A Modern Approach",
      author: ["Stuart Russell", "Peter Norvig"],
      publisher: "Pearson",
      keywords: ["AI", "machine learning", "intelligence"],
    },
  ],
};

// TASK 12.1
const allKeywords = new Set();
for (const book of library.books) {
  book.keywords.forEach(keyword => allKeywords.add(keyword));
}
console.log(allKeywords);

// TASK 12.2
allKeywords.add("coding");
allKeywords.add("science");
console.log(allKeywords);

// TASK 12.3
console.log(allKeywords.delete("business"));

// TASK 12.4
const keywords = [...allKeywords];
console.log(keywords);

// TASK 12.5
allKeywords.clear();
console.log(allKeywords);
*/

/* // MAPS 

// TASK 13.1
const bookMap = new Map<any, any>([
  ["title", "Clean Code"],
  ["author", "Robert C. Martin"],
]);
console.log(bookMap);

// TASK 13.2
bookMap.set("pages", 464);
console.log(bookMap);

// TASK 13.3
console.log(`${bookMap.get("title")} by ${bookMap.get("author")}`);

// TASK 13.5
console.log(bookMap.size);

// TASK 13.5
bookMap.has("author") && console.log(`The author of the book is known`);
*/

/* // CHALLENGE #3

const gameEvents = new Map([
  [17, "⚽️ GOAL"],
  [36, "🔁 Substitution"],
  [47, "⚽️ GOAL"],
  [61, "🔁 Substitution"],
  [64, "🔶 Yellow card"],
  [69, "🔴 Red card"],
  [70, "🔁 Substitution"],
  [72, "🔁 Substitution"],
  [76, "⚽️ GOAL"],
  [80, "⚽️ GOAL"],
  [92, "🔶 Yellow card"],
]);

// TASK 1
const events = new Set(gameEvents.values());
console.log(events);

// TASK 2
gameEvents.delete(64);
console.log(gameEvents.has(64));

// TASK 3
console.log(
  `An event happened, on average, every ${90 / gameEvents.size} minutes.`
);

// TASK 4
for (const [time, event] of gameEvents.entries()) {
  let msg = "";
  time < 45 ? (msg += `[FIRST HALF] `) : (msg += `[SECONDE HALF] `);
  msg += `${time}: ${event}`;
  console.log(msg);
}
*/

/* // WORKING WITH STRINGS PART 1
console.log(books[0].ISBN[6]);
console.log(books[0].ISBN[4]);
console.log(books[0].ISBN[9]);
console.log(books[0].ISBN[8]);

const quote =
  "A computer once beat me at chess, but it was no match for me at kick boxing";
console.log(
  quote.slice(
    quote.indexOf("chess"),
    quote.indexOf("chess") + quote.slice(quote.indexOf("chess")).indexOf(",")
  )
);
console.log(quote.slice(quote.indexOf("boxing")));

const isContributor = (author: string): boolean =>
  author.includes("(Contributor)");
console.log(isContributor("Julie Sussman (Contributor)"));

// WORKING WITH STRINGS PART 2
const normalizeAuthorName = (fullName: string) => {
  fullName = fullName.trim().toLowerCase();
  if (fullName.includes("(contributor)"))
    fullName = fullName.slice(0, fullName.indexOf("(contributor)") - 1);
  let res = "";
  fullName.split(" ").forEach((part) => {
    res += `${part[0].toUpperCase()}${part.slice(1)} `;
  });
  return res;
};

console.log(normalizeAuthorName("Julie Sussman (Contributor)"));
console.log(normalizeAuthorName("Julie Sussman"));

const newBookTitle = books[1].title.replace("Programs", "Software");
console.log(newBookTitle);

const logBookTheme = (title: string) => {
  title = title.trim().toLowerCase();
  if (title.startsWith("computer"))
    console.log(`This book is about computers`);
  else if (title.includes("algorithms") && title.includes("structures"))
    console.log("This book is about algorithms and data structures");
  else if (
    (title.endsWith("system") || title.endsWith("systems")) &&
    !title.includes("operating")
  )
    console.log(
      "This book is about some systems, but definitely not about operating systems"
    );
};
for (const book of books) {
  logBookTheme(book.title);
}
const maskCreditCard = (number: string | number) => {
  number = number + "";
  return number.slice(-4).padStart(16, "*");
};
console.log(maskCreditCard(4834_3482_2389_5647));
console.log(10_000);

// WORKING WITH STRINGS PART 3
const logBookCategories = (bookCategories: string) => {
  let categories = bookCategories.split(";");
  for (const category of categories) {
    console.log(category);
  }
  return categories;
};

const bookCategories =
  "science;computing;computer science;algorithms;business;operating systems;networking;electronics";
let categories = logBookCategories(bookCategories);

const getKeywordsAsString = (keywords: string[]) => keywords.join(";");

console.log(getKeywordsAsString(categories));

const logBookChapters = (chapters: [string, number][]) => {
  for (const [chapter, pages] of chapters)
    console.log(`${chapter.padEnd(20, "_")} ${pages}`);
};

const bookChapters: [string, number][] = [
  ["The Basics", 14],
  ["Sorting", 254],
  ["Searching", 372],
  ["Graphs", 526],
  ["Strings", 706],
];
logBookChapters(bookChapters);

const toCamelCase = (str: string) => {
  str = str.trim();
  let res = "";
  const [firstWord, ...others] = str.split("_");
  res += firstWord.toLowerCase();
  for (const word of others) {
    res += `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`;
  }
  return res;
};
const btnEl = document.querySelector("button");
const textFieldEl: HTMLInputElement = document.querySelector("input");
btnEl.addEventListener("click", () => {
  textFieldEl.value = toCamelCase(textFieldEl.value);
});
*/
