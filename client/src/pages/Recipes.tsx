import "./recipe.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";

const Recipes = () => {
  return (
    <div className="recipe-container">
      <h1>Recipes</h1>
      <div className="recommendations-container">
        <div className="title">Recommendations based on your Queries ✨</div>
        <div className="recommendations">
          <div className="recommendation">
            <div className="title">
              Falfel Bowl <FontAwesomeIcon icon={faUtensils} />
            </div>
            <div className="description">
              <div className="points">
                <div className="time">Time: 30 mins</div>
                <div className="calories">Calories: 400</div>
              </div>
              <div className="info">
                High in Protient and Fiber, great dish for lunch!
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
                Easy to make, great for breakfast or evening snack!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipes;
