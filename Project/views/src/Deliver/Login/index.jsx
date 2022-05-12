import {unwrapResult} from "@reduxjs/toolkit";
import { sha256 } from "js-sha256";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {login} from "../../redux/employeeSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const id_cv = useSelector((state) => state.employee?.current[0]?.id_cv);

  useEffect(() => {
    if (id_cv === "CV04") {
      navigate("/deliver/dashbroad");
    } else {
      navigate("/deliver/login");
    }
  }, [id_cv]);

  const setData = () => {
    try {
      if (email && password) {
        unwrapResult(
          dispatch(
            login({
              email: email,
              password: sha256(password),
            }),
          ),
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="w-[65%] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <p className="mb-4 text-[24px] text-center font-bold">Đăng Nhập</p>
        <input
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 my-2 rounded-lg border"
          type="text"
          placeholder="Email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 my-2 rounded-lg border"
          type="password"
          placeholder="Mật khẩu"
        />
        <button
          onClick={() => setData()}
          className="block mx-auto mt-4 px-4 py-2 bg-sky-400 text-white rounded-lg shadow-lg"
        >
          Đăng nhập
        </button>
      </div>
    </div>
  );
}

export default Login;
