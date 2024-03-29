import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  photos: [],
  loading: false,
  error: null,
  page: 1, // Current page for infinite scroll
  scrollPosition: 0, // Store scroll position for restoration
};

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    fetchPhotosRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPhotosSuccess: (state, action) => {
      state.loading = false;
      state.photos.push(...action.payload);
      state.page++; // Increment page number for infinite scroll
    },
    fetchPhotosFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setScrollPosition: (state, action) => {
      state.scrollPosition = action.payload;
    },
  },
});

export const {
  fetchPhotosRequest,
  fetchPhotosSuccess,
  fetchPhotosFailure,
  setScrollPosition,
} = listSlice.actions;
export default listSlice.reducer;
