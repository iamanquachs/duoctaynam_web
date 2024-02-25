import React, { useState, createContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalLoginState$, modalDKMoi$ } from "../redux/selectors";
import { hideModalDKMoi, showModalDKMoi } from "../redux/actions";
import Image from "next/image";
import giohangApi from "@/pages/api/giohangApi";

function DangKiModal() {
  const dispatch = useDispatch();
  const show = useSelector(modalDKMoi$).isShowDKMoi;
  const [dmtinh, setDMTinh] = useState([]);
  const [dmhuyen, setDMHuyen] = useState([]);
  const [dmxa, setDMXa] = useState([]);

  const handleCloseModal = () => {
    dispatch(hideModalDKMoi());
  };
  //todo Thêm thông tin nhận hàng
  const handleAddThongTinNhanHang = async (e) => {
    const msdv = window.localStorage.getItem("msdv");
    const tennguoinhan = document.getElementById("tennguoinhan").value;
    const sodienthoai = document.getElementById("sodienthoai").value;
    const msnn = sodienthoai + Math.floor(1000 + Math.random() * 9000);
    const diachi = document.getElementById("diachi").value;
    const loadtinh = document.getElementById("loadtinh");
    const tinh = loadtinh.options[loadtinh.selectedIndex].text;
    const loadhuyen = document.getElementById("loadhuyen");
    const huyen = loadhuyen.options[loadhuyen.selectedIndex].text;
    const loadxa = document.getElementById("loadxa");
    const xa = loadxa.options[loadxa.selectedIndex].text;
    const maxa=loadxa.options[loadxa.selectedIndex].value;
    try {
      const params = {
        msdv: msdv,
        masonguoinhan:msnn,
        hotennguoinhan: tennguoinhan,
        sodienthoai: sodienthoai,
        diachi: diachi,
        tinh: tinh,
        huyen: huyen,
        xa: xa,
        maxa: maxa,
      };
      await giohangApi.addThongTinNhanHang(params);
    } catch (error) {
      console.log(error);
    }
    handleCloseModal()
  };
  const replaceSDT = (e) => {
    const value = e.target.value.replace(/[^0-9\.\,]/g, "");
    document.getElementById("sodienthoai").value = value;
  };
  //todo load danh mục tỉnh
  useEffect(() => {
    const handleLoadDMTinh = async (e) => {
      try {
        const params = {
          msdv: "",
        };

        const response = await giohangApi.loadDMTinh(params);
        setDMTinh(response);
      } catch (error) {
        console.log(error);
      }
    };
    handleLoadDMTinh();
  }, []);

  //todo Load Huyện
  const handleLoadHuyen = async (e) => {
    var valueTinh = e.target.value;
    try {
      const params = {
        mstinh: valueTinh,
      };
      const response = await giohangApi.loadDMHuyen(params);
      setDMHuyen(response);
    } catch (error) {
      console.log(error);
    }
  };
  //todo Load Xã
  const handleLoadXa = async (e) => {
    var valueHuyen = e.target.value;
    try {
      const params = {
        mshuyen: valueHuyen,
      };
      const response = await giohangApi.loadDMXa(params);
      setDMXa(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {show ? (
        <div className="bg-[#000000b5] justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[1000] outline-none focus:outline-none">
          <div className="modal-dialog relative  pointer-events-none w-[650px]">
            <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
              <div className="modal-body relative p-4 text-center w-full">
                <h1 className="text-xl">Thêm mới thông tin nhận hàng</h1>
                <div className="flex flex-col items-start mb-6 w-full gap-3 mt-4">
                  <div className="w-full">
                    <p className="text-left pb-2 text-[#207820] font-semibold">
                      Tên người nhận
                    </p>
                    <input
                      placeholder="Tên người nhận"
                      id="tennguoinhan"
                      className="border rounded-md  px-3 py-1 w-full  "
                    />
                  </div>
                  <div className="w-full">
                    <p className="text-left pb-2 text-[#207820] font-semibold">
                      Số điện thoại
                    </p>
                    <input
                      placeholder="Số điện thoại"
                      onKeyUp={(e) => {
                        replaceSDT(e);
                      }}
                      maxLength="10"
                      id="sodienthoai"
                      className="border rounded-md  px-3 py-1 w-full"
                    />
                  </div>
                  <div className="w-full">
                    <p className="text-left pb-2 text-[#207820] font-semibold">
                      Địa chỉ
                    </p>
                    <input
                      placeholder="Số nhà"
                      id="diachi"
                      className="border rounded-md  px-3 py-1 w-full"
                    />
                    <div className="grid grid-cols-3 mt-4 gap-2">
                      <div className="col-span-1 border-[2px] rounded-md">
                        <select
                          id="loadtinh"
                          onChange={(e) => {
                            handleLoadHuyen(e);
                          }}
                        >
                          <option>Tỉnh</option>
                          {dmtinh?.map((tinh, key) => {
                            return (
                              <option value={tinh.matinh}>
                                {tinh.tentinh}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="col-span-1 border-[2px] rounded-md">
                        <select
                          id="loadhuyen"
                          onChange={(e) => {
                            handleLoadXa(e);
                          }}
                        >
                          <option>Huyện</option>
                          {dmhuyen?.map((huyen, key) => {
                            return (
                              <option value={huyen.mahuyen}>
                                {huyen.tenhuyen}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="col-span-1 border-[2px] rounded-md">
                        <select id="loadxa">
                          <option>Xã</option>
                          {dmxa?.map((xa, key) => {
                            return <option value={xa.maxa}>{xa.tenxa}</option>;
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-right lg:text-right flex justify-end">
                  <button
                    onClick={(e) => {
                      handleAddThongTinNhanHang();
                    }}
                    type="button"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    className="hover:cursor-pointer text-[white] bg-[green] rounded-[5px] p-[8px] px-5 mr-3"
                  >
                    Thêm
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

export default DangKiModal;
