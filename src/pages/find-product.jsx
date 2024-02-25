import React, { useState, useEffect } from "react";
import yeucauApi from "./api/yeucauApi";
import Image from "next/image";
import Head from "next/head";
import ItemFind from "@/components/find-product/item_find_product";
import { useDispatch, useSelector } from "react-redux";
import { modalFind$ } from "../components/redux/selectors";
function Find_product() {
  useEffect(() => {
    window.scroll(0, 0);
  });
  const change_item_find = useSelector(modalFind$).isShowFind;

  const [open_modal_themyeucau, setOpenForm] = useState(false);
  const [open_modal_xoayeucau, setOpenFormDelete] = useState(false);
  const [error, setError] = useState(false);
  const [listYeuCau, setListYeuCau] = useState([]);
  const [localStorage, setMsdn] = useState();
  const [localStorage_MSDV, setMSDV] = useState();

  useEffect(() => {
    setMsdn(window.localStorage.getItem("msdn"));
    setMSDV(window.localStorage.getItem("msdv"));
  }, [localStorage]);
  useEffect(() => {
    const handleLoad_YeuCau = async () => {
      try {
        const params = {
          msdv: localStorage_MSDV,
          msdn: localStorage,
        };
        const response = await yeucauApi.load_yeucau(params);
        setListYeuCau(response);
      } catch (error) {
        console.log(error);
      }
    };
    handleLoad_YeuCau();
  }, [localStorage, change_item_find]);
  const handleLoad_YeuCau = async () => {
    try {
      const params = {
        msdv: localStorage_MSDV,
        msdn: localStorage,
      };
      const response = await yeucauApi.load_yeucau(params);
      setListYeuCau(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd_YeuCau = async () => {
    const tenhh = document.getElementById("tenhh_yeucau").value;
    const tenhc = document.getElementById("tenhc_yeucau").value;
    const hamluong = document.getElementById("hamluong_yeucau").value;
    const nhasx = document.getElementById("nhasx_yeucau").value;
    const ghichu = document.getElementById("ghichu_yeucau").value;
    document.getElementById("tenhh_error").style.display = "none";
    document.getElementById("tenhc_error").style.display = "none";
    document.getElementById("hamluong_error").style.display = "none";
    document.getElementById("nhasx_error").style.display = "none";

    if (tenhh == "") {
      document.getElementById("tenhh_error").style.display = "block";
    } else if (tenhc == "") {
      document.getElementById("tenhc_error").style.display = "block";
    } else if (hamluong == "") {
      document.getElementById("hamluong_error").style.display = "block";
    } else if (nhasx == "") {
      document.getElementById("nhasx_error").style.display = "block";
    } else {
      try {
        const params = {
          msdv: localStorage_MSDV,
          msdn: localStorage,
          tenhh: tenhh,
          tenhc: tenhc,
          hamluong: hamluong,
          nhasx: nhasx,
          ghichu: ghichu,
        };
        const response = await yeucauApi.add_yeucau(params);
        setOpenForm(false);
        handleLoad_YeuCau();
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/Logo_TPSPharma_mini.png" />
      </Head>
      <div className="bg-[#f1fafe]">
        <div className="container mx-auto py-5">
          <div className="flex justify-between px-2 mobile:block">
            <h1 className="uppercase font-semibold mobile:text-lg text-[red]">
              Tìm sản phảm giá tốt theo yêu cầu
            </h1>
            <div
              onClick={() => {
                setOpenForm(true);
              }}
              className="flex items-center gap-2 bg-[#aef4bd] p-2 rounded-lg hover:cursor-pointer hover:bg-[#72da87]"
            >
              <div>
                <Image
                  src={require("../pages/assets/img/icon/add.png")}
                  alt="Thêm yêu cầu sản phẩm"
                ></Image>
              </div>
              <p>Yêu cầu sản phẩm</p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full text-left text-sm font-light mobile:mt-3 tablet:mt-3">
                    <thead className="border-b font-medium dark:border-neutral-500 mobile:hidden tablet:hidden">
                      <tr>
                        <th scope="col" className="px-6 py-4">
                          Ngày
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Tên sản phẩm
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Tên hoạt chất
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Hàm lượng
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Nhà sản xuất
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Ghi chú
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Đặt hàng
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Xóa
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {listYeuCau?.map((item_yeucau, key) => {
                        return (
                          <ItemFind
                            item_yeucau={item_yeucau}
                            localStorage={localStorage}
                            localStorage_MSDV={localStorage_MSDV}
                          />
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {open_modal_themyeucau ? (
        <div className="bg-[#000000b5] justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[1000] outline-none focus:outline-none">
          <div className="modal-dialog relative w-auto pointer-events-none ">
            <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
              <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 rounded-t-md">
                <h5
                  className="text-xl font-medium leading-normal text-[green]"
                  id="exampleModalLabel"
                >
                  Yêu cầu tìm sản phẩm
                </h5>
                <button
                  onClick={() => setOpenForm(false)}
                  type="button"
                  className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body py-2 px-6  rounded-t-md w-[400px]">
                <div className="mb-5">
                  <p className="flex">
                    Tên sản phẩm
                    <span id="tenhh_error" className="text-[red] hidden">
                      (*)
                    </span>
                  </p>
                  <input
                    id="tenhh_yeucau"
                    className="border-b border-gray-300 focus:outline-0 focus:border-[none] w-full"
                    required
                  ></input>
                </div>
                <div className="mb-5">
                  <p className="flex">
                    Tên hoạt chất
                    <span id="tenhc_error" className="text-[red] hidden">
                      (*)
                    </span>
                  </p>
                  <input
                    id="tenhc_yeucau"
                    className="border-b border-gray-300 focus:outline-0 focus:border-[none] w-full"
                  ></input>
                </div>
                <div className="mb-5">
                  <p className="flex">
                    Hàm lượng
                    <span id="hamluong_error" className="text-[red] hidden">
                      (*)
                    </span>
                  </p>
                  <input
                    id="hamluong_yeucau"
                    className="border-b border-gray-300 focus:outline-0 focus:border-[none] w-full"
                  ></input>
                </div>
                <div className="mb-5">
                  <p className="flex">
                    Nhà sản xuất
                    <span id="nhasx_error" className="text-[red] hidden">
                      (*)
                    </span>
                  </p>
                  <input
                    id="nhasx_yeucau"
                    className="border-b border-gray-300 focus:outline-0 focus:border-[none] w-full"
                  ></input>
                </div>
                <div className="mb-5">
                  <p>Ghi chú</p>
                  <input
                    id="ghichu_yeucau"
                    className="border-b border-gray-300 focus:outline-0 focus:border-[none] w-full"
                  ></input>
                </div>
              </div>
              <div className="modal-footer relative p-4">
                <div className="text-center lg:text-left flex justify-end gap-3">
                  <button
                    type="submit"
                    onClick={() => handleAdd_YeuCau()}
                    className="text-white bg-[green] hover:bg-green-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg  text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                    Đồng ý
                  </button>
                  <button
                    onClick={() => {
                      setOpenForm(false);
                      setError(false);
                    }}
                    type="button"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Find_product;
