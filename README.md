# JS Course Summary

## 🌐 Live Demo

- **Live Demo**: [**My Projects**](https://val-priad.github.io/JS-course/)

## ⚙️ Technologies

[![Technologies](https://skillicons.dev/icons?i=html,css,sass,js,ts&perline=5)](https://skillicons.dev)

- **HTML**
- **CSS**
- **Sass**
- **JavaScript**
- **TypeScript**

## Projects

### 1. Guess My Number

A simple game where you try to guess a **randomly generated** number.

### 2. Pig Game

#### Objective

Be the first player to reach **20 points**.

#### Setup

- 2 players
- One 6-sided die

#### How to Play

1. Players take turns rolling the die.
2. On your turn, you can roll **as many times as you like**, adding up the total of your rolls.
3. However, if you roll a **1**, your turn ends and you **lose all points** earned during that turn.
4. You can choose to **"hold"** at any time, which means:
   - You keep the points you've earned that turn.
   - Those points are added to your **total score**, and your turn ends.
5. The first player to reach **20 points or more** wins the game.

#### Example

- Player A rolls: 5 → 3 → 6 → holds → **earns** 14 points.
- Player B rolls: 2 → 4 → 1 → **loses** all points that turn.

### 3. Bankist Web App

#### Description

**Bankist** is a modern and minimalistic online banking application built using vanilla **HTML, CSS, and TypeScript**.  
It allows users to log in securely using a username and PIN, view their current balance, monitor all past transactions  
(**deposits** and **withdrawals**), and receive a financial summary including total income, expenses, and interest earned.

#### Features

- Secure login with PIN
- Dynamic transaction history display with formatted dates and currency
- Money transfers between accounts
- Request and receive loans if eligibility conditions are met
- Account closure with valid credentials
- Automatic logout timer for session security
- Responsive and accessible user interface
- Real-time updates of balance and summary based on user activity

#### Interesting Technologies Used

- **Intl API** for date and currency formatting

#### Test Users

- User: jx, PIN: 1111
- User: jm, PIN: 2222

#### Note

- Loans are granted only if a deposit **greater than or equal to** 10% of the requested amount exists.
- Transfers are only allowed between registered usernames.

### 4. Bankist Website

#### Project Description

**Bankist: A Minimalist Digital Banking Experience**

Bankist is a modern, responsive, and interactive single-page banking website designed to deliver a seamless digital banking experience.  
Built with **HTML, CSS, and JavaScript**, it combines elegant design with intuitive functionality to demonstrate key banking features in a clean, minimalist interface.

#### Key Features

- **Smooth Scroll Navigation**: Clickable links and buttons scroll smoothly to relevant sections.
- **Sticky Navigation Bar**: Automatically sticks to the top of the screen for better UX as you scroll.
- **Lazy-Loaded Images**: Images load only when they enter the viewport, improving performance.
- **Tabbed Operations Panel**: Users can switch between "Transfers," "Loans," and "Account Closing" with smooth tab interactions.
- **Modal Window**: A clean pop-up form for opening a new bank account.
- **Reveal-on-Scroll Animations**: Sections fade in as users scroll down the page.
- **Interactive Slider**: A simple testimonial slider that supports both click and keyboard navigation.
- **Navigation Fade Effect**: Highlights navigation links and the logo for a focused hover experience.

#### Interesting Technologies Used

- **Intersection Observer API** for lazy loading and scroll-based effects

### 5. Mapty Web App

#### Description

**Mapty** is a dynamic web application that allows users to **log and visualize** their running and cycling workouts directly on an interactive map.  
Users can click anywhere on the map to add a workout, filling in details like **distance, duration, cadence** (for running), or **elevation gain** (for cycling). Each workout is then:

- Displayed as a **custom marker** on the map with a popup summary
- Rendered as a detailed entry in a **sidebar list**
- Persisted in **local storage** to remain available after page reloads

#### Key Features

- Interactive map powered by **Leaflet.js**
- Support for **running** and **cycling** workouts
- Automatic calculation of **pace** and **speed**
- Responsive **form toggling** based on workout type
- Smooth map navigation to selected workouts
- **Local storage integration** for data persistence

Mapty is an excellent showcase of object-oriented **JavaScript/TypeScript** design and modern web development practices.

#### Interesting Technologies Used

Built using **Leaflet.js**. The app leverages the browser's **Geolocation API** to center the map on the user's current location.

### 6. Forkify Website

#### Description

**Recipe Discovery & Management Platform**

This is a sophisticated single-page web application built with **TypeScript** that allows users to search, view, bookmark, and manage recipes.  
The application follows a clean **MVC (Model-View-Controller)** architecture with a modular view system.

#### Key Features

**Recipe Search & Discovery**

- Dynamic recipe search functionality with real-time results
- Paginated search results for easy browsing
- Recipe preview cards showing image, title, and publisher information

**Detailed Recipe Viewing**

- Comprehensive recipe display with cooking time, servings, and ingredients
- Interactive serving size adjustment with automatic ingredient quantity recalculation
- Fraction display for ingredient measurements using the **Fracty** library
- Direct links to original recipe sources

**Personal Recipe Management**

- Bookmark functionality to save favorite recipes
- Persistent bookmarks that survive page reloads
- Add custom recipes through a modal form interface
- Visual indicators for user-generated content

**Modern User Experience**

- Responsive design with smooth modal interactions
- Loading spinners and error handling
- Real-time DOM updates without full page refreshes
- Clean, intuitive navigation

#### Technical Architecture

**Frontend Technology Stack:**

- **TypeScript** for type-safe development
- **Modular View Classes** extending a base View class
- **Event-driven architecture** with custom event handlers
- **Parcel bundler** for asset management (including SVG icons)
- **DOM manipulation** without heavy frameworks

**Key Components:**

- `SearchView` – Handles recipe search functionality
- `ResultsView` & `PreviewView` – Display search results and recipe previews
- `RecipeView` – Detailed recipe display with interactive features
- `BookmarksView` – Manages saved recipes
- `AddRecipeView` – Modal interface for adding custom recipes
- `PaginationView` – Handles search result pagination

**Design Patterns:**

- **Inheritance** – All views extend a base View class
- **Observer Pattern** – Event handlers for user interactions
- **Singleton Pattern** – Each view is exported as a single instance
- **Template Method** – Consistent markup generation across views

## 🧠 What I Learned

I've learned a lot and can confidently say I now have a solid foundation in modern JavaScript development. Here's what I've covered:

- Gained a deep understanding of how JavaScript works under the hood
- Got comfortable with modern **ES6+ features** like arrow functions, destructuring, the spread operator, optional chaining, and more
- Studied object-oriented programming (OOP) with classes, constructors, inheritance, and encapsulation
- Tackled advanced topics like `this`, higher-order functions, and closures
- Worked with asynchronous JavaScript—event loop, promises, async/await, and API interactions
- Used modern development tools like **NPM, Parcel, Babel**, and **ES6 modules**

## 🙋‍♂️ Acknowledgments

Thanks to [**Jonas Schmedtmann**](https://github.com/jonasschmedtmann)  
for the course.

**Link to course**: [The Complete JavaScript Course 2025: From Zero to Expert!](https://www.udemy.com/course/the-complete-javascript-course/?couponCode=LETSLEARNNOW)
