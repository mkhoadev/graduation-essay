import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {AiOutlineBell} from "react-icons/ai";
import {BiUserCircle} from "react-icons/bi";
import {FiShoppingCart} from "react-icons/fi";

import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../redux/userSlice";

function Header() {
  const isLogin = useSelector((state) => state.user.current.datatUser?.length);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = () => {
    dispatch(logout());
    navigate("/shop/products", {replace: true});
  };

  return (
    <div className="">
      <div className="flex justify-between items-center w-[80%] font-bold m-auto py-5">
        <div>
          <span className="text-[30px] bg-text-color bg-clip-text text-transparent">
            <Link to="/">SHOPSHOES</Link>
          </span>
        </div>
        <div className="flex gap-8">
          <div className="text-[18px] hover:opacity-80">
            <Link to="/shop">Home</Link>
          </div>
          <div className="text-[18px] hover:opacity-80">
            <Link to="/shop/products">Shop</Link>
          </div>
          <div className="text-[18px] hover:opacity-80">
            <Link to="/shop/sale">Sale</Link>
          </div>
          <div className="text-[18px] hover:opacity-80">
            <Link to="/shop/contact">Contact</Link>
          </div>
        </div>

        {!!!isLogin ? (
          <div className="flex items-center gap-8">
            <div className="hover:opacity-80">
              <Link to="/shop/login">Login</Link>
            </div>
            <div className="hover:opacity-80 p-2 text-white bg-slate-500 rounded-[15px] duration-500">
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
                <FiShoppingCart size={25} />
              </Link>
            </div>
            <div className="group relative cursor-pointer">
              <BiUserCircle size={28} />
              <div className="absolute z-10 -left-7 bg-slate-300 rounded-md hidden group-hover:block">
                <Link to="/shop/profile">
                  <p className="hover:bg-slate-100 py-2 px-4 rounded-t-md ">
                    Profile
                  </p>
                </Link>
                <Link to="/shop/orders">
                  <p className="hover:bg-slate-100 py-2 px-4 ">Order</p>
                </Link>
                <p
                  onClick={logoutUser}
                  className="hover:bg-slate-100 py-2 px-4 rounded-b-md "
                >
                  Logout
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
