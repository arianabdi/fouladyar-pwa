import { createAction } from 'redux-actions';
import {timeout} from "../../../shared/shared";
import toast from "react-hot-toast";


export const SET_UPLOADER_PENDING = 'UPLOADER/SET_PENDING';

export const setUploaderPending = createAction(SET_UPLOADER_PENDING, (section = 'list', status = false) => ({
  section,
  status,
}));

export function setUploadersPending(status) {
  return setUploaderPending('list', status);
}



export function uploadFiles(files) {
  return async (dispatch, getState, { axios }) => {
    try {
      dispatch(setUploadersPending(true));
      const response = await axios.get(`/upload-file`, files, {
        onUploadProgress: (progressEvent) => {
          const uploadPercentage = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );

          const updatedFiles = [...files];
          updatedFiles[index].progress = uploadPercentage;
          setFiles(updatedFiles);
        }
      });
      return response.data.result;

    } catch (error) {
      console.log(error.message);
      toast.error(e.message)
    } finally {
      dispatch(setUploadersPending(false));
    }
  };
}


