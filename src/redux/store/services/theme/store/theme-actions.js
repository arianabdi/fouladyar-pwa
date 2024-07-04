import { createAction } from 'redux-actions';


export const SET_RTL = 'THEME/SET_RTL';
export const SET_MOBILE_VIEW = 'THEME/SET_MOBILE_VIEW';
export const SET_SKIN = 'THEME/SET_SKIN';
export const SET_LANGUAGE = 'THEME/SET_LANGUAGE';
export const SET_HEADER_COLOR = 'THEME/SET_HEADER_COLOR';
export const SET_THEME_PENDING = 'THEME/SET_PENDING';

export const setThemePending = createAction(SET_THEME_PENDING, (section = 'all', status = true) => ({
  section,
  status,
}));
export const setSkin = createAction(SET_SKIN);
export const setRTL = createAction(SET_RTL);
export const setLang = createAction(SET_LANGUAGE);
export const setHeaderColor = createAction(SET_HEADER_COLOR);
export const setMobileView = createAction(SET_MOBILE_VIEW);


function setThemesPending(status) {
  return setThemePending('theme', status);
}








