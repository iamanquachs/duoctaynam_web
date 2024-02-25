import React, { useState, useEffect } from "react";
import hanghoaApi from "../../pages/api/hanghoaApi";
import SanphamItem from "./sanpham_item";

const Sanphambanchay = (prop) => {
  const hot_items = prop.hanghoa_item;
  const soluong_hotItem_daco = hot_items.length;
  const length_data_user = prop.length_data_user;
  const [hot_sanpham, setHotSanPham] = useState([]);
  const hotItems_conlai = length_data_user - hot_items.length;
  let mshh = "";
  const loadMSHH = () => {
    hot_items?.forEach(function data_user(item, index, hot_items) {
      mshh += hot_items[index].mshh + ",";
    });
  };
  loadMSHH();
  useEffect(() => {
    function load_hot_item() {
      if (soluong_hotItem_daco == length_data_user) {
        setHotSanPham(hot_items);
      } else {
        if (hotItems_conlai != 0) {
          const hotItemHandle = async (e) => {
            try {
              const params = {
                soluong: hotItems_conlai,
                //lấy mshh đã load ra để tránh trùng hàng hóa
                mshh: mshh,
              };
              const response = await hanghoaApi.list_hot_items(params);
              if (typeof response == "string") {
                setHotSanPham([...hot_items]);
              } else {
                setHotSanPham([...hot_items, ...response]);
              }
            } catch (error) {
              console.log(error);
            }
          };
          hotItemHandle();
        } else {
          const hotItemHandle = async (e) => {
            try {
              const params = {};
              const response = await hanghoaApi.list_hot_items(params);
              setHotSanPham(response);
            } catch (error) {
              console.log(error);
            }
          };
          hotItemHandle();
        }
      }
    }
    load_hot_item();
  }, [soluong_hotItem_daco]);
  return (
    <>
      {hot_sanpham?.map((hanghoa_item, key) => {
        return (
          <SanphamItem
            hanghoa_item={hanghoa_item}
            index={key + Math.floor(1000 + Math.random() * 9000)}
          />
        );
      })}
    </>
  );
};

export default Sanphambanchay;
