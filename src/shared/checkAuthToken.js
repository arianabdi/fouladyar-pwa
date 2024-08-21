import axios from "axios";
import {ErrorToaster} from "./toaster";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

export default async function checkAuthToken(token) {
    // const auth = useSelector((state) => state.auth);
    // const navigate = useNavigate();
    try {

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/profile`, {
            headers: {
                authorization: `bearer ${token}`
            }
        });

        console.log('auth token', response);
        if (response.status !== 200)
            throw new Error('Your session has expired. Please log in again')

        return true;
    } catch (e) {
        ErrorToaster({message: `نشست شما منقضی شده است! لطفا مجددا وارد شوید`})
        return false

        // navigate('/login')
    }
}