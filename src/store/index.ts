import { constructionReducer } from './constructionReducer';
import { jobsReducer } from './jobsReducer';
import { loginReducer } from './loginReducer';
import { offerReducer } from './offerReducer';

import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    offer: offerReducer,
    login: loginReducer,
    construction: constructionReducer,
    jobs: jobsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type AppState = ReturnType<typeof store.getState>;
