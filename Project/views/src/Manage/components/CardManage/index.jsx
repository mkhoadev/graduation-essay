import React from "react";

function CardManage() {
  return (
    <div>
      <div className="flex gap-8 justify-between w-[95%] mx-auto">
        <div className="flex-1 h-[140px] p-4 bg-slate-200 rounded-xl shadow-lg">
          Fund
        </div>
        <div className="flex-1 h-[140px] p-4 bg-slate-200 rounded-xl shadow-lg">
          Total Revenues
        </div>
        <div className="flex-1 h-[140px] p-4 bg-slate-200 rounded-xl shadow-lg">
          Profit
        </div>
        <div className="flex-1 h-[140px] p-4 bg-slate-200 rounded-xl shadow-lg">
          Products
        </div>
      </div>
      <div className="flex gap-8 w-[95%] mx-auto mt-8">
        <div className="w-[60%] h-[400px] bg-slate-200 rounded-xl shadow-lg"></div>
        <div className="w-[40%] h-[400px] bg-slate-200 rounded-xl shadow-lg"></div>
      </div>
    </div>
  );
}

export default CardManage;
