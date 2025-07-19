// @ts-ignore
// import icons from "../img/icons.svg"; // Parcel 1
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import bookmarksView from "./views/bookmarksView.js";
import paginationView from "./views/paginationView.js";
import addRecipeView from "./views/addRecipeView.js";
import * as config from "./config.js";
import "regenerator-runtime/runtime";
import "core-js/stable";
// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io
//
const controllerRecipes = async () => {
    try {
        const id = window.location.hash.slice(1);
        if (!id)
            return;
        recipeView.renderSpinner();
        resultsView.update(model.getSearchResultsPage());
        bookmarksView.update(model.state.bookmarks);
        await model.loadRecipe(id);
        recipeView.render(model.state.recipe);
    }
    catch (error) {
        recipeView.renderError(error);
    }
};
const controllerSearchResults = async () => {
    try {
        resultsView.renderSpinner();
        const query = searchView.getQuery();
        if (!query)
            return;
        searchView.clearInput();
        await model.loadSearchResults(query);
        // resultsView.render(model.state.search.results);
        resultsView.render(model.getSearchResultsPage());
        paginationView.render(model.state.search);
    }
    catch (err) { }
};
const controllerPagination = (page) => {
    resultsView.render(model.getSearchResultsPage(page));
    paginationView.render(model.state.search);
};
const controllerServings = (newServings) => {
    model.updateServings(newServings);
    recipeView.update(model.state.recipe);
};
const controllerToggleBookmark = () => {
    if (!model.state.recipe.bookmarked)
        model.addBookmark(model.state.recipe);
    else
        model.deleteBookmark(model.state.recipe.id);
    recipeView.update(model.state.recipe);
    bookmarksView.render(model.state.bookmarks);
};
const controllerBookmarks = () => {
    bookmarksView.render(model.state.bookmarks);
};
const controllerAddRecipe = async function (newRecipe) {
    try {
        addRecipeView.renderSpinner();
        await model.uploadRecipe(newRecipe);
        window.location.hash = "#" + model.state.recipe.id;
        bookmarksView.render(model.state.bookmarks);
        recipeView.render(model.state.recipe);
        addRecipeView.renderMessage();
        setTimeout(() => {
            addRecipeView.toggleWindow();
        }, config.WAIT_AFTER_RECIPE_UPLOAD);
    }
    catch (error) {
        addRecipeView.renderError(`${error.message}`);
    }
};
const init = function () {
    bookmarksView.addHandlerRender(controllerBookmarks);
    recipeView.addHandlerRender(controllerRecipes);
    recipeView.addHandlerUpdateServings(controllerServings);
    recipeView.addHandlerAddBookmark(controllerToggleBookmark);
    searchView.addHandlerSearch(controllerSearchResults);
    paginationView.addHandlerClick(controllerPagination);
    addRecipeView.addHandlerUpload(controllerAddRecipe);
};
init();
