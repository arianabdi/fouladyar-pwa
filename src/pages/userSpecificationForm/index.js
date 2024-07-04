import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ModalHelper from "../../components/fouladyar/modal-helper/modalHelper";
import axios from "axios";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { FixedHeader } from "../../layout/header/Fixed-Header";
import { IoIosFitness } from "react-icons/io";
import { Field } from "../../components/fouladyar/field/field";
import { FixedFooter } from "../../layout/footer/Fixed-footer";
import { ErrorToaster } from "../../shared/toaster";

const UserSpecificationForm = () => {
  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile);


  const { t, i18n } = useTranslation();
  const [selectedPackage, setSelectedPackage] = useState('')
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const programId = queryParams.get('programId');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalComponent, setModalComponent] = useState(<div>empty</div>);
  const [form, setForm] = useState({
    "full_name": "آرین عبدی",
    "age": 24,
    "height": 180,
    "weight": 86,
    gender: 'male',
    "chest_size": 65,
    "waist_size": 60,
    "abdominal_cir_size": 80,
    "hip_cir_size": 120,
    "thigh_cir_size": 40,
    "arm_cir_size": 30,
    "wrist_cir_size": 10,
    "is_homework_request": true,
    "available_equipment_at_home": "نیمکت، هارتل ۱۰ کلیویی، ۲ عدد دمبل ۸ کیلویی",
    "any_sport_background": "سابقه ورزش بسکتبال معمولی",
    "any_bodybuilding_background": "مدت ۶ ماه به صورت ورزش عادی",
    "purpose_of_receiving_bodybuilding_program": "عضله سازی در بخش شکم و سینه و کاهش وزن",
    "orthopedic_problems": "مشکل کمردرد، و مشکل زانو درد پای چپ (به خاطر تصادف)",
    "surgery_history": "جراحی پای چپ",
    "illness_history": "مشکل دریچه آعورت قلب",
    "birth_history": "",
    "job": "برنامه نویس کامپیوتر (ساعت کاری از۸ صبح الی ۱۸ عصر)",
    "daily_rest": "روزی تقریبا ۶ ساعت از ۱۲ شب الی ۶ صبح",
    "consumable_medicine": "داروی مسکن سردرد",
    "use_drink": "خیر. تاحالا مصرف نداشته ام",
    "use_supplements": "هیچ مکملی مصرف ندارم",
    "hours_of_training": "۶ تا ۸ عصر",
    "days_of_training": "شنبه، دوشنبه، چهارشنبه",
    "friends_who_are_under_our_program": "حسین گرامی، امیر رجبی",
    "reference": "حسین گرامی",
  })



  const yesOrNoOptions = [
    {label: 'بله', value: true},
    {label: 'خیر', value: false},
  ];

  const genderOptions = [
    {label: 'مرد', value: "male"},
    {label: 'زن', value: "female"},
    {label: 'دیگر', value: "other"},
  ];



  const style = {
    buttons: {
      padding: "0.5em"
    },
    danaFont: {
      fontFamily: "dana !important",
      margin: "auto"
    },
    divider: {
      height: 1,
      background: "#cecece",
      width: "100%"
    }
  }

  function Divider(){
    return(
      <div className="mt-4 mb-4" style={style.divider}></div>
    )
  }



  async function onSubmit() {
    try {
      console.log('form', form, programId);
      const res = await axios.patch(`${process.env.REACT_APP_API_URL}/program/${programId}`, form,{
        headers: {authorization: `bearer ${auth.token}`}
      });
      console.log('getAllMyProgram', res)
      if(res.status === 200){
        toast.success('اطلاعات شما با موفقیت ثبت شد')
        navigate('/programs')
      }

    } catch (error) {
      ErrorToaster(error)
    }
  }




  return (
    <React.Fragment>
      <ModalHelper
        size={"sm"}
        open={isModalOpen}
        onOpen={() => setIsModalOpen(true)}
        onClose={() => setIsModalOpen(false)}
        component={modalComponent}
      />
      <FixedHeader title={"مشخصات ورزشکار"} useBack={true} />
      <FixedFooter component={
        <div className={`btn blue-button`} style={{height: '2.3rem', borderRadius: "20rem", marginTop: '1rem'}} onClick={async () => {
          onSubmit()
        }}>
          ثبت مشخصات
        </div>
      }/>
      <div className="nk-content  news-page" style={{background: '#fff'}}>
        <div className="container-fluid-doctor">
          <div className="nk-content-inner">
            <div className="nk-content-body">
              <div className="nk-block">
                <div className="container pt-4 m-0" style={{paddingBottom: '6rem', paddingRight: '1.5rem', paddingLeft: '1.5rem'}}>
                  <Field
                    className={'mb-3'}
                    id={"fullname"}
                    name={"fullname"}
                    label={t('نام و نام خانوادگی')}
                    type={"text"}
                    value={form.full_name}
                    onChange={(e) => {
                      setForm(prevState => ({
                        ...prevState,
                        full_name: e
                      }));
                    }}
                  />
                  <Field
                    className={'mb-3'}
                    id={"gender"}
                    name={"gender"}
                    label={"جنسیت"}
                    isRequired={true}
                    type={"select"}
                    options={genderOptions}
                    value={form.gender}
                    onChange={(e) => {
                      setForm(prevState => ({
                        ...prevState,
                        gender: e
                      }));
                    }}
                  />
                  <Field
                    className={'mb-3'}
                    id={"age"}
                    name={"age"}
                    label={t('سن')}
                    type={"number"}
                    value={form.age}
                    onChange={(e) => {
                      setForm(prevState => ({
                        ...prevState,
                        age: e
                      }));
                    }}
                  />
                  <Field
                    className={'mb-3'}
                    id={"height"}
                    name={"height"}
                    label={t('قد (سانتی متر)')}
                    type={"number"}
                    value={form.height}
                    onChange={(e) => {
                      setForm(prevState => ({
                        ...prevState,
                        height: e
                      }));
                    }}
                  />
                  <Field
                    className={'mb-3'}
                    id={"weight"}
                    name={"weight"}
                    label={t('وزن (کیلوگرم)')}
                    type={"number"}
                    value={form.weight}
                    onChange={(e) => {
                      setForm(prevState => ({
                        ...prevState,
                        weight: e
                      }));
                    }}
                  />
                  <Field
                    className={'mb-3'}
                    id={"chest_size"}
                    name={"chest_size"}
                    label={t('سایز دور سینه')}
                    type={"number"}
                    value={form.chest_size}
                    onChange={(e) => {
                      setForm(prevState => ({
                        ...prevState,
                        chest_size: e
                      }));
                    }}
                  />
                  <Field
                    className={'mb-3'}
                    id={"waist_size"}
                    name={"waist_size"}
                    label={t('سایز دور کمر')}
                    type={"number"}
                    value={form.waist_size}
                    onChange={(e) => {
                      setForm(prevState => ({
                        ...prevState,
                        waist_size: e
                      }));
                    }}
                  />
                  <Field
                    className={'mb-3'}
                    id={"abdominal_cir_size"}
                    name={"abdominal_cir_size"}
                    label={t('سایز دور شکم')}
                    type={"number"}
                    value={form.abdominal_cir_size}
                    onChange={(e) => {
                      setForm(prevState => ({
                        ...prevState,
                        abdominal_cir_size: e
                      }));
                    }}
                  />
                  <Field
                    className={'mb-3'}
                    id={"hip_cir_size"}
                    name={"hip_cir_size"}
                    label={t('سایز دور باسن')}
                    type={"number"}
                    value={form.hip_cir_size}
                    onChange={(e) => {
                      setForm(prevState => ({
                        ...prevState,
                        hip_cir_size: e
                      }));
                    }}
                  />
                  <Field
                    className={'mb-3'}
                    id={"thigh_cir_size"}
                    name={"thigh_cir_size"}
                    label={t('سایز دور ران')}
                    type={"number"}
                    value={form.thigh_cir_size}
                    onChange={(e) => {
                      setForm(prevState => ({
                        ...prevState,
                        thigh_cir_size: e
                      }));
                    }}
                  />
                  <Field
                    className={'mb-3'}
                    id={"arm_cir_size"}
                    name={"arm_cir_size"}
                    label={t('سایز دور بازو')}
                    type={"number"}
                    value={form.arm_cir_size}
                    onChange={(e) => {
                      setForm(prevState => ({
                        ...prevState,
                        arm_cir_size: e
                      }));
                    }}
                  />
                  <Field
                    className={'mb-3'}
                    id={"wrist_cir_size"}
                    name={"wrist_cir_size"}
                    label={t('سایز دور مچ')}
                    type={"number"}
                    value={form.wrist_cir_size}
                    onChange={(e) => {
                      setForm(prevState => ({
                        ...prevState,
                        wrist_cir_size: e
                      }));
                    }}
                  />
                  <Field
                    className={'mb-3'}
                    id={"is_homework_request"}
                    name={"is_homework_request"}
                    label={t('درخواست شما برننامه تمرینی قابل اجرا در باشگاه یا منزل است؟')}
                    type={"select"}
                    value={form.is_homework_request}
                    options={yesOrNoOptions}
                    onChange={(e) => {
                      setForm(prevState => ({
                        ...prevState,
                        is_homework_request: e
                      }));
                    }}
                  />
                  <Field
                    className={'mb-3'}
                    id={"available_equipment_at_home"}
                    name={"available_equipment_at_home"}
                    label={t('در صورت درخواست برنامه در منزل،  وسایل ورزشی موجود در منزل را عنوان کنید')}
                    type={"text"}
                    value={form.available_equipment_at_home}
                    onChange={(e) => {
                      setForm(prevState => ({
                        ...prevState,
                        available_equipment_at_home: e
                      }));
                    }}
                  />
                  <Field
                    className={'mb-3'}
                    id={"any_sport_background"}
                    name={"any_sport_background"}
                    label={t('سابقه ورزشی')}
                    type={"text"}
                    value={form.any_sport_background}
                    onChange={(e) => {
                      setForm(prevState => ({
                        ...prevState,
                        any_sport_background: e
                      }));
                    }}
                  />
                  <Field
                    className={'mb-3'}
                    id={"any_bodybuilding_background"}
                    name={"any_bodybuilding_background"}
                    label={t('سابقه تمرینی بدنسازی و کار با دستگاه های بدنسازی دارید؟ چند ماه؟‌ چند سال؟')}
                    type={"text"}
                    value={form.any_bodybuilding_background}
                    onChange={(e) => {
                      setForm(prevState => ({
                        ...prevState,
                        any_bodybuilding_background: e
                      }));
                    }}
                  />
                  <Field
                    className={'mb-3'}
                    id={"purpose_of_receiving_bodybuilding_program"}
                    name={"purpose_of_receiving_bodybuilding_program"}
                    label={t('هدف اصلی شما از مراجعه و دریافت برنامه بدنسازی چیست؟')}
                    type={"text"}
                    value={form.purpose_of_receiving_bodybuilding_program}
                    onChange={(e) => {
                      setForm(prevState => ({
                        ...prevState,
                        purpose_of_receiving_bodybuilding_program: e
                      }));
                    }}
                  />
                  <Field
                    className={'mb-3'}
                    id={"orthopedic_problems"}
                    name={"orthopedic_problems"}
                    label={t('مشکلات ارتوپدی (درد کمر، زانو، دست، انحراف ستون فقرات و پاها...)')}
                    type={"text"}
                    value={form.orthopedic_problems}
                    onChange={(e) => {
                      setForm(prevState => ({
                        ...prevState,
                        orthopedic_problems: e
                      }));
                    }}
                  />
                  <Field
                    className={'mb-3'}
                    id={"surgery_history"}
                    name={"surgery_history"}
                    label={t('سابقه جراحی')}
                    type={"text"}
                    value={form.surgery_history}
                    onChange={(e) => {
                      setForm(prevState => ({
                        ...prevState,
                        surgery_history: e
                      }));
                    }}
                  />
                  <Field
                    className={'mb-3'}
                    id={"birth_history"}
                    name={"birth_history"}
                    label={t('سابقه زایمان')}
                    type={"text"}
                    value={form.birth_history}
                    onChange={(e) => {
                      setForm(prevState => ({
                        ...prevState,
                        birth_history: e
                      }));
                    }}
                  />
                  <Field
                    className={'mb-3'}
                    id={"job"}
                    name={"job"}
                    label={t('شغل (جواب ضروری بدلیل سنجش میزان فعالیت روزانه)')}
                    type={"text"}
                    value={form.job}
                    onChange={(e) => {
                      setForm(prevState => ({
                        ...prevState,
                        job: e
                      }));
                    }}
                  />
                  <Field
                    className={'mb-3'}
                    id={"daily_rest"}
                    name={"daily_rest"}
                    label={t('میزان استراحت روزانه (جواب ضروری..)')}
                    type={"text"}
                    value={form.daily_rest}
                    onChange={(e) => {
                      setForm(prevState => ({
                        ...prevState,
                        daily_rest: e
                      }));
                    }}
                  />
                  <Field
                    className={'mb-3'}
                    id={"consumable_medicine"}
                    name={"consumable_medicine"}
                    label={t('داروی مصرفی')}
                    type={"text"}
                    value={form.consumable_medicine}
                    onChange={(e) => {
                      setForm(prevState => ({
                        ...prevState,
                        consumable_medicine: e
                      }));
                    }}
                  />
                  <Field
                    className={'mb-3'}
                    id={"use_drink"}
                    name={"use_drink"}
                    label={t('آیا مشروبات الکی و دخانیات استفاده میفرمایید ؟‌در صورت مثبت بودن جواب، به چه میزان مصرف دارید؟')}
                    type={"text"}
                    value={form.use_drink}
                    onChange={(e) => {
                      setForm(prevState => ({
                        ...prevState,
                        use_drink: e
                      }));
                    }}
                  />
                  <Field
                    className={'mb-3'}
                    id={"use_supplements"}
                    name={"use_supplements"}
                    label={t('مکملهایی که تاکنون استفاده کردید و همچنین مکملهایی که در حال حاضر دارید عنوان کنید')}
                    type={"text"}
                    value={form.use_supplements}
                    onChange={(e) => {
                      setForm(prevState => ({
                        ...prevState,
                        use_supplements: e
                      }));
                    }}
                  />
                  <Field
                    className={'mb-3'}
                    id={"hours_of_training"}
                    name={"hours_of_training"}
                    label={t('ساعات دقیق تمرین (عصر یا صبح)')}
                    type={"text"}
                    value={form.hours_of_training}
                    onChange={(e) => {
                      setForm(prevState => ({
                        ...prevState,
                        hours_of_training: e
                      }));
                    }}
                  />
                  <Field
                    className={'mb-3'}
                    id={"days_of_training"}
                    name={"days_of_training"}
                    label={t('روزهایی که تمرین میکنید و قرار هست تمرین کنید (چند روز در هفته) ، را بفرمایید')}
                    type={"text"}
                    value={form.days_of_training}
                    onChange={(e) => {
                      setForm(prevState => ({
                        ...prevState,
                        days_of_training: e
                      }));
                    }}
                  />
                  <Field
                    className={'mb-3'}
                    id={"friends_who_are_under_our_program"}
                    name={"friends_who_are_under_our_program"}
                    label={t('نام دوستان و آشنایانی که زیر نظر بنده هستند، و برنامه تمرینی گرفته اند هم عنوان کنید')}
                    type={"text"}
                    value={form.friends_who_are_under_our_program}
                    onChange={(e) => {
                      setForm(prevState => ({
                        ...prevState,
                        friends_who_are_under_our_program: e
                      }));
                    }}
                  />
                  <Field
                    className={'mb-3'}
                    id={"reference"}
                    name={"reference"}
                    label={t('معرف و طریقه آشمنایی شمابا سیستم ما چگونه بوده است؟')}
                    type={"text"}
                    value={form.reference}
                    onChange={(e) => {
                      setForm(prevState => ({
                        ...prevState,
                        reference: e
                      }));
                    }}
                  />




                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>

  );
};

export default UserSpecificationForm;
