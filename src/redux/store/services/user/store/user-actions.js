import { createAction } from 'redux-actions';
import toast from "react-hot-toast";


export const SET_USER_PENDING = 'USER/SET_PENDING';
export const SET_TOKEN = 'USER/SET_TOKEN';
// export const SET_PROFILE = 'USER/SET_PROFILE';
export const SET_USERS_LIST = 'USER/SET_USERS_LIST';
export const SET_USERS_PAGINATION = 'USER/SET_USERS_PAGINATION';
export const SET_USER = 'USER/SET_USER';
export const SET_USER_PARTITIONS = 'USER/SET_USER_PARTITIONS';

export const setUserPending = createAction(SET_USER_PENDING, (section = 'all', status = true) => ({
  section,
  status,
}));
export const setToken = createAction(SET_TOKEN);
// export const setProfile = createAction(SET_PROFILE);
export const setUsersList = createAction(SET_USERS_LIST);
export const setUsersPagination = createAction(SET_USERS_PAGINATION);
export const setUser = createAction(SET_USER);
export const setUserPartitions = createAction(SET_USER_PARTITIONS);

function setUsersPending(status) {
  return setUserPending('users', status);
}

export function searchUsers(page = 1, query = {}, sort = '-created-at') {
  return async (dispatch, getState, { axios }) => {
    try {
      dispatch(setUsersPending(true));

      const searchUsersResponse = await axios.post('/user/search', {
        ...query,
      }, {
        params: {
          page,
          sort,
          'per-page': 10,
        },
      });

      dispatch(setUsersList(searchUsersResponse));
      dispatch(setUsersPagination(searchUsersResponse.pagination));
    } catch (error) {
      console.log(error.message);
    } finally {
      dispatch(setUsersPending(false));
    }
  };
}

export function getUser(userId) {
  return async (dispatch, getState, { axios }) => {
    try {
      dispatch(setUsersPending(true));

      const getUserResponse = await axios.get(`/user/${userId}`);
      dispatch(setUser(getUserResponse));
    } catch (error) {
      console.log(error.message);
      toast.error(e.message)
    } finally {
      dispatch(setUsersPending(false));
    }
  };
}


export function getUserList(userId) {
  return async (dispatch, getState, { axios }) => {
    try {
      dispatch(setUsersPending(true));

      const getUserResponse = await axios.get(`/user/${userId}`);
      dispatch(setUser(getUserResponse));
    } catch (error) {
      console.log(error.message);
      toast.error(e.message)
    } finally {
      dispatch(setUsersPending(false));
    }
  };
}

export function findPayerByUsername(username) {
  return async (dispatch, getState, { axios }) => {
    try {
      // dispatch(setUsersPending(true));

      const res = await axios.get(`/user/payer/${username}`);

      return res.data
    } catch (error) {
      console.log(error.message);
      toast.error(e.message)
    } finally {
      // dispatch(setUsersPending(false));
    }
  };
}

export function updateUser(userId, data) {
  return async (dispatch, getState, { axios }) => {
    try {
      dispatch(setUsersPending(true));

      const updateUserResponse = await axios.patch(`/user/${userId}`, data);
      dispatch(setUser(updateUserResponse.data));
    } catch (error) {
      console.log(error.message);
    } finally {
      dispatch(setUsersPending(false));
    }
  };
}


