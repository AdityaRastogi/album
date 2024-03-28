import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './slices/dashboardSlice';
import listReducer from './slices/listSlice';
import api from './api/api';

const rootReducer = {
  dashboard: dashboardReducer,
  list: listReducer,
};

const appStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument: api } }),
});

export default appStore;
