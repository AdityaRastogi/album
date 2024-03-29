import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import PhotoItem from './PhotoItem';
import { addFavorite, removeFavorite } from './utils/slices/dashboardSlice';

const Dashboard = () => {
  const favorites = useSelector((state) => state.dashboard.favorites);
  const navigate = useNavigate();

  

  return (
    <div className='dashboard-container'>
        <div className='header'>
        <h1>Dashboard</h1>
        <button onClick={()=>navigate("/list")}>Go to list</button>
        </div>
      
        <h2 className='title'>Favorites</h2>
      <div className='photo-list'>
      
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