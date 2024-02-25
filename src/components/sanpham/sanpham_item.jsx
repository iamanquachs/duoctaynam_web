import React, { useState, useEffect } from "react";
import dathangApi from "../../pages/api/dathangApi";
import hanghoaApi from "../../pages/api/hanghoaApi";
import Link from "next/link";

import { useDispatch } from "react-redux";
import {
  createGiohang,
  showModal,
  isShowDHTC,
  hideShowDHTC,
} from "../redux/actions";
import Image from "next/image";
import { useRouter } from "next/router";
import parse from "html-react-parser";
const SanphamItem = (prop) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const hanghoa_item = prop.hanghoa_item;
  const danhmuc_item = prop.danhmuc_item;
  const index = prop.index;
  const [soluong, setSoluong] = useState(1);
  const [tim, setTim] = useState(hanghoa_item.tim);
  const [localStorage, setStatus] = useState();
  const [mshh_sanpham, setMSHH] = useState(hanghoa_item.mshh);
  const [localStorage_MSDV, setMSDV] = useState();
  const [localStorage_SDT, setSDT] = useState();
  const [giabanchitu, setGiabanChitu] = useState([]);

  useEffect(() => {
    setStatus(window.localStorage.getItem("msdn"));
    setMSDV(window.localStorage.getItem("msdv"));
    setSDT(window.localStorage.getItem("dienthoai"));
  }, []);
  function soluong_tang(index, e) {
    const a = e.currentTarget.parentNode.getElementsByClassName("input_sl")[0];
    var soluong = a.value;
    var soluong_new = Number(soluong) + 1;
    a.value = soluong_new;
  }
  function soluong_giam(key, e) {
    const a = e.currentTarget.parentNode.getElementsByClassName("input_sl")[0];
    var soluong = a.value;
    if (soluong <= 1) {
    } else {
      var soluong_new = Number(soluong) - 1;
      a.value = soluong_new;
    }
  }
  function handleGiohang(e) {
    const params = {
      msdn: localStorage,
    };
    dispatch(createGiohang.createGiohangRequest(params));
  }
  function dathangline_add(index, e, is) {
    var ten_sanpham = e.tenhh,
      mshh = e.mshh,
      msnpp = e.msnpp,
      mshhnpp = e.mshhnpp,
      gianhap = 0,
      pttichluy = e.pttichluy,
      thuesuat = e.thuesuat,
      dvt = e.dvtmin,
      ptgiam = e.ptgiam,
      msctkm = e.msctkm;
    var soluong =
      is.currentTarget.parentNode.getElementsByClassName("input_sl")[0].value;
    if (localStorage) {
      const token = localStorage;

      if (token == "" && token == undefined) {
        dispatch(showModal());
      } else {
        const handleKTGH = async (e) => {
          try {
            const params = {
              msdn: localStorage,
              mshh: mshh,
            };
            const response = await dathangApi.list_kt_mshh_dathangline(params);
            if (response.length == 0) {
              const handleDathang = async (e) => {
                try {
                  const params = {
                    msdv: "",
                    msdn: localStorage,
                    mshh: mshh,
                    tenhh: ten_sanpham,
                    mshhnpp: mshhnpp,
                    dvt: dvt,
                    msnpp: msnpp,
                    pttichluy: pttichluy,
                    thuesuat: thuesuat,
                    soluong: soluong,
                    gianhap: gianhap,
                    ptgiam: ptgiam,
                    msctkm: msctkm,
                  };
                  await dathangApi.dathangline_add(params);
                  handleGiohang();
                } catch (error) {
                  console.log(error);
                }
              };
              handleDathang();
            } else {
              const handleUpdate_dathangline = async (e) => {
                const soluongNew =
                  parseInt(response[0].soluong) + parseInt(soluong);
                try {
                  const params = {
                    msdn: localStorage,
                    mshh: mshh,
                    dvt: dvt,
                    soluong: soluongNew,
                    ptgiam: ptgiam,
                    msctkm: msctkm,
                  };
                  await dathangApi.update_dathangline(params);
                  handleGiohang();
                } catch (error) {
                  console.log(error);
                }
              };
              handleUpdate_dathangline();
            }
          } catch (error) {
            console.log(error);
          }
        };
        handleKTGH();
        dispatch(isShowDHTC());
        setTimeout(() => {
          dispatch(hideShowDHTC());
        }, 1000);
      }
    } else {
      dispatch(showModal());
      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          "order",
          mshh +
            "|" +
            ten_sanpham +
            "|" +
            mshhnpp +
            "|" +
            dvt +
            "|" +
            msnpp +
            "|" +
            pttichluy +
            "|" +
            thuesuat +
            "|" +
            soluong +
            "|" +
            gianhap +
            "|" +
            ptgiam +
            "|" +
            msctkm
        );
      } else {
        console.log("else");
      }
    }
  }

  // Click thêm vào lượt xem
  const [ipthietbi, setIPthietbi] = useState();
  // useEffect(() => {
  // const handleGetLocation = () => {
  // const location = navigator.geolocation;
  // const location = "";
  // if (location) {
  //   navigator.geolocation.getCurrentPosition(showPosition);
  // } else {
  //   document.getElementById("demo").innerHTML =
  //     "Geolocation is not supported by this browser.";
  // }
  // function showPosition(position) {
  //   setIPthietbi(
  //     position.coords.latitude + "," + position.coords.longitude
  //   );
  // }
  // };
  // handleGetLocation();
  // }, []);

  const handlePostLuotXem = (e, key, url) => {
    const msdn = localStorage;
    const mshh = hanghoa_item.mshh;
    const thietbi = navigator.appVersion;
    if (msdn) {
      const handlePost = async (e) => {
        try {
          const params = {
            msdn: msdn,
            mshh: mshh,
          };
          await hanghoaApi.post_luotxem(params);
        } catch (error) {
          console.log(error);
        }
      };
      handlePost();
    } else {
      const handlePost = async (e) => {
        try {
          const params = {
            msdn: "",
            mshh: mshh,
            ipthietbi: ipthietbi,
            thietbi: thietbi,
          };
          await hanghoaApi.post_luotxem(params);
        } catch (error) {
          console.log(error);
        }
      };
      handlePost();
    }
  };
  const handlePostTim = (e, mshh) => {
    const handlePost = async (e) => {
      try {
        const params = {
          mshh: mshh,
        };
        const response = await hanghoaApi.get_tim(params);
        const timnew = Number(response[0].tim) + 1;
        const handlePost = async (e) => {
          try {
            const params = {
              mshh: mshh,
              timnew: timnew,
            };
            await hanghoaApi.update_tim(params);
            const load_timnew = await hanghoaApi.get_tim(params);
            setTim(load_timnew[0].tim_all);
          } catch (error) {
            console.log(error);
          }
        };
        handlePost();
      } catch (error) {
        console.log(error);
      }
    };
    handlePost();
  };

  const link = "https://erp.duoctaynam.vn/upload/sanpham/";
  return (
    <>
      <div className="col-span-1 relative sanpham_item ">
        <div className=" w-full rounded-[5px] shadow-sm  border-[#e0f2f9] border bg-white hover:border-[#198005]">
          <div className="w-full min-h-[50px] p-2 fullscreen:hidden smlap:hidden lglap:hidden tablet:hidden mb-3 mobile:mb-1">
            {hanghoa_item.loaikm == 1 ? (
              hanghoa_item.ptgiam != 0 ? (
                <div className="bg-none border-b-[1px] mb-2 pb-2 fullscreen:hidden smlap:hidden lglap:hidden tablet:hidden flex justify-end items-center ">
                  <div className="w-full flex justify-end mt-2">
                    <span className="mr-2 text-[green]">
                      {hanghoa_item.tenctkm}
                    </span>
                    <span className="text-white rounded-[5px] flex items-center justify-center  mr-2 w-12 h-5 bg-[#EB0000]">
                      -{hanghoa_item.ptgiam}%
                    </span>
                  </div>
                </div>
              ) : (
                ""
              )
            ) : hanghoa_item.mshh_mua == "" ? (
              <div className="bg-none border-b-[1px] mb-2 pb-2 fullscreen:hidden smlap:hidden lglap:hidden tablet:hidden flex justify-end items-center">
                <div className="w-full flex justify-start mt-2">
                  <span className="text-white rounded-[5px] flex items-center justify-center  mr-2 px-2 h-5 bg-[#EB0000]">
                    {hanghoa_item.tenctkm}
                  </span>
                </div>
              </div>
            ) : (
              ""
            )}
            {/* {hanghoa_item.mshh_mua == "" ? (
              hanghoa_item.ptgiam != 0 ? (
                <div className="bg-none border-b-[1px] mb-2 pb-2 fullscreen:hidden smlap:hidden lglap:hidden tablet:hidden flex justify-end items-center">
                  <span className="mr-2 text-[green]">
                    {hanghoa_item.tenctkm}
                  </span>
                  <div className=" flex justify-start items-center">
                    <span className="text-white rounded-[5px] flex items-center justify-center  mr-2 w-12 h-5 bg-[red]">
                      -{hanghoa_item.ptgiam}%
                    </span>
                  </div>
                </div>
              ) : (
                ""
              )
            ) : (
              ""
            )} */}
            <Link
              href={"/product?" + hanghoa_item.url}
              onClick={(e) => handlePostLuotXem(e, index, hanghoa_item.url)}
              className="ten_sanpham flex items-center mobile:text-[16px] truncate mobile:whitespace-pre-wrap"
            >
              {hanghoa_item.tenhh}{" "}
              {hanghoa_item.hamluong == "." ? "|" + hanghoa_item.hamluong : ""}
            </Link>
          </div>
          <div className="mobile:flex  mobile:grid-cols-12 mobile:gap-1 ">
            <div className="mobile:col-span-7 smlap:flex smlap:mx-auto smlap:w-[100%] smlap:h-[100%] mobile:ml-2">
              <Link
                className="img_sanpham mobile:w-[150px] mobile:h-[150px] smlap:w-[100%] smlap:h-[100%]"
                href={"/product?" + hanghoa_item.url}
              >
                <Image
                  src={link + `${hanghoa_item.path_image}`}
                  id="hinhanh_sanpham"
                  loading="lazy"
                  className="rounded-[5px] mobile:w-[150px] mobile:h-[150px] smlap:w-[250px] smlap:h-[250px] fullscreen::w-[260px] fullscreen::h-[260px]"
                  onClick={(e) => handlePostLuotXem(e, index, hanghoa_item.url)}
                  alt={hanghoa_item.tenhh}
                  width={300}
                  height={300}
                ></Image>
              </Link>
            </div>
            <div className="mobile:col-span-5 px-2  overflow-hidden  mobile:px-0 mobile:max-w-[100%] ipx:pl-[14px] ip12:pl-3 ip678:pl-[5px] galaxy:pl-7 ip12mini:pl-0 w-full">
              {/* Tên hàng hóa */}
              <input hidden className="ma_sanpham" value={hanghoa_item.mshh} />
              <input hidden id="ms_npp" value={hanghoa_item.msnpp} />
              <div className="w-[95%] h-[40px] mobile:hidden fullscreen:absolute fullscreen:top-[48%] lglap:absolute lglap:top-[44%] smlap:absolute smlap:top-[43%] minlap:absolute minlap:top-[46%] mintablet:absolute mintablet:top-[36%] tablet:absolute tablet:top-[38%]">
                <Link
                  href={"/product?" + hanghoa_item.url}
                  onClick={(e) => handlePostLuotXem(e, index, hanghoa_item.url)}
                  className="ten_sanpham mt-2"
                >
                  {hanghoa_item.tenhh}
                  <span className="mobile:hidden">
                    {hanghoa_item.hamluong != "."
                      ? " | " + hanghoa_item.hamluong
                      : ""}
                  </span>
                </Link>
              </div>
              <div className="chitiet_item mobile:w-full fullscreen:mt-[1.5rem] smlap:mt-[1.5rem] lglap:mt-[2.5rem] tablet:mt-[2.5rem] truncate leading-[27px] mobile:leading-[25px] mobile:text-[15px] ip678:text-[14px] pl-[20px] ">
                <ul className="list-disc ">
                  {/* Hoạt chất */}
                  <li className="list-disc mobile:list-none h-[25px]">
                    <div className=" relative flex mobile:left-[-16px] mobile:gap-1 left-[-7px] mobile:max-h-[25px] mobile:overflow-x-hidden h-[25px] ">
                      <span className="hidden mobile:block  w-[9px] text-center">
                        ●
                      </span>
                      <div className="h-[25px] overflow-hidden ">
                        {parse(hanghoa_item.tenhoatchat.replace("-", ""))}
                      </div>
                    </div>
                  </li>
                  {/* nhóm */}
                  <li className="list-disc mobile:list-none">
                    <div className=" whitespace-break-spaces flex relative left-[-7px] mobile:left-[-16px] mobile:gap-1 ">
                      <span className="hidden mobile:block  w-[9px] text-center">
                        ●
                      </span>
                      <div className="h-[25px] overflow-hidden">
                        {hanghoa_item.tennhom}
                      </div>
                    </div>
                  </li>
                  {/* quy cách */}
                  <li className="list-disc mobile:list-none">
                    <div className=" whitespace-break-spaces flex relative left-[-7px] mobile:left-[-16px] mobile:gap-1 ">
                      <span className="hidden mobile:block  w-[9px] text-center">
                        ●
                      </span>
                      <div className="h-[25px] overflow-hidden">
                        {hanghoa_item.quycach}
                      </div>
                    </div>
                  </li>
                  {/* tiêu chuẩn */}
                  <li className="list-disc mobile:list-none">
                    <div className=" whitespace-break-spaces flex relative left-[-7px] mobile:left-[-16px] mobile:gap-1 ">
                      <span className="hidden mobile:block  w-[9px] text-center">
                        ●
                      </span>
                      <div className="h-[25px] overflow-hidden">
                        {hanghoa_item.standard != "undefined"
                          ? hanghoa_item.standard
                          : ""}{" "}
                        {hanghoa_item.theodon}
                      </div>
                    </div>
                  </li>

                  {/* nuoc san xuat */}

                  <li className="list-disc mobile:list-none before:text-[red] whitespace-normal w-[170px] fullscreen:hidden smlap:hidden lglap:hidden tablet:hidden">
                    <div className=" whitespace-break-spaces flex relative left-[-7px] mobile:left-[-16px]  mobile:gap-1 ">
                      <span className="hidden mobile:block  w-[9px] text-center">
                        ●
                      </span>
                      {hanghoa_item.tennhasx}
                    </div>
                    <li>
                      <span className=" whitespace-break-spaces flex relative left-[-7px] mobile:left-[-16px]  mobile:gap-1 ">
                        <span className="hidden mobile:block  w-[9px] text-center">
                          ●
                        </span>
                        {hanghoa_item.country}
                      </span>
                    </li>
                  </li>
                  {/* nhà san xuat  */}
                  <li className="mobile:hidden ">
                    <p className="chitiet_item mobile:w-full mobile:hidden mobile:break-words truncate leading-[29px] mobile:leading-[29px] mobile:text-[15px] ip678:text-[14px]  whitespace-break-spaces  relative left-[-7px] mobile:left-[-5px]">
                      <span className="mobile:break-words ">
                        {hanghoa_item.tennhasx}
                      </span>
                      <span className="mobile:hidden  smlap:hidden lglap:hidden tablet:hidden">
                        {" "}
                        |{" "}
                      </span>
                      <span className="mobile:hidden  smlap:hidden lglap:hidden tablet:hidden">
                        {hanghoa_item.country}
                      </span>
                    </p>
                  </li>
                </ul>
              </div>

              <div className="gia grid grid-cols-12 items-center mobile:py-1 mobile:hidden">
                <div className="col-span-3 lglap:col-span-12 smlap:col-span-12 tablet:col-span-12 flex items-end mobile:items-start tablet:items-start tablet:pt-1 mobile:pt-[1.5rem] mobile:absolute mobile:right-[88%] ">
                  <button
                    className="flex items-center gap-1"
                    onClick={(e) =>
                      handlePostTim(hanghoa_item.tim, hanghoa_item.mshh)
                    }
                  >
                    <Image
                      src={require("../../pages/assets/img/icon/heart.png")}
                      alt="Tim"
                    />
                    <p className="text-[#4e4e4e] text-[14px]">{tim}</p>
                  </button>
                </div>
                <div className="col-span-9 lglap:col-span-12 smlap:col-span-12  tablet:col-span-12 mobile:col-span-12  mobile:z-[98]">
                  <div className="flex gap-1 fullscreen:pt-2 lglap:pt-2 fullscreen:pb-2 mobile:pt-[15px] justify-end mobile:justify-end mobile:pr-3 tablet:flex-col tablet:items-end tablet:gap-0 mobile:items-end mobile:gap-0 fullscreen:items-center smlap:items-center lglap:items-center">
                    <p className="text-[black] tablet:hidden mobile:hidden"></p>

                    <div className="flex gap-[1px] ip12mini:gap-1 items-center giabanform">
                      <div className="flex gap-[4px] items-center">
                        <div className=" ">
                          <Image
                            src={require("../../pages/assets/img/icon/price.png")}
                            alt="Giá"
                            className="w-[20px] h-[20px]"
                            width={20}
                            height={20}
                          ></Image>
                        </div>
                        <p className="text-[#CC0000] mobile:text-[15px] flex items-center">
                          {hanghoa_item.chitu}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center  ip12mini:gap-1 justify-end giabanform"></div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2 p-3 mobile:pl-0 tablet:px-0 fullscreen:hidden smlap:hidden lglap:hidden pt-[10px] mobile:hidden">
                <div className="soluong col-span-1 tablet:mb-2  tablet:w-full ">
                  <button className="" onClick={(e) => soluong_giam(index, e)}>
                    <Image
                      src={require("../../pages/assets/img/icon/minus.png")}
                      alt="minus"
                    ></Image>
                  </button>
                  <input
                    onChange={(e) =>
                      setSoluong(e.target.value.replace(/[^0-9\.\,]/g, ""))
                    }
                    maxLength="4"
                    className="input_sl w-10 text-center outline-none border-[0px] py-[2px] px-[0]"
                    name={hanghoa_item.mshh}
                    type="text"
                    aria-label="Số lượng"
                    value={soluong}
                  ></input>
                  <button onClick={(e) => soluong_tang(index, e)} className="">
                    <Image
                      src={require("../../pages/assets/img/icon/plus.png")}
                      alt="plus"
                    ></Image>
                  </button>
                </div>
                <button
                  className="btn_dathang col-span-1 mobile:py-[5px] tablet:p-2 text-[14px]"
                  onClick={(e) => dathangline_add(index, hanghoa_item, e)}
                >
                  Thêm vào giỏ
                </button>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-2 p-2 mobile:hidden tablet:hidden">
              <div className="soluong">
                <button className="" onClick={(e) => soluong_giam(index, e)}>
                  <Image
                    src={require("../../pages/assets/img/icon/minus.png")}
                    alt="minus"
                  ></Image>
                </button>
                <input
                  onChange={(e) =>
                    setSoluong(e.target.value.replace(/[^0-9\.\,]/g, ""))
                  }
                  maxLength="4"
                  className="input_sl text-[16px] w-10 text-center outline-none border-[0px] py-1 px-[0]"
                  name={hanghoa_item.mshh}
                  type="text"
                  aria-label="Số lượng"
                  value={soluong}
                ></input>
                <button onClick={(e) => soluong_tang(index, e)} className="">
                  <Image
                    src={require("../../pages/assets/img/icon/plus.png")}
                    alt="plus"
                  ></Image>
                </button>
              </div>
              <button
                className="btn_dathang  py-[7px] text-[0.9rem]"
                onClick={(e) => dathangline_add(index, hanghoa_item, e)}
              >
                Thêm vào giỏ
              </button>
            </div>
          </div>
          <div className="mobile:flex fullscreen:hidden smlap:hidden lglap:hidden tablet:hidden mobile:justify-between mobile:mx-3 mobile:my-2">
            <div>
              <button
                className="flex items-center gap-1"
                onClick={(e) =>
                  handlePostTim(hanghoa_item.tim, hanghoa_item.mshh)
                }
              >
                <Image
                  src={require("../../pages/assets/img/icon/heart.png")}
                  alt="Tim"
                />
                <p className="text-[#4e4e4e] text-[14px]">{tim}</p>
              </button>
            </div>
            <div>
              <div className="flex gap-[4px] items-center">
                <div className="">
                  <Image
                    src={require("../../pages/assets/img/icon/price.png")}
                    className="w-[20px] h-[20px]"
                    alt="Giá"
                    width={20}
                    height={20}
                  ></Image>
                </div>
                <p className="text-[red] mobile:text-[15px] flex items-center">
                  {hanghoa_item.chitu}
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 p-3  tablet:px-0 fullscreen:hidden smlap:hidden lglap:hidden pt-[10px] tablet:hidden">
            <div className="soluong col-span-1 tablet:mb-2  tablet:w-full ">
              <button className="" onClick={(e) => soluong_giam(index, e)}>
                <Image
                  src={require("../../pages/assets/img/icon/minus.png")}
                  alt="minus"
                ></Image>
              </button>
              <input
                onChange={(e) =>
                  setSoluong(e.target.value.replace(/[^0-9\.\,]/g, ""))
                }
                maxLength="4"
                className="input_sl w-10 text-center outline-none border-[0px] py-[2px] px-[0]"
                name={hanghoa_item.mshh}
                type="text"
                aria-label="Số lượng"
                value={soluong}
              ></input>
              <button onClick={(e) => soluong_tang(index, e)} className="">
                <Image
                  src={require("../../pages/assets/img/icon/plus.png")}
                  alt="plus"
                ></Image>
              </button>
            </div>
            <button
              className="btn_dathang col-span-1 mobile:py-[5px] tablet:p-2 text-[14px]"
              onClick={(e) => dathangline_add(index, hanghoa_item, e)}
            >
              Thêm vào giỏ
            </button>
          </div>
        </div>

        {hanghoa_item.loaikm == 1 ? (
          hanghoa_item.ptgiam != 0 ? (
            <div className="absolute top-[1px] mobile:hidden right-[2.5px] z-50 font-inter  h-10 w-[98%] bg-[white] rounded-t-[5px] flex-col items-end text-right ">
              <div className="w-full flex justify-end mt-2">
                <span className="text-white rounded-[5px] flex items-center justify-center  mr-2 w-12 h-5 bg-[#EB0000]">
                  -{hanghoa_item.ptgiam}%
                </span>
              </div>
              <span className="mr-2 text-[green]">{hanghoa_item.tenctkm}</span>
            </div>
          ) : (
            ""
          )
        ) : hanghoa_item.mshh_mua == "" ? (
          <div className="absolute top-[1px] mobile:hidden right-[2.5px] z-50 font-inter  h-10 w-[98%] bg-[white] rounded-t-[5px] flex-col items-end text-right ">
            <div className="w-full flex justify-end mt-2">
              <span className="text-white rounded-[5px] flex items-center justify-center  mr-2 px-2 h-5 bg-[#EB0000]">
                {hanghoa_item.tenctkm}
              </span>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default SanphamItem;
