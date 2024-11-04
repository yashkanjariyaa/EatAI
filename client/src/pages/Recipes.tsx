import "./recipe.css";
import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import NutrientInfoModal from "../modal/IngredientInfo";
import LoadingModal from "../modal/LoadingModal";
import axios from "axios";

const Recipes = () => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [ingredientInfo, setIngredientInfo] = useState<{
    [key: string]: IngredientInfo | null;
  }>({});
  const [modalData, setModalData] = useState<IngredientInfo | null>(null);
  const [loading, setLoading] = useState(false); // Loading state

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setRecipe(
      localStorage.getItem("recipe")
        ? JSON.parse(localStorage.getItem("recipe")!)
        : null
    );
  }, []);

  const fetchIngredientInfo = async (ingredientName: string) => {
    if (!ingredientInfo[ingredientName]) {
      setLoading(true);
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_SERVER_BASE_URL
          }/get-ingredient-info?ingredient_name=${ingredientName}`
        );
        const data = response.data;
        setIngredientInfo((prev) => ({ ...prev, [ingredientName]: data }));
        setModalData(data);
      } catch (error) {
        console.error("Error fetching ingredient info:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setModalData(ingredientInfo[ingredientName]);
    }
  };

  const closeModal = () => {
    setModalData(null); // Close modal by clearing modal data
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      closeModal();
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      closeModal();
    }
  };

  const fetchRecipe = async (item: string) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_SERVER_BASE_URL
        }/get-recipe?dish_name=${encodeURIComponent(item)}`
      );
      localStorage.setItem("recipe", JSON.stringify(response.data));
      setRecipe(response.data);
    } catch (error) {
      console.error("Failed to fetch recipe:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRecommendationClick = (dishName: string) => {
    fetchRecipe(dishName);
  };

  useEffect(() => {
    if (modalData) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalData]);

  return (
    <div className="recipe-container">
      {loading && <LoadingModal />}
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
            <div
              className="recommendation"
              onClick={() => handleRecommendationClick("Falafel Bowl")}
            >
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
            <div
              className="recommendation"
              onClick={() => handleRecommendationClick("Grilled Cheese")}
            >
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

      {modalData && (
        <NutrientInfoModal
          ref={modalRef}
          data={modalData}
          onClose={closeModal}
          isOpen={!!modalData}
        />
      )}
    </div>
  );
};

export default Recipes;
