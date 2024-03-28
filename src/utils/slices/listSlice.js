import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  photos: [],
  page: 1,
  loading: false,
  error: null,
};

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    fetchPhotosRequest: (state) => {
      state.loading = true;
    },
    fetchPhotosSuccess: (state, action) => {
      state.loading = false;
      state.photos.push(...action.payload);
      state.page++;
    },
    fetchPhotosFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default listSlice.reducer;
export const {
  fetchPhotosRequest,
  fetchPhotosSuccess,
  fetchPhotosFailure,
} = listSlice.actions;
