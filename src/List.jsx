import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PhotoItem from './PhotoItem';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import { fetchPhotosFailure, fetchPhotosRequest, fetchPhotosSuccess } from './utils/slices/listSlice';


import api from './utils/api/api';
import { fetchPhotos } from './utils/thunks/listThunks';
import { addFavorite, removeFavorite } from './utils/slices/dashboardSlice';
const List = () => {
  const photos = useSelector((state) => state.list.photos);
  const loading = useSelector((state) => state.list.loading);
  const error = useSelector((state) => state.list.error);
  const dispatch = useDispatch();
  const observerRef = useRef(null);
  const navigate = useNavigate();
 
  const handleLoadMore = () => {
    if (!loading && !error) {
      dispatch(fetchPhotos());
    }
  };

  useEffect(() => {
    dispatch(fetchPhotosRequest());
    const fetchData = async () => {
      try {
        const response = await api.fetchPhotos(1);
        dispatch(fetchPhotosSuccess(response.data));
      } catch (error) {
        dispatch(fetchPhotosFailure(error));
      }
    };
    fetchData();

    const options = {
      root: null,
      rootMargin: '100px 0px 0px 0px',
    };
    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        handleLoadMore();
      }
    }, options);

    observerRef.current.observe(document.querySelector('.list-container .bottom'));

    return () => {
      observerRef.current.disconnect();
    };
  }, [dispatch]);

  const handleBack = () => {
    navigate('/'); // Go back to Dashboard on clicking "Back" button
  };

  

  return (
    <div className="list-container">
      <h1>List</h1>
      <button onClick={handleBack}>Back</button>

      {error && <p>Error fetching photos: {error.message}</p>}
      {loading && <Loader />}
      {!loading && !error && photos.length === 0 && <p>No photos found.</p>}
      {!loading && !error && (
        <div className='photo-list'>
          {photos.map((photo,index) => (
            <div className="item" key={photo.id+index}>
              <PhotoItem photo={photo} />
            </div>
          ))}
        </div>
      )}
      <div className="bottom"></div>
    </div>
  );
};

export default List;
