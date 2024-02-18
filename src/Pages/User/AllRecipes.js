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
    <div className="home-container">
      <h2 className='all-recipes'>All Users Recipes</h2>
      <div className="recipe-list">
        {recipes.map(recipe => (
          
          <div key={recipe.recipeId} className="recipe-card">
           
            {recipe.recipe_image && (
              <img src={`data:image/jpeg;base64,${recipe.recipe_image}`} alt={recipe.recipeName}  onClick={() => handleRecipeClick(recipe.recipeId)}/>
            )}
            <div className="recipe-details">
              <h3 className="recipe-name">{recipe.recipeName}</h3>
              <p className="recipe-calories">Total Calories: {recipe.totalCalories}</p>
            </div>
            <p className='displayname'>{recipe.recipeName}</p>
            
          </div>
          
        ))}
      </div>

      {/* Conditionally render the selected recipe details */}
      {selectedRecipe && (
        <div className="selected-recipe-details">
          <h3>{selectedRecipe.recipeName}</h3>
          <p>Total Calories: {selectedRecipe.totalCalories}</p>
          {/* Add more details as needed */}
        </div>
      )}
    </div>
  );
}
