import {useSnackbar} from "notistack";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import moment from "moment";

import detailExportInvoiceAPI from "../../../api/detailExportInvoiceAPI";
import exportInvoiceAPI from "../../../api/exportInvoiceAPI";
import reviewsAPI from "../../../api/reviewsAPI";

function Reviews() {
  const id_kh = useSelector((state) => state.user.current.datatUser[0]?.id_kh);

  const {enqueueSnackbar} = useSnackbar();

  const [listOrder, setListOrder] = useState([]);
  const [dataReview, setDataReview] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const dataOrder = await exportInvoiceAPI.getListExportInvoice(id_kh);

        for (let i = 0; i < dataOrder.length; i++) {
          const data = await detailExportInvoiceAPI.getDetailExportInvoice(dataOrder[i].id_hdx);
          const data2 = await reviewsAPI.getReview(dataOrder[i].id_hdx);
          if (data2) {
            setListOrder((test) => [...test, {HDX: dataOrder[i], CTHDX: data, Review: data2}]);
          } else {
            setListOrder((test) => [...test, {HDX: dataOrder[i], CTHDX: data, Review: []}]);
          }
        }
      } catch (error) {
        enqueueSnackbar(error.message, {
          variant: "error",
          autoHideDuration: 2000,
        });
      }
    })();
  }, []);

  return (
    <div>
      {listOrder?.map(({HDX, CTHDX, Review}, idx) => (
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
              {Review.length === 0 ? (
                <>
                  <div className="mt-2">
                    <Link to={`/shop/review/${HDX.id_hdx}`}>
                      <button className="mt-4 px-4 py-2 text-white font-bold bg-sky-600 rounded-lg shadow-md">
                        Review
                      </button>
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div className="mt-2">
                    <button className="mt-4 px-4 py-2 text-white font-bold bg-sky-600 rounded-lg shadow-md cursor-not-allowed opacity-50">
                      Review
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
      ))}
    </div>
  );
}

export default Reviews;
