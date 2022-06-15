import React, {useEffect, useState} from "react";
import Badge from "@mui/material/Badge";
import {useSnackbar} from "notistack";

import {Link, useNavigate} from "react-router-dom";
import {AiOutlineBell} from "react-icons/ai";
import {BiUserCircle} from "react-icons/bi";
import {FiShoppingCart} from "react-icons/fi";
import {AiOutlineSearch} from "react-icons/ai";
import {BsFillMicFill} from "react-icons/bs";

import {useDispatch, useSelector} from "react-redux";

import {logout} from "../../redux/userSlice";
import {removeAllAddress} from "../../redux/addressSlice";
import {removeAllCart} from "../../redux/cartSlide";
import filterAPI from "../../api/filterAPI";
import {useForm} from "react-hook-form";
import {product} from "../../redux/productSlice";
import {unwrapResult} from "@reduxjs/toolkit";
import CardItem from "../CardItem";

const defaulValue = {
  search: "",
};

function Header() {
  const isLogin = useSelector((state) => state.user.current.datatUser?.length);
  const numerProduct = useSelector((state) => state?.cart?.cartItem);

  const [soluong, setSoluong] = useState(0);
  const [searchData, setSearchData] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {enqueueSnackbar} = useSnackbar();

  const {register, handleSubmit} = useForm(defaulValue);

  const logoutUser = () => {
    dispatch(removeAllCart());
    dispatch(removeAllAddress());
    dispatch(logout());

    navigate("/shop/products", {replace: true});
  };

  useEffect(() => {
    (() => {
      try {
        unwrapResult(dispatch(product()));
        let a = 0;
        if (numerProduct?.length !== 0) {
          for (let i = 0; i < numerProduct?.length; i++) {
            a = numerProduct[i]?.so_luong_xuat + a;
            setSoluong(a);
          }
        } else {
          setSoluong(0);
        }
      } catch (error) {
        enqueueSnackbar(error.message, {
          variant: "error",
          autoHideDuration: 2000,
        });
      }
      const a = document.querySelector(".boxSearch");
      a.style = "display: none";
    })();
  }, [numerProduct]);

  const search = async (data) => {
    const dataSearch = await filterAPI.search(data.search);
    setSearchData(dataSearch);
    const a = document.querySelector(".boxSearch");
    a.style = "display: block";
  };

  const startvoice = () => {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
    recognition.start();
    recognition.onresult = async (event) => {
      const record = event.results[0][0].transcript;
      if (record !== "") {
        document.getElementById("search").value = record;
        search({search: record});
      } else {
        console.log("Vui long thuc hien lai");
      }
    };
  };

  window.onclick = () => {
    const a = document.querySelector(".boxSearch");
    a.style = "display: none";
  };

  return (
    <div className="">
      <div className="flex justify-between items-center w-[80%] font-bold m-auto py-5">
        <div>
          <span className="text-[35px] font-[900] bg-text-color bg-clip-text text-transparent">
            <Link to="/">SHOPSHOES</Link>
          </span>
        </div>
        <div className="flex gap-8">
          <div className="text-[20px] hover:opacity-80">
            <Link to="/shop">Home</Link>
          </div>
          <div className="text-[20px] hover:opacity-80">
            <Link to="/shop/products">Product</Link>
          </div>
          <div className="text-[20px] hover:opacity-80">
            <Link to="/shop/sale">Sales</Link>
          </div>
          <div className="text-[20px] hover:opacity-80">
            <Link to="/shop/contact">Contact</Link>
          </div>
        </div>

        <div className="relative">
          <form onSubmit={handleSubmit((data) => search(data))}>
            <div className="relative flex flex-1">
              <input
                {...register("search")}
                id="search"
                name="search"
                className="w-full py-1 pl-4 pr-6 bg-gray-100 outline-none rounded-l-md"
                type="text"
              />
              <BsFillMicFill
                onClick={() => startvoice()}
                className="absolute right-[18%] top-2/4 -translate-y-2/4 cursor-pointer"
                size={20}
                color="#303030"
              />
              <button className="py-2 px-3 bg-green-600 outline-none rounded-r-md ">
                <AiOutlineSearch size={20} color="#fff" />
              </button>
            </div>
          </form>
          {searchData.length > 0 ? (
            <div className="boxSearch absolute px-3 w-[500px] bg-slate-50 rounded-md z-50 -left-1/2 border shadow-md">
              {searchData?.map((data, idx) => (
                <CardItem key={idx} data={data} />
              ))}
            </div>
          ) : (
            <div className="boxSearch absolute p-4 w-[350px] bg-slate-50 rounded-md z-50 border shadow-md">
              <p> Không có sản phẩm bạn đang tìm</p>
            </div>
          )}
        </div>

        {!!!isLogin ? (
          <div className="flex items-center gap-6">
            <div className="hover:opacity-80 text-[18px]">
              <Link to="/shop/login">Login</Link>
            </div>
            <div className="hover:opacity-80 py-3 px-5 text-[18px] text-white bg-slate-500 rounded-full duration-500 cursor-pointer">
              <Link to="/shop/register">Register</Link>
            </div>
          </div>
        ) : (
          <></>
        )}

        {isLogin === 1 ? (
          <div className="flex items-center gap-8">
            <div className="relative cursor-pointer">
              <AiOutlineBell size={25} />
            </div>
            <div className="cursor-pointer">
              <Link to="/shop/cart">
                <Badge badgeContent={soluong} color="primary">
                  <FiShoppingCart size={25} />
                </Badge>
              </Link>
            </div>
            <div className="group relative cursor-pointer">
              <BiUserCircle size={28} />
              <div className="absolute z-10 w-[110px] -left-10 bg-slate-300 rounded-md hidden group-hover:block">
                <Link to="/shop/orders">
                  <p className=" hover:bg-slate-100 py-2 px-4 text-[16px] text-center rounded-t-md">Đơn hàng</p>
                </Link>
                {/* <Link to="/shop/reviews">
                  <p className="hover:bg-slate-100 py-2 px-4 text-[16px] text-center">Đánh giá</p>
                </Link> */}
                <p onClick={logoutUser} className="hover:bg-slate-100 py-2 px-4 text-[16px] text-center rounded-b-md">
                  Đăng xuất
                </p>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Header;
