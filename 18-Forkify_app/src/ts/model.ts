import * as configuration from "./config.js";
import { AJAX } from "./helpers.js";

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

const createRecipeObj = (recipe) => {
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${configuration.API_URL}${id}`);
    let { recipe } = data.data;
    state.recipe = createRecipeObj(recipe);
    if (state?.bookmarks?.some((recipe) => recipe.id === state.recipe.id)) {
      state.recipe.bookmarked = true;
    }
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async (query) => {
  try {
    const data = await AJAX(
      `${configuration.API_URL}?search=${query}&key=${configuration.API_KEY}`
    );
    state.search.results = data.data.recipes.map((recipe) => ({
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      image: recipe.image_url,
      ...(recipe.key && { key: recipe.key }),
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
    if (!ingredient.quantity) return ingredient;
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

export const uploadRecipe = async function (newRecipe: Recipe) {
  try {
    let ingredients = Object.entries(newRecipe)
      .filter((entry) => {
        if (entry[0].startsWith("ingredient") && entry[1] !== "") {
          return entry;
        }
      })
      .map((ingredient: [string, string]) => {
        const ingredientArr = ingredient[1].split(",").map((el) => el.trim());
        if (ingredientArr.length !== 3)
          throw new Error(
            `Wrong ingredient format please use the correct format "qty,unit,description", skip value, but not comma. Example ",,salt"!`
          );
        const [quantity, unit, description] = ingredientArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      servings: +newRecipe.servings,
      cooking_time: +newRecipe.cookingTime,
      ingredients,
    };

    const data = await AJAX(
      `${configuration.API_URL}?key=${configuration.API_KEY}`,
      recipe
    );

    const recipeResponse = data.data.recipe;
    recipeResponse.key = configuration.API_KEY;
    state.recipe = createRecipeObj(recipeResponse);
    addBookmark(state.recipe);
  } catch (error) {
    throw error;
  }
};

const init = function () {
  // clearBookmarks();
  const storage = localStorage.getItem("bookmarks");
  if (storage) state.bookmarks = JSON.parse(storage);
};

init();
