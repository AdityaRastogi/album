import { fetchPhotosRequest, fetchPhotosSuccess, fetchPhotosFailure } from '../slices/listSlice';
import api from '../api/api';

export const fetchPhotos = () => async (dispatch, getState) => {
  const { list } = getState();
  if (list.loading || list.error) return;

  dispatch(fetchPhotosRequest());
  try {
    const response = await api.fetchPhotos(list.page);
    const responseJson = await response.json();
    dispatch(fetchPhotosSuccess(responseJson));
  } catch (error) {
    dispatch(fetchPhotosFailure(error));
  }
};
