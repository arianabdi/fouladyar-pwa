import {setToken, setUserPending} from "./user-actions";
import {getProfile} from "./profile-actions";
import {resetStore} from "../../general/store";


export function setAuthPending(status) {
  return setUserPending('auth', status);
}

export function checkUserStatus(forcedToken) {
  return async (dispatch, getState, { Storage }) => {
    try {

      dispatch(setUserPending('all', true));

      const storedToken = await Storage.get('token');
      const token = forcedToken || storedToken;

      if (forcedToken) {
        await Storage.set('token', forcedToken);
      }

      if (token) {
        await dispatch(setToken(token));
        await dispatch(getProfile());
      }
    } catch (error) {
      await dispatch(userLogout);
    } finally {
      dispatch(setUserPending('all', false));
    }
  };
}

export function userLogin(userNumber, password) {
  return async (dispatch, getState, { axios, Storage }) => {
    try {
      dispatch(setAuthPending(true));

      const loginCredentials = await axios.post('/auth/login', {
        userNumber,
        password,
      });

      await dispatch(checkUserStatus(loginCredentials.accessToken));
      return loginCredentials

    } catch (error) {
      return error.response.data;
    } finally {
      dispatch(setAuthPending(false));
    }
  };
}

export function userLogout() {
  return async (dispatch, getState, { Storage }) => {
    try {
      dispatch(setAuthPending(true));

      await Storage.remove('token');
      dispatch(resetStore());
    } catch (error) {
    } finally {
      dispatch(setAuthPending(false));
    }
  };
}

export function userRegister(registrationInfo) {
  return async (dispatch, getState, { Storage, axios, settings }) => {
    try {
      dispatch(setAuthPending(true));

      const affiliate = await Storage.get('affiliate_code');

      const registrationCredentials = await axios.post('/auth/register', {
        affiliate,
        register_channel: settings.appName,
        ...registrationInfo,
      });

      await Storage.remove('affiliate_code');
      await dispatch(checkUserStatus(registrationCredentials.access_token));


    } catch (error) {
    } finally {
      dispatch(setAuthPending(false));
    }
  };
}

export function requestNewPassword(username) {
  return async (dispatch, getState, { axios }) => {
    try {
      dispatch(setAuthPending(true));

      await axios.post('/auth/request-reset-password', {
        login: username,
      });
    } catch (error) {
      console.log(error.message);
    } finally {
      dispatch(setAuthPending(false));
    }
  };
}

export function resetPassword(userId, resetToken, newPassword) {
  return async (dispatch, getState, { axios }) => {
    try {
      dispatch(setAuthPending(true));

      await axios.post('/auth/reset-password', {
        user_id: userId,
        token: resetToken,
        password: newPassword,
      });
    } catch (error) {
      console.log(error.message);
    } finally {
      dispatch(setAuthPending(false));
    }
  };
}

export function googleLogin() {
  return (dispatch, getState, { Linking, settings }) => {
    const redirectUrl = `${settings.dashboardUrl}/auth/oauth-callback`;
    const googleOauthRedirectUri = `${settings.apiBase}/oauth/auth?authclient=google&redirectUrl=${redirectUrl}`;
    Linking.openURL(googleOauthRedirectUri);

    return googleOauthRedirectUri;
  };
}

export function requestMagicLink(email) {
  return async (dispatch, getState, { axios }) => {
    try {
      dispatch(setAuthPending(true));

      await axios.post('/auth/magic-request', {
        email,
      });
    } catch (error) {
      console.log(error.message);
    } finally {
      dispatch(setAuthPending(false));
    }
  };
}


