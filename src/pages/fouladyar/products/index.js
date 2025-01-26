import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import ModalHelper from "../../../components/fouladyar/modal-helper/modalHelper";
import axios from "axios";
import {useTranslation} from "react-i18next";
import {FixedHeader} from "../../../layout/header/Fixed-Header";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {ErrorToaster} from "../../../shared/toaster";
import {LoadingState} from "../../../components/fouladyar/loading-state/loadingState";

import {setLoadedProducts} from "../../../redux/store/services/products/store";

export function ProductItem({item, onClick}) {
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
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const profile = useSelector((state) => state.profile);
    const loadedProducts = useSelector((state) => state.products);
    const {t, i18n} = useTranslation();
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [modalComponent, setModalComponent] = useState(<div>empty</div>);


    async function getProducts() {
        try {
            setIsLoading(true)
            const res = await axios.get(`${process.env.REACT_APP_FOULADYAR_GROUP_WP_WEBSITE_URL}/wp-json/wc/v3/products?consumer_key=${process.env.REACT_APP_WOOCOMMERCE_CK_KEY}&consumer_secret=${process.env.REACT_APP_WOOCOMMERCE_CS_KEY}`, {
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
                const AllLoadedProducts = res.data.map(item => {
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
                });
                dispatch(setLoadedProducts(AllLoadedProducts))
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
        console.log('loadedProducts', loadedProducts)
    }, [loadedProducts])


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
                    isLoading && loadedProducts.items.length ===0 ?
                        <div className={'modal-loading-state'}><LoadingState/></div> :
                        loadedProducts.items.map(item => {
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
