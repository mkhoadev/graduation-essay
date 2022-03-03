import React from "react";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import moment from "moment";
import sha256 from "js-sha256";
import FormRegister from "../../components/FormRegister";
import userAPI from "../../../api/userAPI";

const defaultValues = {
  email: "",
  password: "",
  confirmpassword: "",
};

function Register() {
  const {
    handleSubmit,
    formState: {errors},
    control,
    watch,
  } = useForm({defaultValues});

  const dataUser = (data) => {
    return {
      email: data.email,
      password: sha256(data.password),
      ngaytaotk: moment().format("YYYY-MM-DD"),
    };
  };

  const setData = async (data) => {
    try {
      const email = await userAPI.checkUser(data.email);
      if (email?.length === 0) {
        await userAPI.register(dataUser(data)).then((res) => {
          console.log("Success: "+ JSON.stringify(res));
        });
      } else {
        console.log("Account already exists");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="absolute top-[55%] left-2/4 -translate-x-2/4 -translate-y-2/4 w-[400px] px-10 py-6 bg-[#F1F5F9] rounded-xl shadow-lg">
      <p className="text-[35px] font-bold text-center">REGISTER</p>
      <form onSubmit={handleSubmit((data) => setData(data))}>
        <FormRegister control={control} error={errors} watch={watch} />

        <button className="w-full text-white font-bold mt-10 py-2 bg-lime-600 rounded-xl">
          Register
        </button>
        <p className="text-center mt-4">
          Already have an account ?
          <Link className="text-sky-500" to="/shop/login">
            Signin
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
