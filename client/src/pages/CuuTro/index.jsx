import React, { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";
import "./index.scss";
import { Container, Col } from "reactstrap";
import CuuTroItem from "../../components/Item/CuuTroItem";
import axios from "axios";

import { useHistory } from "react-router-dom";
import { seo } from "../../utils/seo";
import LoadingBar from "react-top-loading-bar";
import LoadingVipPro from "../../components/LoadingVipPro";

const CuuTro = (props) => {
  const [post, setPost] = useState([]);

  const history = useHistory();

  async function CallAPI() {
    try {
      loadingRef.current.continuousStart();
      setLoading(true);
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_API}/support/listSupport`
      );
      if (res.data.success) {
        setPost(res.data.supportPost);
        loadingRef.current.complete();
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    seo("Cứu Trợ");
    CallAPI();
  }, []);

  const deletePost = async (_id) => {
    const response = await axios.delete(
      `${process.env.REACT_APP_BASE_API}/support/deletedpost/${_id}`,
      { _id }
    );
    const newPost = post.filter((item) =>
      item._id === response.data._id ? false : true
    );
    setPost(newPost);

    console.log("dlete: ", response);
  };

  const time = new Date();
  const now =
    time.getDate() +
    "/" +
    (time.getUTCMonth() + 1) +
    "/" +
    time.getUTCFullYear() +
    " " +
    `0${time.getHours()}`.slice(-2) +
    ":" +
    `0${time.getMinutes()}`.slice(-2);
  const loadingRef = useRef(null);
  const [loading, setLoading] = useState(false);
  return (
    <div className='CT'>
      <LoadingBar color='black' ref={loadingRef} shadow={true} />
      {loading && <LoadingVipPro />}
      <div className='CT-head'>
        <h5>Các bài cứu trợ được cập nhật lúc : {now}</h5>
        <div className='CT-head-button' onClick={() => history.push("/newPostSupport")}>
          <Button size='medium' variant='contained'>
            Đăng cứu trợ
          </Button>
        </div>
      </div>

      {!loading && (
        <div className='CT-body'>
          <div className='CT-body-left'>
            <div className='CT-body-left-header'>Xem nhanh</div>
            {post.map((post, index) => {
              return (
                <>
                  <CuuTroItem post={post} />
                  {/* <input
                      type='button'
                      value='Delete'
                      className='button-delete'
                      onClick={() => window.location.reload(false) + deletePost(post._id)}
                    /> */}
                </>
              );
            })}
          </div>
          <div className='CT-body-right'>
            <div className='CT-body-right-header'>
              <svg
                width='32'
                height='32'
                viewBox='0 0 32 32'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                  d='M16 0C7.157 0 0 7.156 0 16c0 8.843 7.156 16 16 16 8.843 0 16-7.156 16-16 0-8.843-7.156-16-16-16zm0 29.5C8.539 29.5 2.5 23.462 2.5 16 2.5 8.539 8.538 2.5 16 2.5c7.461 0 13.5 6.038 13.5 13.5 0 7.461-6.038 13.5-13.5 13.5zm11.25-12.083v-4.75c0-.676-.55-1.25-1.25-1.25h-4.75a1.25 1.25 0 1 0 0 2.5h1.732l-3.648 3.649-5.783-5.783a1.25 1.25 0 0 0-1.768 0L5.116 18.45a1.25 1.25 0 0 0 1.768 1.767l5.783-5.782 5.783 5.782a1.25 1.25 0 0 0 1.767 0l4.533-4.532v1.732a1.25 1.25 0 1 0 2.5 0z'
                  fill='#0768EA'
                ></path>
              </svg>{" "}
              Xu hướng
            </div>
            {/* //////////////////-END OF FILE HERE-----DONT SCROLL DOWN-///////////////////////////////// */}

            <div className='CT-body-right-content'>
              <section className='CT-body-right-content-item'>
                <div className='CT-body-right-content-item-rank'>#1</div>
                <div className='CT-body-right-content-item-infor'>
                  <div className='CT-body-right-content-item-infor-title'>
                    Có ai tìm thấy con chó Pug của mình quanh Hồ Tây không ạ, em sắp chết
                    mất
                  </div>
                  <div className='CT-body-right-content-item-infor-author'>Long Dang</div>
                </div>
              </section>
              <section className='CT-body-right-content-item'>
                <div className='CT-body-right-content-item-rank'>#2</div>
                <div className='CT-body-right-content-item-infor'>
                  <div className='CT-body-right-content-item-infor-title'>
                    Bé cún nhà mình năm nay đã 6 tháng tuổi nhưng ăn không tiêu, cần giúp
                    đỡ ạ
                  </div>
                  <div className='CT-body-right-content-item-infor-author'>
                    Chien Pham
                  </div>
                </div>
              </section>
              <section className='CT-body-right-content-item'>
                <div className='CT-body-right-content-item-rank'>#3</div>
                <div className='CT-body-right-content-item-infor'>
                  <div className='CT-body-right-content-item-infor-title'>
                    Mình có bị trộm 1 con khỉ sau vườn vào khoảng chiều nay, bạn nào thấy
                    quanh khu vực Cần Thơ báo mình với ạ
                  </div>
                  <div className='CT-body-right-content-item-infor-author'>
                    Quang dep trai
                  </div>
                </div>
              </section>
              <section className='CT-body-right-content-item'>
                <div className='CT-body-right-content-item-rank'>#4</div>
                <div className='CT-body-right-content-item-infor'>
                  <div className='CT-body-right-content-item-infor-title'>
                    Mình có chú chó Chihuahua bị lạc với chiếc vòng cổ MIka.. có đính kèm
                    số điện thoại ở mặt sau ạ
                  </div>
                  <div className='CT-body-right-content-item-infor-author'>
                    Van Nguyen
                  </div>
                </div>
              </section>
              <section className='CT-body-right-content-item'>
                <div className='CT-body-right-content-item-rank'>#5</div>
                <div className='CT-body-right-content-item-infor'>
                  <div className='CT-body-right-content-item-infor-title'>
                    Trên SNPO có anh nào biết cách trị nấm cho mèo con không ạ, em quá bất
                    lực luôn rồi
                  </div>
                  <div className='CT-body-right-content-item-infor-author'>
                    Hung Nguyen
                  </div>
                </div>
              </section>
              <section className='CT-body-right-content-item'>
                <div className='CT-body-right-content-item-rank'>#6</div>
                <div className='CT-body-right-content-item-infor'>
                  <div className='CT-body-right-content-item-infor-title'>
                    Mình bị lây bệnh ngứa từ mèo sang cho hỏi cách chữa trị nhanh là gì ạ
                    ?
                  </div>
                  <div className='CT-body-right-content-item-infor-author'>Thuy An</div>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CuuTro;
