import React, { useState, useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import hanghoaApi from "../../api/hanghoaApi";
import SanphamItem from "./sanpham_item";
import danhmucApi from "../../api/danhmucApi";

function DanhSachNhomSP(prop) {
  window.scrollTo(0, 0);
  let { msnhom } = useParams();
  const [listsp, setListsp] = useState([]);
  const [TenNhom, setTenNhom] = useState([]);
  const [danhmuc_item, setDanhmuc] = useState([]);

  //get chi tiết hàng hóa
  useEffect(() => {
    const handleHanghoa = async (e) => {
      try {
        const params = {
          msnhom: msnhom,
        };
        const response = await hanghoaApi.list_theonhom(params);
        setListsp(response);
      } catch (error) {
        console.log(error);
      }
    };
    handleHanghoa();
  }, [msnhom]);
  useEffect(() => {
    const tenNhomHandle = () => {
      for (let i = 0; i < danhmuc_item.length; i++) {
        if (
          danhmuc_item[i].tenloai
            .toLowerCase()
            .normalize("NFD")
            .replaceAll(/[\u0300-\u036f]/g, "")
            .replaceAll(/[đĐ]/g, (m) => (m === "đ" ? "d" : "D"))
            .replaceAll(" ", "-") == msnhom
        ) {
          setTenNhom(danhmuc_item[i].tenloai);
        }
      }
    };
    tenNhomHandle();
  });

  //Danh muc nhom san pham
  useEffect(() => {
    const danhmucHandle = async (e) => {
      try {
        const params = {
          msdv: "",
          phanloai: "msnhom",
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
      <div className="bg_body">
        <div className="container mx-auto py-10 mobile:py-2 tablet:py-3">
          <div className="flex items-center">
            <p className="title_sanpham">{TenNhom}</p>
            <Link to="/" className="pl-10">
              Trở về
            </Link>
          </div>
          <div className="grid grid-cols-5 gap-5 pt-5 container_sanpham mobile:px-2 tablet:grid-cols-4 tablet:px-3 tablet:pt-2">
            {listsp.map((hanghoa_item, key) => {
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

export default DanhSachNhomSP;
