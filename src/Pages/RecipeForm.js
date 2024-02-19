import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import IngredientService from '../Service/IngredientService';
import { useNavigate,Navigate } from 'react-router-dom';
import RecipeService from '../Service/RecipeService';
import "../";
import UserService from '../Service/UserService';

export default function AddRecipe() {
  const [recipeName, setRecipeName] = useState('');
  const [instructions, setInstructions] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [totalCalories, setTotalCalories] = useState('');
  const [recipeType, setRecipeType] = useState('');
  const [recipeDescription, setRecipeDescription] = useState('');
  const [recipeImage, setRecipeImage] = useState(null);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [allIngredients, setAllIngredients] = useState([]);
  const [loggedIn, setLoggedIn] = useState(true);
  const navigate = useNavigate();
  const [isadmin, setisadmin] = useState(false);
  const [newIngredient, setNewIngredient] = useState({
    ingredientName: '',
    ingredientType: '',
    ingredientDescription: '',
    calorieCount: ''
  });
  const [showAddIngredientForm, setShowAddIngredientForm] = useState(false);
  const userId=localStorage.getItem('userId');

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
        if (userData.role === "admin") {
          setisadmin(true);
          return;
        }
        const ingredientsResponse = await IngredientService.getAllDistinctIngredients();
        setAllIngredients(ingredientsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  
  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (isadmin) {
    return <Navigate to="/adminDashboard" replace />;
  }

  const addIngredient = () => {
    setSelectedIngredients([...selectedIngredients, newIngredient]);
    setNewIngredient({
      ingredientName: '',
      ingredientType: '',
      ingredientDescription: '',
      calorieCount: ''
    });
  };

  const handleAddRecipe = async () => {
    try {
      if (
        !recipeName ||
        !instructions ||
        !cookTime ||
        !totalCalories ||
        !recipeType ||
        !recipeDescription ||
        !recipeImage ||
        selectedIngredients.length === 0
      ) {
        alert('Please fill in all the fields');
        return;
      }
      const newRecipe = {
        recipeName: recipeName,
        instructions: instructions,
        cookTime: cookTime,
        totalCalories: totalCalories,
        recipeType: recipeType,
        recipeDescription: recipeDescription,
        recipeImage: recipeImage,
      };
      const userId=localStorage.getItem('userId');
      const addedRecipeResponse = await RecipeService.addRecipe(newRecipe, userId);
      const addedRecipeId = parseInt(addedRecipeResponse.data.recipeId);

      const addedIngredientsResponse = await Promise.all(
        selectedIngredients.map(async (ingredient) => {
          return await IngredientService.addIngredient(ingredient, addedRecipeId);
        })
       
      );

      navigate("/userdashboard");
      
    } catch (error) {
      console.error('Error adding recipe and ingredients:', error);
    }
    navigate("/userrecipes");
  };

  const handleIngredientChange = (e) => {
    const { name, value } = e.target;
    setNewIngredient({ ...newIngredient, [name]: value });
  };

  const handleImageChange = (e) => {
    setRecipeImage(e.target.files[0]);
  };

  return (
    <div className="container">
      <h2>Post a New Recipe</h2>
      <form>
        <div className="form-group">
          <label htmlFor="recipeName">Recipe Name</label>
          <input
            type="text"
            className="form-control"
            id="recipeName"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="instructions">Instructions</label>
          <textarea
            className="form-control"
            id="instructions"
            rows="3"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="cookTime">Cook Time</label>
          <input
            type="text"
            className="form-control"
            id="cookTime"
            value={cookTime}
            onChange={(e) => setCookTime(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="totalCalories">Total Calories</label>
          <input
            type="number"
            className="form-control"
            id="totalCalories"
            value={totalCalories}
            onChange={(e) => setTotalCalories(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="recipeType">Recipe Type</label>
          <select
            className="form-control"
            id="recipeType"
            value={recipeType}
            onChange={(e) => setRecipeType(e.target.value)}
            required
          >
            <option value="">Select Recipe Type</option>
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="recipeDescription">Recipe Description</label>
          <textarea
            className="form-control"
            id="recipeDescription"
            rows="3"
            value={recipeDescription}
            onChange={(e) => setRecipeDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="recipeImage">Recipe Image</label>
          <input
            type="file"
            className="form-control-file"
            id="recipeImage"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Selected Ingredients</label>
          <ul>
            {selectedIngredients.map((ingredient, index) => (
              <li key={index}>
                {ingredient.ingredientName} - {ingredient.ingredientType} -{' '}
                {ingredient.ingredientDescription} - {ingredient.calorieCount}
              </li>
            ))}
          </ul>
        </div>
        <div className="form-group">
          <label htmlFor="existingIngredients">Select Ingredient</label>
          <select
            className="form-control"
            id="existingIngredients"
            onChange={(e) =>
              setSelectedIngredients([
                ...selectedIngredients,
                allIngredients.find((ingredient) => ingredient.ingredientName === e.target.value)
              ])
            }
          >
            <option value="">Select Ingredient</option>
            {allIngredients.map((ingredient) => (
              <option key={ingredient.ingredientId} value={ingredient.ingredientName}>
                {ingredient.ingredientName}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setShowAddIngredientForm(true)}
        >
          Add Ingredient Manually
        </button>
        {showAddIngredientForm && (
          <div>
            <div className="form-group">
              <label htmlFor="ingredientName">Ingredient Name</label>
              <input
                type="text"
                className="form-control"
                id="ingredientName"
                name="ingredientName"
                value={newIngredient.ingredientName}
                onChange={handleIngredientChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="ingredientType">Ingredient Type</label>
              <select
                className="form-control"
                id="ingredientType"
                name="ingredientType"
                value={newIngredient.ingredientType}
                onChange={handleIngredientChange}
                required
              >
                <option value="">Select Ingredient Type</option>
                <option value="Veg">Veg</option>
                <option value="Non-Veg">Non Veg</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="ingredientDescription">Ingredient Description</label>
              <textarea
                className="form-control"
                id="ingredientDescription"
                rows="3"
                name="ingredientDescription"
                value={newIngredient.ingredientDescription}
                onChange={handleIngredientChange}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="calorieCount">Calorie Count</label>
              <input
                type="number"
                className="form-control"
                id="calorieCount"
                name="calorieCount"
                value={newIngredient.calorieCount}
                onChange={handleIngredientChange}
                required
              />
            </div>
            <button
              type="button"
              className="btn btn-secondary mr-2"
              onClick={() => setShowAddIngredientForm(false)}
            >
              Cancel
            </button>
            <button type="button" className="btn btn-primary" onClick={addIngredient}>
              Add Ingredient
            </button>
          </div>
        )}
        <br></br>
        <br></br>
        <button
          type="button"
          className="add-btn"
          onClick={handleAddRecipe}
        >
          Add Recipe
        </button>
        <br></br>
        <br></br>
        <Link to="/userrecipes" >
          <button className='cancel-btn'>Cancel</button>
        </Link>
      </form>
    </div>
  );
}
