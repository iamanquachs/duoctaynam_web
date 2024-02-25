import React, { useState, createContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalLoginState$ } from "../redux/selectors";
import {
  hideModal,
  showModalDKMoi,
  createGiohang,
  isLogin,
} from "../redux/actions";
import Image from "next/image";
import { useRouter } from "next/router";
import dathangApi from "../../pages/api/dathangApi";
import danhmucApi from "../../pages/api/danhmucApi";

function LoginModal() {
  const dispatch = useDispatch();
  const show = useSelector(modalLoginState$).isShow;
  const [openWarning, setOpenWarning] = useState(false);
  const [localStorage, setStatus] = useState();
  const [localStorage_MSDV, setMSDV] = useState();
  const [checkSDT, setCheckSDT] = useState("");
  const [localStorage_SDT, setSDT] = useState();

  useEffect(() => {
    setStatus(window.localStorage.getItem("msdn"));
    setMSDV(window.localStorage.getItem("msdv"));
    setSDT(window.localStorage.getItem("dienthoai"));
  }, []);
  const handleCloseModal = () => {
    dispatch(hideModal());
    setOpenWarning(false);
  };
  // const handleOpenModalDangKi = () => {
  //   dispatch(hideModal());
  //   dispatch(showModalDKMoi());
  // };
  function handleGiohang(e) {
    const params = {
      msdn: localStorage,
    };
    dispatch(createGiohang.createGiohangRequest(params));
  }

  const handleSignIn = async (e) => {
    const msdn = await document.getElementById("msdn").value;

    //add vào giỏ khi đăng nhập xong
    const giohang = window.localStorage.getItem("order");
    if (msdn != "" || msdn.length < 10) {
      document.getElementById("_warning").classList.add("hidden");
      var egpp;
      const ktraEGPP = async () => {
        var myHeaders = new Headers();
        myHeaders.append(
          "Authorization",
          "bearer eyJ0eXAi.iJKV1QiLCJhbGci.iJIUzI1NiJ9OeyJtc2R2IjoiMjIwMjIwMTA1NDA2MzciLCJtc2RuIjoiMDkwNzY3.DIzNCIsInRlbmR2IjoiTkhcdTAwYzAgVEhVXHUxZWQwQyBBTiBUXHUwMGMyTSIsImV4cGlyZWQi.jE3MDk2NTE1MDB9OaIWRy7MMe9EF_QpAar-_qFA.SStlFm4NriftyIcNkzU"
        );
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append(
          "Cookie",
          "PHPSESSID=386847b020e7de407fecd201ab02f8a4"
        );

        var raw = JSON.stringify({
          sdt: msdn,
        });

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        await fetch("https://egpp.vn/api_tmdt/tracuu_sdt", requestOptions)
          .then((response) => response.text())
          .then((result) => (egpp = JSON.parse(result)))
          .catch((error) => console.log("error", error));
      };
      await ktraEGPP();
      if (egpp != "") {
        window.localStorage.setItem("msdn", msdn);
        window.localStorage.setItem("dienthoai", msdn);
        window.localStorage.setItem("tendv", egpp[0].tendv);
        window.localStorage.setItem("diachi", egpp[0].diachi);
        window.localStorage.setItem("maxa", egpp[0].msxa);
        window.localStorage.setItem("tendaidien", egpp[0].tendaidien);
        window.localStorage.setItem("msdv", egpp[0].msdv);
      } else {
        const ktraMSDNfromThongTin = async () => {
          const params = {
            msdn: msdn,
          };
          const checkMSDNfromXuatKho = await danhmucApi.checkMSDN(params);
          if (checkMSDNfromXuatKho.length > 0) {
            window.localStorage.setItem("msdn", msdn);
            window.localStorage.setItem("dienthoai", msdn);
            window.localStorage.setItem(
              "tendv",
              checkMSDNfromXuatKho[0].tenkhachhang
            );
            window.localStorage.setItem(
              "diachi",
              checkMSDNfromXuatKho[0].diachi
            );
            window.localStorage.setItem("maxa", checkMSDNfromXuatKho[0].maxa);
            window.localStorage.setItem("msdv", checkMSDNfromXuatKho[0].msdv);
          } else {
            window.localStorage.setItem("msdn", msdn);
            window.localStorage.setItem("dienthoai", msdn);
            window.localStorage.setItem("tendv", msdn);
            window.localStorage.setItem("msdv", msdn);
          }
        };
        ktraMSDNfromThongTin();
      }
      if (giohang) {
        const handleDathang = async (e) => {
          const order = giohang.split("|");
          if (order != "" && order != undefined) {
            try {
              const params = {
                msdv: "",
                msdn: msdn,
                mshh: order[0],
                tenhh: order[1],
                mshhnpp: order[2],
                dvt: order[3],
                msnpp: order[4],
                pttichluy: order[5],
                thuesuat: order[6],
                soluong: order[7],
                gianhap: order[8],
                ptgiam: order[9],
                msctkm: order[10],
              };
              await dathangApi.dathangline_add(params);
              window.localStorage.removeItem("order");
            } catch (error) {
              console.log(error);
            }
          }
        };
        handleDathang();
      }
      dispatch(isLogin(true));
      dispatch(hideModal());
      handleGiohang();
      setTimeout(() => {
        location.reload();
      }, 1000);
    } else {
      document.getElementById("_warning").classList.remove("hidden");
    }
  };
  const replaceSDT = (e) => {
    const value = e.target.value.replace(/[^0-9\.\,]/g, "");
    document.getElementById("msdn").value = value;
  };

  return (
    <>
      {show ? (
        <div className="bg-[#000000b5] justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[1000] outline-none focus:outline-none">
          <div className="modal-dialog relative  pointer-events-none w-[550px] mobile:w-[300px]">
            <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
              <div className="modal-body relative p-4 text-center w-full">
                <div className="flex justify-between mobile:block mb-6">
                  <a className="text-black w-full ">
                    <p
                      onClick={(e) =>
                        (window.location.href =
                          "https://egpp.vn/tpspharma_login")
                      }
                    >
                      Nhấn vào đây để đăng nhập bằng
                    </p>
                    <p
                      className="text-center pt-[20px] hover:cursor-pointer "
                      onClick={(e) =>
                        (window.location.href =
                          "https://egpp.vn/tpspharma_login")
                      }
                    >
                      <Image
                        className="m-auto"
                        src={require("../../pages/assets/img/icon/logo_ephamarcy.png")}
                      ></Image>
                    </p>
                  </a>
                  <span className="border border-[#ddd] ml-[10px] h-[80px] mobile:hidden "></span>
                  <div className="my-[10px] fullscreen:hidden smlap:hidden lglap:hidden tablet:hidden italic text-[red] ">
                    Hoặc
                  </div>
                  <a className="text-black w-full">
                    <p>Số điện thoại đặt hàng</p>
                    <p
                      id="_warning"
                      className="text-[red] hidden italic text-[14px]
                    "
                    >
                      Chưa nhập số điện thoại
                    </p>
                    <input
                      placeholder="Số điện thoại"
                      id="msdn"
                      onKeyUp={(e) => {
                        replaceSDT(e);
                      }}
                      maxLength="10"
                      className="relative text-center mt-[20px] ml-[10px] hover:cursor-pointer border border-[green] rounded-[30px] p-[5px] px-[20px]"
                    />

                    <button
                      onClick={(e) => {
                        handleSignIn();
                      }}
                      className="absolute hidden right-[10px] text-[12px] text-center mt-[20px] hover:cursor-pointer text-[white] bg-[green] rounded-[30px] p-[5px]"
                    >
                      Đồng ý
                    </button>
                  </a>
                </div>

                <div className="text-right lg:text-right flex justify-end gap-3">
                  <button
                    onClick={(e) => {
                      handleSignIn();
                    }}
                    type="button"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    className="hover:cursor-pointer text-[white] bg-[green] rounded-[5px] p-[10px]"
                  >
                    Đồng ý
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

export default LoginModal;
