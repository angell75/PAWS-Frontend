import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import petReducer from './slices/petSlice';
import donationReducer from './slices/donationSlice';
import enquiriesReducer from './slices/enquiriesSlice';
import applicationReducer from './slices/applicationSlice';
import profileReducer from './slices/profileSlice';
import productsReducer from './slices/productsSlice';
import cartReducer from './slices/cartSlice';
import orderReducer from './slices/orderSlice';
import sellerReducer from './slices/sellerSlice';
import appointmentReducer from './slices/appointmentSlice';
import adminReducer from './slices/adminSlice';

const reduxLogger = (store) => (next) => (action) => {
  console.log('Dispatching action:', action);
  const result = next(action);
  console.log('Next state:', store.getState());
  return result;
};

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  pets: petReducer,
  donations: donationReducer,
  enquiries: enquiriesReducer,
  applications: applicationReducer,
  profile: profileReducer,
  products: productsReducer,
  carts: cartReducer,
  order: orderReducer,
  seller: sellerReducer,
  appointments: appointmentReducer,
  admin: adminReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(reduxLogger),
});

export const persistor = persistStore(store);
export default store;
