import axios from 'axios';
import { store } from '../../App';
import {pushMessage} from "../store/services/general/store";

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  headers: {
    Authorization: '',
    'Content-Type': process.env.API_CONTENT_TYPE
  },
});

axiosInstance.interceptors.request.use((request) => {
  const state = store.getState();
  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiMDkzOTQyNzIxMTgiLCJpYXQiOjE2OTczNzY4NzksImV4cCI6MTY5NzM4MDQ3OX0.6O-8lFdSeqtEelZIQCZZTt_VYo7CPTGs48Ddy7S0xCE"
  request.headers.Authorization = `Bearer ${state.auth.token}`;
  // request.headers.Authorization = `Bearer ${state?.user?.token}`;

  return request;
}, (error) => Promise.reject(error));

const commonResponseInterceptors = {
  onFulfilled: (response) => {
    // Response handler
    const responseMessage = response?.data?.message;

    if (responseMessage) {
      const messageType = responseMessage.includes('success') ? 'success' : 'info';

      store.dispatch(pushMessage(responseMessage, messageType));
    }

    const paginationCurrentHeader = response.headers['x-pagination-current-page'];
    const paginationTotalHeader = response.headers['x-pagination-page-count'];

    if (paginationCurrentHeader || paginationTotalHeader) {
      const pagination = {
        total: parseInt(paginationTotalHeader, 10),
        current: parseInt(paginationCurrentHeader, 10),
      };

      return new Proxy(response.data, {
        get: (target, prop) => {
          if (prop === 'pagination') {
            return pagination;
          }
          return target[prop];
        },
      });
    }

    return response.data;
  },
  onReject: (error) => {
    const errorMessage = error?.response?.data?.message || error?.response?.data?.error;
    const hasFormError = Array.isArray(error?.response?.data);

    if (errorMessage) {
      store.dispatch(pushMessage(errorMessage, 'error'));
    }

    if (hasFormError) {
      error.response.data.forEach((fieldError) => {
        if (fieldError.message) {
          store.dispatch(pushMessage(fieldError.message, 'error'));
        }
      });
    }

    return Promise.reject(error);
  },
};

axiosInstance.interceptors.response.use(commonResponseInterceptors.onFulfilled, commonResponseInterceptors.onReject);

export default axiosInstance;
