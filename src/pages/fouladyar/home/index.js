import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ModalHelper from "../../../components/fouladyar/modal-helper/modalHelper";
import axios from "axios";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { LiaClipboardCheckSolid } from "react-icons/lia";
import { FixedHeader } from "../../../layout/header/Fixed-Header";
import { BottomNavBar } from "../../../layout/Index-layout";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import postTest from "../../../assets/images/fitness-academic/post-test.png"
import slide1 from "../../../images/fouladyar/slide1.jpg"
import slide2 from "../../../images/fouladyar/slide2.jpg"
import slide3 from "../../../images/fouladyar/slide3.jpg"
import slide4 from "../../../images/fouladyar/slide4.jpg"
import slide5 from "../../../images/fouladyar/slide5.jpg"
import news1 from "../../../images/fouladyar/news1.png"
import { MdClose } from "react-icons/md";
import { TbClockHour4 } from "react-icons/tb";
import { ErrorToaster } from "../../../shared/toaster";
import { toFarsiNumber } from "../../../shared/toFarsiNumber";
import { ConvertGregorianToJalali } from "../../../shared/convertGregorianToJalali";
import StatusInquery from "../StatusInquery/statusInquery";
import {IoMenuOutline} from "react-icons/io5";
import {FaArrowLeft} from "react-icons/fa";
import {LoadingState} from "../../../components/fouladyar/loading-state/loadingState";
import {ProductItem} from "../products";
import {setLoadedProducts} from "../../../redux/store/services/products/store";

function NewsItem({item}) {
  const TruncatedText = ({ text, maxLength = 40 }) => {
    const truncatedText = text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;

    return <span>{truncatedText}</span>;
  };

  return (

    <Link to={`${process.env.PUBLIC_URL}/post?postId=${item._id}`} >
      <div className="news-item-container">
        <div className="news-item-image">
          <img src={item.image} alt="" />
        </div>
      </div>
    </Link>
  );
}

const Home = () => {
  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile);

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [sliderFeedItems, setSliderFeedItems] = useState([]);
  const [newsFeedItems, setNewsFeedItems] = useState([]);
  const [eventFeedItems, setEventFeedItems] = useState([]);

  const loadedProducts = useSelector((state) => state.products);
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
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  async function getProducts() {
    try {
      setIsLoading(true)
      const res = await axios.get(`${process.env.REACT_APP_FOULADYAR_GROUP_WP_WEBSITE_URL}/wp-json/wc/v3/products`, {
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
      <FixedHeader title={"خانه"} />
      <div className="nk-content news-page" >
        <div className="container-fluid-doctor">
          <div className="nk-content-inner">
            <div className="nk-content-body">
              <div className="nk-block">
                <div className="container  m-0 ps-0 pe-0"  style={{paddingBottom: "6rem"}}>


                  <div className="slider">
                    <Slider {...settings}>
                      <div className="slider-item">
                        <img src={slide1} alt="" />
                      </div>
                      <div className="slider-item">
                        <img src={slide2} alt="" />
                      </div>
                      <div className="slider-item">
                        <img src={slide3} alt="" />
                      </div>
                      <div className="slider-item">
                        <img src={slide4} alt="" />
                      </div>
                      <div className="slider-item">
                        <img src={slide5} alt="" />
                      </div>
                    </Slider>
                  </div>

                  <StatusInquery
                    number={number}
                  />

                  <div className="news">
                    <div className="d-flex flex-row justify-content-between mb-2 p-4 pb-2">
                      <div className="news-heading">آخرین محصولات</div>
                      <Link to={"/products"}>
                        مشاهده همه
                        <FaArrowLeft  size={13} color={"#206693"}/>
                      </Link>
                    </div>
                    <div className="news-container p-4 pt-0">
                      <div className="news-container-scroll-box">
                        {
                          isLoading && loadedProducts.items.length ===0  ?
                              <div className={'modal-loading-state'}><LoadingState/></div> :
                              loadedProducts.items.slice(0, 5).map(item => {
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

                    </div>
                  </div>



                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomNavBar />
    </React.Fragment>

  );
};

export default Home;
