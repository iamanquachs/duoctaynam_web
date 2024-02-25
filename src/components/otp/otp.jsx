import React, { useState, useEffect } from "react";
import Vefify from "./verify";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useRouter } from "next/router";

export default function OTP() {
  const [verify, setVerify] = useState(false);
  const router = useRouter();
  const [dienthoai, setDienthoai] = useState("");
  const firebaseConfig = {
    apiKey: "AIzaSyAz5tx8IqZP6pQEb_Bg97xHxFuDGByttqU",
    authDomain: "timbacsi-592cc.firebaseapp.com",
    projectId: "timbacsi-592cc",
    storageBucket: "timbacsi-592cc.appspot.com",
    messagingSenderId: "606084107225",
    appId: "1:606084107225:web:3e8f6c73af65172367a7c8",
    measurementId: "G-MFEX01Q8GT",
  };

  useEffect(() => {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    let analytics;
    if (app.name && typeof window !== "undefined") {
      analytics = getAnalytics(app);
    }
    const auth = getAuth();
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
      },
      auth
    );
  }, []);
  function phoneAuth() {
    const auth = getAuth();
    const appVerifier = window.recaptchaVerifier;
    var number = "+84" + dienthoai;
    signInWithPhoneNumber(auth, number, appVerifier)
      .then((confirmationResult) => {
        setVerify(true);
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const replaceSDT = (e) => {
    const value = e.target.value.replace(/[^0-9\.\,]/g, "");
    document.getElementById("sdt").value = value;
    setDienthoai(value);
  };
  return (
    <>
      {verify ? (
        <Vefify dienthoai={dienthoai} />
      ) : (
        <div className="bg-[#000000b5] justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[1000] outline-none focus:outline-none">
          <div className="modal-dialog relative w-auto pointer-events-none">
            <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
              <div className="modal-body relative p-4">
                <div className="px-6 text-center">
                  <svg
                    aria-hidden="true"
                    className="mx-auto mb-4 text-red-600 w-14 h-14 dark:text-gray-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Nhập số điện thoại để nhận mã OTP kích hoạt xem lịch sử đơn
                    hàng
                  </h3>
                  <input
                    onKeyUp={(e) => {
                      replaceSDT(e);
                    }}
                    maxLength="10"
                    id="sdt"
                    className="my-3 mb-5 p-2 border rounded-md"
                    placeholder="Số điện thoại"
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={() => {
                        phoneAuth();
                      }}
                      data-modal-hide="popup-modal"
                      type="button"
                      className="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                    >
                      Lấy mã kích hoạt
                    </button>
                    <div id="recaptcha-container"></div>

                    <button
                      onClick={() => router.push("/")}
                      data-modal-hide="popup-modal"
                      type="button"
                      className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    >
                      Trở về
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
