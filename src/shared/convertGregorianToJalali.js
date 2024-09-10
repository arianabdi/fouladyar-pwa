import moment from 'moment';
import 'moment/locale/fa'; // Import the Persian locale
import  jMoment from 'jalali-moment';
export function ConvertGregorianToJalali(gregorianDatetime, showDateTime){
  try {
    const gregorianMoment = moment(gregorianDatetime, 'YYYY-MM-DD HH:mm:ss');
    const jalaliMoment = jMoment(gregorianMoment);

    const formattedJalaliDatetime = showDateTime ?
        jalaliMoment.format('jYYYY/jMM/jDD - HH:mm:ss') :
        jalaliMoment.format('jYYYY/jMM/jDD') ;


    return formattedJalaliDatetime;
  }catch (e) {
    console.error('ConvertGregorianToJalali Error:', e)
  }
}
