import axios from 'axios';

const baseUrl = "http://localhost:8080/";

class IngredientService {
    getAllIngredients() {
        return axios.get(baseUrl + "ingredients");
    }

    getAllDistinctIngredients() {
        return axios.get(baseUrl + "distinctingredients");
    }

    getIngredientById(ingredientId) {
        return axios.get(baseUrl + "ingredient/" + ingredientId);
    }

    addIngredient(ingredient,recipeId) {
        return axios.post(baseUrl + "ingredient?recipeId="+recipeId, ingredient);
    }

    updateIngredient(ingredient) {
        return axios.put(baseUrl + "ingredient/" + ingredient.ingredientId, ingredient);
    }

    deleteIngredient(ingredientId) {
        return axios.delete(baseUrl + "ingredient/" + ingredientId);
    }

    getRecipesByIngredient(ingredientId) {
        return axios.get(baseUrl + "ingredient/" + ingredientId + "/recipes");
    }
}

export default new IngredientService();