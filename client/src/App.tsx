import React, { Suspense } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Home = React.lazy(() => import("./pages/Home"));
const Layout = React.lazy(() => import("./pages/Layout"));
const DietPlanForm = React.lazy(() => import("./pages/DietPlanForm"));
const Recipes = React.lazy(() => import("./pages/Recipes"));
const Chat = React.lazy(() => import("./pages/Chat"));

function App() {
  return (
    <div>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="planner" element={<DietPlanForm />} />
              <Route path="recipes" element={<Recipes />} />
              <Route path="chat" element={<Chat />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
