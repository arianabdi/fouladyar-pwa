import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import ModalHelper from "../../../components/fouladyar/modal-helper/modalHelper";
import axios from "axios";
import {useTranslation} from "react-i18next";
import {FixedHeader} from "../../../layout/header/Fixed-Header";
import {BottomNavBar} from "../../../layout/Index-layout";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {ErrorToaster} from "../../../shared/toaster";
import {LoadingState} from "../../../components/fouladyar/loading-state/loadingState";
import {NewsItem} from "../news";


const Posts = () => {
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
            const res = await axios.get(`${process.env.REACT_APP_FOULADYAR_GROUP_WP_WEBSITE_URL}/wp-json/wp/v2/posts?consumer_key=${process.env.REACT_APP_WOOCOMMERCE_CK_KEY}&consumer_secret=${process.env.REACT_APP_WOOCOMMERCE_CS_KEY}`, {
                params: {
                    _embed: 'id,date,link,title,content,excerpt,better_featured_image',
                    categories: 42,
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
            <FixedHeader title={"مقالات"} useBack={true}/>
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

export default Posts;
