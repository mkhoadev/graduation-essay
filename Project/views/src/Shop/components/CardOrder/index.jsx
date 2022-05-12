import React from "react";
import moment from "moment";
import {Link} from "react-router-dom";

function CardOrder({data}) {
  console.log(data);
  return (
    <div>
      {data?.map(({HDX, CTHDX}, idx) => (
        <Link key={idx} to={`/shop/order/${HDX.id_hdx}`}>
          <div className="mt-5 p-4 min-h-[230px] mx-auto bg-cyan-50 rounded-lg shadow-md">
            <div className="flex justify-between">
              <span className="block">{moment(HDX.ngay_lap_hdx).format("DD/MM/YYYY")}</span> <br />
              <span className="block font-medium px-6 py-1 bg-slate-100 rounded-2xl">{HDX.trang_thai}</span>
            </div>
            {CTHDX.map(({ten_sp, hinh_anh, so_luong_xuat, mau_sac, kich_thuoc}, idx) => (
              <div key={idx} className="relative flex justify-between gap-5 items-center mb-4 mt-4">
                <img className="block w-[75px] align-middle rounded-lg" src={hinh_anh} alt="" />
                <span className="w-[90%] text-[18px] font-medium">{ten_sp}</span>
                <span className="w-[20%]">Số lượng: {so_luong_xuat}</span>
                <div className="absolute flex gap-5 left-[12.5%] top-[75%] text-slate-500 text-[14px]">
                  <p>Màu sắc: {mau_sac}</p>
                  <p>Kích thước: {kich_thuoc}</p>
                </div>
              </div>
            ))}
            <span className="text-[18px] text-red-800 font-bold">
              {HDX.tong_tien_hdx.toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default CardOrder;
