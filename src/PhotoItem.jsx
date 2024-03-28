import React, { useEffect, useState } from 'react';
import {useDispatch,useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from './utils/slices/dashboardSlice';

const PhotoItem = ({ photo,isDashboard }) => {
const [isFavorite, setIsFavorite] = useState(false);
const favorites = useSelector((state) => state.dashboard.favorites);
useEffect(()=>{
    if(favorites){
        if(favorites.find((item)=>item.id == photo.id)) setIsFavorite(true)
    }
},[])
  const dispatch = useDispatch();
  const handleFavoriteFromList = (photo) => {
    if(!isFavorite){
        dispatch(addFavorite(photo))
    } else {
        dispatch(removeFavorite(photo.id))
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="photo-item">
      <img className="photo-image" src={photo.thumbnailUrl} alt={photo.title} />
      <h3>{photo.title}</h3>
      {!isDashboard && <button className='photo-button' onClick={() => handleFavoriteFromList(photo)}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>}
    </div>
  );
};

export default PhotoItem;
