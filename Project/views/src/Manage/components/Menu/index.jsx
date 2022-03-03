import React from "react";
import {AiFillBell} from "react-icons/ai";
import {BsFillChatLeftDotsFill} from "react-icons/bs";
import {FaUserCircle} from "react-icons/fa";

import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {logout} from "../../../redux/employeeSlice";

function Menu(props) {
  const isLogin = useSelector((state) => state.employee.current[0]);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const logoutEmployee = () => {
    dispatch(logout());
    navigate("/manage/login", {replace: true});
  };

  return (
    <div className="flex justify-between items-center w-full py-6 px-4 border-b">
      <div className="text-[25px] font-bold capitalize">{props.title}</div>
      <div className="flex gap-8 mr-6">
        {!!isLogin ? (
          <>
            <div className="p-2 border rounded-full">
              <AiFillBell size={20} />
            </div>
            <div className="p-2 border rounded-full">
              <BsFillChatLeftDotsFill size={20} />
            </div>
            <div className="group relative p-2 border rounded-full">
              <FaUserCircle size={20} />
              <div className="absolute z-10 -right-7 top-9 bg-slate-300 rounded-md hidden group-hover:block">
                {/* <Link to="/shop/profile">
                  <p className="hover:bg-slate-100 py-2 px-4 rounded-t-md ">
                    Profile
                  </p>
                </Link>
                <Link to="/shop/orders">
                  <p className="hover:bg-slate-100 py-2 px-4 ">Order</p>
                </Link> */}
                <p
                  onClick={logoutEmployee}
                  className="hover:bg-slate-100 py-2 px-4 rounded-md cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div>
              <Link to="/manage/login">
                <p><strong>Login</strong></p>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Menu;
