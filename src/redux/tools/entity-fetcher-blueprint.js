/* eslint-disable import/no-extraneous-dependencies */
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { axios } from '~/tools';
import createEntityREST from './create-entity-rest';

const groupAdapter = createEntityAdapter({
  selectId: (group) => group.id,
});

const groupSlice = createSlice({
  name: 'group',
  initialState: {
    groups: groupAdapter.getInitialState(),
  },
  reducers: {
    addOne: groupAdapter.addOne,
    setAll: groupAdapter.setAll,
    removeOne: groupAdapter.removeOne,
    updateOne: groupAdapter.updateOne,
  },
});

export const groupCRUD = createEntityREST({
  baseUrl: '/group',
  fetcher: axios,
  actions: {
    ...groupSlice.actions,
    requestStart: () => ({
      type: 'REQ_START',
    }),
    requestEnd: () => ({
      type: 'REQ_END',
    }),
    requestError: () => ({
      type: 'REQ_ERROR',
    }),
  },
  getPagination(response) {
    return {
      total: response.headers['x-pagination-total'],
      current: response.headers['x-pagination-current'],
    };
  },
  setPagination(options) {
    return {
      params: {
        page: options.page,
        'per-page': options.perPage,
      },
    };
  },
});
