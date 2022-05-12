import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import sha256 from "js-sha256";
import FormLogin from "../../../Manage/components/FormLogin";
import {unwrapResult} from "@reduxjs/toolkit";

import {useDispatch, useSelector} from "react-redux";
import {login} from "../../../redux/employeeSlice";
import {useNavigate} from "react-router-dom";

const defaultValues = {
  email: "",
  password: "",
};

function LoginManage() {
  const {
    handleSubmit,
    formState: {errors},
    control,
  } = useForm({defaultValues});

  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.employee?.current[0]);

  let navigate = useNavigate();
  useEffect(() => {
    const routeLogin = () => {
      if (isLogin) {
        navigate("/manage/dashboard", {replace: true});
      }
    };
    routeLogin(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);

  // const dataUser = (data) => {
  //   return {
  //     email: data.email,
  //     password: data.password,
  //   };
  // };
  const dataUser = (data) => {
    return {
      email: data.email,
      password: sha256(data.password),
    };
  };

  const setData = async (data) => {
    try {
      unwrapResult(dispatch(await login(dataUser(data))));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-[83vh]">
      <div className="mx-auto translate-y-[30%] w-[400px] p-10 bg-[#F1F5F9] rounded-xl shadow-lg">
        <p className="text-[35px] font-bold text-center">Login Manage</p>
        <form onSubmit={handleSubmit((data) => setData(data))}>
          <FormLogin control={control} errors={errors} />

          <button className="w-full opacity-80 text-white font-bold mt-8 py-2 bg-lime-600 rounded-xl hover:opacity-100 duration-300">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginManage;
