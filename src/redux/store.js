import { combineReducers, configureStore } from '@reduxjs/toolkit';
import detailReducer from './slides/detailSlide'
import userReducer from './slides/userSlide';
// import orderReducer from './slides/orderSlide'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: ['detail', 'user'],
};

const rootReducer = combineReducers({
      detail: detailReducer,
    user: userReducer,
    //   order: orderReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export let persistor = persistStore(store);
