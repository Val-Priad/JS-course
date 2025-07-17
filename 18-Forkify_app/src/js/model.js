import * as configuration from "./config.js";
import { getJSON } from "./helpers.js";
export const state = {
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
    }
    catch (err) {
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
    }
    catch (err) {
        throw err;
    }
};
export const getSearchResultsPage = function (page = state.search.currentPage) {
    state.search.currentPage = page;
    const start = (page - 1) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;
    return state.search.results.slice(start, end);
};
export const updateServings = (servings) => {
    state.recipe.ingredients = state.recipe.ingredients.map((ingredient) => {
        if (!ingredient.quantity)
            return;
        ingredient.quantity =
            (ingredient.quantity / state.recipe.servings) * servings;
        return ingredient;
    });
    state.recipe.servings = servings;
};
