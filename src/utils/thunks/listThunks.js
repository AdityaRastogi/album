import { fetchPhotosRequest, fetchPhotosSuccess, fetchPhotosFailure } from '../slices/listSlice';
import api from '../api/api';

export const fetchPhotos = () => async (dispatch, getState) => {
  const { list } = getState();
  if (list.loading || list.error) return;

  dispatch(fetchPhotosRequest());
  try {
    const response = await api.fetchPhotos(list.page);
    dispatch(fetchPhotosSuccess(response.data));
  } catch (error) {
    dispatch(fetchPhotosFailure(error));
  }
};
