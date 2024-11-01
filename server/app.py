import os
import json 
from flask import Flask, jsonify, request
from flask_cors import CORS 
from langchain_google_genai import ChatGoogleGenerativeAI, HarmBlockThreshold, HarmCategory

os.environ["GOOGLE_API_KEY"] = "AIzaSyCLVFGlzlD38y9oiMSlKCm1hUuA-Ln_RT8"

app = Flask(__name__)
CORS(app)

llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-flash",
    temperature=0,
    max_tokens=None,
    timeout=None,
    max_retries=2,
    safety_settings={
        HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_NONE,
    },
)

@app.route('/diet_plan', methods=['GET'])
def get_diet_plan():
    # Extract parameters
    name = request.args.get('name', type=str)
    age = request.args.get('age', type=int)
    gender = request.args.get('gender', type=str)
    health_goals = request.args.get('health_goals', default='muscle gain', type=str)
    medical_history = request.args.getlist('medical_history', type=str)  
    weight = request.args.get('weight', default=70, type=float)
    height = request.args.get('height', default=175, type=float)
    body_fat_percentage = request.args.get('body_fat_percentage', default=None, type=float)
    activity_level = request.args.get('activity_level', default='lightly active', type=str)
    dietary_preferences = request.args.getlist('dietary_preferences', type=str) 
    meal_frequency = request.args.get('meal_frequency', default=3, type=int)
    budget = request.args.get('budget', default='low', type=str)
    hydration = request.args.get('hydration', default=2, type=float)
    supplements = request.args.getlist('supplements', type=str)
    meal_timing = request.args.get('meal_timing', default='flexible', type=str)
    additional_notes = request.args.get('additional_notes', default='I need a tasty diet.', type=str)
    allergies = request.args.getlist('allergies', type=str)

    # Construct request string
    request_string = (
        f"My name is {name}, a {age}-year-old {gender}. My health goal is {health_goals}. "
        f"I have a medical history of {', '.join(medical_history) if medical_history else 'no specific conditions'}. "
        f"My current weight is {weight} kg, height is {height} cm, and body fat percentage is "
        f"{body_fat_percentage if body_fat_percentage else "not specified."}%." 
        f"My activity level is {activity_level}, and I follow a {dietary_preferences} diet. "
        f"I prefer {meal_frequency} meals a day and have a {budget} budget. I drink about {hydration} L of water daily, "
        f"and I currently take supplements: {', '.join(supplements) if supplements else 'none'}. "
        f"My preferred meal timing is {meal_timing}. Additional notes: {additional_notes}."
        f"I have allergies to {', '.join(allergies) if allergies else 'none'}." if allergies else "not specified."
    )

    # Dynamically create meal sections based on meal frequency
    meal_sections = ""
    for i in range(meal_frequency):
        meal_name = "Breakfast" if i == 0 else "Lunch" if i == 1 else "Dinner" if i == 2 else f"Meal {i+1}"
        meal_sections += (
            f"Meal {{\n"
            f"    name: \"{meal_name}\",\n"
            f"    items: [\"item1\", \"item2\", ...],\n"
            f"    calories: _\n"
            f"}},\n"
        )

    # Prompt with dynamic meal sections
    message = f"""You are a Diet Assist AI that helps users create an Indian diet plan according to the user's information
    
    User's Information : {request_string}
    
    Return the diet plan in a structured format as defined below, include no additional data or information:

    DailyDietPlan {{
        meals: [
            {meal_sections}
        ],
        total_calories: (sum of calories of all meals),
    }}

    """

    # Invoke AI model
    ai_msg = llm.invoke(message)
    
    try:
        # Return the response from AI in JSON format
        return jsonify(json.loads(ai_msg.content[7:-3].strip()))
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
