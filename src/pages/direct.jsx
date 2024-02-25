import React, { useState, useEffect } from "react";
import userApi from "./api/userApi";
import dathangApi from "./api/dathangApi";
import { useDispatch } from "react-redux";
import { createGiohang, hideModal, isLogin } from "../components/redux/actions";
import { useRouter } from "next/router";

function Direct() {
  const router = useRouter();
  const token = router.asPath.split("?")[1];
  const dispatch = useDispatch();

  useEffect(() => {
    const handleAutoLogin = async (e) => {
      const params = {
        token: token,
      };
      const response = await userApi.login_direct(params);
      if (typeof window !== "undefined") {
        window.localStorage.setItem("token", response.token);
        window.localStorage.setItem("msdv", response.msdv);
        window.localStorage.setItem("tendv", response.tendv);
        window.localStorage.setItem("msdn", response.msdn);
        window.localStorage.setItem("tendaidien", response.tendaidien);
        window.localStorage.setItem("diachi", response.diachi);
        window.localStorage.setItem("maxa", response.msxa);
        window.localStorage.setItem("dienthoai", response.dienthoai);
        window.localStorage.setItem("history", "show");
        window.localStorage.setItem("modalhistory", "hidden");
        dispatch(hideModal());
        dispatch(isLogin(true));
        const msdn = response.msdn;
        const params = {
          msdn: msdn,
        };
        dispatch(createGiohang.createGiohangRequest(params));
        const handleDathang = async (e) => {
          const giohang = window.localStorage.getItem("order");
          const order = giohang.split("|");
          if (order != "" && order != undefined) {
            try {
              const params = {
                msdv: "",
                msdn: msdn,
                mshh: order[0],
                tenhh: order[1],
                mshhnpp: order[2],
                dvt: order[3],
                msnpp: order[4],
                pttichluy: order[5],
                thuesuat: order[6],
                soluong: order[7],
                gianhap: order[8],
                ptgiam: order[9],
                msctkm: order[10],
              };
              await dathangApi.dathangline_add(params);
              window.localStorage.removeItem("order");
            } catch (error) {
              console.log(error);
            }
          }
        };
        handleDathang();
        router.push("/");
      } else {
        console.log("else");
      }
    };
    handleAutoLogin();
  }, []);

  return <></>;
}

export default Direct;
