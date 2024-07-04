import { createSelector } from '@reduxjs/toolkit';

const selectProfile = (state) => state.profile;

export const selectUserProfile = createSelector(
  [selectProfile],
  (profile) => profile
);
