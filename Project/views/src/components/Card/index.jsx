import React from "react";
import img from "../../assets/img/img2.png";
import {AiOutlineHeart} from "react-icons/ai";
import {BsCartPlus} from "react-icons/bs";

function Card() {
  return (
    <div className="relative w-[250px] h-[300px] p-2 mx-auto bg-item-product rounded-2xl shadow-md">
      <div className="flex justify-between px-3 pt-2">
        <div className="p-1 rounded-full border border-[#fff] cursor-pointer">
          <AiOutlineHeart size={20} />
        </div>
        <div className="p-1 rounded-full border border-[#fff] cursor-pointer">
          <BsCartPlus size={20} />
        </div>
      </div>
      <div>
        <img className="absolute top-4 w-[80%] rotate-[-20deg]" src={img} alt="" />
      </div>
      <div className="absolute top-[70%] w-full text-center">
        <h2 className="text-[20px] font-bold">Nike Zoom KD 12</h2>
        <p className="text-red-600 font-bold">4.500.000</p>
      </div>
    </div>
  );
}

export default Card;
