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

function ProductItem({item, onClick}) {
    return (
        <div className="product-feed-item-container">
            <div className="product-image-container" onClick={() => {
               onClick()
            }}>
                <div className="product-feed-image">
                    <img src={item.image} alt=""/>
                </div>
            </div>
        </div>

    );
}

const Products = () => {
    const auth = useSelector((state) => state.auth);
    const profile = useSelector((state) => state.profile);
    const {t, i18n} = useTranslation();
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [modalComponent, setModalComponent] = useState(<div>empty</div>);

    async function getProducts() {


        try {
            setIsLoading(true)
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/wp-json/wc/v3/products`, {
                params: {
                    per_page: 20,
                },
                headers: {
                    Authorization:
                        `Basic ${process.env.WOOCOMMERCE_ACCESS_TOKEN}`,
                },
            });
            console.log('_getProducts', res.data)
            if (res.status === 200) {
                setProducts(res.data.map(item => {
                    return ({
                        id: item.id,
                        image: item?.images[0]?.src,
                        item: {
                            images: item.images,
                            name: item.name,
                            description: item.description,
                            date: item.date_created,
                            permalink: item.permalink,
                        }
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
        getProducts()
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

            <ModalHelper
                size={"sm"}
                open={isModalOpen}
                onOpen={() => setIsModalOpen(true)}
                onClose={() => setIsModalOpen(false)}
                component={modalComponent}
            />
            <FixedHeader title={"محصولات"} useBack={true}/>
            <div className="nk-content product-feed">
                {
                    isLoading ?
                        <div className={'modal-loading-state'}><LoadingState/></div> :
                        products.map(item => {
                            return (
                                <ProductItem
                                    item={item}
                                    onClick={() => {
                                        navigate(`/product-detail/${item.id}`, {state: item.item})
                                    }}
                                />
                            )
                        })
                }
            </div>
        </React.Fragment>

    );
};

export default Products;
