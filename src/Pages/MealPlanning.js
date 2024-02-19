import React, { useState, useEffect } from "react";
import RecipeService from "../Service/RecipeService";
import { Navigate, Link } from "react-router-dom";
import "../Style/MealPlanning.css";

export default function MealPlanner() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [days, setDays] = useState([]); // State to store the days with their respective recipes

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await RecipeService.getAllRecipes();
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  // Function to handle clicking on a recipe card
  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe); // Set the selected recipe details when clicked
  };

  // Function to add a new day
  const addDay = () => {
    setDays([...days, []]);
  };

  // Function to delete a day by index
  const deleteDay = (index) => {
    setDays(days.filter((_, i) => i !== index));
  };

  // Function to add a recipe to a specific day
  const addRecipe = (index) => {
    if (!selectedRecipe) {
      alert("Please select a recipe.");
      return;
    }

    const newDays = [...days];
    newDays[index] = [
      ...newDays[index],
      { ...selectedRecipe, additionalInfo: "" },
    ];
    setDays(newDays);
  };

  // Function to delete a recipe from a specific day
  const deleteRecipe = (dayIndex, recipeIndex) => {
    const newDays = [...days];
    newDays[dayIndex] = newDays[dayIndex].filter((_, i) => i !== recipeIndex);
    setDays(newDays);
  };

  // Function to calculate total calories for a day
  const calculateTotalCalories = (day) => {
    let totalCalories = 0;
    day.forEach((recipe) => {
      totalCalories += recipe.totalCalories;
    });
    return totalCalories;
  };

  // Function to handle input change for additional info of a recipe
  const handleInputChange = (dayIndex, recipeIndex, event) => {
    const { value } = event.target;
    const newDays = [...days];
    newDays[dayIndex][recipeIndex].additionalInfo = value;
    setDays(newDays);
  };

  return (
    <div className="container-days user-r-container">
      <h2>Meal Planner</h2>
      <div className="add-day-button-container">
        <button onClick={addDay} className="days-btn-add">
          Add Day
        </button>
      </div>
      {days.map((day, index) => (
        <div key={index} className="meal-day">
          <h3>
            Day {index + 1} - Total Calories: {calculateTotalCalories(day)}
          </h3>
          <div className="user-r">
            {day.map((recipe, recipeIndex) => (
              <div key={recipe.recipeId} className="user-r">
                {/* Recipe Details */}
                <h3>
                  {recipe.recipeName} Calories: {recipe.totalCalories}
                </h3>
                <input
                  type="text"
                  placeholder="Additional Info"
                  value={recipe.additionalInfo}
                  onChange={(event) =>
                    handleInputChange(index, recipeIndex, event)
                  }
                />
                {/* Delete recipe button */}
                <button
                  onClick={() => deleteRecipe(index, recipeIndex)}
                  className="days-btn-dtl-rsp"
                >
                  Delete Recipe
                </button>
              </div>
            ))}
            {/* Select and Add Recipe Button */}
            <div>
              <select
                onChange={(e) => setSelectedRecipe(JSON.parse(e.target.value))}
              >
                <option value="">Select Recipe</option>
                {recipes.map((recipe) => (
                  <option key={recipe.recipeId} value={JSON.stringify(recipe)}>
                    {recipe.recipeName} - Calories: {recipe.totalCalories}
                  </option>
                ))}
              </select>
              <button
                onClick={() => addRecipe(index)}
                className="days-btn-add-rsp"
              >
                Add Recipe
              </button>
            </div>
          </div>
          {/* Delete Day button */}
          <button onClick={() => deleteDay(index)} className="days-btn-dtl">
            Delete Day
          </button>
        </div>
      ))}
    </div>
  );
}
