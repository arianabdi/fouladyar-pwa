// In your Redux setup or auth slice file (where the store is defined)
import { createSelector } from '@reduxjs/toolkit';

const selectAuth = (state) => state.auth;

export const selectAuthToken = createSelector(
  [selectAuth],
  (auth) => auth.token
);