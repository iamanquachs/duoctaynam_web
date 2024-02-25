// import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import danhmucApi from "../../pages/api/danhmucApi";
import Iframe from "react-iframe";
import { useRouter } from "next/router";

const Footer = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [localStorage, setStatus] = useState();
  const [thisURL, setURL] = useState();
  const [sodienthoai, setSDT] = useState([]);
  const [url, setURLLoad] = useState(router.asPath);

  useEffect(() => {
    setStatus(window.localStorage.getItem("msdn"));
  }, []);

  useEffect(() => {
    setURL(window.location.href);
  }, [url]);

  const shareLink = async () => {
    const path = router.asPath.split("/")[1].split("?")[0];
    var shareData = {};
    switch (path) {
      case "":
        shareData = {
          title: "Hệ Sinh Thái Hoàn Chỉnh",
          text: "Hệ Sinh Thái Hoàn Chỉnh",
          url: thisURL,
        };
        navigator.share(shareData);
        break;
      case "filter":
        shareData = {
          title: "Hệ Sinh Thái Hoàn Chỉnh",
          text: "Hệ Sinh Thái Hoàn Chỉnh",
          url: thisURL,
        };

        navigator.share(shareData);
        break;
      case "product":
        const tenhh = router.asPath.split("?")[1];
        shareData = {
          title: "Hệ Sinh Thái Hoàn Chỉnh",
          text: tenhh,
          url: thisURL,
        };
        navigator.share(shareData);
        break;

      default:
        break;
    }
  };
  //todo active class bộ lọc
  const active_filter = (e, type_filter) => {
    switch (type_filter) {
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

  useEffect(() => {
    //todo Load số điện thoại
    const handleSDT = async (e) => {
      try {
        const params = {
          phanloai: "hotline",
        };
        const response = await danhmucApi.sodienthoai(params);
        setSDT(response[0].tenloai);
      } catch (error) {
        console.log(error);
      }
    };
    handleSDT();
  }, [sodienthoai]);
  return (
    <>
      <div className="bg-white pb-10">
        <div className="fullscreen:container mx-auto">
          <div className="grid grid-cols-12 mobile:grid-cols-3  py-5 tablet:px-3  mobile:px-2 mobile:gap-2 ">
            <div className="col-span-3 flex justify-start">
              <ul className="item_footer pl-2">
                <li>
                  <h1 className="title_item_footer ">Thông tin liên hệ</h1>
                </li>
                <li className="pl-2">CÔNG TY CỔ PHẦN DƯỢC TÂY NAM</li>
                <li className="pl-2">
                  <p className="fullscreen:max-w-[270px] lglap:max-w-[270px] smlap:max-w-[270px] tablet::max-w-[250px]">
                    [MST] 1801712113, được Sở Kế hoạch và Đầu tư TP. Cần Thơ cấp
                    ngày 11/11/2021
                  </p>
                </li>
                <li className="pl-2">
                  <p>[A] 135 Ngô Thì Nhậm, P. An Khánh,</p>
                  <p>Q. Ninh Kiều, TP. Cần Thơ</p>
                </li>
                <li className="pl-2">[P] 0901 0909 17</li>
                <li className="pl-2">[M] contact@duoctaynam.vn</li>
              </ul>
            </div>
            <div className="col-span-2  mobile:col-span-3 flex justify-start">
              <ul className="item_footer pl-2">
                <li>
                  <h1 className="title_item_footer">Chính sách</h1>
                </li>

                <li className="pl-2">
                  <Link href="/info?pham-vi-cung-cap">Phạm vi cung cấp</Link>
                </li>
                <li className="pl-2">
                  <Link href="/info?chinh-sach-doi-tra">
                    Chính sách đổi trả
                  </Link>
                </li>
                <li className="pl-2">
                  <Link href="/info?chinh-sach-giao-hang">
                    Chính sách giao hàng
                  </Link>
                </li>
                <li className="pl-2">
                  <Link href="/info?chinh-sach-bao-mat">
                    Chính sách bảo mật
                  </Link>
                </li>
                <li className="pl-2">
                  <Link href="/info?chinh-sach-thanh-toan">
                    Chính sách thanh toán
                  </Link>
                </li>
                <li className="pl-2">
                  <Link href="/info?chinh-sach-thanh-vien">
                    Chính sách thành viên
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-span-4  mobile:col-span-3 flex justify-start">
              <ul className="item_footer pl-2  w-full">
                <li>
                  <h1 className="title_item_footer">Đường đến Dược Tây Nam</h1>
                </li>
                <li>
                  <Iframe
                    className="mobile:w-full smlap:w-[300px]"
                    title={"duong-den-tpsoft"}
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.7053704048667!2d105.7557252!3d10.0411535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a08967ece868bf%3A0x1c295231ca2c83bc!2zQ8OUTkcgVFkgQ-G7lCBQSOG6pk4gRMav4buiQyBUw4JZIE5BTQ!5e0!3m2!1svi!2s!4v1684204990652!5m2!1svi!2s"
                    width="400px"
                    height="300px"
                    styles={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  />
                </li>
              </ul>
            </div>
            <div className="col-span-3  flex justify-start">
              <ul className="item_footer pl-2 w-full ">
                <li>
                  <h1 className="title_item_footer">
                    Thông tin từ Dược Tây Nam
                  </h1>
                </li>
                <li>
                  <div className="footer_item_body">
                    <div id="fb-root">
                      <div
                        className="fb-page "
                        data-href="https://www.facebook.com/duoctaynam"
                        data-width="400"
                        data-height="300"
                        data-hide-cover="true"
                        data-tabs="timeline"
                        data-small-header="true"
                        data-adapt-container-width="true"
                      ></div>
                    </div>
                    <script
                      async
                      defer
                      crossOrigin="anonymous"
                      src="https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v9.0&appId=552213932260511&autoLogAppEvents=1"
                      nonce="sAfIRAL7"
                    ></script>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Footer bottom */}
      <div className="border-t-[1px] mobile:pb-[50px] border-[#ddd]  fullscreen:hidden  smlap:hidden lglap:hidden">
        <div className="container mx-auto px-20 mobile:px-0 py-2">
          <div className="text-center text-[14px]">
            ® 2022 by Công ty Cổ phần Dược Tây Nam © by{" "}
            <p className="hover:cursor-pointer hover:text-green-700">
              <a target="_blank" href="https://tpsoftct.vn/">
                TPSoft
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className=" z-[9999] fixed inset-x-0 px-5 bottom-0 mobile:bottom-0 h-[40px] pl-[0.5rem] pr-[0.5rem] bg-[#fff] flex justify-between items-center border-t-[#ddd] shadow-[1px_3px_5px_#000] w-auto">
        <div className="">
          <Image
            onClick={(e) => active_filter(e, "/")}
            className="w-[150px]  fullscreen:hidden smlap:hidden lglap:hidden"
            src={require("../../pages/assets/img/icon/Chu_TNP.svg")}
            alt=""
          />
          <div className=" mobile:hidden text-[14px] ">
            <div className="flex gap-2 items-center">
              <Image
                className="w-[30px]"
                src={require("../../pages/assets/img/icon/call.svg")}
                alt="Điện thoại"
                width={30}
                height={30}
              />
              <a aria-label="Call" href="tel:+84901090917">
                {sodienthoai} •{" "}
              </a>
              ® 2022 by Công ty Cổ phần Dược Tây Nam © by{" "}
              <p className="hover:cursor-pointer hover:text-green-700">
                <a target="_blank" href="https://tpsoftct.vn/">
                  TPSoft
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-[20px] ip678:gap-[15px]">
          <a aria-label="Call" href="tel:+84901090917">
            <Image
              className="w-[25px] fullscreen:hidden smlap:hidden lglap:hidden"
              src={require("../../pages/assets/img/icon/call.svg")}
              alt="Điện thoại"
            />
          </a>
          <a
            aria-label="Zalo"
            href="https://zalo.me/4210793912768709606?gidzl=Yigw3zZXprcEqxiDqllDM8_GlWF5hyC0m83Y1vMiaroJXRLOnwgMMvU4wWZ1hSbUdT2u3cHa74LYtERDN0"
            target="_blank"
          >
            <Image
              className="w-[25px] fullscreen:w-[30px] smlap:w-[30px] lglap:w-[30px]"
              src={require("../../pages/assets/img/icon/zalo.svg")}
              alt="Zalo"
            />
          </a>
          <a
            rel="nofollow"
            aria-label="Facebook"
            href="https://www.facebook.com/duoctaynam"
            target="_blank"
            className="mobile:hidden"
          >
            <Image
              className="w-[25px] fullscreen:w-[30px] smlap:w-[30px] lglap:w-[30px] mobile:hidden"
              src={require("../../pages/assets/img/icon/fb.svg")}
              alt="Facebook"
            />
          </a>
          <a
            rel="nofollow"
            aria-label="Facebook"
            href="fb://profile/100089278662100"
            target="_blank"
            className="fullscreen:hidden smlap:hidden lglap:hidden"
          >
            <Image
              className="w-[25px] fullscreen:hidden smlap:hidden lglap:hidden"
              src={require("../../pages/assets/img/icon/fb.svg")}
              alt="Facebook"
            />
          </a>
          <Image
            onClick={() => {
              shareLink();
            }}
            className="w-[25px] fullscreen:w-[30px] smlap:w-[30px] lglap:w-[30px] fullscreen:hidden smlap:hidden lglap:hidden"
            src={require("../../pages/assets/img/icon/share.svg")}
            alt="Share"
          />
          <Image
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            className="w-[25px] fullscreen:w-[30px] smlap:w-[30px] lglap:w-[30px] hover:cursor-pointer"
            src={require("../../pages/assets/img/icon/top.svg")}
            alt="On Top"
          />
        </div>
      </div>
    </>
  );
};

export default Footer;
