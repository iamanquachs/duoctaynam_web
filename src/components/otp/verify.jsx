import React, { useState } from "react";
import { hideHistory, isHistory } from "../redux/actions";
import { useDispatch } from "react-redux";


export default function Verify({ dienthoai }) {
  const dispatch = useDispatch();

  const [otp, setOtp] = useState("");
  function codeverify() {
    confirmationResult
      .confirm(otp)
      .then((result) => {
          window.localStorage.setItem('history','show')
          window.localStorage.setItem('modalhistory','hidden')
          location.reload()
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
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
                Xác nhận mã OTP
              </h3>
              <input
                onKeyUp={(e) =>
                  setOtp(e.target.value.replace(/[^0-9\.\,]/g, ""))
                }
                onChange={(e) => setOtp(e.target.value)}
                className="my-3 mb-5 p-2"
                type="text"
                id="verificationcode"
                value={otp}
                placeholder="Mã kích hoạt"
              />
              <div>
                <button
                  onClick={() => codeverify()}
                  data-modal-hide="popup-modal"
                  type="button"
                  id="verify"
                  className="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                >
                  Gửi
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  data-modal-hide="popup-modal"
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    //
  );
}
