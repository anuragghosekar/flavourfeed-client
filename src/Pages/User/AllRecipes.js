import React, { useState, useEffect } from 'react';
import RecipeService from '../../Service/RecipeService';
import  "../../Style/User/AllRecipes.css";
import { Navigate,Link   } from 'react-router-dom';

export default function AllRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null); // State to store the selected recipe details
  const [flag,setflag] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await RecipeService.getAllRecipes();
        setRecipes(response.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  // Function to handle clicking on a recipe card
  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe); // Set the selected recipe details when clicked
    setflag(true);
  };
  if(flag){
    return <Navigate to={`/view/${selectedRecipe}`} replace />;
  }

  return (
    <div className="container user-recipes-container">
        <h2>My Recipes</h2>
        <div className="user-recipes">
          {recipes.map((recipe) => (
            <div key={recipe.recipeId} className="user-recipe" onClick={() => handleRecipeClick(recipe.recipeId)}>
              <div className="recipe-image">
                {recipe.recipe_image ? (
                  <img src={`data:image/jpeg;base64,${recipe.recipe_image}`} alt={recipe.recipeName} />
                ) : (
                  <span>No Image</span>
                )}
              </div>
              <h3>{recipe.recipeName}</h3>
              <p>Recipe Type: {recipe.recipeType}</p>
              <p>Total Calories: {recipe.totalCalories}</p> 
              <p>Recipe Description: {recipe.recipeDescription}</p>
              
              <div className="recipe-actions">
               
              </div>
            </div>
          
        ))}
      </div>

    </div>
  );
}
