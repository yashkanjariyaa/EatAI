import React, { useEffect, useState } from "react";
import axios from "axios";
import "./updatedish.css";

interface UpdateDishProps {
  isOpen: boolean;
  onClose: () => void;
  dishName: string;
  onSubmit: (message: string) => void;
}

const UpdateDish: React.FC<UpdateDishProps> = ({
  isOpen,
  onClose,
  dishName,
  onSubmit,
}) => {
  const [message, setMessage] = useState("");
  const [dietPlan, setDietPlan] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false); // State to manage loading

  useEffect(() => {
    if (isOpen) {
      const savedDietPlan = localStorage.getItem("dietPlan");
      if (savedDietPlan) {
        setDietPlan(JSON.parse(savedDietPlan));
      }
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (dietPlan) {
      const payload = {
        dish_to_update: dishName,
        diet_plan: dietPlan,
        update_message: message,
      };

      setIsLoading(true); // Set loading to true before the request

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_BASE_URL}/update_diet_plan`,
          payload
        );
        localStorage.setItem("dietPlan", JSON.stringify(response.data));
        onSubmit(message);
        setMessage("");
        onClose();
      } catch (error) {
        console.error("Failed to update diet plan:", error);
      } finally {
        setIsLoading(false);
        window.location.reload();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {isLoading ? (
          <div className="loading-modal">
            <div className="loading-content">
              <div className="spinner"></div>
              <p>EatAI is cooking...</p>
            </div>
          </div>
        ) : (
          <>
            <h2>Update Dish: {dishName}</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Add your notes here..."
                required
              />
              <div className="modal-actions">
                <button type="submit">Submit</button>
                <button type="button" onClick={onClose}>
                  Close
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default UpdateDish;
