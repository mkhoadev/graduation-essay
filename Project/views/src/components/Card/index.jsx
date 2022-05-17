import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import imageAPI from "../../api/imageAPI";
import {useSnackbar} from "notistack";

function Card({data}) {
  const [urlImage, setUrlImage] = useState([]);

  const {enqueueSnackbar} = useSnackbar();

  useEffect(() => {
    (async () => {
      try {
        const resUrlImage = await imageAPI.getImage(data.id_sp);
        setUrlImage(resUrlImage);
      } catch (error) {
        enqueueSnackbar(error.message, {
          variant: "error",
          autoHideDuration: 2000,
        });
      }
    })();
  }, [data]);

  return (
    <>
      <div className="relative w-full pb-4 mx-auto bg-[#F4F1EA] rounded-lg shadow-md">
        <NavLink to={`/shop/product/SP=${data.id_sp}`}>
          <div>
            {!!data?.gia_km ? (
              <div className="absolute right-0 py-1 px-2 text-white font-bold bg-orange-500 rounded-tr-md rounded-bl-md">
                <span>Giảm {data?.gia_km} %</span>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div>
            <img
              className="rounded-t-lg"
              src={urlImage[0]?.hinh_anh_sp.slice(12, urlImage[0]?.hinh_anh_sp.length)}
              alt="san pham"
            />
          </div>
          <div className="mt-2 h-[60px]">
            <p className="text-[16px] px-1 font-medium text-center">{data.ten_sp}</p>
          </div>
          <div>
            {!!data?.gia_km ? (
              <>
                <p className="text-red-600  text-[18px] text-center font-bold">
                  {new Intl.NumberFormat("vi-VN", {style: "currency", currency: "VND"}).format(
                    data?.gia_ban_sp - (data?.gia_ban_sp * data?.gia_km) / 100,
                  )}
                </p>
                <div className="h-[25px] mb-2">
                  <p className="text-slate-700 text-center line-through">
                    {new Intl.NumberFormat("vi-VN", {style: "currency", currency: "VND"}).format(data?.gia_ban_sp)}
                  </p>
                </div>
              </>
            ) : (
              <>
                <p className="text-red-600 mb-2 text-[18px] text-center font-bold">
                  {new Intl.NumberFormat("vi-VN", {style: "currency", currency: "VND"}).format(data.gia_ban_sp)}
                </p>
                <div className="h-[25px]"></div>
              </>
            )}
          </div>
        </NavLink>
        {/* <div>
          <button className="block w-[80%] mx-auto py-2 bg-emerald-500 rounded-3xl" onClick={() => addCart(data.id_sp)}>
            <FaCartPlus className="block mx-auto" color="#fff" size={30} />
          </button>
        </div> */}
      </div>
    </>
  );
}

export default Card;
