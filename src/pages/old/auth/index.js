import axios from "axios";
import toast from "react-hot-toast";
import { ErrorToaster } from "../../../shared/toaster";

export async function validateToken(token) {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/token/validation`, {
      headers: { "authorization": `bearer ${token}` }
    });
    if (res.status === 200 || res.status === 201) {
      return  true;
    }
    return  false
  }catch (e){
    ErrorToaster(e)
    console.error('Authentication Error', e)
  }

  // console.log('auth', res);
}
