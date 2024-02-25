import React, { useState, useEffect, useRef } from "react";
import "swiper/css";
import Link from "next/link";
import hanghoaApi from "../../pages/api/hanghoaApi";
import danhmucApi from "../../pages/api/danhmucApi";
import SanPhamTheoNhom from "../sanpham/sanpham_theonhom";
import Sanphambanchay from "../sanpham/sanphambanchay";
import SanphamItem from "../sanpham/sanpham_item";
import Image from "next/image";
import { Carousel } from "flowbite-react";
import bannerApi from "@/pages/api/bannerApi";
import { IconButton } from "@material-tailwind/react";
function Home() {
  useEffect(() => {
    window.scroll(0, 0);
  });
  const myRef = useRef();
  const [danhmuc, setDanhmuc] = useState([]);
  const [hot_items, setHotItem] = useState([]);
  const [dataUser_header, setDataUser] = useState([]);
  const [hanghoa_noibat, setHanghoaNoiBat] = useState([]);
  const [banner, setBanner] = useState([]);
  var hotItem_user = hot_items;
  const [localStorage, setStatus] = useState();
  const [token, setToken] = useState();
  useEffect(() => {
    setStatus(window.localStorage.getItem("msdn"));
    setToken(window.localStorage.getItem("msdv"));
  }, [token]);

  useEffect(() => {
    const danhmucHandle = async (e) => {
      try {
        const params = {
          phanloai: "groupproduct",
        };
        const response = await danhmucApi.listdanhmuc(params);
        setDanhmuc(response);
      } catch (error) {
        console.log(error);
      }
    };
    danhmucHandle();
  }, []);
  //todo Get sản phẩm bán chạy của từng user

  //!Load HotItem
  useEffect(() => {
    const tokenNew = window.localStorage.getItem("msdn");
    if (tokenNew == "" || tokenNew == undefined) {
      const hotItemHandle1 = async (e) => {
        try {
          const params = { mshh: "", soluong: "15" };
          const response = await hanghoaApi.list_hot_items(params);
          setHotItem(response);
        } catch (error) {
          console.log(error);
        }
      };
      hotItemHandle1();
    } else {
      const hotItemHandle = async (e) => {
        const dataThis = await hanghoaApi.list_all_hanghoa({});
        var myHeaders = new Headers();
        myHeaders.append(
          "Authorization",
          "bearer eyJ0eXAi.iJKV1QiLCJhbGci.iJIUzI1NiJ9OeyJtc2R2IjoiMjIwMjIwMTA1NDA2MzciLCJtc2RuIjoiMDkwNzY3.DIzNCIsInRlbmR2IjoiTkhcdTAwYzAgVEhVXHUxZWQwQyBBTiBUXHUwMGMyTSIsImV4cGlyZWQi.jE3MDQ4NTg5NjJ9O0PpmEeZGj754fysBTcULwhqLLqMe2l6y-0mc.ihCl.0"
        );
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          msdv: token,
          // msdv: "24051918220234",
          soluong: 15,
        });

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
        if (token != "" && token != null && token != undefined) {
          await fetch("https://egpp.vn/api_tmdt/list_nhapkho", requestOptions)
            .then((response) => response.text())
            .then((result) => {
              setDataUser(JSON.parse(result));
              var dataUser = JSON.parse(result);
              if (dataThis != "" && dataUser != "") {
                dataUser.forEach(function data_user(
                  itemUser,
                  indexUser,
                  arrayUser
                ) {
                  let sodangkyUser = arrayUser[indexUser].sodangky;
                  let tenhhUSer = arrayUser[indexUser].tenhh;
                  let mshhnccUSer = arrayUser[indexUser].mshhncc;
                  let hoatchatchinhUser = arrayUser[indexUser].hoatchatchinh;
                  dataThis.forEach(function data_this(
                    itemThis,
                    indexThis,
                    arrayThis
                  ) {
                    let tenhhThis = arrayThis[indexThis].tenhh;
                    let mshhnccThis = arrayThis[indexThis].mshhncc;
                    let sodangkyThis = arrayThis[indexThis].sodangky;
                    let tenhoatchatThis =
                      arrayThis[indexThis].tenhoatchat == undefined
                        ? ""
                        : arrayThis[indexThis].tenhoatchat;

                    if (mshhnccUSer === mshhnccThis && mshhnccUSer != "") {
                      return hotItem_user.push(arrayThis[indexThis]);
                    } else {
                      if (sodangkyUser === sodangkyThis && sodangkyUser != "") {
                        return hotItem_user.push(arrayThis[indexThis]);
                      }
                      if (
                        sodangkyUser != sodangkyThis &&
                        tenhhUSer != "" &&
                        tenhhThis.search(tenhhUSer) >= 0
                      ) {
                        return hotItem_user.push(arrayThis[indexThis]);
                      }
                      if (
                        sodangkyUser != sodangkyThis &&
                        tenhhUSer != "" &&
                        hoatchatchinhUser != "" &&
                        tenhoatchatThis.search(hoatchatchinhUser) >= 0
                      ) {
                        return hotItem_user.push(arrayThis[indexThis]);
                      }
                    }
                  });
                });
              } else {
                const hotItemDataUserRongHandle = async (e) => {
                  try {
                    const params = { mshh: "", soluong: "15" };
                    const response = await hanghoaApi.list_hot_items(params);
                    setHotItem(response);
                  } catch (error) {
                    console.log(error);
                  }
                };
                hotItemDataUserRongHandle();
              }
            })
            .catch((error) => setDataUser());
        }
      };

      hotItemHandle();
    }
  }, [token]);
  // useEffect(() => {
  //   const data = () => {
  //     if (token != "" || token != undefined) {
  //       console.log(dataThis);
  //       console.log(dataUser);
  //       if (dataThis != "" && dataUser != "") {
  //         dataUser.forEach(function data_user(itemUser, indexUser, arrayUser) {
  //           let sodangkyUser = arrayUser[indexUser].sodangky;
  //           let tenhhUSer = arrayUser[indexUser].tenhh;
  //           let mshhnccUSer = arrayUser[indexUser].mshhncc;
  //           let hoatchatchinhUser = arrayUser[indexUser].hoatchatchinh;
  //           dataThis.forEach(function data_this(
  //             itemThis,
  //             indexThis,
  //             arrayThis
  //           ) {
  //             let tenhhThis = arrayThis[indexThis].tenhh;
  //             let mshhnccThis = arrayThis[indexThis].mshhncc;
  //             let sodangkyThis = arrayThis[indexThis].sodangky;
  //             let tenhoatchatThis =
  //               arrayThis[indexThis].tenhoatchat == undefined
  //                 ? ""
  //                 : arrayThis[indexThis].tenhoatchat;

  //             if (mshhnccUSer === mshhnccThis && mshhnccUSer != "") {
  //               console.log(mshhnccUSer);
  //               return hotItem_user.push(arrayThis[indexThis]);
  //             } else {
  //               if (sodangkyUser === sodangkyThis && sodangkyUser != "") {
  //                 return hotItem_user.push(arrayThis[indexThis]);
  //               }
  //               if (
  //                 sodangkyUser != sodangkyThis &&
  //                 tenhhUSer != "" &&
  //                 tenhhThis.search(tenhhUSer) >= 0
  //               ) {
  //                 return hotItem_user.push(arrayThis[indexThis]);
  //               }
  //               if (
  //                 sodangkyUser != sodangkyThis &&
  //                 tenhhUSer != "" &&
  //                 hoatchatchinhUser != "" &&
  //                 tenhoatchatThis.search(hoatchatchinhUser) >= 0
  //               ) {
  //                 return hotItem_user.push(arrayThis[indexThis]);
  //               }
  //             }
  //           });
  //         });
  //       } else {
  //         const hotItemDataUserRongHandle = async (e) => {
  //           try {
  //             const params = { mshh: "", soluong: "15" };
  //             const response = await hanghoaApi.list_hot_items(params);
  //             setHotItem(response);
  //           } catch (error) {
  //             console.log(error);
  //           }
  //         };
  //         hotItemDataUserRongHandle();
  //       }
  //     }
  //   };
  //   data();
  // }, [dataThis]);
  const link = "https://erp.duoctaynam.vn/upload/banner/";

  useEffect(() => {
    const handleLoadSP_Noibat = async () => {
      try {
        const params = {};
        const response = await hanghoaApi.list_hanghoa_noibat(params);
        setHanghoaNoiBat(response);
      } catch (error) {
        console.log(error);
      }
    };
    handleLoadSP_Noibat();
  }, [token]);

  //todo Load banner
  useEffect(() => {
    const handleLoad_banner = async () => {
      try {
        const params = {};
        const response = await bannerApi.load_banner(params);

        setBanner(response);
      } catch (error) {
        console.log(error);
      }
    };
    handleLoad_banner();
  }, []);
  var top_slider_1;
  var top_slider_2;
  var top_slider_3;
  var img_r_top;
  var img_r_bottom;
  var mid_slider_1;
  var mid_slider_2;
  var mid_slider_3;
  var mid_img_r_top;
  var mid_img_r_bottom;
  var pdf_top_slider_1;
  var pdf_top_slider_2;
  var pdf_top_slider_3;
  var pdf_img_r_top;
  var pdf_img_r_bottom;
  var pdf_mid_slider_1;
  var pdf_mid_slider_2;
  var pdf_mid_slider_3;
  var pdf_mid_img_r_top;
  var pdf_mid_img_r_bottom;
  var link_pdf = "https://erp.duoctaynam.vn/upload/pdf/";
  const handleSetBanner = () => {
    {
      banner?.map((items_banner, key) => {
        if (items_banner.vitri_header == "TOP_L") {
          if (items_banner.vitri == "slider_1") {
            top_slider_1 =
              items_banner.url_image +
              items_banner.path_image +
              "?v=" +
              items_banner.lastmodify;
            pdf_top_slider_1 = items_banner.path_pdf
              ? link_pdf +
                items_banner.path_pdf +
                "?v=" +
                items_banner.lastmodify
              : "#";
          }
          if (items_banner.vitri == "slider_2") {
            top_slider_2 =
              items_banner.url_image +
              items_banner.path_image +
              "?v=" +
              items_banner.lastmodify;
            pdf_top_slider_2 = items_banner.path_pdf
              ? link_pdf +
                items_banner.path_pdf +
                "?v=" +
                items_banner.lastmodify
              : "#";
          }
          if (items_banner.vitri == "slider_3") {
            top_slider_3 =
              items_banner.url_image +
              items_banner.path_image +
              "?v=" +
              items_banner.lastmodify;
            pdf_top_slider_3 = items_banner.path_pdf
              ? link_pdf +
                items_banner.path_pdf +
                "?v=" +
                items_banner.lastmodify
              : "#";
          }
        }
        if (items_banner.vitri_header == "TOP_R") {
          if (items_banner.vitri == "img_r_top") {
            img_r_top =
              items_banner.url_image +
              items_banner.path_image +
              "?v=" +
              items_banner.lastmodify;
            pdf_img_r_top = items_banner.path_pdf
              ? link_pdf +
                items_banner.path_pdf +
                "?v=" +
                items_banner.lastmodify
              : "#";
          }
          if (items_banner.vitri == "img_r_bottom") {
            img_r_bottom =
              items_banner.url_image +
              items_banner.path_image +
              "?v=" +
              items_banner.lastmodify;
            pdf_img_r_bottom = items_banner.path_pdf
              ? link_pdf +
                items_banner.path_pdf +
                "?v=" +
                items_banner.lastmodify
              : "#";
          }
        }
        if (items_banner.vitri_header == "MID_L") {
          if (items_banner.vitri == "slider_1") {
            mid_slider_1 =
              items_banner.url_image +
              items_banner.path_image +
              "?v=" +
              items_banner.lastmodify;
            pdf_mid_slider_1 = items_banner.path_pdf
              ? link_pdf +
                items_banner.path_pdf +
                "?v=" +
                items_banner.lastmodify
              : "#";
          }
          if (items_banner.vitri == "slider_2") {
            mid_slider_2 =
              items_banner.url_image +
              items_banner.path_image +
              "?v=" +
              items_banner.lastmodify;
            pdf_mid_slider_2 = items_banner.path_pdf
              ? link_pdf +
                items_banner.path_pdf +
                "?v=" +
                items_banner.lastmodify
              : "#";
          }
          if (items_banner.vitri == "slider_3") {
            mid_slider_3 =
              items_banner.url_image +
              items_banner.path_image +
              "?v=" +
              items_banner.lastmodify;
            pdf_mid_slider_3 = items_banner.path_pdf
              ? link_pdf +
                items_banner.path_pdf +
                "?v=" +
                items_banner.lastmodify
              : "#";
          }
        }
        if (items_banner.vitri_header == "MID_R") {
          if (items_banner.vitri == "img_r_top") {
            mid_img_r_top =
              items_banner.url_image +
              items_banner.path_image +
              "?v=" +
              items_banner.lastmodify;
            pdf_mid_img_r_top = items_banner.path_pdf
              ? link_pdf +
                items_banner.path_pdf +
                "?v=" +
                items_banner.lastmodify
              : "#";
          }
          if (items_banner.vitri == "img_r_bottom") {
            mid_img_r_bottom =
              items_banner.url_image +
              items_banner.path_image +
              "?v=" +
              items_banner.lastmodify;
            pdf_mid_img_r_bottom = items_banner.path_pdf
              ? link_pdf +
                items_banner.path_pdf +
                "?v=" +
                items_banner.lastmodify
              : "#";
          }
        }
      });
    }
  };
  handleSetBanner();

  return (
    <>
      <div id="bgbody" className="bg_body">
        {/* Banner */}

        <div className="tablet:px-3 mobile:px-2">
          <div className="fullscreen:container mx-auto w-full bg-transparent lglap:px-5 smlap:px-5">
            <div className="grid grid-cols-12 gap-4 mobile:gap-0 mobile:pt-2 mx-auto py-2 items-center ">
              <div className=" col-span-8 mobile:col-span-12">
                <div
                  id="height_banner"
                  className="h-56 minmb:h-[12rem] minmb2:h-[11rem] minmb3:h-[10rem] minmb4:h-[9rem] xl:h-80 2xl:h-96"
                >
                  <Carousel
                    leftControl=" "
                    rightControl=" "
                    indicators=""
                    slideInterval={5000}
                  >
                    <Link
                      href={pdf_top_slider_1 ? pdf_top_slider_1 : ""}
                      target={pdf_top_slider_1 != "#" ? "_blank" : "_self"}
                    >
                      <Image
                        src={top_slider_1 ? top_slider_1 : ""}
                        className="block w-full rounded-[5px] mobile:rounded-[5px]"
                        alt="Slider Top"
                        width={500}
                        height={500}
                        loading="lazy"
                      />
                    </Link>
                    <Link
                      href={pdf_top_slider_2 ? pdf_top_slider_2 : ""}
                      target={pdf_top_slider_2 != "#" ? "_blank" : "_self"}
                    >
                      <Image
                        src={top_slider_2 || ""}
                        className="block w-full rounded-[5px] mobile:rounded-[5px]"
                        alt="Slider Top"
                        width={500}
                        height={500}
                        loading="lazy"
                      />
                    </Link>
                    <Link
                      href={pdf_top_slider_3 ? pdf_top_slider_3 : ""}
                      target={pdf_top_slider_3 != "#" ? "_blank" : "_self"}
                    >
                      <Image
                        src={top_slider_3 || ""}
                        className="block w-full rounded-[5px] mobile:rounded-[5px]"
                        alt="Slider Top"
                        width={500}
                        height={500}
                        loading="lazy"
                      />
                    </Link>
                  </Carousel>
                </div>
              </div>
              <div className="col-span-4 mobile:col-span-12 mobile:grid mobile:grid-cols-12 mobile:gap-2">
                <Link
                  className="mobile:col-span-6"
                  href={pdf_img_r_top ? pdf_img_r_top : ""}
                  target={pdf_img_r_top != "#" ? "_blank" : "_self"}
                >
                  <Image
                    className="w-auto rounded-[5px] mobile:rounded-[5px] my-2"
                    src={img_r_top || ""}
                    alt="Hình ảnh trên"
                    width={500}
                    height={500}
                    loading="lazy"
                  />
                </Link>
                <Link
                  className="mobile:col-span-6"
                  href={pdf_img_r_bottom ? pdf_img_r_bottom : ""}
                  target={pdf_img_r_bottom != "#" ? "_blank" : "_self"}
                >
                  <Image
                    className="w-auto rounded-[5px] mobile:rounded-[5px] my-2 "
                    src={img_r_bottom || ""}
                    alt="Hình ảnh trên"
                    width={500}
                    height={500}
                    loading="lazy"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="sessions_container mobile:pt-1 grid grid-cols-12  smlap:px-5 lglap:px-5 tablet:px-3 mobile:px-2">
          <div className="col-span-12">
            {/* Sản phẩm bán chạy*/}
            <div className="pb-[19px]">
              <div className="flex justify-between ">
                <div className=" text-left w-full flex flex-row items-center  after:border-b-[#ddd] after:border-b-[1px] after:m-auto after:w-full after:ml-5">
                  <h1 className="title_sanpham font-semibold text-xl flex flex-row whitespace-nowrap">
                    Sản phẩm bán chạy
                  </h1>
                </div>

                <Link
                  href={"/all-hot-items"}
                  className="border text-center px-2 border-[#a1e9a1] rounded-full bg-green-100 whitespace-nowrap"
                >
                  Xem tất cả
                </Link>
              </div>
              <div className="grid grid-cols-5 tablet:grid-cols-3 gap-3 pt-5 w-full mobile:grid-cols-1 smlap:grid-cols-4 mobile:gap-3 container_sanpham ">
                <Sanphambanchay
                  hanghoa_item={hotItem_user}
                  length_data_user={15}
                />
              </div>
            </div>
            {/* Box thông tin */}
            <div className="fullscreen:container mx-auto mobile:px-2 mobile:mx-0 mobile:w-auto bg-[#102f49] h-auto p-[20px] mobile:py-2 mobile:gap-[10px] rounded-lg flex  mobile:flex-wrap mobile:flex-row justify-around items-center gap-5 w-full">
              <div className="bg-[#f1fafe] rounded-md h-[200px] mobile:rounded-md mobile:h-[190px]  mobile:w-[48%] w-[25%] text-center flex flex-col justify-center mobile:leading-[1.5rem] leading-[2.5rem]">
                <Image
                  className="mx-auto"
                  src={require("../../pages/assets/img/icon/chinhhang_64.png")}
                  loading="lazy"
                  alt="Chính hãng"
                ></Image>
                <p className="font-semibold text-lg py-2">Chính hãng</p>
                <p className="tablet:leading-7">Xuất xứ rõ ràng</p>
              </div>
              <div className="bg-[#f1fafe] rounded-md h-[200px]  mobile:rounded-md mobile:h-[190px] mobile:w-[48%] w-[25%] text-center flex flex-col justify-center mobile:leading-[1.5rem] leading-[2.5rem]">
                <Image
                  className="mx-auto"
                  src={require("../../pages/assets/img/icon/giatot_64.png")}
                  loading="lazy"
                  alt="Giá tốt"
                ></Image>
                <p className="font-semibold text-lg py-2">Giá tốt</p>
                <p className="tablet:leading-7">Cạnh tranh ưu đãi</p>
              </div>
              <div className="bg-[#f1fafe] rounded-md h-[200px]  mobile:rounded-md mobile:h-[190px] mobile:w-[48%] w-[25%] text-center flex flex-col justify-center mobile:leading-[1.5rem] leading-[2.5rem]">
                <Image
                  className="mx-auto"
                  src={require("../../pages/assets/img/icon/sanhang_64.png")}
                  loading="lazy"
                  alt="Sẵn hàng"
                ></Image>
                <p className="font-semibold text-lg py-2">Sẵn hàng</p>
                <p className="tablet:leading-7">Nhanh chóng nhận hàng</p>
              </div>
              <div className="bg-[#f1fafe] rounded-md h-[200px] mobile:rounded-md mobile:h-[190px] mobile:w-[48%] w-[25%] text-center flex flex-col justify-center mobile:leading-[1.5rem] leading-[2.5rem]">
                <Image
                  className="mx-auto"
                  src={require("../../pages/assets/img/icon/giaongay_64.png")}
                  loading="lazy"
                  alt="Giao ngay"
                ></Image>
                <p className="font-semibold text-lg py-2">Tiện lợi</p>
                <p className="tablet:leading-7">Tương thích phần mềm</p>
              </div>
            </div>
            {/* Slide 2 */}
            <div>
              <div className="fullscreen:container mx-auto w-full bg-transparent">
                <div className="grid grid-cols-12 gap-4 mobile:gap-0 mx-auto py-2 items-center ">
                  <div className="col-span-8 mobile:col-span-12">
                    <div className="h-56 minmb:h-[12rem] minmb2:h-[11rem] minmb3:h-[10rem] minmb4:h-[9rem] xl:h-80 2xl:h-96">
                      <Carousel
                        leftControl=" "
                        rightControl=" "
                        indicators=""
                        slideInterval={3000}
                      >
                        <Link
                          href={pdf_mid_slider_1 ? pdf_mid_slider_1 : ""}
                          target={pdf_mid_slider_1 != "#" ? "_blank" : "_self"}
                        >
                          <Image
                            src={mid_slider_1 || ""}
                            className="block w-full rounded-[5px] mobile:rounded-[5px]"
                            width={500}
                            height={500}
                            alt="Slider Mid"
                            loading="lazy"
                          />
                        </Link>
                        <Link
                          href={pdf_mid_slider_2 ? pdf_mid_slider_2 : ""}
                          target={pdf_mid_slider_2 != "#" ? "_blank" : "_self"}
                        >
                          <Image
                            src={mid_slider_2 || ""}
                            className="block w-full rounded-[5px] mobile:rounded-[5px]"
                            width={500}
                            height={500}
                            alt="Slider Mid"
                            loading="lazy"
                          />
                        </Link>
                        <Link
                          href={pdf_mid_slider_3 ? pdf_mid_slider_3 : ""}
                          target={pdf_mid_slider_3 != "#" ? "_blank" : "_self"}
                        >
                          <Image
                            src={mid_slider_3 || ""}
                            className="block w-full rounded-[5px] mobile:rounded-[5px]"
                            width={500}
                            height={500}
                            alt="Slider Mid"
                            loading="lazy"
                          />
                        </Link>
                      </Carousel>
                    </div>
                  </div>
                  <div className="col-span-4  mobile:col-span-12 mobile:grid mobile:grid-cols-12 mobile:gap-2">
                    <Link
                      className="col-span-6"
                      href={pdf_mid_img_r_top ? pdf_mid_img_r_top : ""}
                      target={pdf_mid_img_r_top != "#" ? "_blank" : "_self"}
                    >
                      <Image
                        className="w-auto rounded-[5px] mobile:rounded-[5px] my-2"
                        src={mid_img_r_top || ""}
                        width={500}
                        height={500}
                        alt="Hình ảnh giữa "
                        loading="lazy"
                      />
                    </Link>
                    <Link
                      className="col-span-6"
                      href={pdf_mid_img_r_bottom ? pdf_mid_img_r_bottom : ""}
                      target={pdf_mid_img_r_bottom != "#" ? "_blank" : "_self"}
                    >
                      <Image
                        className="w-auto rounded-[5px] mobile:rounded-[5px] my-2 "
                        src={mid_img_r_bottom || ""}
                        width={500}
                        height={500}
                        alt="Hình ảnh giữa "
                        loading="lazy"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* Load group sản phẩm nổi bật */}
            <div className="pt-[20px] ">
              <h1 className=" title_sanpham ">Sản phẩm nổi bật</h1>
              <div className=" grid grid-cols-5  tablet:grid-cols-3 smlap:grid-cols-4 pt-5 gap-3 container_sanpham  mobile:grid-cols-1 mobile:gap-3 mobile:pt-2">
                {hanghoa_noibat?.map((hanghoa_item, key) => {
                  return (
                    <SanphamItem
                      hanghoa_item={hanghoa_item}
                      index={key + Math.floor(10000 + Math.random() * 90000)}
                    />
                  );
                })}
              </div>
            </div>

            {/* Sản phẩm giá tốt*/}
            <div className="pt-[20px] ">
              <h1 className=" title_sanpham ">Sản phẩm giá tốt</h1>
              {danhmuc?.map((danhmuc_item, key) => {
                return (
                  <SanPhamTheoNhom danhmuc_item={danhmuc_item} index={key} />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
