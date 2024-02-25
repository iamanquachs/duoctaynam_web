import { useEffect, useState, useRef } from "react";
import hanghoaApi from "../../pages/api/hanghoaApi";
import Image from "next/image";
import { useRouter } from "next/router";

function Search() {
  const router = useRouter();

  //   const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [giabanchitu, setGiabanChitu] = useState([]);

  function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => setDebouncedValue(value), delay);

      return () => clearTimeout(handler);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return debouncedValue;
  }
  const [requestSearch, setRequestSearch] = useState("");
  const [searchValue, setSearchValue] = useState([]);

  const debounced = useDebounce(requestSearch, 500);
  const inputRef = useRef();
  const searchInput = (e) => {
    handleShowResult();
    const valSeach = e.target.value;
    if (!valSeach.startsWith(" ")) {
      setRequestSearch(valSeach);
    }
    if (valSeach == "") {
      handleHideResult();
    }
  };
  useEffect(() => {
    if (!debounced.trim()) {
      setSearchResult([]);
      return;
    }

    const handleSearch = async (e) => {
      try {
        const params = {
          value: debounced,
        };
        const response = await hanghoaApi.list_search(params);
        setSearchValue(response);
      } catch (error) {
        console.log(error);
      }
    };
    handleSearch();
  }, [debounced]);
  const handleClear = () => {
    setRequestSearch("");
    setSearchValue([]);
    inputRef.current.focus();
  };
  const handleHideResult = () => {
    setTimeout(function () {
      const addHidden = document.getElementById("form_Search");
      addHidden.classList.add("hidden");
    }, 500);
  };
  const handleShowResult = () => {
    const removeHidden = document.getElementById("form_Search");
    removeHidden.classList.remove("hidden");
  };
  //todo active class bộ lọc
  const active_filter = (e, type_filter) => {
    switch (type_filter) {
      case "/":
        const nhomsp = document.querySelectorAll(".items_nhomsp li");
        nhomsp.forEach((nhomsp) => {
          nhomsp.classList.remove("active_nhomsp");
        });
        const hangsx = document.querySelectorAll(".items_hangsx li ");
        hangsx.forEach((hangsx) => {
          hangsx.classList.remove("active_filter");
        });
        const tieuchuan = document.querySelectorAll(".items_tieuchuan li ");
        tieuchuan.forEach((tieuchuan) => {
          tieuchuan.classList.remove("active_filter");
        });
        const nuocsx = document.querySelectorAll(".items_nuocsx li ");
        nuocsx.forEach((nuocsx) => {
          nuocsx.classList.remove("active_filter");
        });
        router.push("/");

        break;
      default:
        break;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const addHidden = document.getElementById("form_Search");
      addHidden.classList.add("hidden");
      router.push("/search?key=" + requestSearch);
    }
  };
  const load_giaban_chitu = async (e, index) => {
    try {
      const params = {
        mshh: e,
      };
      const response = await hanghoaApi.load_giaban_chitu(params);
      document.getElementById("giaban" + index).innerText = response[0].chitu;
      document.getElementById("quycach" + index).innerText =
        response[0].quycach;
    } catch (error) {
      console.log(error);
    }
  };
  const link = "https://erp.duoctaynam.vn/upload/sanpham/";

  return (
    <>
      <div className="col-span-2 lglap:col-span-2 smlap:col-span-2 tablet:col-span-4 mobile:col-span-6">
        <div className="flex w-full justify-center fullscreen:justify-end">
          <div className="w-full fullscreen:flex fullscreen:justify-center">
            <div
              onBlur={handleHideResult}
              className="relative flex flex-wrap items-stretch lglap:w-[100%]  fullscreen:w-[80%]"
            >
              <Image
                onClick={(e) => active_filter(e, "/")}
                className="max-w-full mobile:absolute z-50 smlap:hidden fullscreen:hidden tablet:hidden lglap:hidden w-[50px]"
                src={require("../../pages/assets/img/banner/duoc-tay-nam-mini.svg")}
                alt="Dược Tây Nam mobile"
              ></Image>
              <input
                ref={inputRef}
                onKeyDown={(e) => handleKeyDown(e)}
                onChange={(e) => searchInput(e)}
                onFocus={() => handleShowResult()}
                value={requestSearch}
                id="input_search"
                className="input_search h-10 rounded-3xl bg-[#e3e7e4] border-none mobile:pl-16 text-black mobile:h-[50px] focus:bg-[#e3e7e4] placeholder-gray-700"
                placeholder="Tìm tên thuốc hoặc hoạt chất"
                aria-label="Search"
                aria-describedby="button-addon2"
              />
              {!!requestSearch && (
                <button className="btn_search" onClick={handleClear}>
                  <Image
                    src={require("../../pages/assets/img/icon/delete.png")}
                  />
                </button>
              )}
              {/* Form result Search */}
              <div id="form_Search">
                {searchValue != "" ? (
                  <ul id="form_resultSearch" className="list_search">
                    {searchValue.map((search_item, key) => {
                      load_giaban_chitu(search_item.mshh, key);
                      return (
                        <li
                          onClick={() =>
                            router.push("/product?" + search_item.url)
                          }
                          className="list_search_items"
                        >
                          <div className="col-span-2 mobile:col-span-4">
                            <Image
                              className="rounded-sm"
                              src={link + `${search_item.path_image}`}
                              alt=""
                              width={500}
                              height={500}
                            />
                          </div>
                          <div className="col-span-10 mobile:text-xs mobile:col-span-8">
                            <p className="text-[green]">
                              {search_item.tenhh} (
                              <span id={"quycach" + key} className=""></span>)
                            </p>
                            <p id={"giaban" + key} className="text-[red]"></p>
                            <p>{search_item.tenloai}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
