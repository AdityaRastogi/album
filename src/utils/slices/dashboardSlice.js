import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favorites: [],
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export default dashboardSlice.reducer;
export const { addFavorite, removeFavorite } = dashboardSlice.actions;
