import {selectPending} from "../../general/store";


export function selectAuthInfo() {
  return (state) => {
    return {
      // isChecking: selectPending('user')(state),
      isLogin: Boolean(state.user.token && state.user.profile),
      token: state.user.token,
      profile: state.user.profile,
    }

  };
}
