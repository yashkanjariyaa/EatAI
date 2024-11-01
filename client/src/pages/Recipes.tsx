import "./recipe.css";
import { useEffect, useState, useRef } from "react";
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

interface IngredientInfo {
  availability: string;
  calories: string;
  dietary_restrictions: string[];
  health_benefits: string[];
  macronutrients: {
    carbs: string;
    fats: string;
    proteins: string;
  };
  micronutrients: { name: string; amount: string }[];
  suitable_for_diets: string[];
}

const Recipes = () => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [ingredientInfo, setIngredientInfo] = useState<{
    [key: string]: IngredientInfo | null;
  }>({});
  const [visibleInfo, setVisibleInfo] = useState<{ [key: string]: boolean }>(
    {}
  );

  // Reference for detecting clicks outside the dropdown
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedRecipe = localStorage.getItem("recipe");
    if (savedRecipe) {
      setRecipe(JSON.parse(savedRecipe));
    }

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setVisibleInfo({});
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setVisibleInfo({});
      }
    };

    document.addEventListener("keydown", handleEscKey);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchIngredientInfo = async (ingredientName: string) => {
    if (!ingredientInfo[ingredientName]) {
      try {
        const response = await fetch(
          `http://localhost:5000/get-ingredient-info?ingredient_name=${ingredientName}`
        );
        const data = await response.json();
        setIngredientInfo((prev) => ({ ...prev, [ingredientName]: data }));
      } catch (error) {
        console.error("Error fetching ingredient info:", error);
      }
    }
    setVisibleInfo((prev) => ({
      ...prev,
      [ingredientName]: !prev[ingredientName],
    }));
  };

  return (
    <div className={`recipe-container ${Object.values(visibleInfo).includes(true) ? 'dark-background' : ''}`}>
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
                    <li
                      key={index}
                      onClick={() => fetchIngredientInfo(ingredient.name)}
                      className="ingredient-item"
                      style={{
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                    >
                      {ingredient.quantity} - {ingredient.name}
                      {visibleInfo[ingredient.name] &&
                        ingredientInfo[ingredient.name] && (
                          <div
                            className="ingredient-info-dropdown"
                            ref={dropdownRef}
                          >
                            <strong>Availability:</strong>{" "}
                            {ingredientInfo[ingredient.name]?.availability}
                            <br />
                            <strong>Calories:</strong>{" "}
                            {ingredientInfo[ingredient.name]?.calories}
                            <br />
                            <strong>Macronutrients:</strong>
                            <ul>
                              <li>
                                Carbs:{" "}
                                {
                                  ingredientInfo[ingredient.name]
                                    ?.macronutrients.carbs
                                }
                              </li>
                              <li>
                                Fats:{" "}
                                {
                                  ingredientInfo[ingredient.name]
                                    ?.macronutrients.fats
                                }
                              </li>
                              <li>
                                Proteins:{" "}
                                {
                                  ingredientInfo[ingredient.name]
                                    ?.macronutrients.proteins
                                }
                              </li>
                            </ul>
                            <strong>Micronutrients:</strong>
                            <ul>
                              {ingredientInfo[
                                ingredient.name
                              ]?.micronutrients.map((nutrient, idx) => (
                                <li key={idx}>
                                  {nutrient.name}: {nutrient.amount}
                                </li>
                              ))}
                            </ul>
                            <strong>Health Benefits:</strong>
                            <ul>
                              {ingredientInfo[
                                ingredient.name
                              ]?.health_benefits.map((benefit, idx) => (
                                <li key={idx}>{benefit}</li>
                              ))}
                            </ul>
                            <strong>Dietary Restrictions:</strong>{" "}
                            {ingredientInfo[
                              ingredient.name
                            ]?.dietary_restrictions.join(", ")}
                            <br />
                            <strong>Suitable for Diets:</strong>{" "}
                            {ingredientInfo[
                              ingredient.name
                            ]?.suitable_for_diets.join(", ")}
                          </div>
                        )}
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
