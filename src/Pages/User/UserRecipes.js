import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import UserService from "../../Service/UserService";
import RecipeService from "../../Service/RecipeService";
import "../../Style/User/UserRecipies.css";
import LogNavbar from "./LogNavbar";

export default function UserRecipes() {
  const [postedRecipes, setPostedRecipes] = useState([]);
  const [loggedIn, setLoggedIn] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          setLoggedIn(false);
          return;
        }
        const userResponse = await UserService.getUserById(userId);
        const userData = userResponse.data;
        if (userData.role === "admin") {
          setIsAdmin(true);
          return;
        }
        const recipesResponse = await UserService.getUserRecipes(userId);
        setPostedRecipes(recipesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const deleteRecipe = async (recipeId) => {
    try {
      await RecipeService.deleteRecipe(recipeId);
      setPostedRecipes(
        postedRecipes.filter((recipe) => recipe.recipeId !== recipeId)
      );
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (isAdmin) {
    return <Navigate to="/adminDashboard" replace />;
  }

  return (
    <>
      <LogNavbar />
      <div className="container user-recipes-container">
        <h2>My Recipes</h2>
        <div className="user-recipes">
          {postedRecipes &&
            postedRecipes.map((recipe) => (
              <div key={recipe.recipeId} className="user-recipe">
                <h3>{recipe.recipeName}</h3>
                <p>Recipe Type: {recipe.recipeType}</p>
                <p>Total Calories: {recipe.totalCalories}</p>
                <p>Cook Time: {recipe.cookTime}</p>
                <p>Recipe Description: {recipe.recipeDescription}</p>
                <div className="recipe-image">
                  {recipe.recipe_image ? (
                    <img
                      src={`data:image/jpeg;base64,${recipe.recipe_image}`}
                      alt={recipe.recipeName}
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </div>
                <div className="recipe-actions">
                  <Link to={`/edit/${recipe.recipeId}`}>
                    {" "}
                    <button className="edit">Edit</button>
                  </Link>
                  <button
                    className="delete"
                    onClick={() => deleteRecipe(recipe.recipeId)}
                  >
                    Delete
                  </button>
                  <Link to={`/user/view/${recipe.recipeId}`}>
                    {" "}
                    <button className="view">View</button>
                  </Link>
                </div>
              </div>
            ))}
        </div>
        <Link to="/addnewrecipe" className="btn btn-success add-new-recipe-btn">
          Add New Recipe
        </Link>
      </div>
    </>
  );
}
