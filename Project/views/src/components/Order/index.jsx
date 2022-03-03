import React from "react";
import imgOrder from "../../assets/img/Shoes/imgslide4.jpg";

function Order() {
  return (
    <div className=" relative flex gap-4 w-[40%] p-2 mx-auto bg-slate-300 rounded-lg">
      <div className="w-[30%]">
        <img className="rounded-lg" src={imgOrder} alt="" />
      </div>
      <div>
        <p className="mt-2">Đang xử lý</p>
        <p className="mt-2">12/12/2021</p>
        <p className="mt-2">
          Nike Air 1 x<span>2</span>
        </p>
        <p className="mt-2">4.500.000</p>

        <button className="absolute right-4 py-2 px-6 bg-slate-200 rounded-lg">Hủy</button>
      </div>
    </div>
  );
}

export default Order;
