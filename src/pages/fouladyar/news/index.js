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
import {toFarsiNumber} from "../../../shared/toFarsiNumber";
import {ConvertGregorianToJalali} from "../../../shared/convertGregorianToJalali";
import {RiCalendar2Line} from "react-icons/ri";
import {LoadingState} from "../../../components/fouladyar/loading-state/loadingState";

export function NewsItem({item}) {

    const navigate = useNavigate();

    return (


        <div className="news-feed-item-container">
            <div className="news-title">{item.title}</div>
            <div className="news-feed-image">
                <img src={item.image} alt=""/>
            </div>
            <div className="news-summary" dangerouslySetInnerHTML={{__html: item.excerpt}}/>
            <div className="news-action-container d-flex flex-row justify-content-between align-items-center">


                <div className="news-more-btn" onClick={()=>{
                    navigate(`/single-post/${item.id}`, {state: item})
                }}>
                    ادامه مطلب
                </div>
                <div className="news-date">
                    {toFarsiNumber(ConvertGregorianToJalali(item.date, false))}
                    <RiCalendar2Line size={18} color={"#000"}/>
                </div>
            </div>
        </div>

    );
}

const News = () => {
    const auth = useSelector((state) => state.auth);
    const profile = useSelector((state) => state.profile);
    const {t, i18n} = useTranslation();
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [modalComponent, setModalComponent] = useState(<div>empty</div>);

    async function getNewsFeed() {


        try {
            setIsLoading(true)
            const res = await axios.get(`${process.env.REACT_APP_FOULADYAR_GROUP_WP_WEBSITE_URL}/wp-json/wp/v2/posts`, {
                params: {
                    _embed: 'id,date,link,title,content,excerpt,better_featured_image',
                    categories: 38,
                }
            });
            console.log('_getNewsFeed', res.data)
            if (res.status === 200) {
                setPosts(res.data.map(item => {
                    return ({
                        id: item.id,
                        title: item.title.rendered,
                        excerpt: item.excerpt.rendered,
                        content: item.content.rendered,
                        date: item.date,
                        image: item.better_featured_image.source_url,
                    })
                }))
                // setNewsFeedItems(res.data.data.news);
                // setEventFeedItems(res.data.data.events);
            }

            setIsLoading(false)
            return res
        } catch (error) {
            ErrorToaster(error)
            setIsLoading(false)
        }

    }


    useEffect(() => {
        getNewsFeed()
    }, [])

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
            <FixedHeader title={"اخبار"} useBack={true}/>
            <div className="nk-content news-feed">
                {
                    isLoading ?
                        <div className={'modal-loading-state'}><LoadingState/></div> :
                        posts.map(item => {
                            return (
                                <NewsItem item={item}/>
                            )
                        })
                }
            </div>
            <BottomNavBar/>
        </React.Fragment>

    );
};

export default News;
