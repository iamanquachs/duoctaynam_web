import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import LoginForm from "./login_form";
import Search from "./search_form";
import danhmucApi from "../../pages/api/danhmucApi";
import hanghoaApi from "../../pages/api/hanghoaApi";
import giohangApi from "../../pages/api/giohangApi";
import { useDispatch, useSelector } from "react-redux";
import {
  createGiohang,
  createFilter,
  isLogin,
  showModalDangXuat,
  showModal,
} from "../redux/actions";
import { giohangState$, modalDHTC$ } from "../redux/selectors";
import { useRouter } from "next/router";
import LoginModal from "./login_modal";
import DangKiModal from "./modal_themnhanhang";
import DangXuatModal from "./modal_dangxuat";
function Header() {
  const [localStorage_Tendv, setTendv] = useState();
  const [msdv, setMSDV] = useState();
  const [tieuchuan, settieuchuan] = useState([]);
  const [nuocsx, setNuocsx] = useState([]);
  const [hangsx, setHangsx] = useState([]);
  const [danhmuc, setDanhmuc] = useState([]);
  const [localStorage, setStatus] = useState();
  const dispatch = useDispatch();
  const giohang = useSelector(giohangState$).length;
  const statusLogin = dispatch(isLogin());
  const router = useRouter();
  const [form_thongbao, setFormThongbao] = useState(false);
  const [xemtientichluy, setFormTienTichLuy] = useState(false);
  const [tientichluy, setTienTichLuy] = useState([]);

  const form_dathangthanhcong = useSelector(modalDHTC$).isShowDHTC;
  useEffect(() => {
    setFormThongbao(
      window.localStorage.getItem("message") == null ? true : false
    );
    setStatus(window.localStorage.getItem("msdn"));
    setMSDV(window.localStorage.getItem("msdv"));
    setTendv(window.localStorage.getItem("tendv"));
  }, [statusLogin, form_thongbao]);
  useEffect(() => {
    //todo Danh muc nhom san pham
    const danhmucHandle = async (e) => {
      try {
        const params = {
          msdv: "",
          phanloai: "groupproduct",
        };
        const response = await danhmucApi.listdanhmucnhom(params);
        setDanhmuc(response);
      } catch (error) {
        console.log(error);
      }
    };
    danhmucHandle();
    //todo danh muc hang sx
    const handleHangsx = async (e) => {
      try {
        const params = {
          loai: "hsx",
        };
        const response = await danhmucApi.listdanhmuc_nhasx(params);
        setHangsx(response);
      } catch (error) {
        console.log(error);
      }
    };
    handleHangsx();
    //todo danh muc nuoc san xuat
    const handleNuocsx = async (e) => {
      try {
        const params = {
          msdv: "",
          phanloai: "country",
        };
        const response = await danhmucApi.listdanhmuc_nuocsx(params);
        setNuocsx(response);
      } catch (error) {
        console.log(error);
      }
    };
    handleNuocsx();
    //todo Danh  muc tieu chuan
    const handleTieuchuan = async (e) => {
      try {
        const params = {
          msdv: "",
          phanloai: "standard",
        };
        const response = await danhmucApi.listdanhmuc(params);
        settieuchuan(response);
      } catch (error) {
        console.log(error);
      }
    };
    handleTieuchuan();
  }, []);

  //todo load Giỏ hàng trên header
  useEffect(() => {
    function handleGiohang(e) {
      const params = {
        msdn: localStorage,
      };
      dispatch(createGiohang.createGiohangRequest(params));
    }
    handleGiohang();
  }, [localStorage, giohang]);
  //todo active class bộ lọc
  const active_filter = (e, type_filter) => {
    switch (type_filter) {
      case "hang":
        if (e.target.classList.contains("active_filter")) {
          e.target.classList.remove("active_filter");
        } else {
          e.target.classList.add("active_filter");
        }
        break;
      case "tieuchuan":
        if (e.target.classList.contains("active_filter")) {
          e.target.classList.remove("active_filter");
        } else {
          e.target.classList.add("active_filter");
        }
        break;
      case "nuoc":
        if (e.target.classList.contains("active_filter")) {
          e.target.classList.remove("active_filter");
        } else {
          e.target.classList.add("active_filter");
        }
        break;
      case "nhom":
        if (e.target.classList.contains("active_nhomsp")) {
          e.target.classList.remove("active_nhomsp");
        } else {
          e.target.classList.add("active_nhomsp");
        }
        break;
      case "/":
        const nhomsp = document.querySelectorAll(".items_nhomsp li");
        nhomsp.forEach((nhomsp) => {
          nhomsp.classList.remove("active_nhomsp");
        });
        const hangsx = document.querySelectorAll(".items_hangsx li ");
        hangsx.forEach((hangsx) => {
          hangsx.classList.remove("active_filter");
        });
        const tieuchuan = document.querySelectorAll(".items_tieuchuan li ");
        tieuchuan.forEach((tieuchuan) => {
          tieuchuan.classList.remove("active_filter");
        });
        const nuocsx = document.querySelectorAll(".items_nuocsx li ");
        nuocsx.forEach((nuocsx) => {
          nuocsx.classList.remove("active_filter");
        });
        router.push("/");

        break;
      default:
        break;
    }
  };

  //todo filter lọc sản phẩm
  const pathSearch = router.asPath.split("?")[1];
  const handleFilter = (url_filter) => {
    const search = JSON.stringify(router.query)
      .replace("{", "")
      .replace("}", "")
      .replaceAll('"', "")
      .replaceAll(":", "=")
      .replaceAll(",", "&");
    const valueSearch =
      (search ? "?" + pathSearch.replaceAll('"', "") + "&" : search + "?") +
      url_filter;
    router.push("/filter" + valueSearch);
    if (pathSearch) {
      const paramsFilter = pathSearch.split("&");
      for (var i = 0; i < paramsFilter.length; i++) {
        if (paramsFilter[i] == url_filter) {
          const new_arr = paramsFilter.filter((item) => item !== url_filter);
          router.push("/filter" + (search ? "?" + new_arr : search + "?"));
          if (paramsFilter.length > 2) {
            const new_nav = new_arr.toString().replaceAll(",", "&");
            router.push("/filter?" + new_nav);
          }
        }
      }
    }
  };
  useEffect(() => {
    const filterHandle = async (e) => {
      if (pathSearch) {
        const valueFilter = pathSearch.split("&");
        const nhom_arr = [];
        const msnhasx_arr = [];
        const tieuchuan_arr = [];
        const nuoc_arr = [];
        sosanh("groupproduct", nhom_arr);
        sosanh("producer", msnhasx_arr);
        sosanh("standard", tieuchuan_arr);
        sosanh("country", nuoc_arr);
        function sosanh(key_sosanh, arr) {
          for (let i = 0; i < valueFilter.length; i++) {
            var sosanh = new RegExp(key_sosanh, "i");
            if (valueFilter[i].search(sosanh) >= 0) {
              arr.push("'" + valueFilter[i].split("=")[1] + "'");
            }
          }
        }
        var params = {
          groupproduct: nhom_arr,
          producer: msnhasx_arr,
          standard: tieuchuan_arr,
          country: nuoc_arr,
        };
        dispatch(createFilter.createFilterRequest(params));
      }
    };
    filterHandle();
  }, [pathSearch]);
  //todo open menu Mobile
  function toggleMenu() {
    var menu = document.getElementById("menu");
    var bg_menu = document.getElementById("bg_menu");
    menu.classList.toggle("hidden");
    menu.classList.toggle("w-[70%]");
    menu.classList.toggle("h-screen");
    bg_menu.classList.toggle("hidden");
    bg_menu.classList.toggle("w-full");
    bg_menu.classList.toggle("h-screen");
  }
  //todo close menu Mobile

  function toggleMenuClose() {
    var menu = document.getElementById("menu");
    var bg_menu = document.getElementById("bg_menu");
    menu.classList.toggle("hidden");
    menu.classList.toggle("w-[70%]");
    menu.classList.toggle("h-screen");
    bg_menu.classList.toggle("hidden");
    bg_menu.classList.toggle("w-full");
    bg_menu.classList.toggle("h-screen");

    dispatch(showModal());
  }
  useEffect(() => {
    const handleGetLocation = () => {
      // const location = navigator.geolocation;
      // const thietbi = navigator.appVersion;
      const thietbi = "";

      // if (location) {
      //   navigator.geolocation.getCurrentPosition(showPosition);
      // } else {
      //   document.getElementById("demo").innerHTML =
      //     "Geolocation is not supported by this browser.";
      // }
      function showPosition(position) {
        // let ipthietbi =
        //   position.coords.latitude + "," + position.coords.longitude;
        let ipthietbi;
        const msdn = localStorage;
        if (msdn) {
          const handleSetViTri = async (e) => {
            try {
              const params = {
                msdn: msdn,
                ipthietbi: ipthietbi,
                thietbi: thietbi,
                mshh: "",
                tim: "",
              };
              await hanghoaApi.post_luotxem(params);
            } catch (error) {
              console.log(error);
            }
          };
          handleSetViTri();
        } else {
          const handleSetViTri = async (e) => {
            try {
              const params = {
                msdn: "",
                ipthietbi: ipthietbi,
                thietbi: thietbi,
                mshh: "",
                tim: "",
              };
              await hanghoaApi.post_luotxem(params);
            } catch (error) {
              console.log(error);
            }
          };
          handleSetViTri();
        }
      }
      showPosition();
    };
    handleGetLocation();
  }, []);

  //todo load Giỏ hàng trên header
  const handleGiohangDangxuat = (e) => {
    const params = {
      msdn: localStorage,
    };
    dispatch(createGiohang.createGiohangRequest(params));
  };
  //Logout
  const handleLogout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("msdv");
    window.localStorage.removeItem("tendv");
    window.localStorage.removeItem("msdn");
    window.localStorage.removeItem("tendaidien");
    window.localStorage.removeItem("diachi");
    window.localStorage.removeItem("dienthoai");
    window.localStorage.removeItem("maxa");
    toggleMenu();
    handleGiohangDangxuat();
  };
  const handle_hidden_form_thongbao = () => {
    window.localStorage.setItem("message", "1");
    setFormThongbao(false);
  };

  //todo Load tiền tích lũy
  useEffect(() => {
    const Load_tien_tichluy = async (e, value) => {
      try {
        const params = {
          mskh: msdv,
        };
        const response = await giohangApi.load_tien_tichluy(params);
        setTienTichLuy(response[0].sotien);
        //todo load chi tiết thông tin nhận hàng khi chỉnh sửa
      } catch (error) {
        console.log(error);
      }
    };
    Load_tien_tichluy();
  }, [msdv, giohang]);

  const handleAdd_KM = async () => {
    try {
      const params = {
        msdn: localStorage,
      };
      await giohangApi.add_hanghoa_km(params);
      dispatch(createGiohang.createGiohangRequest(params));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="sticky z-[999]  top-0 shadow-md">
        <div className="bg-white w-auto h-auto  ">
          <div className=" fullscreen:mx-10 smlap:mx-10 lglap:container mx-auto text-black mobile:py-[12px] tablet:px-3">
            <div className="grid grid-cols-6 lglap:grid-cols-9 tablet:h-[60px] smlap:grid-cols-8 tablet:grid-cols-12 gap-5 mobile:px-2 mobile:grid-cols-8 mobile:gap-1 items-center">
              <div className="mobile:col-span-1 mobile:flex smlap:hidden mobile:justify-start fullscreen:hidden lglap:hidden tablet:hidden mobile:items-center">
                <div className="flex items-center md:hidden ">
                  <button
                    onClick={toggleMenu}
                    className="text-white text-4xl font-bold hover:opacity-100 duration-300"
                  >
                    <Image
                      src={require("../../pages/assets/img/icon/menu.jpg")}
                      alt="menu"
                    />
                  </button>
                </div>
                <div>
                  <div
                    id="bg_menu"
                    onClick={toggleMenu}
                    className="hidden fixed top-0 left-0 px-10 py-16 bg-[#000] opacity-50 z-50
                    md:relative md:flex md:w-[70%] md:p-0 md:bg-transparent md:flex-row md:space-x-6"
                  ></div>
                  <ul
                    id="menu"
                    className="hidden fixed top-0 left-0 px-5 py-12 bg-[#fff] z-[59]
                    md:relative md:flex md:w-[70%] md:p-0 md:bg-transparent md:flex-row md:space-x-6 leading-10 text-sm"
                  >
                    <li className="md:hidden z-90 fixed top-0 left-0 w-[70%] bg-green-700 flex justify-between items-center">
                      <div className="text-left text-white ml-5">
                        {!localStorage || localStorage === null ? (
                          <p
                            onClick={toggleMenuClose}
                            className="underline underline-offset-1"
                          >
                            Đăng nhập
                          </p>
                        ) : (
                          <p>{localStorage_Tendv}</p>
                        )}
                      </div>
                      <p
                        onClick={toggleMenu}
                        className="text-right text-white text-4xl mr-2"
                      >
                        &times;
                      </p>
                    </li>

                    <li className="border-b-[1px]">
                      <Link
                        onClick={toggleMenu}
                        className="text-black hover:opacity-100 duration-300 flex gap-2 items-center"
                        href="/"
                      >
                        <p>Trang chủ</p>
                      </Link>
                    </li>

                    {!localStorage || localStorage === null ? (
                      ""
                    ) : (
                      <>
                        <li
                          className="hover:cursor-pointer border-b-[1px]"
                          onClick={() => toggleMenu()}
                        >
                          <div className="text-black hover:opacity-100 duration-300 flex gap-1  items-center">
                            <p>
                              Tiền tích lũy:{" "}
                              <span
                                id="tientichluy_header"
                                className="text-[red]  font-inter_semibold"
                              >
                                {tientichluy
                                  ?.toString()
                                  .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
                              </span>
                            </p>
                          </div>
                        </li>
                        <li
                          onClick={() => toggleMenu()}
                          className="border-b-[1px]"
                        >
                          <Link href="/history">
                            <div className="text-black hover:opacity-100 duration-300 flex gap-2  items-center">
                              <p>Lịch sử đơn hàng</p>
                            </div>
                          </Link>
                        </li>
                        <li
                          onClick={() => toggleMenu()}
                          className="hover:cursor-pointer border-b-[1px]"
                        >
                          <Link
                            href={"/find-product"}
                            className="flex items-center "
                          >
                            <div></div>
                            <p>Yêu cầu tìm sản phẩm</p>
                          </Link>
                        </li>
                        <li
                          className="border-b-[1px]"
                          onClick={(e) => {
                            dispatch(showModalDangXuat());
                          }}
                        >
                          <div className="text-black hover:opacity-100 duration-300 flex gap-2 items-center ">
                            <p>Đăng xuất</p>
                          </div>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>

              <div className="col-span-1 lglap:col-span-2 smlap:col-span-2  mobile:hidden mobile:items-center tablet:col-span-1 mobile:col-span-1 tablet:flex tablet:items-center ">
                <button onClick={(e) => active_filter(e, "/")}>
                  <Image
                    className="max-w-full mobile:hidden h-[60px] tablet:hidden w-[235px]"
                    src={require("../../pages/assets/img/banner/duoc-tay-nam.svg")}
                    alt="Dược Tây Nam"
                    width="259px"
                    height="58px"
                  ></Image>
                  <Image
                    className="max-w-full smlap:hidden fullscreen:hidden tablet:block lglap:hidden w-[50px]"
                    src={require("../../pages/assets/img/banner/duoc-tay-nam-mini.svg")}
                    alt="Dược Tây Nam mobile"
                  ></Image>
                </button>
              </div>
              {/* Search */}
              <Search />
              <div className="col-span-3 h-15 lglap:col-span-5 smlap:col-span-4 tablet:col-span-7 mobile:col-span-1 mobile:relative">
                <ul className="flex gap-2 mb-2 tablet:mb-[-0.5rem] items-center justify-end  text-[black] mobile:mb-0 mobile:items-center  ">
                  <li className=" mobile:hidden">
                    <LoginForm localStorage={localStorage} />
                  </li>
                  <li>
                    {!localStorage || localStorage === null ? (
                      <Link href="#">
                        <div className="flex relative">
                          <button className="smlap:hidden rounded-md  fullscreen:hidden lglap:hidden mobile:relative ">
                            <Image
                              className=""
                              onClick={() => dispatch(showModal())}
                              src={require("../../pages/assets/img/icon/account.png")}
                              alt="Giỏ hàng Mobile"
                            />{" "}
                          </button>
                        </div>
                      </Link>
                    ) : (
                      <Link
                        onClick={() => {
                          handleAdd_KM();
                        }}
                        href="/cart"
                      >
                        <div className="flex relative">
                          <button className=" flex items-center rounded-md text-[#CC0000] tablet:hidden mobile:hidden gap-2">
                            • GIỎ HÀNG{" "}
                            <p className="h-6 w-6 bg-[#CC0000] flex items-center justify-center  rounded-full text-white ">
                              {giohang}
                            </p>
                          </button>
                          <button className=" smlap:hidden rounded-md text-[#CC0000] fullscreen:hidden lglap:hidden mobile:relative ">
                            <p className="mobile:absolute mobile:right-[-6px] mobile:top-[-14px] mobile:text-sm tablet:absolute tablet:right-[0px] tablet:top-[-14px] tablet:text-sm h-5 w-5 bg-[red] flex items-center justify-center  rounded-full text-white ">
                              {giohang}
                            </p>
                            <Image
                              className=""
                              src={require("../../pages/assets/img/icon/cart_mobile.png")}
                              alt="Giỏ hàng Mobile"
                            />{" "}
                          </button>
                        </div>
                      </Link>
                    )}
                  </li>
                </ul>
                <ul className="flex gap-1  items-center justify-end  text-[black] text-[15px] smlap:text-[14px] mobile:hidden tablet:hidden">
                  {!localStorage || localStorage === null ? (
                    ""
                  ) : (
                    <>
                      <li
                        className="hover:cursor-pointer"
                        onClick={() => toggleMenu()}
                      >
                        <div className="text-black hover:opacity-100 duration-300 flex gap-1  items-center">
                          <p
                            className="hover:text-[green]"
                            onClick={() => {
                              setFormTienTichLuy(true);
                            }}
                          >
                            Tiền tích lũy:{" "}
                            <span id="tientichluy_header">
                              {tientichluy
                                ?.toString()
                                .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
                            </span>
                            |
                          </p>
                        </div>
                      </li>

                      <li
                        className="hover:cursor-pointer"
                        onClick={() => toggleMenu()}
                      >
                        <Link href="/history">
                          <div className="text-black hover:opacity-100 duration-300 flex gap-1  items-center">
                            <p className="hover:text-[green]">
                              Lịch sử đơn hàng |
                            </p>
                          </div>
                        </Link>
                      </li>

                      <li className="hover:cursor-pointer">
                        <Link
                          href={"/find-product"}
                          className="flex items-center "
                        >
                          <p className="hover:text-[green]">
                            Yêu cầu tìm sản phẩm |
                          </p>
                        </Link>
                      </li>

                      <li
                        className="hover:cursor-pointer"
                        onClick={(e) => {
                          dispatch(showModalDangXuat());
                        }}
                      >
                        <div className="text-black hover:opacity-100 duration-300 flex gap-1 items-center ">
                          <p className="hover:text-[red]">Đăng xuất</p>
                        </div>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* {check_page == sanpham} */}
        {/* Danh mục nhóm sản phẩm */}
        <div className="bg-[#103c19] ">
          <ul className="items_nhomsp fullscreen:container smlap:container lglap:container mx-auto text-[14px] h-[35px] flex justify-between items-center lglap:overflow-x-scroll lglap:whitespace-nowrap lglap:gap-2  smlap:overflow-x-scroll smlap:whitespace-nowrap smlap:gap-2 text-white tablet:text-sm tablet:overflow-x-scroll tablet:whitespace-nowrap tablet:gap-3 tablet:px-3 mobile:overflow-x-scroll mobile:whitespace-nowrap mobile:gap-2">
            {danhmuc?.map((danhmuc_item, key) => {
              let tenviettat_filter =
                "groupproduct=" +
                danhmuc_item.msloai
                  .replaceAll(" ", "-")
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .replace(/[đĐ]/g, (m) => (m === "đ" ? "d" : "D"))
                  .toLowerCase();
              const handleActive_filter = (e) => {
                active_filter(e, "nhom");
                handleFilter(tenviettat_filter);
              };
              return (
                <li
                  onClick={(e) => handleActive_filter(e)}
                  className="h-full flex items-center hover:cursor-pointer"
                >
                  {danhmuc_item.tenloai}
                </li>
              );
            })}
          </ul>
        </div>
        {/* Filter */}
        <div id="filter_sanpham" className="filter_sanpham">
          {/* Hãng sản xuất */}
          <div className="bg-[#f1fafe] ">
            <ul className="items_hangsx ">
              {hangsx?.map((hangsx_item, key) => {
                let tenviettat_filter =
                  "producer=" +
                  hangsx_item.msloai
                    .replaceAll(" ", "-")
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .replace(/[đĐ]/g, (m) => (m === "đ" ? "d" : "D"))
                    .toLowerCase();
                const handleActive_filter = (e) => {
                  active_filter(e, "hang");
                  handleFilter(tenviettat_filter);
                };
                return (
                  <li
                    onClick={(e) => handleActive_filter(e)}
                    className=" fullscreen:hover:bg-orange-400 fullscreen:px-2  hover:cursor-pointer rounded-md text-sm mobile:text-xs"
                  >
                    {hangsx_item.tenloai}
                  </li>
                );
              })}
            </ul>
          </div>
          {/* Tiêu chuẩn */}
          <div className="bg-[#f1fafe] list_nsx_nuocsx">
            <div className="flex fullscreen:container  smlap:container lglap:container mx-auto ">
              <ul className="items_tieuchuan fullscreen:container hidden smlap:container lglap:container mx-auto h-[25px] gap-5 mobile:gap-2  justify-start items-center text-black ">
                {tieuchuan?.map((tieuchuan_item, key) => {
                  let tenviettat_filter =
                    "standard=" +
                    tieuchuan_item.tenloai
                      .replaceAll(" ", "-")
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "")
                      .replace(/[đĐ]/g, (m) => (m === "đ" ? "d" : "D"))
                      .toLowerCase();
                  const handleActive_filter = (e) => {
                    active_filter(e, "tieuchuan");
                    handleFilter(tenviettat_filter);
                  };
                  return (
                    <li
                      onClick={(e) => handleActive_filter(e)}
                      className=" fullscreen:hover:bg-orange-400 fullscreen:px-2  hover:cursor-pointer px-2 rounded-md text-sm mobile:text-xs"
                    >
                      {tieuchuan_item.tenloai}
                    </li>
                  );
                })}
              </ul>
              <ul className=" items_nuocsx ">
                {nuocsx?.map((nuocsx_item, key) => {
                  let tenviettat_filter =
                    "country=" +
                    nuocsx_item.msloai
                      .replaceAll(" ", "-")
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "")
                      .replace(/[đĐ]/g, (m) => (m === "đ" ? "d" : "D"))
                      .toLowerCase();
                  const handleActive_filter = (e) => {
                    active_filter(e, "nuoc");
                    handleFilter(tenviettat_filter);
                  };
                  return (
                    <li
                      onClick={(e) => handleActive_filter(e)}
                      className=" fullscreen:hover:bg-orange-400 fullscreen:px-2  hover:cursor-pointer rounded-md text-sm mobile:text-xs"
                    >
                      {nuocsx_item.tenloai}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {form_dathangthanhcong ? (
        <div className="bg-[#000000b5] justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[1000] outline-none focus:outline-none">
          <div className="modal-dialog relative w-auto pointer-events-none">
            <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
              <div className="modal-body relative p-4 flex flex-col items-center">
                <Image
                  src={require("../../pages/assets/img/icon/success.png")}
                  alt="Thêm giỏ hàng thành công"
                ></Image>
                <h4 className="text-[green]">Đã thêm vào giỏ hàng</h4>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {form_thongbao ? (
        <div className="bg-[#000000b5] justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[1000] outline-none focus:outline-none ">
          <div className="modal-dialog relative w-auto pointer-events-none max-w-[500px] mobile:px-2 mobile:max-w-[350px]  mobile:pb-[50px] mobile:max-h-[500px]  mobile:min-h-[500px] rounded-sm mobile:overflow-y-scroll ">
            <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current mobile:pb-[50px] mobile:max-h-[500px] mobile:min-h-[500px] mobile:overflow-y-scroll  ">
              <div className="modal-body relative flex flex-col  items-center  mobile:max-h-[500px] mobile:min-h-[500px] mobile:pb-[50px]">
                <div className="w-full bg-[#c9f3c9] rounded-t-xl">
                  <h4 className="text-[red] text-center py-[10px] ">
                    THÔNG TIN QUAN TRỌNG
                  </h4>
                </div>
                <div className="whitespace-normal text-justify py-[10px] px-[20px]">
                  <p className="indent-10">
                    Công ty Cổ phần Dược Tây Nam được Công ty TNHH Công nghệ
                    Phần mềm{" "}
                    <a
                      className="hover:text-[green] "
                      href="https://tpsoftct.vn"
                      target="_blank"
                    >
                      TPSoft
                    </a>{" "}
                    thành lập và phát triển nhằm khẳng định sự nỗ lực không
                    ngừng xây dựng hệ sinh thái hoàn chỉnh với sứ mệnh đem đến
                    cho khách hàng những giá trị thiết thực, sự trải nghiệm hoàn
                    toàn mới và khác biệt.
                  </p>
                  <p className="indent-10 pt-2">
                    Với tất cả lòng nhiệt huyết và khát khao, chúng tôi vinh dự
                    được cung cấp sản phẩm và dịch vụ đến tất cả các Nhà thuốc,
                    Quầy thuốc, Phòng khám đang hoạt động trên cả nước.
                  </p>
                  <p className="indent-10 pt-2">
                    Chúng tôi luôn tôn trọng và bảo vệ cộng đồng, vì thế tất cả
                    thông tin về sản phẩm đều nhằm mục đích cung cấp thông tin
                    cho người có chuyên môn theo quy định của pháp luật. Việc sử
                    dụng thuốc kê đơn hay thuốc chữa bệnh phải tuyệt đối tuân
                    thủ theo sự hướng dẫn của người có chuyên môn về y dược.
                  </p>
                  <p className="indent-10 pt-2">Trân trọng cảm ơn.</p>
                  <p className="indent-10 pt-2">
                    Dược Tây Nam © by{" "}
                    <a
                      className="hover:text-[green] "
                      href="https://tpsoftct.vn"
                      target="_blank"
                    >
                      TPSoft
                    </a>{" "}
                  </p>
                </div>
                <div className="flex justify-end w-full mb-2 px-[20px] mobile:pb-3">
                  <button
                    onClick={() => {
                      handle_hidden_form_thongbao();
                    }}
                    className="bg-[#c9f3c9] px-4 py-1 rounded-[7px] hover:text-[red]"
                  >
                    Đồng ý
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {xemtientichluy ? (
        <div className="bg-[#000000b5] justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[1000] outline-none focus:outline-none ">
          <div className="modal-dialog relative w-auto pointer-events-none max-w-[500px] mobile:px-2 mobile:max-w-[350px]  mobile:mb-[50px] mobile:max-h-[500px] mobile:overflow-y-scroll ">
            <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current ">
              <div className="modal-body relative flex flex-col  items-center">
                <div className="w-full bg-[#c9f3c9] rounded-t-xl">
                  <h4 className="text-[red] text-center py-[10px] ">
                    CHƯƠNG TRÌNH KẾT NỐI DÀI LÂU
                  </h4>
                </div>
                <div className="whitespace-normal text-justify py-[10px] px-[20px]">
                  <p className="indent-10 text-[red]">
                    Số tiền còn lại của Quý khách là:{" "}
                    <span>
                      {" "}
                      {tientichluy
                        ?.toString()
                        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
                    </span>
                  </p>
                  <p className="indent-10 pt-2">
                    Dược Tây Nam luôn nỗ lực đem lại những giá trị thiết thực
                    cho Quý khách hàng.
                  </p>
                  <p className="indent-10 pt-2">
                    Nhằm tri ân sự ủng hộ của Quý khách, với mỗi đơn hàng, Dược
                    Tây Nam vinh dự tặng thêm một món quà nhỏ được tích góp từ
                    quá trình mua hàng.
                  </p>
                  <p className="indent-10 pt-2">
                    Quý khách được sử dụng bất cứ khi nào.
                  </p>
                  <p className="indent-10 pt-2 pb-3 border-b-[1px]">
                    <Link
                      onClick={() => {
                        setFormTienTichLuy(false);
                      }}
                      href="/history"
                      className="italic hover:text-[green]"
                    >
                      Nhấn vào đây, xem chi tiết quá trình tích lũy.
                    </Link>
                  </p>
                  <p className="indent-10 pt-2">Trân trọng cảm ơn.</p>
                  <p className="indent-10 pt-2">
                    Dược Tây Nam © by{" "}
                    <a
                      className="hover:text-[green]"
                      href="https://tpsoftct.vn/"
                      target="_blank"
                    >
                      TPSoft
                    </a>
                  </p>
                </div>
                <div className="flex justify-end w-full mb-2 px-[20px]">
                  <button
                    onClick={() => {
                      setFormTienTichLuy(false);
                    }}
                    className="bg-[#ddd] px-4 py-1 rounded-[7px] hover:text-[red]"
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
      <LoginModal />
      <DangKiModal />
      <DangXuatModal />
      {/* Bottom while scroll */}
    </>
  );
}

export default Header;
