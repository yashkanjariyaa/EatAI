import "./home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareArrowUpRight,
  faBowlFood,
  faUtensils,
  faFishFins,
  faCarrot,
  faMugHot,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="left-container">
        <div className="info">
          Introducing a diet and recipe recommendation AI web app powered by
          Gemini! This app personalizes meal plans and suggests recipes based on
          users' health goals, dietary preferences, and ingredient availability,
          ensuring delicious and nutritious choices tailored to individual
          needs.
          <div className="icons">
            <FontAwesomeIcon icon={faBowlFood} />
            <FontAwesomeIcon icon={faUtensils} />
            <FontAwesomeIcon icon={faFishFins} />
            <FontAwesomeIcon icon={faMugHot} />
            <FontAwesomeIcon icon={faCarrot} />
          </div>
        </div>
        <div className="credits">
          <p>
            Made with ❤️ by{" "}
            <a
              href="https://github.com/yashkanjariyaa"
              target="_blank"
              rel="noopener noreferrer"
            >
              Yash Kanjariya
            </a>{" "}
          </p>
        </div>
      </div>
      <div className="right-container">
        <div className="cta">
          <button onClick={() => navigate("/planner")}>
            Meal Planner
          </button>
          <button onClick={() => navigate("/recipes")}>Recipes</button>
        </div>
        <div className="bottom">
          <div className="content">
            <h1>
              {" "}
              <img src="./logo.png" alt="logo" />
              EatAI{" "}
            </h1>
            <div className="description">
              <p className="primary-description gradient-text">
                Dieting is less stressing with AI
              </p>
              <p className="secondary-description">
                Your AI-powered diet and meal planner. Get personalized meal
                suggestions, nutritional insights, and more to help you stay on
                track with your health goals!
              </p>
            </div>
          </div>
          <div className="keywords">
            <div>Gen AI</div>
            <div>Dieting</div>
            <div>Health</div>
            <div>Meal Planner</div>
            <div>Fitness</div>
          </div>
          <div className="input-container">
            <input
              type="text"
              placeholder="Enter your diet-related query..."
              className="input-prompt"
            />
            <FontAwesomeIcon icon={faSquareArrowUpRight} className="icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
