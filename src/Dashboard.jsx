import React from "react";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import PhotoItem from "./PhotoItem";
import { Constants } from "./utils/appConstants";

const Dashboard = () => {
  const favorites = useSelector((state) => state.dashboard.favorites);
  const navigate = useNavigate();

  return (
    <div data-testid="dashboard" className="dashboard-container">
      <div className="header">
        <h1 data-testid="dashboard-heading">{Constants.dashboardPage.title}</h1>
        <button
          data-testid="dashboard-go-to-list-button"
          onClick={() => navigate("/list")}
        >
          {Constants.buttons.goToList}
        </button>
      </div>

      <h2 data-testid="dashboard-sub-heading-favorites" className="title">
        {Constants.dashboardPage.subHeading}
      </h2>
      <div data-testid="dashboard-photo-list" className="photo-list">
        {favorites.map((photo) => (
          <div className="item" key={photo?.id}>
            <PhotoItem photo={photo} isDashboard={true} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
