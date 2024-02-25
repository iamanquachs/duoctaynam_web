import React, { useState, useEffect } from "react";
import dathangApi from "../../pages/api/dathangApi";
import giohangApi from "../../pages/api/giohangApi";
import { useDispatch } from "react-redux";
import { createGiohang } from "../redux/actions";
import Image from "next/image";

const GioHangItem = (prop) => {
  const giohangItem = prop.giohangItem;
  const itemSL = giohangItem.soluong;
  const isChecked = prop.isChecked;
  const handleClick = prop.handleClick;
  const index = prop.index;
  const [showModal, setShowModal] = useState(false);
  const [localStorage, setStatus] = useState();
  const dispatch = useDispatch();
  const [soluong, setSoluong] = useState(1);
  useEffect(() => {
    setStatus(window.localStorage.getItem("msdn"));
  }, []);
  function handleGiohang(e) {
    const params = {
      msdn: localStorage,
    };
    dispatch(createGiohang.createGiohangRequest(params));
  }

  const handleAdd_KM = async () => {
    try {
      const params = {
        msdn: localStorage,
      };
      await giohangApi.add_hanghoa_km(params);

      handleGiohang();
    } catch (error) {
      console.log(error);
    }
  };

  function soluong_tang(index, e) {
    const soluong_input = parseFloat(
      document.getElementsByClassName(index)[0].value
    );
    var mshh = giohangItem.mshh,
      dvt = giohangItem.dvt,
      ptgiam = giohangItem.ptgiam;
    var soluong_new = Number(soluong_input) + 1;
    document.getElementsByClassName(index)[0].value = soluong_new;
    const handleUpdate_dathangline = async (e) => {
      try {
        const params = {
          msdn: localStorage,
          mshh: mshh,
          soluong: soluong_new,
          dvt: dvt,
          ptgiam: ptgiam,
        };
        setSoluong(soluong_new);
        await dathangApi.update_dathangline(params);
        handleAdd_KM();
      } catch (error) {
        console.log(error);
      }
    };
    handleUpdate_dathangline();
  }
  function soluong_giam(index, e) {
    const soluong_input = parseFloat(
      document.getElementsByClassName(index)[0].value
    );
    var mshh = giohangItem.mshh,
      dvt = giohangItem.dvt,
      ptgiam = giohangItem.ptgiam;
    if (soluong_input > 1) {
      var soluong_new = Number(soluong_input) - 1;
      document.getElementsByClassName(index)[0].value = soluong_new;
      const handleUpdate_dathangline = async (e) => {
        try {
          const params = {
            msdn: localStorage,
            mshh: mshh,
            soluong: soluong_new,
            dvt: dvt,
            ptgiam: ptgiam,
          };
          setSoluong(soluong_new);
          await dathangApi.update_dathangline(params);
          handleAdd_KM();
        } catch (error) {
          console.log(error);
        }
      };
      handleUpdate_dathangline();
    }
  }

  function cart_delete(index, e) {
    var msdn = e.msdn,
      rowid = e.rowid;

    const handleDathangDelete = async (e) => {
      try {
        const params = {
          msdn: msdn,
          rowid: rowid,
        };
        await dathangApi.dathangline_delete(params);
        handleGiohang();
        setShowModal(false);
      } catch (error) {
        console.log(error);
      }
    };
    handleDathangDelete();
  }

  const link = "https://erp.duoctaynam.vn/upload/sanpham/";
  return (
    <>
      <tr
        id="sanpham_giohang"
        className="sanpham_giohang mobile:border-b-[1px] "
      >
        <td>
          <div className="flex justify-center">
            <div>
              <div className="form-check">
                <input
                  className="cart_item_check form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-green-600 checked:border-green-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="checkbox"
                  value={giohangItem.rowid}
                  id="item_check"
                  name={"item_" + index}
                  onChange={handleClick}
                  defaultChecked={isChecked}
                />
              </div>
            </div>
          </div>
        </td>
        <td className=" pl-5 tablet:pl-3 smlap:pl-3 font-light text-sm mobile:hidden">
          <p>{giohangItem.tenhh}</p>
        </td>
        <td className="item_giohang mobile:hidden tablet:hidden smlap:hidden lglap:hidden">
          <p>
            {giohangItem.giagoc
              .toString()
              .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}{" "}
            đ/{giohangItem.dvt}
          </p>
        </td>
        <td className="item_giohang p-4 smlap:p-2 lglap:p-2 mobile:p-0 mobile:leading-5 mobile:py-2">
          <div className="grid grid-cols-12 gap-5 fullscreen:hidden smlap:hidden lglap:hidden tablet:hidden leading-7 ">
            <p className="col-span-4 text-black text-right">Sản phẩm</p>
            <p className="col-span-8">
              <p className="w-full whitespace-break-spaces mobile:line-clamp-2 mobile:text-[green] tablet:text-[green] font-inter_semibold">
                {giohangItem.tenhh}
              </p>
            </p>
          </div>
          <div className="grid grid-cols-12 gap-5 fullscreen:hidden smlap:hidden lglap:hidden tablet:hidden  leading-7">
            <p className="col-span-4 text-black text-right">Giá gốc</p>
            <p className="col-span-8">
              {giohangItem.giagoc
                .toString()
                .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}{" "}
              đ/{giohangItem.dvt}
            </p>
          </div>
          <div className="mobile:w-full flex gap-5 mobile:grid mobile:grid-cols-12 mobile:gap-5 tablet:block smlap:block lglap:block leading-7">
            <p className="col-span-4 text-black text-right fullscreen:hidden smlap:hidden lglap:hidden tablet:hidden ">
              Số lượng
            </p>
            <p className="fullscreen:hidden  mobile:hidden tablet:pb-2 smlap:pb-2 lglap:pb-2">
              {giohangItem.giagoc
                .toString()
                .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}{" "}
              đ/{giohangItem.dvt}
            </p>
            <div className=" mobile:col-span-8 col-span-12 mobile:max-w-[60%]">
              {giohangItem.spctkm == 1 ? (
                <div className="soluong">
                  <button>
                    <Image
                      src={require("../../pages/assets/img/icon/minus.png")}
                    ></Image>
                  </button>
                  <input
                    className={
                      "input_sl w-10 text-[16px] text-center outline-none btn_sl_" +
                      giohangItem.tenhh
                    }
                    value={itemSL}
                    readOnly
                  ></input>
                  <button>
                    <Image
                      src={require("../../pages/assets/img/icon/plus.png")}
                    ></Image>
                  </button>
                </div>
              ) : (
                <div className="soluong">
                  <button
                    onClick={(e) =>
                      soluong_giam("btn_sl_" + giohangItem.tenhh, e)
                    }
                  >
                    <Image
                      src={require("../../pages/assets/img/icon/minus.png")}
                    ></Image>
                  </button>
                  <input
                    className={
                      "input_sl w-10 text-[16px] text-center outline-none btn_sl_" +
                      giohangItem.tenhh
                    }
                    value={itemSL}
                    readOnly
                  ></input>
                  <button
                    onClick={(e) =>
                      soluong_tang("btn_sl_" + giohangItem.tenhh, e)
                    }
                  >
                    <Image
                      src={require("../../pages/assets/img/icon/plus.png")}
                    ></Image>
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="fullscreen:hidden smlap:hidden lglap:hidden tablet:hidden leading-7 ">
            <div className="grid grid-cols-12 gap-5">
              <p className="col-span-4 text-black text-right">Thành tiền</p>
              <p className="col-span-8">
                {" "}
                {(giohangItem.giagoc * giohangItem.soluong)
                  .toString()
                  .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
              </p>
            </div>

            <div className="grid grid-cols-12 gap-5 leading-7">
              <p className="col-span-4 text-black text-right">Chiết khấu</p>
              <p className="col-span-8">
                {(
                  giohangItem.giagoc * giohangItem.soluong -
                  giohangItem.thanhtien
                )
                  .toString()
                  .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.") +
                  " (" +
                  giohangItem.ptgiam +
                  "%)"}
              </p>
            </div>
            <div className="grid grid-cols-12 gap-5 leading-7">
              <p className="col-span-4 text-black text-right">Thanh toán</p>
              <p className="col-span-8 text-[red]  font-inter_semibold">
                {giohangItem.thanhtienvat
                  .toString()
                  .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
              </p>
            </div>
          </div>
        </td>
        <td className="item_giohang mobile:hidden">
          {(giohangItem.giagoc * giohangItem.soluong)
            .toString()
            .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
        </td>
        <td className="item_giohang mobile:hidden ">
          {(giohangItem.giagoc * giohangItem.soluong - giohangItem.thanhtien)
            .toString()
            .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.") +
            " (" +
            giohangItem.ptgiam +
            "%)"}
        </td>
        <td className="item_giohang mobile:hidden text-[red]">
          {giohangItem.thanhtienvat
            .toString()
            .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
        </td>
        <td
          className="item_giohang min-w-[20px] smlap:min-w-[35px] lglap:min-w-[35px] mobile:min-w-[35px]"
          onClick={(e) => setShowModal(true)}
        >
          <Image src={require("../../pages/assets/img/icon/trash.png")} />
        </td>
      </tr>
      {showModal ? (
        <div className="bg-[#000000b5] justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[1000] outline-none focus:outline-none">
          <div className="modal-dialog relative pointer-events-none w-[400px]">
            <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current ">
              <div className="modal-body relative p-4 w-[400px]">
                <div className="px-4 text-center">
                  <h3 className="mb-5 text-lg font-normal">
                    Đồng ý xóa {giohangItem.tenhh}?
                  </h3>
                  <div className="flex justify-end">
                    <button
                      onClick={(e) => cart_delete(index, giohangItem)}
                      data-modal-hide="popup-modal"
                      type="button"
                      className="text-white bg-red-600 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                    >
                      Đồng ý
                    </button>
                    <button
                      onClick={() => setShowModal(false)}
                      data-modal-hide="popup-modal"
                      type="button"
                      className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    >
                      Đóng
                    </button>
                  </div>
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
};

export default GioHangItem;
