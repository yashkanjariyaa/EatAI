/// <reference types="vite/client" />

interface IngredientInfo {
  availability: string;
  calories: string;
  dietary_restrictions: string[];
  health_benefits: string[];
  macronutrients: {
    carbs: string;
    fats: string;
    proteins: string;
  };
  micronutrients: { name: string; amount: string }[];
  suitable_for_diets: string[];
}

interface Recipe {
  name: string;
  prep_time: string;
  cook_time: string;
  total_time: string;
  calories: string;
  servings: string;
  ingredients: Ingredient[];
  instructions: string[];
}
