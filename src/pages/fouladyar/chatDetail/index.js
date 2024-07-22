import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import ModalHelper from "../../../components/fouladyar/modal-helper/modalHelper";
import axios from "axios";
import {useTranslation} from "react-i18next";
import {FixedHeader} from "../../../layout/header/Fixed-Header";
import {BottomNavBar} from "../../../layout/Index-layout";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {ErrorToaster} from "../../../shared/toaster";
import {toFarsiNumber} from "../../../shared/toFarsiNumber";
import {ConvertGregorianToJalali} from "../../../shared/convertGregorianToJalali";
import {RiCalendar2Line} from "react-icons/ri";
import {LoadingState} from "../../../components/fouladyar/loading-state/loadingState";
import {UserAvatar} from "../../../components/Component";
import AvatarA from "../../../images/avatar/a-sm.jpg";
import Divider from "../../../shared/divider";



const ChatDetail = () => {
    const auth = useSelector((state) => state.auth);
    const profile = useSelector((state) => state.profile);
    const {t, i18n} = useTranslation();

    const location = useLocation();
    const { state } = location;
    const { productId } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");


    const images = [
        {id: 1, src: 'https://i.ibb.co/LP2Zzm5/filkosh-receipe.jpg'},
        {id: 2, src: 'https://i.ibb.co/yQytxST/filkosh-receipe-2.jpg'},
        {id: 3, src: 'https://i.ibb.co/8sp7wXq/photo-2023-08-13-18-19-37.jpg'},
        // Add more images as needed
    ];


    useEffect(() => {
        console.log('post', products)
    }, [products])


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };


    return (

        <React.Fragment>
            <FixedHeader title={"اطلاعات چت"} useBack={true}/>
            <div className="nk-content product-detail">
                <div className="user-info">
                    <UserAvatar image={AvatarA}></UserAvatar>
                    <div className="user-name">واحد فروش</div>
                    <div className="last-seen">آخرین بازدید: دیروز</div>
                </div>
                <Divider />
                <div className="user-info-setting">
                    <div className="user-info-title">تنظیمات</div>

                    <div className="user-info-key-value">
                        <div className="user-info-key">ارسال نوتیفیکیشن</div>
                        <div className="user-info-value">غیر فعال</div>
                    </div>
                    <div className="user-info-key-value">
                        <div className="user-info-key">قالب چت</div>
                        <div className="user-info-value">غیر فعال</div>
                    </div>
                </div>
                <div className="product-image-list-wrapper">

                    <div className="product-image-list">
                        {
                            images.map(img => {
                                return(
                                    <div className="image-list-item" onClick={() => {
                                        setSelectedImage(img.src)
                                    }}>
                                        <img src={img.src} alt=""/>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

            </div>
        </React.Fragment>

    );
};

export default ChatDetail ;
