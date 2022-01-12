import { configureStore } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/dist/query';

import { cryptoApi } from '../services/cryptoApi'; //to connect the api to the store
import { cryptoNewsApi } from '../services/cryptoNewsApi';

export default configureStore({
    reducer: {
        [cryptoApi.reducerPath]: cryptoApi.reducer,
        [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer
    },
});

//The store is created here and will be passed to the index.js so the store would be available to the whole app