import React from "react";
import {AiOutlineSearch} from "react-icons/ai";
import {BsFillMicFill} from "react-icons/bs";

function Filter() {
  return (
    <div className="flex gap-10 items-center w-[75%] mx-auto py-3">
      <div className="flex-1">
        <select className="w-4/5 py-[6px] px-4 bg-gray-200 outline-none rounded-lg shadow-md">
          <option value="">Slow</option>
          <option value="">High</option>
          <option value="">...</option>
        </select>
      </div>
      <div className="flex-1">
        <select className="w-4/5 py-[6px] px-4 bg-gray-200 outline-none rounded-lg shadow-md">
          <option value="">Nike</option>
          <option value="">Addidas</option>
          <option value="">Balenciaga</option>
        </select>
      </div>
      <div className="flex-1">
        <select className="w-4/5 py-[6px] px-4 bg-gray-200 outline-none rounded-lg shadow-md">
          <option value="">Nike</option>
          <option value="">Addidas</option>
          <option value="">Balenciaga</option>
        </select>
      </div>
      <div className="relative flex flex-1">
        <input
          className="w-full py-1 pl-4 pr-6 bg-gray-200 outline-none rounded-l-lg shadow-md"
          type="text"
        />
        <BsFillMicFill className="absolute right-14 top-2/4 -translate-y-2/4" size={20} />
        <button className="py-2 px-4 bg-green-600 outline-none rounded-r-lg shadow-md">
          <AiOutlineSearch size={20} color="#fff" />
        </button>
      </div>
    </div>
  );
}

export default Filter;
