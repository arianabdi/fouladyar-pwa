import {setProfile, setUserPending} from "./user-actions";
import toast from "react-hot-toast";


export function setProfilePending(status) {
  return setUserPending('profile', status);
}

export function getProfile() {
  return async (dispatch, getState, { axios }) => {
    try {
      dispatch(setProfilePending(true));  //شروع به گرفتن پروفایل کاربر

      const userProfile = await axios.get('/user');

      dispatch(setProfile(userProfile.user));
    } catch (error) {

      toast.error(e.message)
    } finally {
      dispatch(setProfilePending(false)); // پایان دریافت پروفایل کاربر
    }
  };
}

export function updateProfile(profileInfo) {
  return async (dispatch, getState, { axios }) => {
    try {
      dispatch(setProfilePending(true));

      const currentState = getState();

      const userId = currentState?.user?.profile?.id;
      const profileResult = await axios.patch(`/profile/${userId}`, profileInfo);
      const updatedProfile = profileResult.data;

      dispatch(setProfile(updatedProfile));
    } catch (error) {
      console.log(error.message);
    } finally {
      dispatch(setProfilePending(false));
    }
  };
}

export function requestMobilePin(number) {
  return async (dispatch, getState, { axios }) => {
    await axios.post('/profile/request-mobile-pin', {
      number,
    });
  };
}
