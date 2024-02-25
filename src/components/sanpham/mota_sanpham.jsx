import React, { useState, useEffect } from "react";
import hanghoaApi from "../../pages/api/hanghoaApi";
import parse from "html-react-parser";
const MoTaSanPham = (prop) => {
  const mota_sanpham = prop.mota_sanpham;
  const [ctmotahanghoa, setctMotaHanghoa] = useState([]);
  //get mô tả hàng hóa
  useEffect(() => {
    const handleMotaHanghoa = async (e) => {
      try {
        const params = {
          mshh: mota_sanpham.mshh,
        };
        const response = await hanghoaApi.list_motasp(params);
        setctMotaHanghoa(response);
      } catch (error) {
        console.log(error);
      }
    };
    handleMotaHanghoa();
  }, []);
  return (
    <div className="p-5">
      {ctmotahanghoa.map((ctmota_hanghoa, key) => {
        return (
          <div className="">
            {ctmota_hanghoa.chidinh != "" ? (
              <div className="item_mota">
                <h2 className="title_mota">Chỉ định</h2>
              </div>
            ) : (
              ""
            )}
            <div className="pt-1">{parse(ctmota_hanghoa.chidinh)}</div>
            {ctmota_hanghoa.chongchidinh != "" ? (
              <div className="item_mota">
                <h2 className="title_mota">Chống chỉ định</h2>
              </div>
            ) : (
              ""
            )}
            <div className="pt-1">
              <p>{parse(ctmota_hanghoa.chongchidinh)}</p>
            </div>
            {ctmota_hanghoa.lieudung != "" ? (
              <div className="item_mota">
                <h2 className="title_mota">Liều dùng</h2>
              </div>
            ) : (
              ""
            )}
            <div className="pt-1">
              <p>{parse(ctmota_hanghoa.lieudung)}</p>
            </div>
            {ctmota_hanghoa.tacdungphu != "" ? (
              <div className="item_mota">
                <h2 className="title_mota">Tác dụng phụ</h2>
              </div>
            ) : (
              ""
            )}
            <div className="pt-1">
              <p>{parse(ctmota_hanghoa.tacdungphu)}</p>
            </div>
            {ctmota_hanghoa.thantrong != "" ? (
              <div className="item_mota">
                <h2 className="title_mota">Thận trọng</h2>
              </div>
            ) : (
              ""
            )}
            <div className="pt-1">
              <p>{parse(ctmota_hanghoa.thantrong)}</p>
            </div>
            {ctmota_hanghoa.tuongtacthuoc != "" ? (
              <div className="item_mota">
                <h2 className="title_mota">Tương tác thuốc</h2>
              </div>
            ) : (
              ""
            )}
            <div className="pt-1">
              <p>{parse(ctmota_hanghoa.tuongtacthuoc)}</p>
            </div>
            {ctmota_hanghoa.baoquan != "" ? (
              <div className="item_mota">
                <h2 className="title_mota">Bảo quản</h2>
              </div>
            ) : (
              ""
            )}
            <div className="pt-1">
              <p>{parse(ctmota_hanghoa.baoquan)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default MoTaSanPham;
