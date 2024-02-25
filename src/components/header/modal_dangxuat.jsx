import React, { useState, createContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalDangXuat$ } from "../redux/selectors";
import { hideModalDangXuat, createGiohang } from "../redux/actions";
import { useRouter } from "next/router";

function DangXuatModal() {
  const dispatch = useDispatch();
  const show = useSelector(modalDangXuat$).isShowDangXuat;
  const router = useRouter();

  function handleGiohang(e) {
    const params = {
      msdn: localStorage,
    };
    dispatch(createGiohang.createGiohangRequest(params));
  }
  //Logout
  const handleLogout = async () => {
    await router.push("/");
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("msdv");
    window.localStorage.removeItem("tendv");
    window.localStorage.removeItem("msdn");
    window.localStorage.removeItem("tendaidien");
    window.localStorage.removeItem("diachi");
    window.localStorage.removeItem("dienthoai");
    window.localStorage.removeItem("maxa");
    window.localStorage.removeItem("modalhistory");
    window.localStorage.removeItem("history");
    dispatch(hideModalDangXuat());
    location.reload();
  };
  return (
    <>
      {show ? (
        <div className="bg-[#000000b5] justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[1000] outline-none focus:outline-none">
          <div className="modal-dialog relative  pointer-events-none w-[400px] mobile:w-[300px]">
            <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
              <div className="modal-body relative p-4 text-center w-full">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-[22px]">Đồng ý đăng xuất</h2>
                </div>

                <div className="text-right lg:text-right flex justify-end gap-4">
                  <button
                    onClick={() => {
                      handleLogout();
                    }}
                    type="button"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    className=" px-3 py-2 rounded-[5px] bg-red-600 hover:bg-red-500 text-white"
                  >
                    Đồng ý
                  </button>
                  <button
                    onClick={() => {
                      dispatch(hideModalDangXuat());
                    }}
                    type="button"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    className="close_login py-3 mr-5"
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

export default DangXuatModal;
