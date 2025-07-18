import { reduce, result, toUpper } from "lodash-es";
import * as configuration from "./config.js";
import { getJSON } from "./helpers.js";

type Ingredient = {
  quantity: number | null; // assuming some ingredients may not have a quantity
  unit: string;
  description: string;
};

type Recipe = {
  id: string;
  title: string;
  publisher: string;
  sourceUrl: string;
  image: string;
  servings: number;
  cookingTime: number;
  ingredients: Ingredient[];
  bookmarked?: boolean;
};

type Search = {
  query: string;
  results: Recipe[];
  resultsPerPage: number;
  currentPage: number;
};

type State = {
  recipe?: Recipe;
  search: Search;
  bookmarks?: Recipe[];
};

export const state: State = {
  search: {
    query: "",
    results: [],
    resultsPerPage: configuration.RESULTS_PER_PAGE,
    currentPage: 1,
  },
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${configuration.API_URL}${id}`);
    let { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    if (state?.bookmarks?.some((recipe) => recipe.id === state.recipe.id)) {
      state.recipe.bookmarked = true;
    }
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async (query) => {
  try {
    const data = await getJSON(`${configuration.API_URL}?search=${query}`);
    state.search.results = data.data.recipes.map((recipe) => ({
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      image: recipe.image_url,
    }));
    state.search.currentPage = 1;
  } catch (err) {
    throw err;
  }
};

export const getSearchResultsPage = function (
  page = state.search.currentPage
) {
  state.search.currentPage = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

export const updateServings = (servings) => {
  state.recipe.ingredients = state.recipe.ingredients.map((ingredient) => {
    if (!ingredient.quantity) return;
    ingredient.quantity =
      (ingredient.quantity / state.recipe.servings) * servings;
    return ingredient;
  });
  state.recipe.servings = servings;
};

export const addBookmark = function (recipe: Recipe) {
  if (!state.bookmarks) state.bookmarks = [];
  state.bookmarks.push(recipe);
  state.recipe.bookmarked = true;
  persistBookmarks();
};

export const deleteBookmark = function (id) {
  state.recipe.bookmarked = false;
  state.bookmarks.splice(
    state.bookmarks.findIndex((recipe) => recipe.id === id),
    1
  );
  persistBookmarks();
};

const persistBookmarks = function () {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

const clearBookmarks = function () {
  localStorage.removeItem("bookmarks");
};

const init = function () {
  const storage = localStorage.getItem("bookmarks");
  if (storage) state.bookmarks = JSON.parse(storage);
};

init();
console.log(state.bookmarks);
