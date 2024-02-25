import React, { useState, createContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalImage$ } from "../redux/selectors";
import { hideModalImage } from "../redux/actions";
import Image from "next/image";
import hanghoaApi from "../../pages/api/hanghoaApi";

function LoginModal(prop) {
  const img_hanghoa = prop.postImg;
  const itemImag = prop.itemImag;
  console.log(itemImag);
  const img_childs = img_hanghoa.path_image_child;
  const linkImg_child = "https://api.duoctaynam.vn/upload/anhmota/";

  const dispatch = useDispatch();

  const show = useSelector(modalImage$).isShow;
  const handleCloseModal = () => {
    dispatch(hideModalImage());
  };
  const selectImg = (e) => {
    console.log(e);
  };
  return (
    <>
      {show ? (
        <div className="bg-[#000000b5] justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[1000] outline-none focus:outline-none">
          <div className="modal-dialog relative  pointer-events-none w-[600px] mobile:w-[400px]">
            <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
              <div className="modal-body relative p-4 text-center w-full">
                <div className="">
                  <p>{img_hanghoa.tenhh}</p>
                  <Image
                    className="rounded-xl"
                    src={require(`../../../../Backend/upload/sanpham/${img_hanghoa.path_image}`)}
                    alt={img_hanghoa.path_image}
                  />
                </div>
                <div className="grid grid-cols-12 h-[100px] items-center gap-4">
                  {img_childs
                    ? img_childs.split("|").map((img_child, key) => {
                        return (
                          <div className="col-span-3">
                            <div className="">
                              <Image
                                onClick={(e) => {
                                  selectImg(e);
                                }}
                                className="rounded-sm "
                                name={linkImg_child + `${img_child}`}
                                src={linkImg_child + `${img_child}`}
                                alt={img_child}
                                width={400}
                                height={400}
                              />
                            </div>
                          </div>
                        );
                      })
                    : ""}
                </div>

                <div className="text-right lg:text-right flex justify-end">
                  <button
                    onClick={handleCloseModal}
                    type="button"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    className="close_login"
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default LoginModal;
