import React, { useState ,useEffect} from 'react';
import { useNavigate   } from 'react-router-dom';

export default function MealPlanning() {
  const [mealPlan, setMealPlan] = useState([]);
  const navigate=useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    console.log(userId);
    if (!userId) {
      navigate("/login");
    }
  }, [navigate]);

  const handleAddMeal = () => {
  const newMeal = 'Spaghetti Carbonara';
    setMealPlan([...mealPlan, newMeal]);
  };

  const handleRemoveMeal = (index) => {
    const updatedMealPlan = [...mealPlan];
    updatedMealPlan.splice(index, 1);
    setMealPlan(updatedMealPlan);
  };


  return (
    <div className="meal-planning-container">
      <h2>Meal Planning</h2>
      <div className="add-meal-form">
        <select>
          <option>Select a Meal...</option>
          <option>Spaghetti Carbonara</option>
          <option>Chicken Parmesan</option>
          <option>Chocolate Cake</option>
        </select>
        <button onClick={handleAddMeal}>Add Meal</button>
      </div>
      <div className="meal-plan">
        <h3>Meal Plan</h3>
        <ul>
          {mealPlan.map((meal, index) => (
            <li key={index}>
              {meal}
              <button onClick={() => handleRemoveMeal(index)}>Remove</button>
            </li>
          ))}
        </ul>
        {mealPlan.length === 0 && <p>No meals planned yet.</p>}
      </div>
    </div>
  );
}