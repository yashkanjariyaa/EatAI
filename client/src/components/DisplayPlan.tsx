import "./DisplayPlan.css";
import React, { useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";

interface Meal {
  name: string;
  items: string[];
  calories: number;
}

interface DietPlanProps {
  meals: Meal[];
  total_calories: number;
}

const DietPlan: React.FC = () => {
  const [dietPlan, setDietPlan] = useState<DietPlanProps | null>(null);
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedDietPlan = localStorage.getItem("dietPlan");
    console.log("Diet Plan from localStorage:", savedDietPlan);
    if (savedDietPlan) {
      const parsedPlan = JSON.parse(savedDietPlan);

      const formattedPlan: DietPlanProps = {
        total_calories: Number(parsedPlan.total_calories),
        meals: parsedPlan.meals.map((meal: any) => ({
          name: meal.name,
          items: meal.dishes,
          calories: meal.calories,
        })),
      };

      setDietPlan(formattedPlan);
    }
  }, []);

  const handleDownloadPDF = () => {
    if (componentRef.current) {
      html2canvas(componentRef.current).then((canvas) => {
        const pdf = new jsPDF();
        const imgData = canvas.toDataURL("image/png");
        const imgWidth = 190;
        const pageHeight = pdf.internal.pageSize.height;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;

        let position = 0;

        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save("diet-plan.pdf");
      });
    }
  };

  const fetchRecipe = async (item: string) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/get-recipe?dish_name=${encodeURIComponent(item)}`
      );
      localStorage.setItem("recipe", JSON.stringify(response.data));
      window.location.href = "/recipes";
    } catch (error) {
      console.error("Failed to fetch recipe:", error);
    }
  };

  if (!dietPlan || !dietPlan.meals) {
    return <div>No diet plan available.</div>;
  }

  return (
    <div className="diet-plan-container">
      <div className="diet-plan" ref={componentRef}>
        <h2>Daily Diet Plan</h2>
        <div className="total-calories">
          <strong>Total Calories: </strong>
          {dietPlan.total_calories}
        </div>
        <div className="meals">
          {dietPlan.meals.map((meal, index) => (
            <div key={index} className="meal">
              <h3>{meal.name}</h3>
              <div className="meal-calories">
                <strong>Calories:</strong> {meal.calories}
              </div>
              <div className="meal-items">
                <strong>Items:</strong>
                <ul>
                  {meal.items.map((item, i) => (
                    <li key={i} className="meal-item">
                      <span
                        onClick={() => fetchRecipe(item)}
                        className="fetch-recipe-link"
                        style={{
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button onClick={handleDownloadPDF}>Download PDF</button>
    </div>
  );
};

export default DietPlan;
