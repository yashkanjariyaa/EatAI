import { forwardRef, useEffect } from "react";
import "./ingredientInfo.css";

interface NutrientInfoModalProps {
  data: IngredientInfo;
  onClose: () => void;
  isOpen: boolean;
}

const NutrientInfoModal = forwardRef<HTMLDivElement, NutrientInfoModalProps>(
  function NutrientInfoModal({ data, onClose, isOpen }, ref) {
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          onClose();
        }
      };

      if (isOpen) {
        document.addEventListener("keydown", handleKeyDown);
      } else {
        document.removeEventListener("keydown", handleKeyDown);
      }

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
      <div className="modal-overlay" role="dialog" aria-modal="true">
        <div className="modal" ref={ref} tabIndex={-1}>
          <button
            className="close-button"
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
          <h2>{data.name}</h2>
          <p>
            <strong>Availability:</strong> {data.availability}
          </p>
          <p>
            <strong>Calories:</strong> {data.calories}
          </p>

          <h3>Dietary Restrictions</h3>
          <ul>
            {data.dietary_restrictions.map((restriction, index) => (
              <li key={index}>{restriction}</li>
            ))}
          </ul>

          <h3>Health Benefits</h3>
          <ul>
            {data.health_benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>

          <h3>Macronutrients</h3>
          <ul>
            <li>
              <strong>Carbohydrates:</strong> {data.macronutrients.carbs}
            </li>
            <li>
              <strong>Fats:</strong> {data.macronutrients.fats}
            </li>
            <li>
              <strong>Proteins:</strong> {data.macronutrients.proteins}
            </li>
          </ul>

          <h3>Micronutrients</h3>
          <ul>
            {data.micronutrients.map((micronutrient, index) => (
              <li key={index}>
                <strong>{micronutrient.name}:</strong> {micronutrient.amount}
              </li>
            ))}
          </ul>

          <h3>Suitable for Diets</h3>
          <ul>
            {data.suitable_for_diets.map((diet, index) => (
              <li key={index}>{diet}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
);

export default NutrientInfoModal;
