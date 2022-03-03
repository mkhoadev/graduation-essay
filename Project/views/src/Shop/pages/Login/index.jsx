import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import sha256 from "js-sha256";
import FormLogin from "../../components/FormLogin";
import {unwrapResult} from "@reduxjs/toolkit";

import {useDispatch} from "react-redux";
import {login} from "../../../redux/userSlice";

const defaultValues = {
  email: "",
  password: "",
};

function Login() {
  const {
    handleSubmit,
    formState: {errors},
    control,
  } = useForm({defaultValues});

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const dataUser = (data) => {
    return {
      email: data.email,
      password: sha256(data.password),
    };
  };

  const setData = async (data) => {
    try {
      unwrapResult(dispatch(await login(dataUser(data))));
      navigate("/shop/products", {replace: true});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="absolute top-[55%] left-2/4 -translate-x-2/4 -translate-y-2/4 w-[400px] p-10 bg-[#F1F5F9] rounded-xl shadow-lg">
        <p className="text-[35px] font-bold text-center">LOGIN</p>
        <form onSubmit={handleSubmit((data) => setData(data))}>
          <FormLogin control={control} errors={errors} />

          <Link to="/">
            <p className="mt-6 text-[14px] text-cyan-500 text-right">
              Forgot password ?
            </p>
          </Link>
          <button className="w-full opacity-80 text-white font-bold mt-8 py-2 bg-lime-600 rounded-xl hover:opacity-100 duration-300">
            Login
          </button>
          <p className="text-center mt-4">
            Not a member ?
            <Link className="text-sky-500" to="/shop/register">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
