import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import ModalHelper from "../../../components/fouladyar/modal-helper/modalHelper";
import axios from "axios";
import {useTranslation} from "react-i18next";
import {FixedHeader} from "../../../layout/header/Fixed-Header";
import {BottomNavBar} from "../../../layout/Index-layout";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {ErrorToaster} from "../../../shared/toaster";
import StatusInquery from "../StatusInquery/statusInquery";
import {TrackingItem} from "./trackingItem";


const Tracking = () => {
    const auth = useSelector((state) => state.auth);
    const profile = useSelector((state) => state.profile);

    const [searchParams] = useSearchParams();
    const part1 = searchParams.get('part1');
    const part2 = searchParams.get('part2');
    const part3 = searchParams.get('part3');
    const part4 = searchParams.get('part4');
    const part5 = searchParams.get('part5');
    const part6 = searchParams.get('part6');
    const part7 = searchParams.get('part7');
    const isSubmitting = searchParams.get('isSubmitting');




    const {t, i18n} = useTranslation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [trackingItems, setTrackingItems] = useState([

    ]);

    const [isSubmittingFromOutside, setIsSubmittingFromOutside] = useState(false);
    const [number, setNumber] = useState({});

    useEffect(() => {
        if(isSubmittingFromOutside){
            console.log('oyoyoy', part1, part2, part3, part4, part5 )
            setNumber({
                part1: part1,
                part2: part2,
                part3: part3,
                part4: part4,
                part5: part5,
                part6: part6,
                part7: part7
            })
        }
    },  [isSubmittingFromOutside])


    useEffect(() => {
        if(isSubmitting)
            setIsSubmittingFromOutside(true)
    },  [isSubmitting])

    async function onPress(e) {
        try {
            const code  = Object.values(e).filter(value => value !== "").join('%2F');
            console.log('code ', code)
            const res = await axios.get(`${process.env.REACT_APP_TRACKING_URL}/orders/${code}`, {

            });
            console.log('_getHomePosts', res.data)
            if (res.status === 200) {
                setTrackingItems(res.data)
            }

            setIsLoading(false)
            return res
        } catch (error) {
            ErrorToaster(error)
            setIsLoading(false)
        }

    }




    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };



    return (

        <React.Fragment>
            <FixedHeader title={"رهگیری حواله"}/>
            <div className="nk-content news-page">
                <div className="container-fluid-doctor">
                    <div className="nk-content-inner">
                        <div className="nk-content-body">
                            <div className="nk-block d-flex flex-column">
                                <div className="container  m-0 ps-0 pe-0" style={{paddingBottom: "3rem"}}>
                                    <StatusInquery
                                        number={number}
                                        isSubmittingFromOutside={isSubmittingFromOutside}
                                        onPress={async (e) => {
                                            await onPress(e)
                                        }}
                                    />
                                </div>
                                <div className="container  m-0 ps-0 pe-0" style={{paddingBottom: "6rem"}}>
                                    {
                                        trackingItems.map((item, index) => {
                                            return(
                                                <TrackingItem item={item} index={index}/>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BottomNavBar/>
        </React.Fragment>

    );
};

export default Tracking;
