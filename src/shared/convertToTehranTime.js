import moment from "moment-timezone";


export const convertToTehranTime = (apiTime) => {
  // Convert API time to Tehran time using moment-timezone
  return moment(apiTime).tz('Asia/Tehran').format('YYYY-MM-DD HH:mm:ss');
}