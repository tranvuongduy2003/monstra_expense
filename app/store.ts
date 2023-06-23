import {configureStore} from '@reduxjs/toolkit';
import notifyReducer from '../features/notify/notifySlice';
import tokenReducer from '../features/token/tokenSlice';

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    notify: notifyReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
