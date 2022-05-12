import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import sha256 from "js-sha256";
import {useSnackbar} from "notistack";

import {useDispatch} from "react-redux";
import verifyEmailAPI from "../../../api/verifyEmailAPI";
import userAPI from "../../../api/userAPI";

const defaultValues = {
  email: "",
  password: "",
  confirmpassword: "",
  capcha: "",
};

function ForgotPass() {
  const {
    register,
    handleSubmit,
    formState: {errors},
    control,
  } = useForm({defaultValues});

  const [dataEmail, setDataEmail] = useState("");
  const [code, setCode] = useState("");

  let navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();

  const setData = async (data) => {
    try {
      if (data.capcha === code.code) {
        await userAPI.changePass(dataEmail, {
          password: sha256(data.password),
        });
        enqueueSnackbar("Đổi mật khẩu thành công", {
          variant: "success",
          autoHideDuration: 2000,
        });
        navigate("/shop/login ");
      } else {
        enqueueSnackbar("Mã xác thực không hợp lệ", {
          variant: "success",
          autoHideDuration: 2000,
        });
      }
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  const sendEmail = async () => {
    const checkEmail = await userAPI.checkUser(dataEmail);
    if (checkEmail.length > 0) {
      if (dataEmail) {
        const verify = await verifyEmailAPI.verify(dataEmail);
        setCode(verify);
      }
      enqueueSnackbar("Đã gửi mã xác nhận đến email của bạn", {
        variant: "success",
        autoHideDuration: 2000,
      });
    } else {
      enqueueSnackbar("Email chưa đăng ký tài khoản", {
        variant: "success",
        autoHideDuration: 2000,
      });
    }
  };

  const email = (e) => {
    setDataEmail(e);
  };

  return (
    <div>
      <div className="absolute top-[55%] left-2/4 -translate-x-2/4 -translate-y-2/4 w-[400px] p-10 bg-[#F1F5F9] rounded-xl shadow-lg">
        <p className="text-[25px] font-bold text-center">Forgot Password</p>
        <input
          onChange={(e) => email(e.target.value)}
          placeholder="Email"
          className="w-full mt-6 py-1 outline-none bg-[#F1F5F9] border-b-2 border-b-[#8A99AD]"
          type="email"
        />
        <p
          id="countdown"
          onClick={() => sendEmail()}
          className="absolute right-10 top-[108px] text-blue-800 cursor-pointer"
        >
          Send
        </p>
        <form onSubmit={handleSubmit((data) => setData(data))}>
          <input
            name="password"
            {...register("password")}
            placeholder="Password"
            className="w-full mt-6 py-1 outline-none bg-[#F1F5F9] border-b-2 border-b-[#8A99AD]"
            type="text"
          />

          <input
            name="confirmpassword"
            {...register("confirmpassword")}
            placeholder="Confirm Password"
            className="w-full mt-6 py-1 outline-none bg-[#F1F5F9] border-b-2 border-b-[#8A99AD]"
            type="text"
          />

          <input
            name="capcha"
            {...register("capcha")}
            placeholder="Capcha"
            className="w-[40%] mt-6 py-2 outline-none bg-[#F1F5F9] border-b-2 border-b-[#8A99AD]"
            type="text"
          />

          <button className="w-full opacity-80 text-white font-bold mt-8 py-2 bg-lime-600 rounded-xl hover:opacity-100 duration-300">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPass;
