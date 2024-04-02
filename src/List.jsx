import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import PhotoItem from "./PhotoItem";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import {
  fetchPhotosFailure,
  fetchPhotosRequest,
  fetchPhotosSuccess,
  setScrollPosition,
} from "./utils/slices/listSlice";
import InfiniteScroll from "react-infinite-scroll-component";

import api from "./utils/api/api";
import { fetchPhotos } from "./utils/thunks/listThunks";
import { Constants } from "./utils/appConstants";
const List = () => {
  const { photos, loading, error, scrollPosition } = useSelector(
    (state) => state.list,
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Get current location for scroll restoration
  const scrollRef = useRef(null);

  const handleLoadMore = () => {
    if (!loading && !error) {
      dispatch(setScrollPosition(window.scrollY - 400));
      dispatch(fetchPhotos());
    }
  };

  useEffect(() => {
    window.scrollTo(0, scrollPosition);
  });

  useEffect(() => {
    if (location.pathname === "/list") {
      window.scrollTo(0, scrollPosition);
    }

    const fetchData = async () => {
      try {
        dispatch(fetchPhotosRequest());
        const response = await api.fetchPhotos(1);
        const responseJson = await response.json();

        dispatch(fetchPhotosSuccess(responseJson));
      } catch (error) {
        dispatch(fetchPhotosFailure(error));
      }
    };
    if (photos.length === 0) fetchData();

    return () => {};
  }, [dispatch, location]);

  const handleBack = () => {
    // Save scroll position
    dispatch(setScrollPosition(window.scrollY));
    navigate("/"); // Go back to Dashboard on clicking "Back" button
  };

  return (
    <div data-testid="list-page" className="list-container" ref={scrollRef}>
      <div className="header">
        <h1>{Constants.listPage.title}</h1>
        <button data-testid="list-back-button" onClick={handleBack}>
          {Constants.buttons.back}
        </button>
      </div>

      {error && <p>Error fetching photos: {error.message}</p>}
      {loading && <Loader />}
      {!loading && !error && photos.length === 0 && (
        <p>{Constants.listPage.error.noPhotoFound}</p>
      )}
      {!loading && !error && (
        <InfiniteScroll
          dataLength={photos.length} // Pass the length of loaded items
          next={handleLoadMore}
          hasMore={!loading && !error} // Indicate if more data is available
          loader={<Loader />} // Optional loading component
        >
          <div className="photo-list">
            {photos.map((photo) => (
              <div className="item" key={photo?.id}>
                <PhotoItem photo={photo} />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      )}
      <div className="bottom"></div>
    </div>
  );
};

export default List;
