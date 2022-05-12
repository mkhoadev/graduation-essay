import {useSnackbar} from "notistack";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import addressAPI from "../../../api/addressAPI";
import {AiFillCloseCircle} from "react-icons/ai";
import {unwrapResult} from "@reduxjs/toolkit";

import FormProfile from "../../../components/FormProfile";
import {address, removeOneAddress} from "../../../redux/addressSlice";
import CardAddress from "../../../components/CardAddress";

const defaultValues = {
  tenkh: "Dao Minh Khoa",
  sdtkh: "0398423952",
  dckh: "30/4, Hung Loi, Ninh Kieu, Can Tho",
};

function Profile() {
  const enqueueSnackbar = useSnackbar();
  const dispatch = useDispatch();

  const [listAddress, setListAddress] = useState([]);
  const [count, setCount] = useState(0);

  const id_kh = useSelector((state) => state.user?.current.datatUser[0]?.id_kh);

  const addressChecked = useSelector((state) => state.address?.addresslist);

  const {
    handleSubmit,
    formState: {errors},
    control,
  } = useForm({defaultValues});

  const {handleSubmit: handleSubmitAddress, control: controlAddress} = useForm({});

  useEffect(() => {
    (async () => {
      const data = await addressAPI.getAddress(id_kh);
      setListAddress(data);
    })();
  }, [count]);

  const dataAddress = (data) => {
    return {
      tenkh: data.tenkh,
      diachikh: data.dckh,
      sdtkh: data.sdtkh,
      idkh: id_kh,
    };
  };

  const setData = async (data) => {
    try {
      await addressAPI.createAddress(dataAddress(data));
      setCount((e) => e + 1);
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  const selectAddress = async (data) => {
    unwrapResult(dispatch(await address(data.sldiachi)));
  };

  const deleteAddress = async (id_dc) => {
    try {
      await addressAPI.deleteAddress(id_dc);
      if (addressChecked[0]?.id_dc === id_dc) {
        dispatch(removeOneAddress());
      }
      setCount((e) => e + 1);
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  return (
    <div className="flex gap-4 w-[70%] mx-auto">
      <div className="w-[40%]">
        <form onChange={handleSubmitAddress((data) => selectAddress(data))}>
          {listAddress?.map((data, idx) => (
            <div key={idx} className="relative">
              <AiFillCloseCircle
                onClick={() => deleteAddress(data.id_dc)}
                className="absolute right-2 top-2 cursor-pointer hover:bg-white rounded-full"
                size={25}
                style={{color: "#b71c1c"}}
              />
              {addressChecked?.length > 0 && addressChecked[0].id_dc === data.id_dc ? (
                <div>
                  <CardAddress data={data} checked={true} control={controlAddress} />
                </div>
              ) : (
                <div>
                  <CardAddress data={data} control={controlAddress} />
                </div>
              )}
            </div>
          ))}
        </form>
      </div>
      <div className="w-[60%]">
        <div className="w-full p-4 bg-slate-200 rounded-lg">
          <form onSubmit={handleSubmit((data) => setData(data))}>
            <FormProfile control={control} errors={errors} />
            <div>
              <button className="py-2 px-4 font-bold bg-green-600 text-white rounded-lg">Thêm</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
