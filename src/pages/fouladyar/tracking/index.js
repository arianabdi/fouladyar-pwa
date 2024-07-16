import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import ModalHelper from "../../../components/fouladyar/modal-helper/modalHelper";
import axios from "axios";
import {useTranslation} from "react-i18next";
import {FixedHeader} from "../../../layout/header/Fixed-Header";
import {BottomNavBar} from "../../../layout/Index-layout";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {ErrorToaster} from "../../../shared/toaster";
import StatusInquery from "../StatusInquery/statusInquery";

function TrackingItem({item}) {
    const TruncatedText = ({text, maxLength = 40}) => {
        const truncatedText = text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;

        return <span>{truncatedText}</span>;
    };

    return (

        <Link to={`${process.env.PUBLIC_URL}/post?postId=${item._id}`}>
            <div className="news-item-container">
                <div className="news-item-image">
                    <img src={item.image} alt=""/>
                </div>
            </div>
        </Link>
    );
}

const Tracking = () => {
    const auth = useSelector((state) => state.auth);
    const profile = useSelector((state) => state.profile);

    const {t, i18n} = useTranslation();
    const navigate = useNavigate();
    const [sliderFeedItems, setSliderFeedItems] = useState([]);
    const [newsFeedItems, setNewsFeedItems] = useState([]);
    const [eventFeedItems, setEventFeedItems] = useState([]);

    const [number, setNumber] = useState({
        part1: "",
        part2: "",
        part3: "",
        part4: "",
        part5: "",
        part6: "",
        part7: ""
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalComponent, setModalComponent] = useState(<div>empty</div>);

    async function trackCode() {

        console.log('token ', auth)
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/posts/application/home`, {
                headers: {authorization: `bearer ${auth.token}`}
            });
            console.log('_getHomePosts', res.data)
            if (res.status === 200) {
                setNewsFeedItems(res.data.data.news);
                setEventFeedItems(res.data.data.events);
            }

            return res
        } catch (error) {
            ErrorToaster(error)
        }

    }


    useEffect(() => {

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
            <FixedHeader title={"رهگیری حواله"}/>
            <div className="nk-content news-page">
                <div className="container-fluid-doctor">
                    <div className="nk-content-inner">
                        <div className="nk-content-body">
                            <div className="nk-block">
                                <div className="container  m-0 ps-0 pe-0" style={{paddingBottom: "6rem"}}>
                                    <StatusInquery
                                        number={number}
                                    />
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
