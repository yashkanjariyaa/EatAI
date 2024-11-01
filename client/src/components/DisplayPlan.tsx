import "./DisplayPlan.css";
import React, { useRef } from "react";
import GoBackButton from "./buttons/GoBack";
import HomeButton from "./buttons/Home";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// Define types for the meal and diet plan structure
interface Meal {
  name: string;
  items: string[];
  calories: number;
}

interface DietPlanProps {
  meals: Meal[];
  total_calories: number;
}

// DietPlan component
const DietPlan: React.FC<{ dietPlan: DietPlanProps }> = ({ dietPlan }) => {
  const componentRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = () => {
    if (componentRef.current) {
      html2canvas(componentRef.current).then((canvas) => {
        const pdf = new jsPDF();
        const imgData = canvas.toDataURL("image/png");
        const imgWidth = 190; // Adjust based on your layout
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

  if (!dietPlan || !dietPlan.meals) {
    return <div>No diet plan available.</div>;
  }

  return (
    <div>
      <GoBackButton />
      <HomeButton />
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
              <div className="meal-items">
                <strong>Items:</strong>
                <ul>
                  {meal.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="meal-calories">
                <strong>Calories:</strong> {meal.calories}
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
