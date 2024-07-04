import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ModalHelper from "../../components/fouladyar/modal-helper/modalHelper";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { LiaClipboardCheckSolid } from "react-icons/lia";
import { FixedHeader } from "../../layout/header/Fixed-Header";
import { BottomNavBar } from "../../layout/Index-layout";
import { ErrorToaster } from "../../shared/toaster";
import { EmptyState } from "../../components/fouladyar/empty-state/emptyState";
import { toFarsiNumber } from "../../shared/toFarsiNumber";
import { ConvertGregorianToJalali } from "../../shared/convertGregorianToJalali";

const Post = () => {
  const auth = useSelector((state) => state.auth);

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const postId = queryParams.get('postId');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalComponent, setModalComponent] = useState(<div>empty</div>);
  const [post, setPost] = useState()


  async function _getPostById() {
    try {

      const res = await axios.get(`${process.env.REACT_APP_API_URL}/posts/${postId}`,{
        headers: {authorization: `bearer ${auth.token}`}
      });
      console.log('getPostById', res)
      console.log('_getPostById', res.data)
      if (res.status === 200) {
        setPost({
          title: res.data.data.post.title,
          image: res.data.data.post.image,
          content: res.data.data.post.content,
          createdAt: toFarsiNumber(ConvertGregorianToJalali(res.data.data.post.createdAt, false)),
          category: res.data.data.post.category,

        });
      }
    }catch (e) {
      ErrorToaster(e)
    }

  }

  useEffect(() => {

    _getPostById()
  }, [])




  return (

    <React.Fragment>

      <ModalHelper
        size={"sm"}
        open={isModalOpen}
        onOpen={() => setIsModalOpen(true)}
        onClose={() => setIsModalOpen(false)}
        component={modalComponent}
      />
      <FixedHeader title={"مقاله"} useBack={true} />
      <div className="nk-content news-page">
        <div className="container-fluid-doctor">
          <div className="nk-content-inner">
            <div className="nk-content-body">
              <div className="nk-block">

                <div className="container p-3 m-0">

                  {
                    !post ? '' :
                      <div className="col-sm-12 col-md-12 col-lg-12 mt-3 mb-3 p-5 pt-3 pb-3 profile-container">
                        <div className="post-title">{post.title}</div>
                        <div className="post-date">تاریخ انتشار:{post.createdAt}</div>
                        <div className="post-category">دسته بندی:{post.category}</div>
                        {
                          post.image ? <div className="post-image"><img src={post.image} alt="" /></div> : ''
                        }
                        <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br>') }} />
                      </div>
                  }
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>

  );
};

export default Post;
