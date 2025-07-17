// @ts-ignore
// import icons from "../img/icons.svg"; // Parcel 1
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import "regenerator-runtime/runtime";
import "core-js/stable";

const recipeContainer = document.querySelector(".recipe");

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io
//

const controllerRecipes = async () => {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    resultsView.update(model.getSearchResultsPage());

    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
};

const controllerSearchResults = async () => {
  try {
    resultsView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;
    searchView.clearInput();
    await model.loadSearchResults(query);
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());
    paginationView.render(model.state.search);
  } catch (err) {}
};

const controllerPagination = (page) => {
  resultsView.render(model.getSearchResultsPage(page));
  paginationView.render(model.state.search);
};

const controllerServings = (newServings) => {
  model.updateServings(newServings);
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controllerRecipes);
  recipeView.addHandlerUpdateServings(controllerServings);
  searchView.addHandlerSearch(controllerSearchResults);
  paginationView.addHandlerClick(controllerPagination);
};

init();
