import React, { useState, createContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalLoginState$, modalDKMoi$ } from "../redux/selectors";
import { hideModalDKMoi ,showModalDKMoi } from "../redux/actions";
import Image from "next/image";

function DangKiModal() {
  const dispatch = useDispatch();
  const show = useSelector(modalDKMoi$).isShowDKMoi;

  const handleCloseModal = () => {
    dispatch(hideModalDKMoi());
  };
  const handleAutoLogin = async (e) => {
    const msdn=document.getElementById('msdn').value
    
    console.log(msdn)
      // window.localStorage.setItem("tendv", response.tendv);
      // window.localStorage.setItem("tendv", response.tendv);
  };
  return (
    <>
      {show ? (
        <div className="bg-[#000000b5] justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[1000] outline-none focus:outline-none">
          <div className="modal-dialog relative  pointer-events-none w-[300px]">
            <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
              <div className="modal-body relative p-4 text-center w-full">
                <div className="flex justify-between items-center mb-6">
                 
                  <a className="text-black w-full">
                    <p>Tạo tài khoản mới</p>
                    <input placeholder="Số điện thoại" id="msdn" className="border rounded-md"/>
                  </a>
                </div>
                    <button onClick={(e)=>{handleAutoLogin()}}>Đăng kí</button>

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

export default DangKiModal;
