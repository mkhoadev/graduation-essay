import React from "react";
import {BsInstagram, BsFacebook} from "react-icons/bs";
import {FaTiktok} from "react-icons/fa";

function Footer() {
  return (
    <div className="w-[80%] mt-20 mb-6 mx-auto p-6 text-white bg-black rounded-lg opacity-90">
      <div className="flex gap-6 leading-8">
        <div className="w-[30%]">
          <span className="text-[30px] font-[900] bg-text-color bg-clip-text text-transparent">SHOPSHOES</span>
          <div className="mt-6">
            <p>Copyright © 2021. Built by Minh Khoa <br /> B1809248 - Can Tho University <br /> All rights reserved.</p>
          </div>
        </div>
        <div className="w-[25%] text-center">
          <p className="text-[25px] font-bold">Store</p>
          <div className="mt-6">
            <p>Portfolio</p>
            <p>About</p>
            <p>Contact</p>
            <p>Our Team</p>
          </div>
        </div>
        <div className="w-[25%]">
          <p className="text-[25px] font-bold">Service</p>
          <div className="mt-6">
            <p>Introduce ShopShoes</p>
            <p>Ordering guide</p>
            <p>Return policy and warranty</p>
            <p>Privacy Policy</p>
          </div>
        </div>
        <div className="w-[20%]">
          <p className="text-[25px] font-bold">Social media</p>
          <div className="mt-6">
            <div className="mt-4 flex gap-4 items-center">
              <BsInstagram size={25} /> <p>@khoa_khoa</p>
            </div>
            <div className="mt-4 flex gap-4 items-center">
              <BsFacebook size={25} /> <p>MKhoa.dev</p>
            </div>
            <div className="mt-4 flex gap-4 items-center">
              <FaTiktok size={25} /> <p>Khoa.dev</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
