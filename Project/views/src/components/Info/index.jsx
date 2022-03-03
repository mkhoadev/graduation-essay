import React from "react";
import img1 from "../../assets/img/img2.png";
import {AiFillStar} from "react-icons/ai";
import imgslide1 from "../../assets/img/Shoes/imgslide4.jpg";
import imgslide2 from "../../assets/img/Shoes/imgslide5.jpg";
import imgslide3 from "../../assets/img/Shoes/imgslide6.jpg";

function Info() {
  return (
    <div className="flex w-[80%] h-[450px] mx-auto bg-slate-300 rounded-3xl shadow-lg">
      <div className="flex-1 pl-10">
        <p className="text-[30px] font-bold mt-14">
          Nike Air Max 270 to Chuck Taylors
        </p>
        <p className="mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
        <div className="flex gap-5 mt-20">
          <div className="w-[100px] h-[100px] bg-slate-600 object-cover overflow-hidden rounded-3xl shadow-lg">
            <img src={imgslide1} alt="" />
          </div>
          <div className="w-[100px] h-[100px] bg-slate-600 object-cover overflow-hidden rounded-3xl shadow-lg">
            <img src={imgslide2} alt="" />
          </div>
          <div className="w-[100px] h-[100px] bg-slate-600 object-cover overflow-hidden rounded-3xl shadow-lg">
            <img src={imgslide3} alt="" />
          </div>
        </div>
      </div>

      <div className="group relative flex-1">
        <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 w-[400px] h-[400px] bg-white rounded-full shadow-lg"></div>
        <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 w-[350px] h-[350px] bg-slate-400 rounded-full"></div>
        <div>
          <img
            className="absolute w-[80%] top-12 left-2/4 -translate-x-2/4 group-hover:rotate-[-20deg] group-hover:translate-y-[-70px] duration-300"
            src={img1}
            alt=""
          />
          <p className="absolute top-[68%] left-2/4 -translate-x-[50%] text-[24px] text-red-600 font-bold group-hover:text-[30px] group-hover:translate-y-[-50px] duration-300">
            4.500.000
          </p>
        </div>
      </div>

      <div className="flex-1">
        <div className="mt-14 pl-10 text-lg">
          <div className="flex items-center">
            <p className="font-bold">Review:</p>
            <AiFillStar size={24} className="ml-2 text-amber-400" />
            <AiFillStar size={24} className="ml-2 text-amber-400" />
            <AiFillStar size={24} className="ml-2 text-amber-400" />
            <AiFillStar size={24} className="ml-2 text-amber-400" />
            <AiFillStar size={24} className="ml-2 text-amber-400" />
            <p>4.5(60)</p>
          </div>
          <div className="flex items-center mt-10">
            <p className="font-bold">Color</p>
            <div className="w-6 h-6 ml-4 bg-white rounded-full"></div>
            <div className="w-6 h-6 ml-4 bg-white rounded-full"></div>
            <div className="w-6 h-6 ml-4 bg-white rounded-full"></div>
            <div className="w-6 h-6 ml-4 bg-white rounded-full"></div>
          </div>
          <div className="flex gap-4 mt-10">
            <p className="font-bold">Size</p>
            <div className="flex flex-wrap gap-4">
              <div className="py-1 px-4 bg-slate-400 rounded-xl cursor-pointer shadow-lg">37</div>
              <div className="py-1 px-4 bg-slate-400 rounded-xl cursor-pointer shadow-lg">38</div>
              <div className="py-1 px-4 bg-slate-400 rounded-xl cursor-pointer shadow-lg">39</div>
              <div className="py-1 px-4 bg-slate-400 rounded-xl cursor-pointer shadow-lg">40</div>
              <div className="py-1 px-4 bg-slate-400 rounded-xl cursor-pointer shadow-lg">41</div>
              <div className="py-1 px-4 bg-slate-400 rounded-xl cursor-pointer shadow-lg">42</div>
            </div>
          </div>
          <button className="mt-14 px-6 py-3 text-yellow-500 font-semibold bg-black rounded-2xl hover:opacity-80 duration-300 shadow-lg">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Info;
