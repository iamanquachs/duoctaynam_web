import React, { useState, useEffect } from "react";
import hanghoaApi from "./api/hanghoaApi";
import Sanphambanchay from "../components/sanpham/sanphambanchay";
import Head from "next/head";

const Toanbo_Sanphambanchay = () => {
  const [localStorage, setStatus] = useState();
  const [hot_items, setHotItem] = useState([]);
  const [dataThis, setDataThis] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  var hotItem_user = hot_items;
  useEffect(() => {
    window.scroll(0, 0);
  });
  useEffect(() => {
    setStatus(window.localStorage.getItem("msdn"));
  }, []);
  //! Get All hàng hóa
  useEffect(() => {
    const allHanghoaHandle = async (e) => {
      try {
        const params = {};
        const response = await hanghoaApi.list_all_hanghoa(params);
        setDataThis(response);
      } catch (error) {
        console.log(error);
      }
    };
    allHanghoaHandle();
  }, []);
  //todo Get sản phẩm bán chạy của từng user
  const token = localStorage;
  //!Load HotItem
  useEffect(() => {
    if (token == "" || token == undefined) {
      const hotItemHandle = async (e) => {
        try {
          const params = { mshh: "", soluong: "15" };
          const response = await hanghoaApi.list_hot_items(params);
          setHotItem(response);
        } catch (error) {
          console.log(error);
        }
      };
      hotItemHandle();
    } else {
      const hotItemHandle = async (e) => {
        var myHeaders = new Headers();
        myHeaders.append(
          "Authorization",
          "bearer eyJ0eXAi.iJKV1QiLCJhbGci.iJIUzI1NiJ9OeyJtc2R2IjoiMjIwMjIwMTA1NDA2MzciLCJtc2RuIjoiMDkwNzY3.DIzNCIsInRlbmR2IjoiTkhcdTAwYzAgVEhVXHUxZWQwQyBBTiBUXHUwMGMyTSIsImV4cGlyZWQi.jE3MDQ4NTg5NjJ9O0PpmEeZGj754fysBTcULwhqLLqMe2l6y-0mc.ihCl.0"
        );
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append(
          "Cookie",
          "PHPSESSID=b28a98b0f4e940bf3deb8d41d2549897"
        );

        var raw = JSON.stringify({
          msdv: localStorage,
          // msdv: "test",
          soluong: 20,
        });

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        await fetch("https://egpp.vn/api_tmdt/list_nhapkho", requestOptions)
          .then((response) => response.text())
          .then((result) => setDataUser(JSON.parse(result)))
          .catch((error) => setDataUser());
      };
      hotItemHandle();
    }
  }, []);
  useEffect(() => {
    const data = () => {
      if (token != "" || token != undefined) {
        if (dataThis != "" && dataUser != "") {
          dataUser.forEach(function data_user(itemUser, indexUser, arrayUser) {
            let sodangkyUser = arrayUser[indexUser].sodangky;
            let tenhhUSer = arrayUser[indexUser].tenhh;
            let hoatchatchinhUser = arrayUser[indexUser].hoatchatchinh;
            dataThis.forEach(function data_this(
              itemThis,
              indexThis,
              arrayThis
            ) {
              let tenhhThis = arrayThis[indexThis].tenhh;
              let mshhThis = arrayThis[indexThis].mshh;
              let sodangkyThis = arrayThis[indexThis].sodangky;
              let tenhoatchatThis =
                arrayThis[indexThis].tenhoatchat == undefined
                  ? ""
                  : arrayThis[indexThis].tenhoatchat;

              if (sodangkyUser === sodangkyThis && sodangkyUser != "") {
                return hotItem_user.push(arrayThis[indexThis]);
              }
              if (
                sodangkyUser != sodangkyThis &&
                tenhhUSer != "" &&
                tenhhThis.search(tenhhUSer) >= 0
              ) {
                return hotItem_user.push(arrayThis[indexThis]);
              }
              if (
                sodangkyUser != sodangkyThis &&
                tenhhUSer != "" &&
                hoatchatchinhUser != "" &&
                tenhoatchatThis.search(hoatchatchinhUser) >= 0
              ) {
                return hotItem_user.push(arrayThis[indexThis]);
              }
            });
          });
        } else {
          const hotItemDataUserRongHandle = async (e) => {
            try {
              const params = { mshh: "", soluong: "15" };
              const response = await hanghoaApi.list_hot_items(params);
              setHotItem(response);
            } catch (error) {
              console.log(error);
            }
          };
          hotItemDataUserRongHandle();
        }
      }
    };
    data();
  }, []);
  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/Logo_TPSPharma_mini.png" />
      </Head>
      <div className="bg_body">
        <div className="fullscreen:container mx-auto py-5 mobile:py-2 tablet:py-3 lglap:px-5 smlap:px-10">
          <div>
            <p className="title_sanpham mobile:ml-2">
              Toàn bộ sản phẩm bán chạy
            </p>
          </div>
          <div className="grid grid-cols-5 gap-5 pt-5 mobile:gap-2 container_sanpham mobile:px-2 smlap:grid-cols-4 tablet:grid-cols-3 tablet:px-3 tablet:pt-2 mobile:grid-cols-1">
            <Sanphambanchay
              hanghoa_item={hotItem_user}
              length_data_user={dataUser.length}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Toanbo_Sanphambanchay;
