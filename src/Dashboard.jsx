import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import PhotoItem from './PhotoItem';
import { addFavorite, removeFavorite } from './utils/slices/dashboardSlice';

const Dashboard = () => {
  const favorites = useSelector((state) => state.dashboard.favorites);
  const dispatch = useDispatch();

  

  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/list">Go to List</Link>
      <h2>Favorites</h2>
      <div className='photo-list'>
        {favorites.map((photo,index) => (
         <div className="item" key={photo.id+index}>
            <PhotoItem photo={photo} isDashboard={true} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;