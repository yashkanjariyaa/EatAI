import DietPlanForm from "../components/FormComponent";
import "./DietPlanForm.css";

const MealPlanner = () => {
  return (
    <div className="diet-meal-planner-container">
      <h1>🥙 Meal Planner 🍝</h1>
      <div>
        <DietPlanForm />
      </div>
    </div>
  );
};

export default MealPlanner;
