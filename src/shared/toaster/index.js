import toast from "react-hot-toast";


export const ErrorToaster = (e) => {
  toast.error(e.response?.data.error || (e.response?.data.message || e.message))
}
