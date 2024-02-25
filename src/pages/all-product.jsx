import React, { useState, useEffect } from "react";
import hanghoaApi from "./api/hanghoaApi";
import { useRouter } from "next/router";
import SanphamItem from "../components/sanpham/sanpham_item";
import Head from "next/head";

const Toanbo_Sanpham = () => {
  const router = useRouter();
  const key = router.query;
  const url_sanpham = Object.keys(key)[0];
  const msnhom = url_sanpham;
  const [hot_sanpham, setSanPham] = useState([]);
  const [tennhom, setTenNhom] = useState([]);
  useEffect(() => {
    window.scroll(0, 0);
  });
  useEffect(() => {
    if (msnhom != undefined) {
      const sanphamHandle = async (e) => {
        try {
          const params = {
            value_msnhom: msnhom,
          };
          const response = await hanghoaApi.list_toanbo_hanghoa_theonhom(
            params
          );
          if (response[0] != undefined) {
            setTenNhom(response[0].tennhom);
          }
          setSanPham(response);
        } catch (error) {
          console.log(error);
        }
      };
      sanphamHandle();
    }
  }, [msnhom]);
  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/Logo_TPSPharma_mini.png" />
      </Head>
      <div className="bg_body">
        <div className="fullscreen:container mx-auto py-5 mobile:py-2 tablet:py-3 lglap:px-5 smlap:px-10">
          <div>
            <p className="title_sanpham mobile:ml-2">
              Toàn bộ sản phẩm <span>{tennhom}</span>
            </p>
          </div>
          <div className="grid grid-cols-5 gap-5 pt-5 container_sanpham mobile:px-2 smlap:grid-cols-4 mobile:gap-2 mobile:grid-cols-1 tablet:grid-cols-3 tablet:px-3 tablet:pt-2">
            {hot_sanpham?.map((hanghoa_item, key) => {
              return <SanphamItem hanghoa_item={hanghoa_item} index={key} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Toanbo_Sanpham;
