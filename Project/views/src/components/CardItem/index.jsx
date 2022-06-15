import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import imageAPI from "../../api/imageAPI";
import {useSnackbar} from "notistack";

function CardItem({data}) {
  const [urlImage, setUrlImage] = useState([]);

  const {enqueueSnackbar} = useSnackbar();

  const navigate = useNavigate();

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

  const SelectProduct = () => {
    navigate(`/shop/product/SP=${data.id_sp}`);
    const a = document.querySelector(".boxSearch");
    a.style = "display: none";
  };

  return (
    <>
      <div onClick={() => SelectProduct()} className="flex my-3 border rounded-lg bg-slate-100 cursor-pointer">
        <div>
          <img
            className="rounded-lg w-[100px]"
            src={urlImage[0]?.hinh_anh_sp.slice(12, urlImage[0]?.hinh_anh_sp.length)}
            alt="san pham"
          />
        </div>
        <div className="mt-2 h-[60px]">
          <p className="text-[16px] px-1 font-medium text-center">{data.ten_sp}</p>
          {!!data?.gia_km ? (
            <>
              <p className="text-red-600  text-[18px] ml-2 font-bold">
                {new Intl.NumberFormat("vi-VN", {style: "currency", currency: "VND"}).format(
                  data?.gia_ban_sp - (data?.gia_ban_sp * data?.gia_km) / 100,
                )}
              </p>
              <div className="h-[25px] mb-2">
                <p className="text-slate-700 ml-2 line-through">
                  {new Intl.NumberFormat("vi-VN", {style: "currency", currency: "VND"}).format(data?.gia_ban_sp)}
                </p>
              </div>
            </>
          ) : (
            <>
              <p className="text-red-600 mb-2 text-[18px] ml-2 font-bold">
                {new Intl.NumberFormat("vi-VN", {style: "currency", currency: "VND"}).format(data.gia_ban_sp)}
              </p>
              <div className="h-[25px]"></div>
            </>
          )}
        </div>
      </div>
      <div></div>
    </>
  );
}

export default CardItem;
