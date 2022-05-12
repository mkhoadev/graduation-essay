import React from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {logout} from "../../redux/employeeSlice";

function StaffDeliver() {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const logoutEmployee = () => {
    dispatch(logout());
    navigate("/deliver/login", {replace: true});
  };

  return (
    <div>
      <button
        onClick={logoutEmployee}
        className="block mx-auto mt-5 text-white font-bold bg-slate-400 rounded-lg px-4 py-2"
      >
        Đăng xuất
      </button>
    </div>
  );
}

export default StaffDeliver;
