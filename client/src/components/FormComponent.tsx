import React, { useState } from "react";
import axios from "axios";
import "./DietPlanForm.css";
import LoadingModal from "../modal/LoadingModal";

const questions = [
  {
    label: "What shall I call you?",
    name: "name",
    type: "text",
    placeholder: "Full name",
  },
  {
    label: "How young are you?",
    name: "age",
    type: "number",
    placeholder: "Age in years",
  },
  {
    label: "How do you identify? (Medical reason only)",
    name: "gender",
    type: "select",
    placeholder: "Select",
    options: ["Male", "Female", "Other", "Prefer not to say"],
  },
  {
    label: "What's your dream health goal?",
    name: "health_goals",
    type: "select",
    placeholder: "Select",
    options: [
      "muscle gain",
      "lose weight",
      "tone up",
      "general fitness",
      "other",
    ],
  },
  {
    label: "Got any specific medical history?",
    name: "medical_history",
    type: "text",
    placeholder: "List of medical conditions",
  },
  {
    label: "How much do you weigh?",
    name: "weight",
    type: "number",
    placeholder: "Weight in kg",
  },
  {
    label: "How tall are you?",
    name: "height",
    type: "number",
    placeholder: "Height in cm",
  },
  {
    label: "What's your body fat percentage?",
    name: "body_fat_percentage",
    type: "number",
    placeholder: "Body fat %",
  },
  {
    label: "How active are you daily?",
    name: "activity_level",
    type: "select",
    placeholder: "Select",
    options: [
      "Sedentary",
      "Lightly active",
      "Moderately active",
      "Very active",
      "Extremely active",
    ],
  },
  {
    label: "Any dietary preferences?",
    name: "dietary_preferences",
    type: "select",
    placeholder: "Select",
    options: [
      "Vegan",
      "Vegetarian",
      "Pescatarian",
      "Keto",
      "No preference",
      "Other",
    ],
  },
  {
    label: "How many meals do you have in a day?",
    name: "meal_frequency",
    type: "number",
    placeholder: "Number of meals",
  },
  {
    label: "What’s your budget?",
    name: "budget",
    type: "select",
    placeholder: "Select",
    options: ["Low", "Medium", "High"],
  },
  {
    label: "How much water do you drink daily?",
    name: "hydration",
    type: "number",
    placeholder: "Water intake in liters",
  },
  {
    label: "Any medications or supplements you’re taking?",
    name: "supplements",
    type: "text",
    placeholder: "List of supplements",
  },
  {
    label: "What’s your meal timing preference?",
    name: "meal_timing",
    type: "select",
    placeholder: "Select",
    options: ["Flexible", "Fixed"],
  },
  {
    label: "Any allergies? (So we know what to avoid!)",
    name: "allergies",
    type: "text",
    placeholder: "List of allergies",
  },
  {
    label: "Additional comments or requests?",
    name: "additional_notes",
    type: "text",
    placeholder: "Anything else?",
  },
];

interface DietPlanFormProps {
  refresh: () => void;
}

const DietPlanForm: React.FC<DietPlanFormProps> = () => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as
      | HTMLInputElement
      | HTMLSelectElement;
    const selectedOptions = (e.target as HTMLSelectElement).selectedOptions;

    if (type === "select-multiple") {
      const values = Array.from(selectedOptions).map((option) => option.value);
      setFormData({
        ...formData,
        [name]: values,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleNext = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:5000/diet_plan", {
        params: formData,
      });
      console.log(response.data);
      localStorage.setItem("dietPlan", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching diet plan:", error);
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <form className="diet-plan-form" onSubmit={handleSubmit}>
        {loading && <LoadingModal />}
        <div className="form-group">
          <label>{currentQuestion.label}</label>
          {currentQuestion.type === "select" ? (
            <select
              name={currentQuestion.name}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              {currentQuestion.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={currentQuestion.type}
              name={currentQuestion.name}
              placeholder={currentQuestion.placeholder}
              value={formData[currentQuestion.name] || ""}
              onChange={handleChange}
              required
            />
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="form-navigation">
          {currentQuestionIndex > 0 && (
            <button
              type="button"
              onClick={handlePrevious}
              className="prev-button"
            >
              Previous
            </button>
          )}
          {currentQuestionIndex < questions.length - 1 ? (
            <button type="button" onClick={handleNext} className="next-button">
              Next
            </button>
          ) : (
            <button type="submit" className="submit-button">
              Submit
            </button>
          )}
        </div>

        {/* Progress Indicator */}
        <div className="progress-indicator">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
      </form>
    </div>
  );
};

export default DietPlanForm;
