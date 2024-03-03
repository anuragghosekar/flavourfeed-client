import React, { useState, useEffect } from 'react';
import { useParams, Navigate ,useNavigate} from 'react-router-dom';
import RecipeService from '../../Service/RecipeService';
import UserService from '../../Service/UserService';
import LogNavbar from './LogNavbar';
import "../../Style/User/EditRecipe.css";

export default function EditRecipe() {
        const { id } = useParams();
        const [loggedIn, setLoggedIn] = useState(true);
        const [isadmin, setisadmin] = useState(false);
        const [formDetails, setFormDetails] = useState({
          recipeId: "",
          recipeName: "",
          instructions: "",
          cookTime: "",
          totalCalories: "",
          recipeType: "",
          recipeDescription: "",
          recipeIngredients:[],
          recipe_image: null,
        });

        const navigate = useNavigate();
       

        useEffect(() => {
          const fetchData = async () => {
            const userId = localStorage.getItem('userId');
            if (!userId) {
              setLoggedIn(false);
              return;
            }
      
            try {
              const userResponse = await UserService.getUserById(userId);
              const userData = userResponse.data;
              if (userData.role === "admin") {
                setisadmin(true);
                return;
              }
      
              const response = await RecipeService.getRecipeById(id);
              const recipe = response.data;
              const ingredientsResponse = await RecipeService.getIngredientsByRecipe(id);
              const ingredients = ingredientsResponse.data;
      
              const updatedFormDetails = {
                ...recipe,
                recipeIngredients: ingredients
              };
      
              setFormDetails(updatedFormDetails);
            } catch (error) {
              console.error('Error fetching recipe details:', error);
            }
          };
      
          fetchData();
        }, [id]);

          if (!loggedIn) {
            return <Navigate to="/login" replace />;
          }

          if (isadmin) {
            return <Navigate to="/adminDashboard" replace />;
          }
        
        const updateRecipe = () => {
          if (
            formDetails.recipeId === "" || 
            formDetails.recipeName === "" ||
            formDetails.instructions === "" ||
            formDetails.cookTime === "" ||
            formDetails.totalCalories === "" ||
            formDetails.recipeType === "" ||
            formDetails.recipeDescription === ""
          ) {
            alert("Please fill in all the fields");
            return;
          }
         
          RecipeService.updateRecipe(formDetails)
            .then((result) => {
              setFormDetails({
                recipeId: "",
                recipeName: "",
                instructions: "",
                cookTime: "",
                totalCalories: "",
                recipeType: "",
                recipeDescription: "",
                recipe_image: null,
                recipeIngredients:[]
              });
              navigate("/userrecipes");
            })
            .catch((err) => {
              console.log("Error occurred", err);
            });
        };

        const handleIngredientChange = (index, key, value) => {
          const updatedIngredients = [...formDetails.recipeIngredients];
          updatedIngredients[index][key] = value;
          setFormDetails(prevState => ({
            ...prevState,
            recipeIngredients: updatedIngredients
          }));
        };
        return (
          <>
           <div className="edit-recipe-container">
            <form>
              <div className="form-group">
                <input 
                  type="text" 
                  className="form-control" 
                  id="recipeId" 
                  name="recipeId"
                  value={formDetails.recipeId}
                  readOnly
                  hidden
                />
              </div>
              <div className="form-group">
                <label htmlFor="recipeName">Recipe Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="recipeName" 
                  name="recipeName"
                  value={formDetails.recipeName}
                  onChange={(event) => {
                    setFormDetails({...formDetails, recipeName: event.target.value});
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="instructions">Instructions</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="instructions" 
                  name="instructions"
                  value={formDetails.instructions}
                  onChange={(event) => {
                    setFormDetails({...formDetails, instructions: event.target.value});
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cookTime">Cook Time</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="cookTime" 
                  name="cookTime"
                  value={formDetails.cookTime}
                  onChange={(event) => {
                    setFormDetails({...formDetails, cookTime: event.target.value});
                  }}
                />
              </div>


              <div className="form-group">
                <label htmlFor="totalCalories">Total Calories</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="totalCalories" 
                  name="totalCalories"
                  value={formDetails.totalCalories}
                  onChange={(event) => {
                    setFormDetails({...formDetails, totalCalories: event.target.value});
                  }}
                />
              </div>
              <div className="form-group">
  <label htmlFor="recipeType">Recipe Type</label>
  <select
    className="form-control"
    id="recipeType"
    name="recipeType"
    value={formDetails.recipeType}
    onChange={(event) => {
      setFormDetails({ ...formDetails, recipeType: event.target.value });
    }}
  >
    <option value="">Select Recipe Type</option>
    <option value="Veg">Veg</option>
    <option value="Non-Veg">Non-Veg</option>
  </select>
</div>

<div className="form-group">
            
            <ul>
              {formDetails.recipeIngredients.map((ingredient, index) => (
                <li key={index}>
                  Ingredient Name
                  <input
                    type="text"
                    id= "ingredientName"
                    name='ingredientName'
                    value={ingredient.ingredientName}
                    onChange={(e) => handleIngredientChange(index, 'ingredientName', e.target.value)}
                  />
                  Qnatity
                   <input
                    type="text"
                    id= "qantity"
                    name='quantity'
                    value={ingredient.quantity}
                    onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                  />
                </li>
              ))}
            </ul>
          </div>
      <button 
            type="button" 
            className="btn btn-primary update-recipe-btn" 
            onClick={updateRecipe}
          >
            Update Recipe
          </button>
      </form>
      </div>
      </>
      );
  }






