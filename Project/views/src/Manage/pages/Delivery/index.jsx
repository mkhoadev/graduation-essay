import React, {useEffect, useState} from "react";
import deliverAPI from "../../../api/deliverAPI";

function Delivery() {
  const [invoice, setInvoice] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await deliverAPI.getAllInvoice();
      console.log(res);
      setInvoice(res);
    })();
  }, []);

  return (
    <div className="flex gap-5 px-4">
      {/* {invoice?.map(({ten_kh, tong_tien_hdx, id_hdx, trang_thai}, idx) => (
        <div key={idx} className="p-4 mt-5 w-[300px] bg-slate-100 rounded-md shadow-md">
          <p>Mã đơn hàng: {id_hdx}</p>
          <p>Tên khách hàng: {ten_kh}</p>
          <p>
            Tổng tiền hóa đơn:{" "}
            <span className="text-red-600 font-bold">
              {tong_tien_hdx.toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          </p>
          {trang_thai === "Đã giao hàng" ? (
            <p className="text-green-500 font-bold">{trang_thai}</p>
          ) : (
            <p className="text-orange-500 font-bold">{trang_thai}</p>
          )}
        </div>
      ))} */}
    </div>
  );
}

export default Delivery;
