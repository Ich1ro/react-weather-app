import { configureStore, combineReducers } from '@reduxjs/toolkit';
import currentWeatherSliceReducer from './slices/currentWeatherSlice';
import {
	persistStore,
	persistReducer,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
	currentWeatherSliceReducer
});

const persistConfig = {
	key: 'root',
	storage: storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({ serializableCheck: false })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
