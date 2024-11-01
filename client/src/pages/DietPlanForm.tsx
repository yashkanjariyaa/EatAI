import DietPlanForm from "../components/FormComponent";
import "./DietPlanForm.css";
import DietPlan from "../components/DisplayPlan";

const MealPlanner = () => {
  console.log("Diet Plan", localStorage.getItem("dietPlan"));
  return (
    <div className="diet-meal-planner-container">
      <h1>🥙 Meal Planner 🍝</h1>
      <div className="components-container">
        {!localStorage.getItem("dietPlan") && <DietPlanForm />}
        {localStorage.getItem("dietPlan") && <DietPlan />}
      </div>
    </div>
  );
};

export default MealPlanner;
