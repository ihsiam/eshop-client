import PropTypes from "prop-types";
import { useState } from "react";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.svg";
import { categoriesData, productData } from "../../static/data";
import DropDownCtg from "./DropDownCtg";
import Navbar from "./Navbar";

export default function Header({ activeHeading }) {
  const [searchTitle, setSearchTitle] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);

  const handleSearch = (e) => {
    setSearchTitle(e.target.value);

    const filterData =
      productData &&
      productData.filter((product) =>
        product.name.toLowerCase().includes(searchTitle.toLowerCase())
      );

    setSearchData(filterData);
  };

  window.addEventListener("scroll", () => {
    window.scrollY > 70 ? setActive(true) : setActive(false);
  });

  return (
    <>
      {/* 1st bar(logo, search, sellerBtn) */}
      <div className="w-11/12 mx-auto">
        <div className="hidden md:flex md:justify-between md:h-[50px] md:items-center md:my-[15px] lg:my-[20px]">
          {/* logo */}
          <div>
            <Link to="/">
              <img src={logo} alt="" srcSet="" className="w-[150px]" />
            </Link>
          </div>
          {/* searchbar */}
          <div className="w-[40%] lg:w-[50%] relative">
            <input
              type="text"
              value={searchTitle}
              onChange={handleSearch}
              placeholder="Search Product..."
              className="h-[40px] w-full border-[#3987db] border-2 rounded-md px-3"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />
            {/* search Data box */}
            {searchData && searchData.length !== 0 ? (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow rounded z-[9] p-4">
                {searchData &&
                  searchData.map((item) => {
                    const productName = item.name.replace(/\s+/g, "-");
                    return (
                      <Link to={`/product/${productName}`} key={productName}>
                        <div className="w-full flex items-center py-3">
                          <img
                            src={item.image_Url[0].url}
                            alt=""
                            className="h-[35px] w-[35px] mr-[10px]"
                          />
                          <h1 className="text-sm">{item.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>
          {/* seller button */}
          <div className="button">
            <Link to="/seller">
              <h1 className="text-[#fff] flex items-center">
                Become Seller <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
          </div>
        </div>
      </div>
      {/* 2nd bar(category box, navlink, wishlist, cart, profile) */}
      <div
        className={`${
          active ? "shadow fixed top-0 left-0 z-10" : null
        } transition hidden md:flex w-full items-center justify-between bg-[#3321c8] h-[70px]`}
      >
        <div
          className={`w-11/12 mx-auto relative flex items-center justify-between`}
        >
          {/* category box */}
          <div onClick={() => setDropDown(!dropDown)}>
            <div className="relative h-[60px] mt-[10px] w-[200px] lg:w-[270px] hidden md:block">
              <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
              <button className="h-[100%] w-full flex items-center justify-between pl-10 font-sans bg-white text-lg font-[500] rounded-t-md select-none">
                All Categories
              </button>
              <IoIosArrowDown
                size={20}
                className="absolute top-4 right-2 cursor-pointer"
              />
              {dropDown ? (
                <DropDownCtg
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              ) : null}
            </div>
          </div>
          {/* navbar */}
          <div className="flex items-center">
            <Navbar activeHeading={activeHeading} />
          </div>
          {/* wishlist, cart and profile */}
          <div>
            <div className="flex items-center">
              {/* wishlist */}
              <div className="relative cursor-pointer ml-[15px]">
                <AiOutlineHeart size={30} color="rgb(255 255 255 /83%)" />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 p-0 m-0 text-white leading-tight text-[12px] text-center font-mono">
                  0
                </span>
              </div>
              {/* cart */}
              <div className="relative cursor-pointer ml-[10px] lg:ml-[15px]">
                <AiOutlineShoppingCart
                  size={30}
                  color="rgb(255 255 255 /83%)"
                />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 p-0 m-0 text-white leading-tight text-[12px] text-center font-mono">
                  0
                </span>
              </div>
              {/* profile */}
              <div className="relative cursor-pointer ml-[10px] lg:ml-[15px]">
                <Link to="/log-in">
                  <CgProfile size={30} color="rgb(255 255 255 /83%)" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Header.propTypes = {
  activeHeading: PropTypes.number.isRequired,
};
