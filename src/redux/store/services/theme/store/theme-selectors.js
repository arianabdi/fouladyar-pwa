import {selectPending} from "../../general/store";


export function selectThemeInfo() {
  return (state) => {

    return {
      isChecking: selectPending('theme')(state),
      main: state.theme.main,
      header: state.theme.header,
      skin: state.theme.skin,
      lng: state.theme.lng,
      mobileView: state.theme.mobileView,
      rtl: state.theme.rtl
    }
  };
}
