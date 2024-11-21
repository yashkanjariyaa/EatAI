# EatAI: Diet and Health Aide for Better Living

EatAI is an AI-driven application designed to assist users in making healthier dietary choices and achieving wellness goals. By leveraging user data, EatAI offers personalized recommendations that support a balanced and healthy lifestyle.

## Project Structure

- **client/**: Frontend application built with Vite and React.
- **server/**: Backend application using Flask with Gunicorn for production deployment.

---

## Repository

[EatAI GitHub Repository](https://github.com/yashkanjariyaa/EatAI.git)

---

## Setup Guide

### Prerequisites

- **Client**: Node.js and npm
- **Server**: Python 3.8+, pip, and Gunicorn for production server setup
- **Deployment**: Render.com account

---

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yashkanjariyaa/EatAI.git
   cd EatAI
   ```

2. **Install Client Dependencies**

   ```bash
   cd client
   npm install
   ```

3. **Install Server Dependencies**

   ```bash
   cd ../server
   pip install -r requirements.txt
   ```

---

## Environment Configuration

### Client `.env` File

Create a `.env` file inside the `client` directory with the following:

```env
VITE_SERVER_BASE_URL=SERVER_URL
```

This variable points to the backend server API, enabling the frontend to communicate with the server or you can use this deployed URL - https://eatai.onrender.com

### Server `.env` File

Create a `.env` file inside the `server` directory with:

```env
GOOGLE_API_KEY=YOUR_API_KEY
```

This API key is necessary for integrating Google services within the server application.

---

## Running the Application

1. **Start the Server**

   Navigate to the `server` directory and start the Flask server with Gunicorn:

   ```bash
   cd server
   gunicorn --config gunicorn_config.py app:app
   ```

2. **Start the Client**

   In a new terminal, navigate to the `client` directory and run the development server:

   ```bash
   cd client
   npm run dev
   ```

---

## Deployment

### Server Deployment on Render

1. Set up your project on Render and specify the server root as `server`.
2. Configure Gunicorn to use the command:

   ```bash
   gunicorn --config gunicorn_config.py app:app
   ```

3. Add environment variables in Render's settings based on your `.env` file.

### Client Deployment on Render

1. Set up the client project on Render.
2. Configure the `VITE_SERVER_BASE_URL` environment variable in Render’s settings to point to the deployed backend URL.

---

## Features

- AI-powered diet recommendations based on user inputs
- Goal tracking to help users monitor and achieve their health objectives
- Integration with Google services for enhanced features and insights

---

## Tech Stack

- **Frontend**: Vite + React
- **Backend**: Flask with Gunicorn
- **Deployment**: Render.com

---

## License

This project is open-source under the MIT License.
