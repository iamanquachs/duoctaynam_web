import React, { useState, useEffect } from "react";
import thanhtoanApi from "./api/thanhtoanApi";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Head from "next/head";

const Thanhtoan = () => {
  const [tendv, setTendv] = useState([]);
  const [msdn, setMSDN] = useState([]);
  useEffect(() => {
    window.scroll(0, 0);
    setTendv(window.localStorage.getItem("tendv"));
    setMSDN(window.localStorage.getItem("msdn"));
  });
  const router = useRouter();

  const paramsSearch = router.query;
  const soct = Object.keys(paramsSearch)[0];
  var [thanhtien, setThanhtien] = useState([]);
  //todo lấy tổng tiền
  useEffect(() => {
    const handleTongcong = async (e) => {
      try {
        const params = {
          soct: soct,
        };
        const response = await thanhtoanApi.get_thanhtien(params);
        const tongcongvat = response[0].tongcongvat;
        setThanhtien(tongcongvat);
      } catch (error) {
        console.log(error);
      }
    };
    handleTongcong();
  }, [soct, thanhtien]);

  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/Logo_TPSPharma_mini.png" />
      </Head>
      <div className="bg-[#f1fafe] ">
        <div className="container mx-auto py-10">
          <div className="text-center">
            <div className="flex justify-center">
              <Image src={require("../pages/assets/img/icon/success.png")} />
            </div>
            <p className="py-1 text-[green] pt-3">Đặt hàng thành công.</p>
            <div className="text-[red] flex justify-center items-center gap-3">
              <p className="py-1">Tổng cộng: </p>
              <p>
                {thanhtien
                  .toString()
                  .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}{" "}
                đ
              </p>
            </div>
            {tendv == msdn ? (
              <p className="py-1 pt-4">
                Quý khách vui lòng chờ chúng tôi xác nhận.
              </p>
            ) : (
              <p className="py-1 pt-4">
                Quý khách vui lòng thanh toán, để chúng tôi giao hàng sớm nhất.
              </p>
            )}
            <div className="flex justify-around pt-3">
              {tendv == msdn ? (
                ""
              ) : (
                <Link
                  href="/"
                  className="bg-[green] text-center text-white p-3 rounded-lg"
                >
                  Thanh toán ngay (VNPAY)
                </Link>
              )}
            </div>
            <p className="py-1 pt-5 italic ">
              Cần hỗ trợ thêm, quý khách vui lòng liên hệ Hotline/Zalo:
              <a href="tel:+84931 86 79 65"> 0931 86 79 65</a>
            </p>
            <p className="py-1 italic ">Trân trọng cảm ơn và kính chào.</p>
          </div>
          <div className="text-center">
            <div className="cart_right_xuly">
              <Link className="underline underline-offset-1" href="/">
                Tiếp tục mua hàng
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Thanhtoan;
