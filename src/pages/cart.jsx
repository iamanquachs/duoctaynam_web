import React, { useState, useEffect } from "react";
import GioHangItem from "../components/giohang/giohang_item";
import giohangApi from "./api/giohangApi";
import thanhtoanApi from "./api/thanhtoanApi";
import { useSelector, useDispatch } from "react-redux";
import { giohangState$ } from "../components/redux/selectors";
import { createGiohang, showModalDKMoi } from "../components/redux/actions";
import Image from "next/image";
import { useRouter } from "next/router";
import io from "socket.io-client";
import Head from "next/head";
let socket;
const Cart = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showModal_Delete_All, setShowModal_Delete_All] = useState(false);
  const [showFormAddThongTin, setFormAddThongTin_Show] = useState(false);
  const [editThongTin, setEditThongTin] = useState(false);
  const [modalThongTinNhanHang, setShowModalChuaCoThongTinNhanHang] =
    useState(false);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [giohang, setGiohangItem] = useState([]);
  const [thongtinnhanhang, setListThongTinNhanHang] = useState([]);
  const [chitietthongtinnhanhang, setChiTietThongTinNhanHang] = useState([]);
  const giohangthanhtien = useSelector(giohangState$);
  const [isCheck, setIsCheck] = useState([]);
  const [tongtien, setTongTien] = useState();
  const [voucher, setListVoucher] = useState([]);
  const [diachiLoad, setDiaChiLoad] = useState([]);
  const [sotienvoucher, setSoTienVouCher] = useState(0);
  const [mavoucher, setMaVouCher] = useState(0);
  const [tenvoucher, setTenVouCher] = useState(0);
  const [sotienthanhtoan, setThanhToan] = useState();
  const [sotientongthanhtoan, setTongThanhToan] = useState(0);
  const [dmtinh, setDMTinh] = useState([]);
  const [dmhuyen, setDMHuyen] = useState([]);
  const [dmxa, setDMXa] = useState([]);
  const [error, setLoaiError] = useState("");
  const [tientichluy, setTienTichLuy] = useState(0);
  const [loaitichluy, setLoaiTichLuy] = useState(false);

  const dispatch = useDispatch();
  const [localStorage, setMsdn] = useState();
  const [localStorage_Tendv, setTendv] = useState();
  const [localStorage_Diachi, setDiachi] = useState();
  const [localStorage_Sodienthoai, setSodienthoai] = useState();
  const [localStorage_Tendaidien, setTendaidien] = useState();
  const [localStorage_MSDV, setMSDV] = useState();
  const [localStorage_Maxa, setMaXa] = useState();
  const [hienKMThem, setHienKMThem] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setMsdn(window.localStorage.getItem("msdn"));
    setTendv(window.localStorage.getItem("tendv"));
    setTendaidien(window.localStorage.getItem("tendaidien"));
    setDiachi(window.localStorage.getItem("diachi"));
    setSodienthoai(window.localStorage.getItem("dienthoai"));
    setMSDV(window.localStorage.getItem("msdv"));
    setMaXa(window.localStorage.getItem("maxa"));
  }, [localStorage]);

  //! socket io realtime
  useEffect(() => {
    const socketInitializer = async () => {
      await fetch("/api/socket");
      socket = io("https://notication.duoctaynam.vn/");
    };
    socketInitializer();
  }, []);

  //! load hang hoa km
  const handleAdd_KM = async () => {
    try {
      const params = {
        msdn: localStorage,
      };
      await giohangApi.add_hanghoa_km(params);

      handleGiohang();
    } catch (error) {
      console.log(error);
    }
  };

  //todo Tính tổng tiền
  useEffect(() => {
    const loadTongtien = () => {
      const kt_check = document.getElementById("cart_item_checkall");

      const sum = giohangthanhtien?.reduce((thanhtien, item) => {
        for (let i = 0; i < isCheck.length; i++) {
          if (isCheck[i] === item.rowid) {
            return parseInt(thanhtien) + parseInt(item.thanhtien);
          }
        }
        if (kt_check.checked) {
          return parseInt(thanhtien) + parseInt(item.thanhtien);
        }
        return parseInt(thanhtien);
      }, 0);
      // handleGiohang();
      setTongTien(sum);
      setThanhToan(sum);
      // console.log(sum);
    };
    loadTongtien();
  }, [giohangthanhtien, isCheck]);

  //todo Load giỏ hàng item
  useEffect(() => {
    if (localStorage) {
      const handleLoadGiohang = async (e) => {
        try {
          const params = {
            msdn: localStorage,
          };
          const response = await giohangApi.listgiohang(params);
          setGiohangItem(response);
        } catch (error) {
          console.log(error);
        }
      };
      handleLoadGiohang();
    }
  }, [giohangthanhtien, localStorage]);

  useEffect(() => {
    const addTitle_KM = () => {
      document.getElementById("title_km").classList.add("hidden");
      document.getElementById("border_km").classList.add("hidden");
      for (let i = 0; i < giohang.length; i++) {
        if (giohang[i].spctkm == 1 && giohang[i].ptgiam < 100) {
          document.getElementById("title_km").classList.remove("hidden");
          document.getElementById("border_km").classList.remove("hidden");
        }
      }
    };
    // addTitle_KM();
  }, [giohang]);
  //todo Check tất cả item trong giỏ hàng
  const handleClickAll = (e) => {
    const kt_check = document.getElementById("cart_item_checkall");
    const a = document.getElementsByClassName("cart_item_check");
    if (kt_check.checked) {
      for (let i = 0; i < a.length; i++) {
        a[i].checked = true;
      }
      setIsCheckAll(true);
      const id = giohang.map((item) => item.rowid);
      setIsCheck(id);
    } else {
      setIsCheck([]);
      for (let e = 0; e < a.length; e++) {
        a[e].checked = false;
      }
    }
  };
  useEffect(() => {
    setTimeout(() => {
      handleClickAll();
    }, 500);
  }, [giohang]);
  //todo check từng item trong giỏ hàng
  const handleClick = (e) => {
    const { value, checked } = e.target;
    const kt_check = document.getElementById("cart_item_checkall");
    kt_check.checked = false;
    setIsCheck([...isCheck, value]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== value));
    }
  };
  //todo reset số lượng giỏ hàng
  function handleGiohang() {
    const params = {
      msdn: localStorage,
    };
    dispatch(createGiohang.createGiohangRequest(params));
  }
  //todo Thanh toán
  const handleThanhtoan = (e) => {
    if (isCheck == "") {
      //*chưa có check sp nào cả
      setShowModal(true);
      setLoaiError("Chưa chọn sản phẩm để thanh toán!");
    } else {
      if (thongtinnhanhang != "") {
        //*thỏa điều kiện thì cho mua hàng
        const soct =
          "DH" + Date.now() + Math.floor(1000 + Math.random() * 9000);
        const thanhtienvat = sotientongthanhtoan;
        const diachi = document.getElementById("diachi").innerText;
        const sodienthoai = document.getElementById("sodienthoai").innerText;

        const handleDathangHeader_add = async (e) => {
          var params = {};
          if (localStorage_MSDV) {
            params = {
              msdv: "",
              msdn: localStorage,
              mskh: localStorage_MSDV,
              tenkhachhang: localStorage_Tendv,
              tendaidien: localStorage_Tendaidien,
              dienthoai: sodienthoai,
              diachi: diachi,
              soct: soct,
              mavoucher: mavoucher,
              tenvoucher: tenvoucher,
              loaitichluy: loaitichluy,
              tientichluy: tientichluy,
              sotienvoucher: sotienvoucher,
              thanhtienvat: thanhtienvat,
            };
          } else {
            params = {
              msdv: "",
              msdn: localStorage,
              mskh: localStorage_Sodienthoai,
              tenkhachhang: localStorage_Tendv,
              tendaidien: localStorage_Tendaidien,
              dienthoai: sodienthoai,
              diachi: diachi,
              soct: soct,
              mavoucher: mavoucher,
              tenvoucher: tenvoucher,
              loaitichluy: loaitichluy,
              tientichluy: tientichluy,
              sotienvoucher: sotienvoucher,
              thanhtienvat: thanhtienvat,
            };
          }
          if (diachi != "") {
            try {
              await thanhtoanApi.dathangheader_add(params);
              for (let i = 0; i < isCheck.length; i++) {
                const handleUpdateLine = async (e) => {
                  try {
                    const params = {
                      msdn: localStorage,
                      soct: soct,
                      rowid: isCheck[i],
                    };
                    await thanhtoanApi.update_line_1(params);
                    handleGiohang();
                  } catch (error) {
                    console.log(error);
                  }
                };
                handleUpdateLine();
              }
              socket.emit("donhang");
              router.push("/pay?" + soct);
            } catch (error) {
              console.log(error);
            }
          } else {
            setShowModal(true);
            setLoaiError("Vui lòng chọn thông tin nhận hàng");
          }
        };
        handleDathangHeader_add();
      } else {
        setShowModalChuaCoThongTinNhanHang(true);
      }
    }
  };

  function cart_delete_all() {
    var msdn = localStorage;
    const handleGiohangDeleteAll = async (e) => {
      try {
        const params = {
          msdn: msdn,
        };
        await giohangApi.cart_delete_all(params);
        handleGiohang();
        setShowModal_Delete_All(false);
      } catch (error) {
        console.log(error);
      }
    };
    handleGiohangDeleteAll();
  }
  //todo Load địa chỉ từ mã số xã
  useEffect(() => {
    const handleDiaChi = async (e) => {
      try {
        const params = {
          maxa: localStorage_Maxa,
        };
        const response = await giohangApi.load_diachi(params);
        var diachi =
          response[0]?.tenxa +
          ", " +
          response[0]?.tenhuyen +
          ", " +
          response[0]?.tentinh;
        setDiaChiLoad(diachi);
      } catch (error) {
        console.log(error);
      }
    };
    handleDiaChi();
  }, [localStorage]);
  //todo danh sách thông tin nhận hàng và add vào thông tin nhận hàng khi dùng egpp lần đầu
  useEffect(() => {
    const handleAutoThongTinNhanHang = async (e) => {
      try {
        if (localStorage_MSDV) {
          var params = {
            msdv: localStorage_MSDV,
            masonguoinhan:
              localStorage_Sodienthoai +
              Math.floor(1000 + Math.random() * 9000),
            tenkhachhang: localStorage_Tendv,
            hotennguoinhan: localStorage_Tendaidien,
            sodienthoai: localStorage_Sodienthoai,
            diachi: localStorage_Diachi,
            tinh: "",
            huyen: "",
            xa: "",
            maxa: localStorage_Maxa,
          };
        } else {
          var params = {
            msdv: localStorage_Sodienthoai,
            masonguoinhan:
              localStorage_Sodienthoai +
              Math.floor(1000 + Math.random() * 9000),
            tenkhachhang: localStorage_Tendv,
            hotennguoinhan: localStorage_Tendaidien,
            sodienthoai: localStorage_Sodienthoai,
            diachi: localStorage_Diachi,
            tinh: "",
            huyen: "",
            xa: "",
            maxa: localStorage_Maxa,
          };
        }

        const response = await giohangApi.listthongtinnhanhang(params);
        if (typeof response == "string") {
          setListThongTinNhanHang([]);
        } else {
          setListThongTinNhanHang(response);
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleAutoThongTinNhanHang();
  }, [diachiLoad]);
  //todo Load chi tiết nhận hàng mặc định và danh sách voucher
  useEffect(() => {
    const handleLoadThongTinNhanHang = async (e) => {
      var params = {};
      var msdv = window.localStorage.getItem("msdv");
      var dienthoai = window.localStorage.getItem("dienthoai");
      try {
        if (localStorage_MSDV) {
          params = {
            masonguoinhan: "",
            msdv: msdv,
          };
        } else {
          params = {
            masonguoinhan: "",
            msdv: dienthoai,
          };
        }
        const response = await giohangApi.listchitietthongtinnhanhang(params);
        setChiTietThongTinNhanHang(response);
      } catch (error) {
        console.log(error);
      }
    };
    handleLoadThongTinNhanHang();
    const handleLoadVoucher = async (e) => {
      try {
        const params = {
          msdv: localStorage_MSDV,
        };
        const response = await giohangApi.listVoucher(params);
        setListVoucher(response);
      } catch (error) {
        console.log(error);
      }
    };
    handleLoadVoucher();
  }, [thongtinnhanhang]);
  //todo load chi tiết thông tin nhận hàng
  const handleLoadThongTin = async (e) => {
    const value = e.target.value;
    try {
      if (localStorage_MSDV) {
        var params = {
          masonguoinhan: value,
          msdv: localStorage_MSDV,
        };
      } else {
        var params = {
          masonguoinhan: value,
          msdv: localStorage_Sodienthoai,
        };
      }
      const response = await giohangApi.listchitietthongtinnhanhang(params);
      setChiTietThongTinNhanHang(response);
    } catch (error) {
      console.log(error);
    }
  };
  //todo load Voucher
  const handleLoadVoucherChiTiet = async (e) => {
    const value = e.target.value;
    const mavoucher = e.target[e.target.selectedIndex].dataset.mavoucher;
    const tenvoucher = e.target[e.target.selectedIndex].dataset.tenvoucher;
    const dacheck_tichluy = document.getElementById("tientichluy").checked;
    let thanhtoan = 0;
    if (value != "") {
      document.getElementById("sotienvoucher").classList.add("text-[green]");
      document.getElementById("titlevoucher").classList.add("text-[green]");
      document.getElementById("amvouvher").classList.remove("hidden");

      setSoTienVouCher(value);
      setMaVouCher(mavoucher);
      setTenVouCher(tenvoucher);
      if (dacheck_tichluy === true) {
        thanhtoan = parseInt(tongtien) - parseInt(value) - tientichluy;
      } else {
        thanhtoan = parseInt(tongtien) - parseInt(value);
      }
      if (thanhtoan < 0) {
        setThanhToan(0);
      } else {
        setTongThanhToan(thanhtoan);
      }
    } else {
      document.getElementById("sotienvoucher").classList.remove("text-[green]");
      document.getElementById("titlevoucher").classList.remove("text-[green]");
      document.getElementById("amvouvher").classList.add("hidden");

      setSoTienVouCher(0);
      setMaVouCher("");
      if (dacheck_tichluy === true) {
        thanhtoan = parseInt(tongtien) - tientichluy;
      } else {
        thanhtoan = parseInt(tongtien);
      }
      setTongThanhToan(thanhtoan);
    }
  };
  //todo Load thông tin nhận hàng khi xóa
  const handleThongTinNhanHang = async (e) => {
    if (localStorage_MSDV) {
      var msdv = localStorage_MSDV;
    } else {
      var msdv = localStorage_Sodienthoai;
    }
    try {
      const params = {
        msdv: msdv,
      };

      const response = await giohangApi.listthongtinnhanhang(params);
      if (typeof response == "string") {
        setListThongTinNhanHang([]);
      } else {
        setListThongTinNhanHang(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //! delete Thông tin nhận hàng
  const deleteThongTin = async (e, value) => {
    try {
      const params = {
        masonguoinhan: value,
      };
      const response = await giohangApi.deleteThongTin(params);
      handleThongTinNhanHang();
    } catch (error) {
      console.log(error);
    }
  };
  //! Chỉnh sửa địa chỉ nhận hàng mặc định
  const ChinhSuaThongTin = async (e, value) => {
    if (localStorage_MSDV) {
      var msdv = localStorage_MSDV;
    } else {
      var msdv = localStorage_Sodienthoai;
    }
    try {
      const params = {
        masonguoinhan: value,
        msdv: msdv,
      };
      const response = await giohangApi.editThongTin(params);
      handleThongTinNhanHang();
      //todo load chi tiết thông tin nhận hàng khi chỉnh sửa
      c;
    } catch (error) {
      console.log(error);
    }
  };

  //todo Thêm thông tin nhận hàng
  const handleAddThongTinNhanHang = async (e) => {
    const msdv = localStorage_MSDV;
    const msdn = localStorage;
    const tennguoinhan = document.getElementById("tennguoinhan").value;
    const sodienthoai = document.getElementById("sodienthoai").value;
    const msnn = sodienthoai + Math.floor(1000 + Math.random() * 9000);
    const diachi = document.getElementById("diachiAdd").value;
    const loadtinh = document.getElementById("loadtinh");
    const tinh = loadtinh.options[loadtinh.selectedIndex].text;
    const loadhuyen = document.getElementById("loadhuyen");
    const huyen = loadhuyen.options[loadhuyen.selectedIndex].text;
    const loadxa = document.getElementById("loadxa");
    const xa = loadxa.options[loadxa.selectedIndex].text;
    const maxa = loadxa.options[loadxa.selectedIndex].value;
    try {
      if (msdv) {
        var params = {
          msdv: msdv,
          masonguoinhan: msnn,
          tenkhachhang: localStorage_Tendv,
          hotennguoinhan: tennguoinhan,
          sodienthoai: sodienthoai,
          diachi: diachi,
          tinh: tinh,
          huyen: huyen,
          xa: xa,
          maxa: maxa,
        };
      } else {
        var params = {
          msdv: msdn,
          masonguoinhan: msnn,
          tenkhachhang: localStorage_Tendv,
          hotennguoinhan: tennguoinhan,
          sodienthoai: sodienthoai,
          diachi: diachi,
          tinh: tinh,
          huyen: huyen,
          xa: xa,
          maxa: maxa,
        };
      }
      await giohangApi.addThongTinNhanHang(params);
    } catch (error) {
      console.log(error);
    }
    setFormAddThongTin_Show(false);
    handleThongTinNhanHang();
    const handleLoadThongTinNhanHang = async (e) => {
      try {
        if (localStorage_MSDV) {
          var params = {
            masonguoinhan: "",
            msdv: localStorage_MSDV,
          };
        } else {
          var params = {
            masonguoinhan: "",
            msdv: localStorage_Sodienthoai,
          };
        }
        const response = await giohangApi.listchitietthongtinnhanhang(params);
        setChiTietThongTinNhanHang(response);
      } catch (error) {
        console.log(error);
      }
    };
    handleLoadThongTinNhanHang();
  };
  const replaceSDT = (e) => {
    const value = e.target.value.replace(/[^0-9\.\,]/g, "");
    document.getElementById("sodienthoai").value = value;
  };
  //todo load danh mục tỉnh
  useEffect(() => {
    const handleLoadDMTinh = async (e) => {
      try {
        const params = {
          msdv: "",
        };

        const response = await giohangApi.loadDMTinh(params);
        setDMTinh(response);
      } catch (error) {
        console.log(error);
      }
    };
    handleLoadDMTinh();
  }, []);

  //todo Load Huyện
  const handleLoadHuyen = async (e) => {
    var valueTinh = e.target.value;
    try {
      const params = {
        mstinh: valueTinh,
      };
      const response = await giohangApi.loadDMHuyen(params);
      setDMHuyen(response);
    } catch (error) {
      console.log(error);
    }
  };
  //todo Load Xã
  const handleLoadXa = async (e) => {
    var valueHuyen = e.target.value;
    try {
      const params = {
        mshuyen: valueHuyen,
      };
      const response = await giohangApi.loadDMXa(params);
      setDMXa(response);
    } catch (error) {
      console.log(error);
    }
  };

  //todo Load tiền tích lũy
  useEffect(() => {
    const Load_tien_tichluy = async (e, value) => {
      try {
        const params = {
          mskh: localStorage_MSDV,
        };
        const response = await giohangApi.load_tien_tichluy(params);
        setTienTichLuy(response[0].sotien ? response[0].sotien : 0);
        //todo load chi tiết thông tin nhận hàng khi chỉnh sửa
      } catch (error) {
        console.log(error);
      }
    };
    Load_tien_tichluy();
  }, [localStorage_MSDV]);
  //todo tinh voucher
  useEffect(() => {
    const tongthanhtoan =
      tongtien < sotienvoucher ? 0 : tongtien - sotienvoucher;
    setTongThanhToan(tongthanhtoan);
    handleCheckTichLuy();
  }, [tongtien]);
  //todo tính tích lũy
  const handleCheckTichLuy = (e) => {
    const dacheck = document.getElementById("tientichluy").checked;
    if (dacheck === true) {
      document.getElementById("titletichluy").classList.add("text-[green]");
      document.getElementById("sotientichluy").classList.add("text-[green]");
      document.getElementById("tientichluyam").classList.remove("hidden");
      if (sotienthanhtoan > 0) {
        setTongThanhToan(
          sotienthanhtoan - tientichluy - sotienvoucher < 0
            ? 0
            : sotienthanhtoan - tientichluy - sotienvoucher
        );
        setLoaiTichLuy(true);
      }
    } else {
      document.getElementById("titletichluy").classList.remove("text-[green]");
      document.getElementById("sotientichluy").classList.remove("text-[green]");
      document.getElementById("tientichluyam").classList.add("hidden");
      setTongThanhToan(
        sotienthanhtoan < sotienvoucher ? 0 : sotienthanhtoan - sotienvoucher
      );
      setLoaiTichLuy(false);
    }
  };
  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/Logo_TPSPharma_mini.png" />
      </Head>
      <div className="bg-[#eeebeb] lglap:px-5 smlap:px-5">
        <div className="fullscreen:container mx-auto">
          <div className="grid grid-cols-12  py-3 gap-7 smlap:gap-4 mobile:gap-2 mobile:px-2 tablet:gap-2 tablet:px-3">
            <div className="col-span-8 bg-white p-5 rounded-md tablet:col-span-12 mobile:p-2  mobile:col-span-12">
              <div className="flex justify-between">
                <p className="text-sm font-semibold text-[red]">Đặt hàng</p>
                <p
                  className="text-[green] hover:cursor-pointer"
                  onClick={(e) => setShowModal_Delete_All(true)}
                >
                  Xóa tất cả
                </p>
              </div>
              {/* Chi tiết giỏ hàng */}
              <div className="flex flex-col ">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 inline-block min-w-full  lg:px-8 tablet:px-3 smlap:px-4">
                    <div className="overflow-hidden">
                      <table className="min-w-full ml-2">
                        <thead className="border-b">
                          <tr className="relative">
                            <th>
                              <input
                                className="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-green-600 checked:border-green-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-center mr-2 cursor-pointer"
                                type="checkbox"
                                value=""
                                id="cart_item_checkall"
                                onClick={handleClickAll}
                                defaultChecked
                              />
                            </th>
                            <th
                              scope="col"
                              className="header_tb_giohang text-center mobile:whitespace-nowrap mobile:hidden"
                            >
                              Sản phẩm
                            </th>
                            <th
                              scope="col"
                              className="header_tb_giohang mobile:hidden tablet:hidden smlap:hidden lglap:hidden"
                            >
                              Đơn giá
                            </th>
                            <th
                              scope="col"
                              className="header_tb_giohang mobile:absolute mobile:right-5 mobile:hidden"
                            >
                              Số lượng
                            </th>
                            <th
                              scope="col"
                              className="header_tb_giohang whitespace-nowrap  mobile:hidden"
                            >
                              Thành tiền
                            </th>
                            <th
                              scope="col"
                              className="header_tb_giohang whitespace-nowrap  mobile:hidden"
                            >
                              Chiết khấu
                            </th>
                            <th
                              scope="col"
                              className="header_tb_giohang whitespace-nowrap  mobile:hidden text-[red]"
                            >
                              Thanh toán
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {giohang.map((giohangItem, key) => {
                            if (
                              (giohangItem.spctkm == 1 &&
                                giohangItem.ptgiam == 100) ||
                              giohangItem.spctkm == 0
                            ) {
                              return (
                                <GioHangItem
                                  giohangItem={giohangItem}
                                  index={key}
                                  handleClick={handleClick}
                                  isChecked={isCheck.includes(key)}
                                />
                              );
                            }
                          })}

                          <tr id="border_km" className="border hidden"></tr>
                          <tr
                            id="title_km"
                            className="text-sm font-semibold text-[red] hidden"
                          >
                            <td colspan="2" className="pt-2">
                              Chiết khấu thêm
                            </td>
                          </tr>
                          {giohang.map((giohangItem, key) => {
                            if (
                              giohangItem.spctkm == 1 &&
                              giohangItem.ptgiam < 100
                            ) {
                              return (
                                <GioHangItem
                                  giohangItem={giohangItem}
                                  index={key}
                                  handleClick={handleClick}
                                  isChecked={isCheck.includes(key)}
                                />
                              );
                            }
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Thông tin khách hàng lấy api của A.Vi */}
            <div className="col-span-4 tablet:col-span-12 mobile:col-span-12">
              <div className=" bg-white p-5 rounded-md max-h-65">
                <div className="  text-xl ">
                  <div className="text-sm font-semibold text-[red]">
                    Khách hàng
                  </div>
                  <div className="text-[14px] pl-[30px] mobile:pl-2">
                    <div className="py-1 mobile:py-2 flex items-center gap-2 ">
                      <div>
                        <Image
                          src={require("../pages/assets/img/icon/store.png")}
                        />
                      </div>
                      <span>{localStorage_Tendv}</span>
                    </div>
                    <div className="py-1 mobile:py-2  flex items-center gap-2">
                      <div>
                        <Image
                          src={require("../pages/assets/img/icon/user.png")}
                        />
                      </div>
                      <span>{localStorage_Tendaidien}</span>
                    </div>
                    <div className="py-1 mobile:py-2 flex items-center gap-2">
                      <div>
                        <Image
                          src={require("../pages/assets/img/icon/phone.png")}
                        />
                      </div>
                      <span>{localStorage_Sodienthoai}</span>
                    </div>
                    <div className="py-1 mobile:py-2 flex items-center gap-2">
                      <div>
                        <Image
                          src={require("../pages/assets/img/icon/address.png")}
                        />
                      </div>
                      <span>{localStorage_Diachi}</span>
                    </div>
                  </div>
                  <div className="  text-xl ">
                    <div className="flex items-center gap-4">
                      <div className="text-sm font-semibold text-[black]">
                        Thông tin nhận hàng
                      </div>
                      <select
                        className="border-b-[1px] border-t-0 border-l-0 border-r-0 relative focus:outline-0 text-sm fullscreen:w-[200px] "
                        onChange={(e) => {
                          handleLoadThongTin(e);
                        }}
                      >
                        {thongtinnhanhang?.map((thongtin, key) => {
                          var el;
                          if (thongtin.macdinh == 1) {
                            el = (
                              <option
                                className="relative"
                                selected
                                value={thongtin.masonguoinhan}
                              >
                                <p>{thongtin.hotennguoinhan}</p>
                              </option>
                            );
                          } else {
                            el = (
                              <option
                                className="relative"
                                value={thongtin.masonguoinhan}
                              >
                                <p>{thongtin.hotennguoinhan}</p>
                              </option>
                            );
                          }
                          return el;
                        })}
                      </select>
                      <div
                        onClick={(e) => {
                          setFormAddThongTin_Show(true);
                        }}
                      >
                        <Image
                          src={require("../pages/assets/img/icon/plus_add.png")}
                        ></Image>
                      </div>
                      <div
                        onClick={(e) => {
                          setEditThongTin(true);
                        }}
                      >
                        <Image
                          src={require("../pages/assets/img/icon/edit.png")}
                        ></Image>
                      </div>
                    </div>
                    <div className="text-[14px] pl-[30px] smlap:pl-[10px] mobile:pl-2">
                      {chitietthongtinnhanhang?.map((chitiet, key) => {
                        return (
                          <div className="mt-4">
                            <div className="grid grid-cols-12 items-center">
                              <h3 className="col-span-4 mobile:col-span-4 tablet:col-span-2 w-[100px] ">
                                Số điện thoại
                              </h3>
                              <p
                                className="col-span-8 mobile:col-span-8 tablet:col-span-10"
                                id="sodienthoai"
                              >
                                {chitiet.sodienthoai}{" "}
                              </p>
                            </div>
                            <div className="grid grid-cols-12 items-start">
                              <h3 className=" col-span-4 mobile:col-span-4 tablet:col-span-2 w-[100px] ">
                                Địa chỉ
                              </h3>
                              <p
                                className="col-span-8 mobile:col-span-8 tablet:col-span-10"
                                id="diachi"
                              >
                                {chitiet.diachi}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              {/* Mã quà tặng */}

              <div className=" bg-white p-5 mobile:mt-2 tablet:mt-[8px] mt-5 rounded-md max-h-64 smlap:max-h-72">
                <div className="flex justify-between  font-semibold">
                  <div className="text-[red] text-sm font-semibold">
                    Tổng tiền
                  </div>
                  <div className="flex items-end">
                    <p className="text-sm text-[red] font-semibold">
                      {tongtien
                        ?.toString()
                        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}{" "}
                      đ
                    </p>
                  </div>
                </div>
                <div className=" justify-between grid grid-cols-12 items-center font-semibold my-3">
                  <div
                    id="titlevoucher"
                    className="text-[black] col-span-3 text-sm font-semibold"
                  >
                    Mã quà tặng
                  </div>
                  <select
                    id="voucher"
                    className="col-span-7 border-b-[1px] border-t-0 border-l-0 border-r-0 focus:outline-0 text-sm w-full font-thin"
                    onChange={(e) => {
                      handleLoadVoucherChiTiet(e);
                    }}
                  >
                    <option className="text-sm" value="">
                      Chọn mã quà tặng
                    </option>
                    {voucher?.map((itemVoucher, key) => {
                      return (
                        <option
                          className="text-sm"
                          data-mavoucher={itemVoucher.mavoucher}
                          data-tenvoucher={itemVoucher.tenvoucher}
                          value={itemVoucher.sotien}
                        >
                          {itemVoucher.tenvoucher}
                        </option>
                      );
                    })}
                  </select>
                  <div className=" col-span-2 flex justify-end items-end gap-1">
                    <div className="min-w-[5px]">
                      <span id="amvouvher" className="hidden text-[green]">
                        -
                      </span>
                    </div>{" "}
                    <p
                      id="sotienvoucher"
                      className=" text-sm text-[black] font-semibold"
                    >
                      {sotienvoucher
                        ?.toString()
                        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}{" "}
                      đ
                    </p>
                  </div>
                </div>
                <div className=" justify-between grid grid-cols-12 items-center font-semibold my-[20px]">
                  <div
                    id="titletichluy"
                    className="text-[black] col-span-3 text-sm font-semibold"
                  >
                    Tiền tích lũy
                  </div>

                  <div className=" col-span-9 flex justify-end items-center gap-3">
                    <input
                      type="checkbox"
                      id="tientichluy"
                      onClick={(e) => {
                        handleCheckTichLuy(e);
                      }}
                      className="rounded-full checked:bg-[green]"
                    />
                    <p
                      id="sotientichluy"
                      className="text-sm text-[black] font-semibold flex gap-1"
                    >
                      <div className="min-w-[5px]">
                        <span id="tientichluyam" className="hidden ">
                          -{" "}
                        </span>
                      </div>
                      <span>
                        {tientichluy
                          ?.toString()
                          .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}{" "}
                        đ
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex justify-between  font-semibold">
                  <div className="text-[red] text-sm font-semibold">
                    Thanh toán
                  </div>
                  <div className="flex items-end">
                    <p className="text-sm text-[red] font-semibold">
                      {sotientongthanhtoan
                        ?.toString()
                        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}{" "}
                      đ
                    </p>
                  </div>
                </div>
                <div className="flex justify-around pt-5">
                  <button
                    type="submit"
                    onClick={handleThanhtoan}
                    className="bg-[green] w-full text-center text-white p-3 rounded-lg"
                  >
                    Đặt hàng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}
      {showModal ? (
        <div className="bg-[#000000b5] justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[1000] outline-none focus:outline-none">
          <div className="modal-dialog relative w-auto pointer-events-none mobile:w-[300px]">
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
                  <h3 className="mb-5 text-lg font-normal text-[red]">
                    {error}
                  </h3>
                  <div className="flex justify-end w-full">
                    <button
                      onClick={() => setShowModal(false)}
                      data-modal-hide="popup-modal"
                      type="button"
                      className="text-[#000] bg-[#ddd] hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    >
                      Đóng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      {/* Modal thông tin nhận hàng */}
      {modalThongTinNhanHang ? (
        <div className="bg-[#000000b5] justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[1000] outline-none focus:outline-none">
          <div className="modal-dialog relative w-auto pointer-events-none">
            <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
              <div className="modal-body relative p-4">
                <div className="px-6 text-center">
                  <svg
                    aria-hidden="true"
                    className="mx-auto mb-4 text-[red] w-14 h-14 dark:text-gray-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      strokeWidth="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <h3 className="mb-5 text-lg font-normal text-[red] dark:text-gray-400">
                    Nhập thông tin nhận hàng
                  </h3>
                  <button
                    onClick={() => setShowModalChuaCoThongTinNhanHang(false)}
                    data-modal-hide="popup-modal"
                    type="button"
                    className="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                  >
                    Đồng ý
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      {/* Modal delete all item */}
      {showModal_Delete_All ? (
        <div className="bg-[#000000b5] justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[1000] outline-none focus:outline-none">
          <div className="modal-dialog relative w-auto pointer-events-none">
            <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
              <div className="modal-body relative p-4">
                <div className="px-6 text-center">
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Xóa tất cả?
                  </h3>
                  <div className="flex justify-end">
                    <button
                      onClick={() => cart_delete_all()}
                      data-modal-hide="popup-modal"
                      type="button"
                      className="text-white bg-red-600 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                    >
                      Đồng ý
                    </button>
                    <button
                      onClick={() => setShowModal_Delete_All(false)}
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
      ) : (
        ""
      )}
      {/* Modal Edit thông tin */}
      {editThongTin ? (
        <div className="bg-[#000000b5] justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[1000] outline-none focus:outline-none">
          <div className="modal-dialog relative w-auto pointer-events-none">
            <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
              <div className="modal-body relative p-4 w-[500px] mobile:w-[350px]">
                <div className="px-6 text-center">
                  <h3 className="mb-5 text-lg font-normal text-black dark:text-gray-400">
                    Danh sách thông tin nhận hàng
                  </h3>
                  <div>
                    <ul className="text-left ">
                      {thongtinnhanhang?.map((thongtin, key) => {
                        var el;
                        if (thongtin.macdinh == 1) {
                          el = (
                            <li
                              className="flex justify-between py-1"
                              selected
                              id={"thongtin" + thongtin.masonguoinhan}
                              value={thongtin.masonguoinhan}
                            >
                              <p>{thongtin.hotennguoinhan}</p>
                              <div className="grid grid-cols-4 gap-3">
                                <span
                                  onClick={(e) => {
                                    deleteThongTin(e, thongtin.masonguoinhan);
                                  }}
                                  className="col-span-1 justify-start hover:text-[red] hover:cursor-pointer"
                                >
                                  Xóa
                                </span>
                                <span className="col-span-3 text-[#0091ff] hover:text-[green] hover:cursor-pointer flex justify-end">
                                  Đã Mặc định
                                </span>
                              </div>
                            </li>
                          );
                        } else {
                          el = (
                            <li
                              className="flex justify-between py-1"
                              value={thongtin.masonguoinhan}
                            >
                              <p>{thongtin.hotennguoinhan}</p>
                              <div className="grid grid-cols-4 gap-3">
                                <span
                                  onClick={(e) => {
                                    deleteThongTin(e, thongtin.masonguoinhan);
                                  }}
                                  className="col-span-1 justify-start hover:text-[red] hover:cursor-pointer"
                                >
                                  Xóa
                                </span>
                                <span
                                  onClick={(e) => {
                                    ChinhSuaThongTin(e, thongtin.masonguoinhan);
                                  }}
                                  className="col-span-3 hover:text-[green] hover:cursor-pointer flex justify-end"
                                >
                                  Mặc định
                                </span>
                              </div>
                            </li>
                          );
                        }
                        return el;
                      })}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="flex justify-end mr-8 mb-5">
                <button
                  onClick={() => setEditThongTin(false)}
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
      ) : (
        <div></div>
      )}
      {/* Form Add Thông tin */}
      {showFormAddThongTin ? (
        <div className="bg-[#000000b5] justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[1000] outline-none focus:outline-none">
          <div className="modal-dialog relative  pointer-events-none w-[650px] mobile:w-[380px]">
            <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
              <div className="modal-body relative p-4 text-center w-full">
                <h1 className="text-xl">Thêm mới thông tin nhận hàng</h1>
                <div className="flex flex-col items-start mb-6 w-full gap-3 mt-4">
                  <div className="w-full">
                    <p className="text-left pb-2 text-[#207820] font-semibold">
                      Tên người nhận
                    </p>
                    <input
                      placeholder="Tên người nhận"
                      id="tennguoinhan"
                      className="border rounded-md  px-3 py-1 w-full  "
                    />
                  </div>
                  <div className="w-full">
                    <p className="text-left pb-2 text-[#207820] font-semibold">
                      Số điện thoại
                    </p>
                    <input
                      placeholder="Số điện thoại"
                      onKeyUp={(e) => {
                        replaceSDT(e);
                      }}
                      maxLength="10"
                      id="sodienthoai"
                      className="border rounded-md  px-3 py-1 w-full"
                    />
                  </div>
                  <div className="w-full">
                    <p className="text-left pb-2 text-[#207820] font-semibold">
                      Địa chỉ
                    </p>
                    <input
                      placeholder="Số nhà"
                      id="diachiAdd"
                      className="border rounded-md  px-3 py-1 w-full"
                    />
                    <div className="grid grid-cols-12 mt-4 gap-2 ">
                      <div className="col-span-4 mobile:col-span-6 border-[2px] rounded-md mobile:py-2 flex items-center">
                        <select
                          className="border-none w-full focus:border focus:border-[black]"
                          id="loadtinh"
                          onChange={(e) => {
                            handleLoadHuyen(e);
                          }}
                        >
                          <option>Tỉnh</option>
                          {dmtinh?.map((tinh, key) => {
                            return (
                              <option value={tinh.matinh}>
                                {tinh.tentinh}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="col-span-4 mobile:col-span-6 border-[2px] rounded-md mobile:py-2 flex items-center">
                        <select
                          className="border-none w-full focus:border focus:border-[black]"
                          id="loadhuyen"
                          onChange={(e) => {
                            handleLoadXa(e);
                          }}
                        >
                          <option>Huyện</option>
                          {dmhuyen?.map((huyen, key) => {
                            return (
                              <option value={huyen.mahuyen}>
                                {huyen.tenhuyen}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="col-span-4 mobile:col-span-6 border-[2px] rounded-md mobile:py-2 flex items-center">
                        <select
                          id="loadxa"
                          className="border-none w-full focus:border focus:border-[black]"
                        >
                          <option>Xã</option>
                          {dmxa?.map((xa, key) => {
                            return <option value={xa.maxa}>{xa.tenxa}</option>;
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-right lg:text-right flex justify-end">
                  <button
                    onClick={(e) => {
                      handleAddThongTinNhanHang();
                    }}
                    type="button"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    className="hover:cursor-pointer text-[white] bg-[green] rounded-[7px] p-[8px] px-5 mr-3"
                  >
                    Thêm
                  </button>
                  <button
                    onClick={(e) => setFormAddThongTin_Show(false)}
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
        <div></div>
      )}
    </>
  );
};
export default Cart;
