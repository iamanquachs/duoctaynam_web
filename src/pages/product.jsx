import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import hanghoaApi from "./api/hanghoaApi";
import dathangApi from "./api/dathangApi";
import MoTaSanPham from "../components/sanpham/mota_sanpham";
import SanphamItem from "../components/sanpham/sanpham_item";
import { useDispatch, useSelector } from "react-redux";
import {
  createGiohang,
  showModal,
  showModalImage,
  hideModalImage,
  isShowDHTC,
  hideShowDHTC,
} from "../components/redux/actions";
import { modalImage$ } from "../components/redux/selectors";
import { useRouter } from "next/router";
import { Radio } from "@material-tailwind/react";
import parse from "html-react-parser";
import Link from "next/link";

export default function Product() {
  useEffect(() => {
    window.scroll(0, 0);
  });
  const router = useRouter();
  const dispatch = useDispatch();
  const [ctHanghoa, setctHanghoa] = useState([]);
  const [soluong, setSoluong] = useState(1);
  const [sanphamcungnhom, setSanPhamCungNhom] = useState([]);
  const [itemImg, setThisItemImg] = useState();
  const [loaiAnh, setLoaiAnh] = useState();
  const [hosogiaban, setHosogiaban] = useState([]);
  const [mshh_sanpham, setMSHH_Sanpham] = useState();
  const [mshh_nhomSP, setNhomSP] = useState();
  const [mshh_tenSP, setTenSP] = useState();
  const [mshh_maNhomSP, setMaNhomSP] = useState();
  const show = useSelector(modalImage$).isShow;
  const key = router.query;
  const url_sanpham = Object.keys(key)[0];
  // get chi tiết hàng hóa
  const [localStorage, setStatus] = useState();
  useEffect(() => {
    setStatus(window.localStorage.getItem("msdn"));
  }, []);
  useEffect(() => {
    const handleHanghoa = async (e) => {
      try {
        const params = {
          url: url_sanpham,
        };
        const response = await hanghoaApi.listchitietsp(params);
        if (response[0] != undefined) {
          setMSHH_Sanpham(response[0].mshh);
          setTenSP(response[0].tenhh);
          setNhomSP(response[0].tennhom);
          setMaNhomSP(response[0].dieukien2);
        }

        setctHanghoa(response);
      } catch (error) {
        console.log(error);
      }
    };
    handleHanghoa();
  }, [url_sanpham]);
  function soluong_tang() {
    const soluong_element = document.getElementsByClassName("input_sl")[0];
    var soluong = soluong_element.value;
    var soluong_new = Number(soluong) + 1;
    soluong_element.value = soluong_new;
    setSoluong(soluong_new);
  }
  function soluong_giam() {
    const soluong_element = document.getElementsByClassName("input_sl")[0];
    var soluong = soluong_element.value;

    if (soluong <= 1) {
    } else {
      var soluong_new = Number(soluong) - 1;
      soluong_element.value = soluong_new;
      setSoluong(soluong_new);
    }
  }

  function handleGiohang(e) {
    const params = {
      msdn: localStorage,
    };
    dispatch(createGiohang.createGiohangRequest(params));
  }

  function dathangline_add(index, e) {
    dispatch(isShowDHTC());
    setTimeout(() => {
      dispatch(hideShowDHTC());
    }, 1000);

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
  useEffect(() => {
    const sanphamcungnhomHandle = async (e) => {
      try {
        const params = {
          tru_hanghoa: url_sanpham,
          value_msnhom: ctHanghoa[0].groupproduct,
        };
        const response = await hanghoaApi.list_sanphamcungnhom(params);
        setSanPhamCungNhom(response);
      } catch (error) {
        // console.log(error);
      }
    };
    sanphamcungnhomHandle();
  }, [ctHanghoa]);
  const link = "https://erp.duoctaynam.vn/upload/sanpham/";
  const linkImg_child = "https://erp.duoctaynam.vn/upload/anhmota/";

  const handleCloseModal = () => {
    dispatch(hideModalImage());
  };
  const selectImg = (e, r) => {
    setLoaiAnh(r);
    setThisItemImg(e);
  };

  useEffect(() => {
    const load_hosogiaban_chitiet = async (e) => {
      try {
        const params = {
          mshh: mshh_sanpham,
        };
        const response = await hanghoaApi.load_hosogiaban(params);
        setHosogiaban(response);
      } catch (error) {
        console.log(error);
      }
    };
    load_hosogiaban_chitiet();
  }, [ctHanghoa]);

  return (
    <>
      <Head>
        <title>Dược Tây Nam</title>
        <meta name="description" content="Dược Tây Nam" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <!-- description --> */}
        <meta
          property="og:image:alt"
          content="Giải pháp cho mọi vấn đề của bạn | Sản phẩm phù hợp nhu cầu | Hệ sinh thái hoàn chỉnh"
        ></meta>
        <meta
          name="description"
          content="Giải pháp cho mọi vấn đề của bạn | Sản phẩm phù hợp nhu cầu | Hệ sinh thái hoàn chỉnh"
        />
        <meta
          name="keywords"
          content="Giải pháp cho mọi vấn đề của bạn | Sản phẩm phù hợp nhu cầu | Hệ sinh thái hoàn chỉnh"
        />
        {/* <!-- Google / Search Engine Tags --> */}
        <meta itemprop="name" content="Dược Tây Nam © by TPSoft" />
        <meta
          itemprop="description"
          content="Giải pháp cho mọi vấn đề của bạn | Sản phẩm phù hợp nhu cầu | Hệ sinh thái hoàn chỉnh"
        />
        <meta itemprop="image" content="/BG_SEO_TNP.png" />

        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content="/" />
        <meta property="og:site_name" content="duoctaynam.vn" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Dược Tây Nam © by TPSoft" />
        <meta
          property="og:description"
          content="Giải pháp cho mọi vấn đề của bạn | Sản phẩm phù hợp nhu cầu | Hệ sinh thái hoàn chỉnh"
        />
        <meta property="og:image" content="/BG_SEO_TNP.png" />

        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dược Tây Nam © by TPSoft" />
        <meta
          name="twitter:description"
          content="Giải pháp cho mọi vấn đề của bạn | Sản phẩm phù hợp nhu cầu | Hệ sinh thái hoàn chỉnh"
        />
        <meta name="twitter:image" content="/BG_SEO_TNP.png" />
        <link rel="icon" type="image/png" href="/Logo_TPSPharma_mini.png" />
      </Head>
      <div className="bg-[#edf0f3] lglap:px-5 pt-[10px] mobile:px-2">
        <div className="fullscreen:container mx-auto smlap:px-10 tablet:px-5 pb-[10px] flex justify-between mobile:text-sm">
          <div className="flex gap-2  mobile:max-w-[80%] ">
            <Link href={"/"}>
              <p className="whitespace-nowrap hover:text-[green]">
                Trang chủ /{" "}
              </p>
            </Link>
            <Link
              className="hover:text-[green] mobile:max-w-[130px]"
              href={"/all-product?" + mshh_maNhomSP}
            >
              <p className="whitespace-nowrap w-full mobile:truncate">
                {mshh_nhomSP}
              </p>
            </Link>
            <p className="whitespace-nowrap truncate mobile:max-w-[120px]">
              {" "}
              / {mshh_tenSP}
            </p>
          </div>
          <div
            className="flex items-center gap-2 hover:cursor-pointer hover:text-[green] whitespace-nowrap"
            onClick={() => router.back()}
          >
            <div>
              <Image
                className="mobile:w-[100%]"
                src={require("../pages/assets/img/icon/back.png")}
                alt="Trở về"
              ></Image>
            </div>
            Trở về
          </div>
        </div>
        <div className=" fullscreen:container mx-auto smlap:px-10 tablet:px-5  ">
          <div className=" bg-white grid grid-cols-12 p-4 gap-10 mobile:gap-0 mobile:py-5 mobile:px-[20px] tablet:px-3 shadow-md rounded-[5px]">
            {ctHanghoa.map((cthanghoa_item, key) => {
              const img_childs = cthanghoa_item.path_image_child;
              return (
                <>
                  <div className="col-span-5 mobile:col-span-12  grid grid-cols-12">
                    <div className=" rounded-xl flex justify-center col-span-12">
                      <div className="">
                        <div>
                          <h1 className="font-bold text-xl text-[green] mobile:text-xl mobile:pb-[10px] fullscreen:hidden smlap:hidden lglap:hidden tablet:hidden ">
                            {cthanghoa_item.tenhh}
                          </h1>
                        </div>
                        {itemImg && loaiAnh == "anhphu" ? (
                          <Image
                            className="rounded-xl mx-auto "
                            src={linkImg_child + `${itemImg}`}
                            alt={cthanghoa_item.path_image}
                            width={400}
                            height={400}
                          />
                        ) : (
                          <Image
                            onClick={(e) => {
                              selectImg(cthanghoa_item.path_image, "anhchinh");
                              // dispatch(showModalImage());
                            }}
                            className="rounded-lg"
                            // src={require(`../../../Backend/upload/sanpham/${cthanghoa_item.path_image}`)}
                            src={link + `${cthanghoa_item.path_image}`}
                            alt={cthanghoa_item.path_image}
                            width={400}
                            height={400}
                          />
                        )}
                      </div>
                    </div>
                    <div className="img_mota col-span-12 pt-3">
                      <div className="grid grid-cols-5 gap-3 items-center">
                        <div className="col-span-1">
                          <div className="">
                            <Image
                              onClick={(e) => {
                                selectImg(
                                  cthanghoa_item.path_image,
                                  "anhchinh"
                                );
                                // dispatch(showModalImage());
                              }}
                              className="rounded-lg"
                              // src={require(`../../../Backend/upload/sanpham/${cthanghoa_item.path_image}`)}
                              src={link + `${cthanghoa_item.path_image}`}
                              alt={cthanghoa_item.path_image}
                              width={400}
                              height={400}
                            />
                          </div>
                        </div>
                        {img_childs
                          ? img_childs.split("|").map((img_child, key) => {
                              if (img_child != "") {
                                return (
                                  <div className="col-span-1">
                                    <div className="">
                                      <Image
                                        onClick={(e) => {
                                          selectImg(img_child, "anhphu");
                                          // dispatch(showModalImage());
                                        }}
                                        className="rounded-lg "
                                        src={linkImg_child + `${img_child}`}
                                        width={500}
                                        height={500}
                                        alt={img_child}
                                      />
                                    </div>
                                  </div>
                                );
                              }
                            })
                          : ""}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-7 mobile:col-span-12">
                    <div>
                      <h1 className="font-bold text-xl text-[green] mobile:text-xl mobile:hidden">
                        {cthanghoa_item.tenhh}
                      </h1>
                    </div>
                    <div className="grid grid-cols-12 gap-5 pt-5">
                      <div className="col-span-12 tablet:col-span-12 mobile:col-span-12">
                        <div className="mb-3 grid grid-cols-12 ">
                          <div className="col-span-2 smlap:col-span-4 tablet:col-span-4  mobile:col-span-5">
                            <p>• Nhóm</p>
                          </div>
                          <div className="col-span-10 tablet:col-span-8 mobile:col-span-7">
                            <p>{cthanghoa_item.tennhom}</p>
                          </div>
                        </div>
                        <div className="mb-3 grid grid-cols-12 ">
                          <div className="col-span-2 smlap:col-span-4 tablet:col-span-4  mobile:col-span-5">
                            <p>• Hoạt chất</p>
                          </div>
                          <div className="col-span-10 smlap:col-span-8 tablet:col-span-8 mobile:col-span-7">
                            <p>
                              {cthanghoa_item.tenhoatchat != "undefined"
                                ? parse(cthanghoa_item.tenhoatchat)
                                : ""}
                            </p>
                          </div>
                        </div>
                        <div className="mb-3 grid grid-cols-12 ">
                          <div className="col-span-2 smlap:col-span-4 tablet:col-span-4  mobile:col-span-5">
                            <p>• Hàm lượng</p>
                          </div>
                          <div className="col-span-10 smlap:col-span-8 tablet:col-span-8 mobile:col-span-7 ">
                            <p>
                              {cthanghoa_item.hamluong != "undefined"
                                ? cthanghoa_item.hamluong
                                : ""}
                            </p>
                          </div>
                        </div>
                        <div className="mb-3 grid grid-cols-12 ">
                          <div className="col-span-2 smlap:col-span-4 tablet:col-span-4  mobile:col-span-5">
                            <p>• Quy cách</p>
                          </div>
                          <div className="col-span-10 smlap:col-span-8 tablet:col-span-8 mobile:col-span-7 ">
                            <p>{cthanghoa_item.quycach}</p>
                          </div>
                        </div>
                        <div className="mb-3 grid grid-cols-12 ">
                          <div className="col-span-2 smlap:col-span-4 tablet:col-span-4  mobile:col-span-5">
                            <p>• Tiêu chuẩn</p>
                          </div>
                          <div className="col-span-10 smlap:col-span-8 tablet:col-span-8 mobile:col-span-7 ">
                            <p>
                              {cthanghoa_item.standard != "undefined"
                                ? cthanghoa_item.standard
                                : ""}
                            </p>
                          </div>
                        </div>
                        <div className="mb-3 grid grid-cols-12 ">
                          <div className="col-span-2 smlap:col-span-4 tablet:col-span-4  mobile:col-span-5">
                            <p>• Nhà sản xuất</p>
                          </div>
                          <div className="col-span-10 smlap:col-span-8 tablet:col-span-8 mobile:col-span-7 ">
                            <p>
                              {cthanghoa_item.tennhasx != "undefined"
                                ? cthanghoa_item.tennhasx
                                : ""}
                            </p>
                          </div>
                        </div>
                        <div className="mb-3 grid grid-cols-12 ">
                          <div className="col-span-2 smlap:col-span-4 tablet:col-span-4 mobile:col-span-5">
                            <p>• Nước sản xuất</p>
                          </div>
                          <div className="col-span-10 smlap:col-span-8 tablet:col-span-8 mobile:col-span-7 ">
                            <p>
                              {cthanghoa_item.country != "undefined"
                                ? cthanghoa_item.country
                                : ""}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-12 gap-5 items-end mobile:px-2">
                          <div className="col-span-12">
                            <div className=" px-2 rounded-md grid grid-cols-12 w-[38%] smlap:w-[60%] tablet:w-[55%] mobile:w-[80%] bg-[#eefcee]">
                              {hosogiaban?.map((item, key) => {
                                return (
                                  <div className="col-span-12 grid grid-cols-12 py-2 border-b-[1px] border-b-[#c5e6cc] last:border-none">
                                    <span className="col-span-6 flex ">
                                      {item.sl_tuden + " " + item.dvt_ban}{" "}
                                    </span>
                                    <span className="col-span-4">
                                      {item.giaban
                                        .toString()
                                        .replace(
                                          /(\d)(?=(\d\d\d)+(?!\d))/g,
                                          "$1."
                                        ) +
                                        "/" +
                                        item.dvt_ban}{" "}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                            <div className=" w-full flex items-right justify-start items-center"></div>
                          </div>
                          <div className="col-span-2 smlap:col-span-4 tablet:col-span-4 mobile:col-span-5">
                            <div className="flex items-center justify-between w-full p-1 border-2 border-gray-400 rounded-lg">
                              <button onClick={soluong_giam} className="">
                                <Image
                                  src={require("./assets/img/icon/minus.png")}
                                  alt="minus"
                                ></Image>
                              </button>
                              <input
                                onChange={(e) =>
                                  setSoluong(
                                    e.target.value.replace(/[^0-9\.\,]/g, "")
                                  )
                                }
                                className="input_sl w-10 text-lg text-center outline-none"
                                value={soluong}
                              ></input>
                              <button onClick={soluong_tang} className="">
                                <Image
                                  src={require("./assets/img/icon/plus.png")}
                                  alt="plus"
                                ></Image>
                              </button>
                            </div>
                          </div>
                          <div className="col-span-4 smlap:col-span-6 tablet:col-span-8 mobile:col-span-7">
                            <button
                              onClick={(e) =>
                                dathangline_add(key, cthanghoa_item)
                              }
                              className=" bg-[green] w-[60%] mobile:w-full text-white smlap:px-1  rounded-lg px-3 ml-3 py-2 mobile:ml-0"
                            >
                              Thêm vào giỏ
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>

        <div className="fullscreen:container mx-auto py-5 tablet:px-5 mobile:px-0 smlap:px-10 ">
          <div className="bg-white text-justify shadow-md rounded-[5px]">
            {ctHanghoa.map((cthanghoa_item, key) => {
              return <MoTaSanPham mota_sanpham={cthanghoa_item} />;
            })}
          </div>
          <div className="bg-white mt-5 shadow-md rounded-[5px]">
            <div className="p-5 mobile:p-2">
              <div className="font-bold text-[black]">Sản phẩm cùng nhóm</div>
              <div className="pt-5 ">
                <div className="grid grid-cols-5 gap-3 pt-5 tablet:grid-cols-3 smlap:grid-cols-4 mobile:grid-cols-1">
                  {sanphamcungnhom?.map((sanphamcungnhom_item, key) => {
                    return (
                      <SanphamItem
                        hanghoa_item={sanphamcungnhom_item}
                        index={key}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {show ? (
        <div className="bg-[#000000b5] justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[1000] outline-none focus:outline-none">
          <div className="modal-dialog relative  pointer-events-none w-[600px] mobile:w-[400px]">
            <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
              <div className="modal-body relative p-4 text-center w-full">
                {ctHanghoa.map((cthanghoa_item, key) => {
                  const img_childs = cthanghoa_item.path_image_child;
                  return (
                    <>
                      <div className="">
                        {/* <p>{cthanghoa_item.tenhh}</p> */}
                        {itemImg && loaiAnh == "anhphu" ? (
                          <Image
                            className="rounded-xl mx-auto "
                            src={linkImg_child + `${itemImg}`}
                            alt={cthanghoa_item.path_image}
                            width={400}
                            height={400}
                          />
                        ) : (
                          <Image
                            className="rounded-xl mx-auto"
                            src={link + `${cthanghoa_item.path_image}`}
                            alt={cthanghoa_item.path_image}
                            width={400}
                            height={400}
                          />
                        )}
                      </div>
                      <div className="grid grid-cols-5 h-[100px] items-center gap-4 mt-5">
                        <div className="col-span-1 hover:opacity-[0.5]">
                          <div className="">
                            <Image
                              onClick={(e) => {
                                selectImg(
                                  cthanghoa_item.path_image,
                                  "anhchinh"
                                );
                              }}
                              className="rounded-xl"
                              src={link + `${cthanghoa_item.path_image}`}
                              alt={cthanghoa_item.path_image}
                              width={400}
                              height={400}
                            />
                          </div>
                        </div>
                        {img_childs
                          ? img_childs.split("|").map((img_child, key) => {
                              if (img_child != "") {
                                return (
                                  <div className="col-span-1 hover:opacity-[0.5]">
                                    <div className="">
                                      <Image
                                        onClick={(e) => {
                                          selectImg(img_child, "anhphu");
                                        }}
                                        className="rounded-xl "
                                        name={linkImg_child + `${img_child}`}
                                        src={linkImg_child + `${img_child}`}
                                        alt={img_child}
                                        width={400}
                                        height={400}
                                      />
                                    </div>
                                  </div>
                                );
                              }
                            })
                          : ""}
                      </div>
                    </>
                  );
                })}
                <div className="text-right lg:text-right flex justify-end pt-3">
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
