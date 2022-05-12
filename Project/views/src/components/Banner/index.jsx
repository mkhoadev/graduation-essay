import React from "react";
import "./style.css";
import img0 from "../../assets/img/img0.png";
import img1 from "../../assets/img/img1.png";
import img2 from "../../assets/img/img2.png";
import img3 from "../../assets/img/img3.png";

import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

function Banner() {
  const responsive = {
    0: {items: 1},
    568: {items: 2},
    1024: {items: 3},
  };
  const items = [
    <div className="item flex justify-center items-center w-[120px] h-[120px] bg-[#FDC313] rounded-xl" data-value="1">
      <img className="block w-[90%] rotate-[-20deg]" src={img1} alt="hinh anh" />
    </div>,
    <div className="item flex justify-center items-center w-[120px] h-[120px] bg-[#FDC313] rounded-xl" data-value="2">
      <img className="block w-[90%] rotate-[-20deg]" src={img2} alt="hinh anh" />
    </div>,
    <div className="item flex justify-center items-center w-[120px] h-[120px] bg-[#FDC313] rounded-xl" data-value="3">
      <img className="block w-[90%] rotate-[-20deg]" src={img3} alt="hinh anh" />
    </div>,
    <div className="item flex justify-center items-center w-[120px] h-[120px] bg-[#FDC313] rounded-xl" data-value="4">
      <img className="block w-[90%] rotate-[-20deg]" src={img1} alt="hinh anh" />
    </div>,
  ];

  return (
    <div className="w-[80%] h-[550px] mx-auto mt-6 bg-[#FFEBC2] rounded-[25px] shadow-lg">
      <div className="flex flex-1 h-[550px] p-10 text-[#48419C]">
        <div>
          <p className="text-[50px] font-bold">Bring power to your steps.</p>
          <p className="block w-[400px] text-[15px]">
            Over 6 years of development, SHOPSHOES always brings the best quality shoes with the most reasonable prices
            to consumers with the No. 1 store system in Can Tho and online sales throughout Vietnam.
          </p>
          <div className="w-[500px] flex justify-between mt-[80px]">
            <AliceCarousel
              mouseTracking
              items={items}
              responsive={responsive}
              controlsStrategy="alternate"
              autoPlay
              infinite
              autoPlayInterval={2000}
              disableButtonsControls={true}
              disableDotsControls={true}
            />
          </div>
        </div>
        <div className="relative flex justify-center items-center">
          <img className=" animation_spin block w-[75%] rotate-[-20deg] z-10" src={img0} alt="hinh anh" />
          <div className="absolute w-[450px] h-[450px] bg-[#ffe2a8] rounded-[50%] z-0 shadow-xl"></div>
          <div className="absolute w-[400px] h-[400px] bg-[#FFEBC2] rounded-[50%] z-0"></div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
