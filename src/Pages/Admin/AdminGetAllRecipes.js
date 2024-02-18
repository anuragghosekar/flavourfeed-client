import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import RecipeService from '../../Service/RecipeService';
import '../../Style/Admin/AdminGetAllRecipes.css';
import UserService from '../../Service/UserService';

const AdminGetAllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loggedIn, setLoggedIn] = useState(true);
  const [isadmin, setisadmin] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          setLoggedIn(false);
          return;
        }

        const userResponse = await UserService.getUserById(userId);
        const userData = userResponse.data;
        if (userData.role === 'user') {
          setisadmin(false);
          return;
        }

        const response = await RecipeService.getAllRecipes();
        setRecipes(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!loggedIn) {
    // Redirect to login if not logged in
    return <Navigate to="/login" replace />;
  }

  if (!isadmin) {
    // Redirect to user dashboard if not admin
    return <Navigate to="/userdashboard" replace />;
  }

  const deleteRecipe = async (recipeId) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      try {
        await RecipeService.deleteRecipe(recipeId);
        setRecipes(recipes.filter((recipe) => recipe.recipeId !== recipeId));
      } catch (error) {
        console.error('Error deleting recipe:', error);
      }
    }
  };

  return (
    <div className="container user-recipes-container">
    <h2>My Recipes</h2>
    <div className="user-recipes">
      {recipes.map((recipe) => (
        <div key={recipe.recipeId} className="user-recipe">
          <h3>{recipe.recipeName}</h3>
          <p>Recipe Type: {recipe.recipeType}</p>
          <p>Total Calories: {recipe.totalCalories}</p>
          <p>Cook Time: {recipe.cookTime}</p>
          <p>Instructions: {recipe.instructions}</p>
          <p>Recipe Description: {recipe.recipeDescription}</p>
          <div className="recipe-image">
            {recipe.recipe_image ? (
              <img src={`data:image/jpeg;base64,${recipe.recipe_image}`} alt={recipe.recipeName} />
            ) : (
              <span>No Image</span>
            )}
          </div>
          <div className="recipe-actions">
          <Link to={`/adminviewrecipe/${recipe.recipeId}`} >
                <button className='view-button' >View</button>
              </Link>
              <button className="delete-button" onClick={() => deleteRecipe(recipe.recipeId)}>
                Delete
              </button>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

              
export default AdminGetAllRecipes;
