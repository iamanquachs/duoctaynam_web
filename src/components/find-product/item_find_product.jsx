import React, { useState, useEffect } from "react";
import yeucauApi from "../../pages/api/yeucauApi";
import Image from "next/image";
import Link from "next/link";
import { isShowFind } from "../redux/actions";
import { useDispatch } from "react-redux";

function ItemFind(prop) {
  const item_yeucau = prop.item_yeucau;
  const localStorage_MSDV = prop.localStorage_MSDV;
  const localStorage = prop.localStorage;
  const [open_modal_xoayeucau, setOpenFormDelete] = useState(false);
  const dispatch = useDispatch();

  const handleDelete_YeuCau = async (url_lastmodify, url, rowid) => {
    if (url_lastmodify == "0000-00-00 00:00:00" && url == "") {
      try {
        const params = {
          msdv: localStorage_MSDV,
          msdn: localStorage,
          rowid: rowid,
        };
        const response = await yeucauApi.delete_yeucau(params);
        dispatch(isShowFind());
        setOpenFormDelete(false);
      } catch (error) {
        console.log(error);
      }
    }
  };
  var item;
  const load_items = () => {
    if (item_yeucau.url == "") {
      item = (
        <>
          <tr className="border-b dark:border-neutral-500 mobile:hidden tablet:hidden">
            <td className="whitespace-nowrap px-6 py-4 font-medium">
              {item_yeucau.ngaygio}
            </td>
            <td className="whitespace-nowrap px-6 py-4">{item_yeucau.tenhh}</td>
            <td className="whitespace-nowrap px-6 py-4">{item_yeucau.tenhc}</td>
            <td className="whitespace-nowrap px-6 py-4">
              {item_yeucau.hamluong}
            </td>
            <td className="whitespace-nowrap px-6 py-4">{item_yeucau.nhasx}</td>
            <td className="whitespace-nowrap px-6 py-4">
              {item_yeucau.ghichu}
            </td>
            {}
            <td className="whitespace-nowrap px-6 py-4 max-w-[200px] truncate">
              <Link
                href={item_yeucau.url}
                className="hover:text-[green] truncate"
                target="_blank"
              >
                {item_yeucau.url}
              </Link>
            </td>
            <td className="whitespace-nowrap px-6 py-4">
              <Image
                className=" hover:cursor-pointer"
                onClick={() => setOpenFormDelete(true)}
                src={require("../../pages/assets/img/icon/trash.png")}
                alt="Xóa yêu cầu"
              ></Image>
            </td>
          </tr>
          <ul className="leading-6 relative fullscreen:hidden smlap:hidden lglap:hidden tablet:mx-2 tablet:p-3 tablet:mb-3 mobile:mx-3 mobile:mb-5 mobile:p-3 rounded-md bg-white shadow-sm">
            <li className="whitespace-nowrap grid grid-cols-12 font-medium">
              <p className="col-span-5 font-inter_semibold">Ngày</p>
              <p className="col-span-7">{item_yeucau.ngaygio}</p>
            </li>
            <li className="whitespace-nowrap grid grid-cols-12">
              <p className="col-span-5  font-inter_semibold">Tên sản phẩm</p>
              <p className="col-span-7">{item_yeucau.tenhh}</p>
            </li>
            <li className="whitespace-nowrap grid grid-cols-12">
              <p className="col-span-5 font-inter_semibold">Tên hoạt chất</p>
              <p className="col-span-7">{item_yeucau.tenhc}</p>
            </li>
            <li className="whitespace-nowrap grid grid-cols-12">
              <p className="col-span-5 font-inter_semibold">Hàm lượng</p>
              <p className="col-span-7">{item_yeucau.hamluong}</p>
            </li>
            <li className="whitespace-nowrap grid grid-cols-12">
              <p className="col-span-5 font-inter_semibold">Nhà sản xuất</p>
              <p className="col-span-7">{item_yeucau.nhasx}</p>
            </li>
            <li className="whitespace-nowrap grid grid-cols-12">
              <p className="col-span-5 font-inter_semibold">Ghi chú</p>
              <p className="col-span-7">{item_yeucau.ghichu}</p>
            </li>
            {}
            <li className="whitespace-nowrap grid grid-cols-12 max-w-[400px] truncate">
              <p className="col-span-5  font-inter_semibold">Đặt hàng</p>
              <p className="col-span-7">
                <Link
                  href={item_yeucau.url}
                  className="hover:text-[green] truncate"
                  target="_blank"
                >
                  {item_yeucau.url}
                </Link>
              </p>
            </li>
            <li className="whitespace-nowrap ">
              <p className="absolute top-[-5px] right-[-5px]">
                <Image
                  className=" hover:cursor-pointer"
                  onClick={() => setOpenFormDelete(true)}
                  src={require("../../pages/assets/img/icon/trash.png")}
                  alt="Xóa yêu cầu"
                ></Image>
              </p>
            </li>
          </ul>
        </>
      );
      return item;
    } else {
      return (item = (
        <>
          <tr className="border-b dark:border-neutral-500 mobile:hidden tablet:hidden">
            <td className="whitespace-nowrap px-6 py-4 font-medium">
              {item_yeucau.ngaygio}
            </td>
            <td className="whitespace-nowrap px-6 py-4">{item_yeucau.tenhh}</td>
            <td className="whitespace-nowrap px-6 py-4">{item_yeucau.tenhc}</td>
            <td className="whitespace-nowrap px-6 py-4">
              {item_yeucau.hamluong}
            </td>
            <td className="whitespace-nowrap px-6 py-4">{item_yeucau.nhasx}</td>
            <td className="whitespace-nowrap px-6 py-4">
              {item_yeucau.ghichu}
            </td>
            {}
            <td className="whitespace-nowrap px-6 py-4 max-w-[200px] truncate">
              <Link
                href={item_yeucau.url}
                className="hover:text-[green] truncate"
                target="_blank"
              >
                {item_yeucau.url}
              </Link>
            </td>
            <td className="whitespace-nowrap px-6 py-4"></td>
          </tr>
          <ul className="leading-6 fullscreen:hidden smlap:hidden lglap:hidden  mobile:mx-5 mobile:p-3 tablet:mx-2 tablet:p-3 rounded-md bg-white shadow-sm">
            <li className="whitespace-nowrap grid grid-cols-12 font-medium">
              <p className="col-span-5 font-inter_semibold">Ngày</p>
              <p className="col-span-7">{item_yeucau.ngaygio}</p>
            </li>
            <li className="whitespace-nowrap grid grid-cols-12">
              <p className="col-span-5  font-inter_semibold">Tên sản phẩm</p>
              <p className="col-span-7">{item_yeucau.tenhh}</p>
            </li>
            <li className="whitespace-nowrap grid grid-cols-12">
              <p className="col-span-5 font-inter_semibold">Tên hoạt chất</p>
              <p className="col-span-7">{item_yeucau.tenhc}</p>
            </li>
            <li className="whitespace-nowrap grid grid-cols-12">
              <p className="col-span-5 font-inter_semibold">Hàm lượng</p>
              <p className="col-span-7">{item_yeucau.hamluong}</p>
            </li>
            <li className="whitespace-nowrap grid grid-cols-12">
              <p className="col-span-5 font-inter_semibold">Nhà sản xuất</p>
              <p className="col-span-7">{item_yeucau.nhasx}</p>
            </li>
            <li className="whitespace-nowrap grid grid-cols-12">
              <p className="col-span-5 font-inter_semibold">Ghi chú</p>
              <p className="col-span-7">{item_yeucau.ghichu}</p>
            </li>
            {}
            <li className="whitespace-nowrap grid grid-cols-12 truncate">
              <p className="col-span-5  font-inter_semibold">Đặt hàng</p>
              <p className="col-span-7">
                <Link
                  href={item_yeucau.url}
                  className="hover:text-[green] truncate"
                  target="_blank"
                >
                  {item_yeucau.url}
                </Link>
              </p>
            </li>
            <li className="whitespace-nowrap "></li>
          </ul>
        </>
      ));
    }
  };
  load_items();
  return (
    <>
      {item}
      {open_modal_xoayeucau ? (
        <div className="bg-[#000000b5] justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[1000] outline-none focus:outline-none">
          <div className="modal-dialog relative w-auto pointer-events-none ">
            <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
              <div className="modal-header flex flex-shrink-0 items-center justify-between p-4  rounded-t-md">
                <h5
                  className="text-xl font-medium leading-normal text-[red]"
                  id="exampleModalLabel"
                >
                  Xóa yêu cầu tìm sản phẩm
                </h5>
                <button
                  onClick={() => setOpenFormDelete(false)}
                  type="button"
                  className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-footer relative p-4">
                <div className="text-center lg:text-left flex justify-end gap-4">
                  <button
                    type="submit"
                    onClick={() => {
                      handleDelete_YeuCau(
                        item_yeucau.url_lastmodify,
                        item_yeucau.url,
                        item_yeucau.rowid
                      );
                    }}
                    className="text-white bg-red-600 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg  text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                    Đồng ý
                  </button>
                  <button
                    onClick={() => {
                      setOpenFormDelete(false);
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

export default ItemFind;
