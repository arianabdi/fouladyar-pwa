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



const ProductDetail = () => {
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




    useEffect(() => {
       console.log('product-item', 'id', productId, state)
        setSelectedImage(state.images[0].src)
    }, [])

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
            <FixedHeader title={"محصولات"} useBack={true}/>
            <div className="nk-content product-detail">
                <div className="news-action-container d-flex flex-row justify-content-between align-items-center">
                    <div className="product-feed-title">{state.name}</div>
                    <div className="news-date">
                        {toFarsiNumber(ConvertGregorianToJalali(state.date, false))}
                        <RiCalendar2Line size={18} color={"#000"}/>
                    </div>
                </div>
                <div className="product-selected-image-container">
                    <img src={selectedImage} alt=""/>
                </div>
                <div className="product-image-list-wrapper">

                    <div className="product-image-list">
                        {
                            state.images.map(img => {
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
                <div className="product-actions-container">
                    <div className={"buttonWrapper flex-column"}>
                        <button
                            className={"w-100"}
                            onClick={() => {
                                window.open(state.permalink, '_blank', 'noopener,noreferrer');
                            }}
                        >
                            مشاهده در وبسایت
                        </button>
                        <button
                            className="outline w-100"
                            onClick={() => {

                            }}
                        >
                            توضیحات بیشتر
                        </button>
                    </div>
                </div>
                <div className="product-description" dangerouslySetInnerHTML={{__html: state.description}}/>

            </div>
        </React.Fragment>

    );
};

export default ProductDetail;
