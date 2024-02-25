import React, { useState, useEffect } from "react";
import Link from "next/link";

import hanghoaApi from "../../pages/api/hanghoaApi";
import SanphamItem from "./sanpham_item";

const SanPhamTheoNhom = (prop) => {
  const danhmuc_item = prop.danhmuc_item;
  const [hanghoa, setHanghoa] = useState([]);
  const [msnhom, setMsnhom] = useState(danhmuc_item.msloai);

  useEffect(() => {
    const handleHanghoa = async (e) => {
      try {
        const params = {
          msnhom: danhmuc_item.msloai,
          offset: 0,
          limit: 10,
        };
        const response = await hanghoaApi.list(params);
        setHanghoa(response);
      } catch (error) {
        console.log(error);
      }
    };
    handleHanghoa();
  }, []);
  return ( 
    <>
      {hanghoa < 1 ? (
        ""
      ) : (
        <div className="py-3">
          <div className="flex justify-between items-center">
            <div className=" text-left w-full flex flex-row items-center after:border-b-[#ddd] after:border-b-[1px] after:m-auto after:w-full after:ml-5">
              <h1 className="ten_nhom ">
                <span className="text-[green] pr-1"> • </span>
                <div className="flex flex-wrap mobile:max-w-[200px]">
                  <span className="truncate">{danhmuc_item.tenloai}</span>
                </div>
              </h1>
            </div>
            <input id="msnhom" hidden value={msnhom || ""} name="msnhom" />

            <div>
              <Link
                href={"/all-product?" + danhmuc_item.dieukien2}
                className="border text-center px-2 border-[#a1e9a1] rounded-full bg-green-100 whitespace-nowrap"
              >
                Xem tất cả
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-5 pt-5 container_sanpham tablet:grid-cols-3 smlap:grid-cols-4 mobile:grid-cols-1 mobile:gap-3  ">
            {hanghoa.map((hanghoa_item, key) => {
              return (
                <SanphamItem
                  hanghoa_item={hanghoa_item}
                  danhmuc_item={danhmuc_item}
                  index={key}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
export default SanPhamTheoNhom;
