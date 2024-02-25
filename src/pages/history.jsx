import React, { useState, useEffect } from "react";
import dathangApi from "./api/dathangApi";
import giohangApi from "./api/giohangApi";
import OTP from "@/components/otp/otp";
import { modalHistory$, history$ } from "@/components/redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import { isHistory, isLogin } from "@/components/redux/actions";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Head from "next/head";

function History() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const dispatch = useDispatch();
  const statusLogin = dispatch(isLogin());
  const showModalHistory = useSelector(modalHistory$).isShowHistory;
  const showBodyHistory = useSelector(history$).isHistory;
  const [localStorage, setStatus] = useState("");
  const [local_msdv, setMSDV] = useState("");
  const [loadDHHeader, setDHHeader] = useState([]);
  const [loadDHLine, setDHLine] = useState([]);
  const [loadHistory, setHistory] = useState([]);
  const [ValueModalHistory, setValueModalHistory] = useState([]);
  const [QRthanhtoan, setQRThanhtoan] = useState([]);
  const [soct_dh, setSoCT] = useState();
  // const [modalHistory, setModalHistory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showBody, setShowBody] = useState(true);
  const [modalLS, setModalLS] = useState(false);
  const [formThanhtoan, setFormThanhtoan] = useState(false);
  const [chuathanhtoan, setChuaThanhtoan] = useState(0);
  const [tientichluy, setTienTichLuy] = useState(0);
  const [chitiettichluy, setChitietTichLuy] = useState([]);
  const [tungay, setTungay] = useState(new Date());
  const [denngay, setDenngay] = useState(new Date());
  const [value_timkiem, setValueFilter] = useState("");
  const link_qr = "https://erp.duoctaynam.vn/upload/qr_thanhtoan/";
  // const link_qr = "https://localhost/2023/TPSPharma/Admin/upload/qr_thanhtoan/";
  useEffect(() => {
    setHistory(window.localStorage.getItem("history"));
    // setModalHistory(window.localStorage.getItem("modalhistory"));
    setStatus(window.localStorage.getItem("msdn"));
    setMSDV(window.localStorage.getItem("msdv"));
  }, [showBodyHistory]);

  useEffect(() => {
    const listdathangHeader = async (e) => {
      //tungay
      let month_tungay = tungay.getMonth() + 1;
      let day_tungay = tungay.getDate();
      if (month_tungay < 10) month_tungay = "0" + month_tungay;
      if (day_tungay < 10) day_tungay = "0" + day_tungay;
      var value_tungay =
        tungay.getFullYear() + "-" + month_tungay + "-" + day_tungay;
      //denngay
      let month_denngay = denngay.getMonth() + 1;
      let day_denngay = denngay.getDate();
      if (month_denngay < 10) month_denngay = "0" + month_denngay;
      if (day_denngay < 10) day_denngay = "0" + day_denngay;
      var value_denngay =
        denngay.getFullYear() + "-" + month_denngay + "-" + day_denngay;
      try {
        const params = {
          mskh: local_msdv,
          value_filter: "",
          value_tungay: value_tungay,
          value_denngay: value_denngay,
          thanhtoan: "",
          trangthai: "",
        };
        const response = await dathangApi.listdathanghead(params);
        setDHHeader(response);
      } catch (error) {
        console.log(error);
      }
    };
    listdathangHeader();
  }, [local_msdv]);

  useEffect(() => {
    //! tổng tiền tích lũy
    const Load_tien_tichluy = async (e, value) => {
      try {
        const params = {
          mskh: local_msdv,
        };
        const response = await giohangApi.load_tien_tichluy(params);
        setTienTichLuy(response[0].sotien);
        //todo load chi tiết thông tin nhận hàng khi chỉnh sửa
      } catch (error) {
        console.log(error);
      }
    };
    Load_tien_tichluy();
  }, [local_msdv, tientichluy]);

  useEffect(() => {
    //! chi tiết tích lũy
    const get_chitiet_tichluy = async (e) => {
      try {
        const params = {
          mskh: local_msdv,
        };
        const response = await dathangApi.get_chitiet_tichluy(params);
        setChitietTichLuy(response);
      } catch (error) {
        console.log(error);
      }
    };
    get_chitiet_tichluy();
  }, [local_msdv]);

  useEffect(() => {
    //! Chưa thanh toán
    const get_chuathanhtoan = async (e) => {
      try {
        const params = {
          mskh: local_msdv,
        };
        const response = await dathangApi.get_chuathanhtoan(params);
        setChuaThanhtoan(response[0].chuathanhtoan);
      } catch (error) {
        console.log(error);
      }
    };
    get_chuathanhtoan();
  }, [local_msdv, chuathanhtoan]);
  const handleLoadDHLine = async (soct, key) => {
    document.querySelectorAll("tbody tr").forEach(function (elem) {
      elem.classList.remove("activeHistory");
    });
    const e = document.getElementById(key);
    e.classList.add("activeHistory");
    try {
      const params = {
        soct: soct,
      };
      const response = await dathangApi.listdathangline(params);
      setDHLine(response);
    } catch (error) {
      console.log(error);
    }
  };
  function formatDateVN(dateString) {
    var subDateStr = dateString.split("-");
    return subDateStr[2] + "-" + subDateStr[1] + "-" + subDateStr[0];
  }

  useEffect(() => {
    const handlecheckUserEGPP = async () => {
      var myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "bearer eyJ0eXAi.iJKV1QiLCJhbGci.iJIUzI1NiJ9OeyJtc2R2IjoiMjIwMjIwMTA1NDA2MzciLCJtc2RuIjoiMDkwNzY3.DIzNCIsInRlbmR2IjoiTkhcdTAwYzAgVEhVXHUxZWQwQyBBTiBUXHUwMGMyTSIsImV4cGlyZWQi.jE3MDk2NTE1MDB9OaIWRy7MMe9EF_QpAar-_qFA.SStlFm4NriftyIcNkzU"
      );
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Cookie", "PHPSESSID=386847b020e7de407fecd201ab02f8a4");
      if (localStorage != "") {
        var raw = JSON.stringify({
          sdt: localStorage,
        });
        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        await fetch("https://egpp.vn/api_tmdt/tracuu_sdt", requestOptions)
          .then((response) => response.text())
          .then((result) => {
            if (JSON.parse(result) != "") {
              window.localStorage.setItem("history", "show");
              window.localStorage.setItem("modalhistory", "hidden");
            }
            if (window.localStorage.getItem("modalhistory") != "hidden") {
              setShowModal(true);
            }
            if (window.localStorage.getItem("history") == "show") {
              setShowBody(false);
            }
          })
          .catch((error) => console.log("error", error));
      }
    };

    handlecheckUserEGPP();
  }, [localStorage]);

  //! Load QR thanh toán
  const handalLoad_qrthanhtoan = async (e) => {
    try {
      const params = {
        soct: e,
      };
      const response = await dathangApi.load_qr_thanhtoan(params);
      setQRThanhtoan(response);
      setSoCT(e);
    } catch (error) {
      console.log(error);
    }
  };
  //! Load lịch sử thanh toán
  const handalLoad_LS = async (e) => {
    try {
      const params = {
        soct: e,
      };
      const response = await dathangApi.load_sct_thuchi(params);
      const soct = response[0].soct;
      try {
        const params = {
          soct: soct,
        };
        const response = await dathangApi.listChitietThuChiHistory(params);
        setValueModalHistory(response);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //! set trạng thái thanh toán bằng 1
  const handle_dathanhtoan = async (e) => {
    try {
      const params = {
        soct: e,
      };
      const response = await dathangApi.update_trangthaithanhtoan(params);
      setModalLS(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    var now = new Date();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    if (month < 10) month = "0" + (month - 3);
    if (day < 10) day = "0" + day;
    var today = now.getFullYear() + "-" + month + "-" + day;
    setTungay(new Date(today));
  }, []);

  const handleTungay = (date) => {
    setTungay(date);
    const handle_filter = async (e) => {
      //input tìm kiếm
      const value_filter = document.getElementById("value_timkiem").value;
      //tungay
      let month_tungay = date.getMonth() + 1;
      let day_tungay = date.getDate();
      if (month_tungay < 10) month_tungay = "0" + month_tungay;
      if (day_tungay < 10) day_tungay = "0" + day_tungay;
      var value_tungay =
        date.getFullYear() + "-" + month_tungay + "-" + day_tungay;
      //denngay
      let month_denngay = denngay.getMonth() + 1;
      let day_denngay = denngay.getDate();
      if (month_denngay < 10) month_denngay = "0" + month_denngay;
      if (day_denngay < 10) day_denngay = "0" + day_denngay;
      var value_denngay =
        denngay.getFullYear() + "-" + month_denngay + "-" + day_denngay;
      //thanhtoan
      var e = document.getElementById("loai_thanhtoan");
      var thanhtoan = e.options[e.selectedIndex].value;
      //trangthai
      var e = document.getElementById("loai_trangthai");
      var trangthai = e.options[e.selectedIndex].value;
      try {
        const params = {
          mskh: local_msdv,
          value_filter: value_filter,
          value_tungay: value_tungay,
          value_denngay: value_denngay,
          thanhtoan: thanhtoan,
          trangthai: trangthai,
        };
        const response = await dathangApi.listdathanghead(params);
        setDHHeader(response);
      } catch (error) {
        console.log(error);
      }
    };
    handle_filter();
  };
  const handleDenngay = (date) => {
    setDenngay(date);
    const handle_filter = async (e) => {
      //input tìm kiếm
      const value_filter = document.getElementById("value_timkiem").value;
      //tungay
      let month_tungay = tungay.getMonth() + 1;
      let day_tungay = tungay.getDate();
      if (month_tungay < 10) month_tungay = "0" + month_tungay;
      if (day_tungay < 10) day_tungay = "0" + day_tungay;
      var value_tungay =
        tungay.getFullYear() + "-" + month_tungay + "-" + day_tungay;
      //denngay
      let month_denngay = date.getMonth() + 1;
      let day_denngay = date.getDate();
      if (month_denngay < 10) month_denngay = "0" + month_denngay;
      if (day_denngay < 10) day_denngay = "0" + day_denngay;
      var value_denngay =
        date.getFullYear() + "-" + month_denngay + "-" + day_denngay;
      //thanhtoan
      var e = document.getElementById("loai_thanhtoan");
      var thanhtoan = e.options[e.selectedIndex].value;
      //trangthai
      var e = document.getElementById("loai_trangthai");
      var trangthai = e.options[e.selectedIndex].value;
      try {
        const params = {
          mskh: local_msdv,
          value_filter: value_filter,
          value_tungay: value_tungay,
          value_denngay: value_denngay,
          thanhtoan: thanhtoan,
          trangthai: trangthai,
        };
        const response = await dathangApi.listdathanghead(params);
        setDHHeader(response);
      } catch (error) {
        console.log(error);
      }
    };
    handle_filter();
  };

  const handle_filter = async (e) => {
    //input tìm kiếm
    const value_filter = document.getElementById("value_timkiem").value;
    //tungay
    let month_tungay = tungay.getMonth() + 1;
    let day_tungay = tungay.getDate();
    if (month_tungay < 10) month_tungay = "0" + month_tungay;
    if (day_tungay < 10) day_tungay = "0" + day_tungay;
    var value_tungay =
      tungay.getFullYear() + "-" + month_tungay + "-" + day_tungay;
    //denngay
    let month_denngay = denngay.getMonth() + 1;
    let day_denngay = denngay.getDate();
    if (month_denngay < 10) month_denngay = "0" + month_denngay;
    if (day_denngay < 10) day_denngay = "0" + day_denngay;
    var value_denngay =
      denngay.getFullYear() + "-" + month_denngay + "-" + day_denngay;
    //thanhtoan
    var e = document.getElementById("loai_thanhtoan");
    var thanhtoan = e.options[e.selectedIndex].value;
    //trangthai
    var e = document.getElementById("loai_trangthai");
    var trangthai = e.options[e.selectedIndex].value;
    try {
      const params = {
        mskh: local_msdv,
        value_filter: value_filter,
        value_tungay: value_tungay,
        value_denngay: value_denngay,
        thanhtoan: thanhtoan,
        trangthai: trangthai,
      };
      const response = await dathangApi.listdathanghead(params);
      setDHHeader(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/Logo_TPSPharma_mini.png" />
      </Head>
      <div className="bg-[#edf0f3] ">
        <div className="container mx-auto py-5 ">
          {!showModalHistory || !showBodyHistory ? (
            <div></div>
          ) : (
            <button
              onClick={() => dispatch(isHistory(true))}
              className="bg-green-600 text-white p-3 rounded-lg mb-3"
            >
              Nhập OTP để xem lịch sử
            </button>
          )}
          {!showBody ? (
            <div className="grid grid-cols-12 gap-6 ">
              <div className="relative overflow-x-auto mobile:px-2 col-span-8 mobile:col-span-12 ">
                <div className="flex ">
                  <div className="pb-3  font-bold">
                    <h2>Lịch sử đơn hàng |</h2>
                  </div>

                  <span className="text-[red]">
                    Chưa thanh toán:{" "}
                    {chuathanhtoan
                      ?.toString()
                      .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
                  </span>
                </div>
                <div className="pb-4 flex justify-between bg-white mb-3 rounded-sm px-2 shadow-sm mobile:flex-wrap mobile:pt-3 mobile:gap-4 mobile:text-[15px]">
                  <input
                    className="border-b-[1px] border-[#ddd] bg-transparent px-2"
                    id="value_timkiem"
                    onKeyUp={(e) => handle_filter(e)}
                    placeholder="Tìm số hóa đơn"
                  ></input>
                  <div className="flex">
                    <label>
                      <span className="text-[#797777] text-sm">Từ ngày</span>
                      <DatePicker
                        className=" border-t-0 border-l-0 border-r-0 border-b-[1px] border-[#ddd] bg-transparent px-2 max-w-[130px]"
                        selected={tungay}
                        dateFormat="dd/MM/yyyy"
                        onChange={(date) => handleTungay(date)}
                        value={tungay}
                      />
                    </label>
                    <label>
                      <span className="text-[#797777] text-sm">Đến ngày</span>

                      <DatePicker
                        className=" border-t-0 border-l-0 border-r-0 border-b-[1px] border-[#ddd] bg-transparent px-2  max-w-[130px]"
                        selected={denngay}
                        dateFormat="dd/MM/yyyy"
                        onChange={(date) => handleDenngay(date)}
                      />
                    </label>
                  </div>
                  <select
                    onChange={(e) => handle_filter(e)}
                    id="loai_thanhtoan"
                    className=" border-b-[1px] border-t-0 border-l-0 border-r-0 border-[#ddd] bg-transparent px-2"
                  >
                    <option value="">Thanh toán</option>
                    <option value="0">Đã thanh toán</option>
                    <option value="1">Chưa thanh toán</option>
                  </select>
                  <select
                    onChange={(e) => handle_filter(e)}
                    id="loai_trangthai"
                    className=" border-b-[1px] border-t-0 border-l-0 border-r-0 border-[#ddd] bg-transparent px-2"
                  >
                    <option value="">Trạng thái</option>
                    <option value="0">Đặt hàng</option>
                    <option value="1">Đã duyệt</option>
                    <option value="2">Đang giao</option>
                    <option value="4">Đã nhận</option>
                  </select>
                </div>
                {loadDHHeader?.map((dathangheader, key) => {
                  return (
                    <div className=" bg-[#e4f7e4] mb-3 rounded-lg shadow-sm">
                      <div>
                        <div className="flex justify-between items-center mx-4 py-2 mobile:flex-wrap mobile:gap-3">
                          <p>
                            <span>Ngày</span> {dathangheader.ngay}
                          </p>
                          <p className=" text-right flex justify-end fullscreen:hidden smlap:hidden lglap:hidden tablet:hidden">
                            {dathangheader.dathanhtoan == "1" ? (
                              <span
                                onClick={() => {
                                  handalLoad_LS(dathangheader.soct);
                                  setModalLS(true);
                                  setFormThanhtoan(true);
                                }}
                                className="flex gap-2 items-center"
                              >
                                Đã thanh toán{" "}
                                <Image
                                  className="max-w-[16px] h-[16px]"
                                  src={require("../pages/assets/img/icon/check_24.png")}
                                  alt="Đã thanh toán"
                                ></Image>
                              </span>
                            ) : (
                              <span
                                onClick={() => {
                                  handalLoad_qrthanhtoan(dathangheader.soct);
                                  setModalLS(true);
                                  setFormThanhtoan(false);
                                }}
                                className="text-[red] underline hover:cursor-pointer"
                              >
                                Thanh toán
                              </span>
                            )}
                          </p>
                          <p>
                            <span>Số hóa đơn</span>{" "}
                            <span className="text-[red]">
                              {dathangheader.sohd}
                            </span>
                          </p>
                          <p>
                            <span>Tổng tiền</span>{" "}
                            <span className="font-[600] text-[red] font-inter_semibold">
                              {dathangheader.tongcongvat
                                ?.toString()
                                .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
                            </span>
                          </p>
                          <p className="min-w-[200px] text-right flex justify-end mobile:hidden">
                            {dathangheader.dathanhtoan == "1" ? (
                              <span
                                onClick={() => {
                                  handalLoad_LS(dathangheader.soct);
                                  setModalLS(true);
                                  setFormThanhtoan(true);
                                }}
                                className="flex gap-2 items-center"
                              >
                                Đã thanh toán{" "}
                                <Image
                                  className="max-w-[20px] h-[20px]"
                                  src={require("../pages/assets/img/icon/check_24.png")}
                                  alt="Đã thanh toán"
                                ></Image>
                              </span>
                            ) : (
                              <span
                                onClick={() => {
                                  handalLoad_qrthanhtoan(dathangheader.soct);
                                  setModalLS(true);
                                  setFormThanhtoan(false);
                                }}
                                className="text-[red] underline hover:cursor-pointer"
                              >
                                Thanh toán
                              </span>
                            )}
                          </p>
                        </div>
                        <table className="relative w-full text-sm text-left text-gray-500 dark:text-gray-400 mobile:text-[13px] mobile:pb-2">
                          <thead className="sticky top-0 text-xs text-[black] uppercase bg-[#fff] dark:bg-gray-700 dark:text-gray-400 border-b-[2px]">
                            <tr>
                              <th scope="col" className="px-6 mobile:px-1 py-3">
                                Tên sản phẩm
                              </th>
                              <th
                                scope="col"
                                className="px-6 mobile:px-1 py-3 text-center"
                              >
                                ĐVT
                              </th>
                              <th
                                scope="col"
                                className="px-6 mobile:px-1 py-3 text-right"
                              >
                                Số lượng
                              </th>
                              <th
                                scope="col"
                                className="px-6 mobile:px-1 py-3 text-right"
                              >
                                Đơn giá
                              </th>
                              <th
                                scope="col"
                                className="px-6 mobile:px-1 py-3 text-right"
                              >
                                Thành tiền
                              </th>
                              <th
                                scope="col"
                                className="px-6 mobile:px-1 py-3 text-right"
                              >
                                Tiền tích lũy
                              </th>
                            </tr>
                          </thead>
                          <tbody className="rounded-b-lg">
                            {dathangheader.line?.map((dathangline, key) => {
                              return (
                                <tr className="bg-white border-b">
                                  <td
                                    scope="row"
                                    className="px-6 mobile:px-2 mobile:py-2 py-3 font-medium text-black whitespace-wrap text-left dark:text-white max-w-[200px]"
                                  >
                                    {dathangline.tenhh}
                                  </td>
                                  <td className="px-6 mobile:p-2 mobile:py-2 py-3 text-black text-center">
                                    {dathangline.dvt}
                                  </td>
                                  <td className="px-6 mobile:p-2 mobile:py-2 py-3 text-black text-right">
                                    {dathangline.soluong}
                                  </td>
                                  <td className="px-6 mobile:p-2 mobile:py-2 py-3 text-black text-right">
                                    {dathangline.giaban
                                      .toString()
                                      .replace(
                                        /(\d)(?=(\d\d\d)+(?!\d))/g,
                                        "$1."
                                      )}
                                  </td>

                                  <td className="px-6 mobile:p-2 mobile:py-2 py-3 text-black text-right">
                                    {dathangline.thanhtienvat
                                      .toString()
                                      .replace(
                                        /(\d)(?=(\d\d\d)+(?!\d))/g,
                                        "$1."
                                      )}
                                  </td>
                                  <td className="px-6 mobile:p-2 mobile:py-2 py-3 text-black text-right">
                                    {dathangline.tientichluy
                                      .toString()
                                      .replace(
                                        /(\d)(?=(\d\d\d)+(?!\d))/g,
                                        "$1."
                                      )}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>

                        <div className="flex justify-center pb-14 bg-white rounded-b-lg mobile:pb-16 pt-2">
                          {dathangheader.trangthai ? (
                            <div className="flex justify-center border-t-[3px] border-[#c3f4a6]">
                              <span className="pt-2 w-[150px] mobile:w-[90px] h-[2px] text-center text-sm ">
                                <span>Đặt hàng</span>
                                <p>{dathangheader.ngay}</p>
                              </span>
                            </div>
                          ) : (
                            ""
                          )}
                          {dathangheader.trangthai > 0 ? (
                            <div className="flex justify-center border-t-[3px] border-[#8dc4f5] text-center text-sm">
                              <span className="w-[150px] mobile:w-[90px] h-[2px] pt-2 ">
                                <span>Đã duyệt</span>
                                <p>{dathangheader.time_xacnhan}</p>
                              </span>
                            </div>
                          ) : (
                            ""
                          )}
                          {dathangheader.trangthai <= 4 &&
                          dathangheader.trangthai > 1 ? (
                            <div className="flex justify-center border-t-[3px] border-[#f5d06b] text-center text-sm">
                              <span className="w-[150px] mobile:w-[90px] h-[2px] pt-2">
                                <span>Đang giao</span>
                                <p>{dathangheader.time_giao}</p>
                              </span>
                            </div>
                          ) : (
                            ""
                          )}
                          {dathangheader.trangthai == 4 ? (
                            <div className="flex justify-center border-t-[3px] border-[#f8924f] text-center text-sm">
                              <span className="w-[150px] mobile:w-[90px] h-[2px] pt-2">
                                <span>Đã nhận</span>
                                <p>{dathangheader.time_nhan}</p>
                              </span>
                            </div>
                          ) : (
                            ""
                          )}
                          {dathangheader.trangthai == 5 ? (
                            <div className="flex justify-center border-t-[3px] border-[red] text-center text-sm">
                              <span className="w-[150px] mobile:w-[90px] h-[2px] pt-2">
                                <span>Đã hủy</span>
                                <p>{dathangheader.time_huy}</p>
                              </span>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="relative overflow-x-auto mobile:px-2 col-span-4 mobile:col-span-12 ">
                <div className="flex ">
                  <div className="pb-3   font-bold">
                    <h2>Quá trình tích lũy |</h2>
                  </div>

                  <span className="text-[red]">
                    Tiền tích lũy:{" "}
                    {tientichluy
                      ?.toString()
                      .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
                  </span>
                </div>
                <div className=" mobile:overflow-y-scroll mobile:max-h-[300px] ">
                  <table className="relative w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                    <thead className="sticky top-0 text-xs text-[black]  uppercase bg-[#fff]  dark:bg-gray-700 dark:text-gray-400">
                      <tr className="">
                        <th scope="col" className="px-6 mobile:p-1 py-3">
                          #
                        </th>
                        <th scope="col" className="px-6 mobile:px-1 py-3">
                          Ngày đặt
                        </th>
                        <th
                          scope="col"
                          className="px-6 mobile:px-1 py-3  text-center"
                        >
                          Số HD
                        </th>

                        <th
                          scope="col"
                          className="px-6 mobile:px-1 py-3  text-right"
                        >
                          Tiền tích lũy
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {chitiettichluy?.map((itemTichluy, key) => {
                        return (
                          <tr
                            className="item_dh_header bg-white  text-[black] dark:bg-gray-800 dark:border-gray-700 hover:bg-[#ddd] hover:cursor-pointer "
                            id={key}
                          >
                            <th
                              scope="row"
                              className="px-6 mobile:px-1 py-3 font-medium text-[black] whitespace-nowrap dark:text-white"
                            >
                              {key + 1}
                            </th>
                            <td className="px-6 mobile:px-1 py-3">
                              {itemTichluy.ngay}
                            </td>
                            <td className="px-6 mobile:px-1 py-3 text-center">
                              {itemTichluy.sohd}
                            </td>
                            <td
                              className="px-6 mobile:px-1 py-3 hover:underline  text-right"
                              onClick={() => {
                                handalLoad_LS(itemTichluy.soct);
                                setModalLS(true);
                              }}
                            >
                              {itemTichluy.sotien
                                .toString()
                                .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      {!showModal ? <div></div> : <OTP />}
      {modalLS ? (
        <div className="bg-[#000000b5] justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[1000] outline-none focus:outline-none">
          <div className="modal-dialog relative  pointer-events-none w-[400px] mobile:w-[300px]">
            <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
              <div className="modal-header  p-4 ">
                <h2 className="text-[22px] text-[green]">
                  Thông tin thanh toán
                </h2>
              </div>
              {formThanhtoan ? (
                ValueModalHistory?.map((item_val_ls, index) => {
                  return (
                    <div className=" mb-3 border-2 p-2 leading-8">
                      <div className="grid grid-cols-12 ">
                        <div className="col-span-4 text-left">Ngày</div>
                        <div className="col-span-8 text-left">
                          {item_val_ls.ngay}
                        </div>
                      </div>
                      <div className="grid grid-cols-12">
                        <div className="col-span-4 text-left">Số tiền</div>
                        <div className="col-span-8 text-left text-[red]">
                          {item_val_ls.sotien
                            .toString()
                            .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
                        </div>
                      </div>
                      <div className="grid grid-cols-12">
                        <div className="col-span-4 text-left">Hình thức</div>
                        <div className="col-span-8 text-left">
                          {item_val_ls.nganquy}
                        </div>
                      </div>
                      <div className="grid grid-cols-12">
                        <div className="col-span-4 text-left">NV thu</div>
                        <div className="col-span-8 text-left">
                          {item_val_ls.tennhanvien}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className=" mb-3 leading-7 text-center">
                  <h5>
                    Vui lòng sử dụng Sacombank Pay để quét mã thanh toán dưới
                    đây.
                  </h5>
                  <div className=" mx-auto py-5 relative">
                    <Image
                      className=" mx-auto  "
                      src={require("../pages/assets/img/icon/nen_qr.png")}
                      width={220}
                      height={220}
                    ></Image>
                    {QRthanhtoan?.map((qr_thanhtoan, index) => {
                      return qr_thanhtoan.qrthanhtoan ? (
                        <Image
                          className="mx-auto box-content absolute right-0 top-[50%] translate-y-[-50%] left-0 max-w-[190px]"
                          src={link_qr + qr_thanhtoan.qrthanhtoan}
                          width={200}
                          height={200}
                        ></Image>
                      ) : (
                        <p className="mx-auto box-content absolute right-0 top-[50%] translate-y-[-50%] left-0 max-w-[190px] text-red-400">
                          Chờ cập nhật
                        </p>
                      );
                    })}
                  </div>
                </div>
              )}
              <div className="text-right lg:text-right flex py-3 justify-end mr-8">
                {QRthanhtoan?.map((qr_thanhtoan, index) => {
                  return (
                    <>
                      {qr_thanhtoan.qrthanhtoan != "" &&
                      formThanhtoan == false ? (
                        <button
                          onClick={() => {
                            handle_dathanhtoan(soct_dh);
                          }}
                          type="button"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                          className="rounded-md px-1 text-[14px] text-white bg-[green] py-2 mr-5"
                        >
                          Đã thanh toán
                        </button>
                      ) : (
                        ""
                      )}
                    </>
                  );
                })}
                <button
                  onClick={() => {
                    setModalLS(false);
                  }}
                  type="button"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  Đóng
                </button>
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

export default History;
