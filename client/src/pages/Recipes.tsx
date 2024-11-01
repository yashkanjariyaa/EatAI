import "./recipe.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";

interface Ingredient {
  name: string;
  quantity: string;
}

interface Recipe {
  name: string;
  calories: string;
  cook_time: string;
  prep_time: string;
  total_time: string;
  servings: string;
  ingredients: Ingredient[];
  instructions: string[];
}

const Recipes = () => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const savedRecipe = localStorage.getItem("recipe");
    if (savedRecipe) {
      setRecipe(JSON.parse(savedRecipe));
    }
  }, []);

  return (
    <div className="recipe-container">
      <h1>Recipes</h1>
      {recipe ? (
        <div className="recipe-details">
          <div className="title">
            {recipe.name} <FontAwesomeIcon icon={faUtensils} />
          </div>
          <div className="description">
            <div className="points">
              <div className="time">Prep Time: {recipe.prep_time}</div>
              <div className="time">Cook Time: {recipe.cook_time}</div>
              <div className="time">Total Time: {recipe.total_time}</div>
              <div className="calories">Calories: {recipe.calories}</div>
              <div className="servings">Servings: {recipe.servings}</div>
            </div>
            <div className="bottom">
              <div className="ingredients-container">
                <h3>Ingredients</h3>
                <ul className="ingredients">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>
                      {ingredient.quantity} - {ingredient.name}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="instructions-container">
                <h3>Instructions</h3>
                <ol className="instructions">
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="recommendations-container">
          <div className="title">Recommendations based on your Queries ✨</div>
          <div className="recommendations">
            <div className="recommendation">
              <div className="title">
                Falafel Bowl <FontAwesomeIcon icon={faUtensils} />
              </div>
              <div className="description">
                <div className="points">
                  <div className="time">Time: 30 mins</div>
                  <div className="calories">Calories: 400</div>
                </div>
                <div className="info">
                  High in Protein and Fiber, great dish for lunch!
                </div>
              </div>
            </div>
            <div className="recommendation">
              <div className="title">
                Grilled Cheese <FontAwesomeIcon icon={faUtensils} />
              </div>
              <div className="description">
                <div className="points">
                  <div className="time">Time: 20 mins</div>
                  <div className="calories">Calories: 450</div>
                </div>
                <div className="info">
                  Easy to make, great for breakfast or an evening snack!
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recipes;
