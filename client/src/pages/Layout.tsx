import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./layout.css";
import ClearButton from "../components/buttons/ClearData";

const Layout: React.FC = () => {
  const location = useLocation();
  const isRootRoute = location.pathname === "/";

  return (
    <div className="layout-container">
      {!isRootRoute && (
        <div className="sidebar">
          <div className="upper-container">
            {" "}
            <div className="links">
              <Link className="sidebar-link" to="/recipes">
                Recipes
              </Link>
              <Link className="sidebar-link" to="/planner">
                Meal Planner
              </Link>
              <Link className="sidebar-link" to="/chat">
                Chat
              </Link>
            </div>
            <div className="previous">
              <div className="recipes">
                <div className="title">Recipes</div>
                <div className="items">
                  <div className="item">Panner Tikka 🍲</div>
                  <div className="item">Soyawadi Sabji 🥗</div>
                  <div className="item">Tomato Soup and Grilled Cheese 🍞</div>
                </div>
              </div>
              <div className="diets">
                <div className="title">Diets</div>
                <div className="items">
                  <div className="item">High Protien Diet 🍗</div>
                  <div className="item">Calorie Deficiet Vegan Diet 🥙</div>
                  <div className="item">Vegetarian Diet 🥗</div>
                </div>
              </div>
            </div>
          </div>
          <div className="button-container">
            <ClearButton />
          </div>
        </div>
      )}

      <div className="content-container">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
