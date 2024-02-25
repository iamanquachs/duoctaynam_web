import { useSelector } from "react-redux";
import SanphamItem from "../components/sanpham/sanpham_item";
import { filterState$ } from "../components/redux/selectors";
import React, { useState, useEffect } from "react";
import danhmucApi from "./api/danhmucApi";
import hanghoaApi from "./api/hanghoaApi";
import { useRouter } from "next/router";
import Head from "next/head";
function SearchPage(prop) {
  useEffect(() => {
    window.scroll(0, 0);
  });
  const [danhmuc_item, setDanhmuc] = useState([]);
  const [requestSearch, setRequestSearch] = useState([]);
  const [value_search, setValueSearch] = useState([]);
  const router = useRouter();
  useEffect(() => {
    setValueSearch(router.asPath.split("?")[1].split("=")[1]);
  }, [router]);
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
    const handleSearch = async (e) => {
      try {
        const params = {
          value: value_search,
        };
        const response = await hanghoaApi.list_search(params);
        setRequestSearch(response);
      } catch (error) {
        console.log(error);
      }
    };
    handleSearch();
  }, [value_search]);
  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/Logo_TPSPharma_mini.png" />
      </Head>
      <div className="bg_body min-h-[100vh]">
        <div className="fullscreen:container mx-auto py-5 mobile:py-2 tablet:py-3 lglap:px-5 smlap:px-10">
          <div className="grid grid-cols-5 gap-5 pt-5 container_sanpham smlap:grid-cols-4 mobile:grid-cols-1 mobile:gap-2 mobile:px-2 tablet:grid-cols-3 tablet:px-3 tablet:pt-2">
            {requestSearch.map((hanghoa_item, key) => {
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

export default SearchPage;
