import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import ModalHelper from "../../../components/fouladyar/modal-helper/modalHelper";
import {useTranslation} from "react-i18next";
import {FixedHeader} from "../../../layout/header/Fixed-Header";
import {BottomNavBar} from "../../../layout/Index-layout";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const SinglePost = () => {
    const auth = useSelector((state) => state.auth);
    const profile = useSelector((state) => state.profile);
    const {t, i18n} = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const {state} = location;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [modalComponent, setModalComponent] = useState(<div>empty</div>);


    useEffect(() => {
        console.log('state', state)
    }, [])


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
            <FixedHeader title={"مقالات"} useBack={true}/>
            <div className="nk-content news-feed">

                <div className="news-feed-item-container">
                    <div className="news-title">{state.title}</div>
                    <div className="news-feed-image">
                        <img src={state.image} alt=""/>
                    </div>
                    <div className="news-summary" dangerouslySetInnerHTML={{__html: state.excerpt}}/>

                    <div className="post-content" dangerouslySetInnerHTML={{__html: state.content}}>
                        {}
                    </div>
                </div>
            </div>
            <BottomNavBar/>
        </React.Fragment>

    );
};

export default SinglePost;
