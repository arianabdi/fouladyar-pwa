import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import ModalHelper from "../../../components/fouladyar/modal-helper/modalHelper";
import {useTranslation} from "react-i18next";
import {FixedHeader} from "../../../layout/header/Fixed-Header";
import {BottomNavBar} from "../../../layout/Index-layout";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {LoadingState} from "../../../components/fouladyar/loading-state/loadingState";
import {IoIosFitness, IoMdPlay} from "react-icons/io";

export function VideoItem({item}) {

    const navigate = useNavigate();

    return (


        <div className="news-feed-item-container" onClick={() => {
            window.open(item.link, '_blank')
        }}>
            <div className="news-feed-image videos-feed">
                <div className="news-title">{item.title}</div>
                <div className="video-play-button-container">
                    <div className="video-play-button">
                        <IoMdPlay size={20} color={"#fff"} />
                    </div>
                </div>
                <img src={item.img} alt=""/>
            </div>
            <div className="news-summary" dangerouslySetInnerHTML={{__html: item.desc}}/>

        </div>

    );
}

const Videos = () => {
    const auth = useSelector((state) => state.auth);
    const profile = useSelector((state) => state.profile);
    const {t, i18n} = useTranslation();
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [modalComponent, setModalComponent] = useState(<div>empty</div>);
    const VideoListData = [
        {
            id: '1',
            img: require('../../../assets/images/fouladyar/vid1.jpeg'),
            title: 'قیمت فولاد در بازار - گروه فولادیار کوروش',
            link: 'https://www.aparat.com/v/QLN0t',
            desc: 'آرش مرعشی، مدیر عامل شرکت فولادیار کوروش: بازگشت قیمت فولاد خوش خیالی است. قیمت جهانی فولاد از ماه دسامبر سال 2020، به طور میانگین حدود 50% افزایش داشته است.',
        },
        {
            id: '2',
            img: require('../../../assets/images/fouladyar/vid2.jpeg'),
            title: 'عرضه و تقاضا راه حل بازار فولاد - گروه فولادیار کوروش',
            link: 'https://www.aparat.com/v/ekdt6',
            desc: 'آرش مرعشی، مدیر عامل شرکت فولادیار کوروش: قیمت گذاری دستوری و اعمال محدودیت برای قیمت ها، یکی از عوامل اصلی عدم پیشرفت صنعت فولاد در ایران است. ',
        },
        {
            id: '3',
            img: require('../../../assets/images/fouladyar/vid3.jpeg'),
            title: 'نمایشگاه صنعت ساختمان - گروه فولادیار کوروش',
            link: 'https://www.aparat.com/v/9Alvo',
            desc: 'حضور شرکت فولادیار کوروش در بیست و یکمین نمایشگاه صنعت ساختمان، با رونمایی از جدیدترین و آخرین تکنولوژی های بر خط ۲۲ لغایت ۲۵ شهریور ماه سال ۱۴۰۰ ',
        },
        {
            id: '4',
            img: require('../../../assets/images/fouladyar/vid4.jpeg'),
            title: 'نمایشگاه صنعت ساختمان تهران - مردادماه 1401',
            link: 'https://www.aparat.com/v/aWEn4',
            desc: 'استقبال بی نظیر بازدید کنندگان نمایشگاه بین المللی صنعت ساختمان از تولیدات و تکنولوژی های مورد استفاده شرکت فولادیار کوروش 22 لغایت 25 شهریور ماه سال 1400',
        },
    ];


    useEffect(() => {
        console.log('post', posts)
    }, [posts])


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };


    return (

        <React.Fragment>

            <ModalHelper
                size={"sm"}
                open={isModalOpen}
                onOpen={() => setIsModalOpen(true)}
                onClose={() => setIsModalOpen(false)}
                component={modalComponent}
            />
            <FixedHeader title={"ویدیو ها"} useBack={true}/>
            <div className="nk-content news-feed">
                {
                    isLoading ?
                        <div className={'modal-loading-state'}><LoadingState/></div> :
                        VideoListData.map(item => {
                            return (
                                <VideoItem item={item}/>
                            )
                        })
                }
            </div>
            <BottomNavBar/>
        </React.Fragment>

    );
};

export default Videos;
