import { useSelector } from "react-redux";
import SanphamItem from "../components/sanpham/sanpham_item";
import { filterState$ } from "../components/redux/selectors";
import React, { useState, useEffect } from "react";
import danhmucApi from "./api/danhmucApi";
import Head from "next/head";

function Filter(prop) {
  useEffect(() => {
    window.scroll(0, 0);
  });
  const hanghoa = useSelector(filterState$);
  const [danhmuc_item, setDanhmuc] = useState([]);

  //Danh muc nhom san pham
  useEffect(() => {
    const danhmucHandle = async (e) => {
      try {
        const params = {
          msdv: "",
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
  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/Logo_TPSPharma_mini.png" />
      </Head>
      <div className="bg_body min-h-[100vh]">
        <div className="fullscreen:container mx-auto py-5 mobile:py-2 tablet:py-3 lglap:px-5 smlap:px-10">
          <div className="grid grid-cols-5 gap-5 pt-5 container_sanpham smlap:grid-cols-4 mobile:grid-cols-1 mobile:gap-2 mobile:px-2 tablet:grid-cols-3 tablet:px-3 tablet:pt-2">
            {hanghoa.map((hanghoa_item, key) => {
              return (
                <SanphamItem
                  hanghoa_item={hanghoa_item}
                  danhmuc_item={danhmuc_item}
                  key={key}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Filter;
