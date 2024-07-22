import toast from "react-hot-toast";


export const ErrorToaster = (e) => {
  toast.error(e.response?.data.error || (e.response?.data.message || e.message))
}

export function SuccessToaster (e, t) {
  console.log("Success", e);
  toast.success(t(e.response?.data.message ? e.response?.data.message : (e.response?.data.error || (e.response?.data.message || e.message))))
}
