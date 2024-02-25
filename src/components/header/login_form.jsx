import React, { useState, useEffect } from "react";
import userApi from "../../pages/api/userApi";
import { useDispatch } from "react-redux";
import {
  createGiohang,
  showModal,
  showModalDangXuat,
  isLogin,
} from "../redux/actions";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

function LoginForm(prop) {
  const [localStorage, setStatus] = useState();
  const [localStorage_Tendv, setTendv] = useState();
  const [openModal, setOpenModal] = useState(false);

  const [openWarning, setOpenWarning] = useState(false);
  const dispatch = useDispatch();
  const statusLogin = dispatch(isLogin());
  useEffect(() => {
    setStatus(window.localStorage.getItem("msdn"));
    setTendv(window.localStorage.getItem("tendv"));
  }, [statusLogin]);

  useEffect(() => {
    const handleGiohangAuto = (e) => {
      const params = {
        msdn: localStorage,
      };
      dispatch(createGiohang.createGiohangRequest(params));
    };
    handleGiohangAuto();
  }, [localStorage]);
  //Logout

  const handleCloseModal = () => {
    setOpenModal(false);
    setOpenWarning(false);
  };
  return (
    <>
      {!localStorage ? (
        <button
          className="uppercase"
          onClick={(e) => dispatch(showModal())}
          type="button"
        >
          Đăng nhập
        </button>
      ) : (
        <div className="flex justify-center">
          <div>
            <div className="relative" data-te-dropdown-ref>
              <Link
                className="flex items-left whitespace-nowrap rounded   font-medium uppercase leading-normal text-[#CC0000]   transition duration-150 ease-in-out "
                href="/cart"
                type="button"
              >
                {localStorage_Tendv}
              </Link>
            </div>
          </div>
        </div>
      )}
      {openModal ? (
        <div className="bg-[#000000b5] justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[1000] outline-none focus:outline-none">
          <div className="modal-dialog relative w-auto pointer-events-none">
            <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
              <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                <h5
                  className="text-xl font-medium leading-normal text-gray-800"
                  id="exampleModalLabel"
                >
                  Đăng nhập bằng tài khoản nhà thuốc (egpp.vn)
                </h5>
                <button
                  onClick={handleCloseModal}
                  type="button"
                  className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body relative p-4">
                {openWarning ? (
                  <p className="text-[#CC0000]">Tài khoản không tồn tại</p>
                ) : (
                  ""
                )}
                <div className="mb-6">
                  <input
                    onChange={(e) => e.target.value}
                    type="text"
                    className="input_login"
                    id="msdn"
                    placeholder="Số điện thoại"
                  />
                </div>

                <div className="mb-6">
                  <input
                    onChange={(e) => e.target.value}
                    type="password"
                    className="input_login"
                    id="matkhau"
                    placeholder="Password"
                  />
                </div>

                <div className="flex justify-between items-center mb-6">
                  <a
                    href="https://egpp.vn/tpspharma_login"
                    className="text-gray-800"
                  >
                    Đăng nhập nhanh bằng egpp.vn
                  </a>
                </div>

                <div className="text-center lg:text-left flex justify-between">
                  <button
                    onClick={handleLogin}
                    type="submit"
                    className="btn_login"
                  >
                    Đăng nhập
                  </button>
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

export default LoginForm;
