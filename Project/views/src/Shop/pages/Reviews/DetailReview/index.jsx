import {useSnackbar} from "notistack";
import React, {useEffect, useState} from "react";
import moment from "moment";

import {Rating} from "@mui/material";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";

import exportInvoiceAPI from "../../../../api/exportInvoiceAPI";
import detailExportInvoiceAPI from "../../../../api/detailExportInvoiceAPI";
import reviewAPI from "../../../../api/reviewsAPI";

function DetailReviews() {
  const {register, handleSubmit} = useForm();

  const [listOrder, setListOrder] = useState([]);
  const [star, setStar] = useState(0);

  const params = useParams();
  const id_hdx = params.idhdx;
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();

  useEffect(() => {
    (async () => {
      try {
        const dataOrder = await exportInvoiceAPI.getExportInvoice(id_hdx);

        for (let i = 0; i < dataOrder.length; i++) {
          const data = await detailExportInvoiceAPI.getDetailExportInvoice(dataOrder[i].id_hdx);

          setListOrder((test) => [...test, {HDX: dataOrder[i], CTHDX: data}]);
        }
      } catch (error) {
        enqueueSnackbar(error.message, {
          variant: "error",
          autoHideDuration: 2000,
        });
      }
    })();
  }, []);

  const setData = async (data) => {
    if (data.review && star) {
      await reviewAPI.createreview({
        sosao: star,
        noidung: data.review,
        idhdx: id_hdx,
      });
      navigate("/shop/reviews", {replace: true});
    } else {
      enqueueSnackbar("Vui lòng điền đầy đủ thông tin", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  return (
    <div>
      {listOrder?.map(({HDX, CTHDX}, idx) => (
        <div key={idx}>
          {HDX.trang_thai === "Đã thanh toán" ? (
            <div className="mt-5 p-4 w-[45%] min-h-[230px] mx-auto bg-cyan-50 rounded-lg shadow-md">
              <div>
                <span>{moment(HDX.ngay_lap_hdx).format("DD/MM/YYYY")}</span> <br />
                <span className="font-bold">{HDX.trang_thai}</span>
              </div>
              {CTHDX.map(({ten_sp, hinh_anh, so_luong_xuat}, idx) => (
                <div key={idx} className="flex gap-5 items-center mb-4 mt-4">
                  <img className="block w-[75px] align-middle rounded-lg" src={hinh_anh} alt="" />
                  <span className="text-[20px] font-bold">{ten_sp}</span>
                  <span>x{so_luong_xuat}</span>
                </div>
              ))}
              <span className="text-[20px] text-red-800 font-bold">
                {HDX.tong_tien_hdx.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
              <div className="mt-2">
                <Rating
                  name="simple-controlled"
                  size="large"
                  onChange={(event, newValue) => {
                    setStar(newValue);
                  }}
                />
              </div>
              <div className="mt-2">
                <form onSubmit={handleSubmit((data) => setData(data))}>
                  <textarea
                    name="review"
                    {...register("review")}
                    className="w-full h-[100px] p-4 border-2 rounded-lg"
                    type="text"
                  />
                  <button className="mt-4 px-4 py-2 text-white font-bold bg-sky-600 rounded-lg shadow-md">Gửi</button>
                </form>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      ))}
    </div>
  );
}

export default DetailReviews;
