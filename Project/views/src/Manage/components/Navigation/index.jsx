import React, {useState} from "react";
import {MdOutlineSpaceDashboard} from "react-icons/md";
import {BsBoxSeam, BsPeople} from "react-icons/bs";
import {RiBillLine} from "react-icons/ri";
import { GrDeliver } from "react-icons/gr";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

function Navigation() {
  const [openMenu, setOpenMenu] = useState(false);

  const handleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const isLogin = useSelector((state) => state.employee?.current[0]);

  return (
    <div className="h-[100vh] bg-slate-200">
      <div className="py-6">
        <p className="text-[30px] text-center font-bold bg-text-color bg-clip-text text-transparent">
          ShopShoes
        </p>
      </div>
      {isLogin ? (
        <div className="grid grid-cols-1 mt-6">
          <Link to="/manage/dashboard">
            <div className="flex gap-2 items-center px-6 py-3 border-l-4 hover:bg-white hover:border-[#000] cursor-pointer duration-300">
              <MdOutlineSpaceDashboard size={20} />
              <p>Dashboard</p>
            </div>
          </Link>
          {/* <Link to="/manage/product"> */}
          <div>
            <div
              onClick={handleMenu}
              className="flex gap-2 items-center px-6 py-3 border-l-4 hover:bg-white hover:border-[#000] cursor-pointer duration-300"
            >
              <BsBoxSeam size={20} />
              <p>Products</p>
            </div>
            {openMenu ? (
              <div className="pl-14 text-[14px]">
                <Link to="/manage/product/add">
                  <p className="hover:pl-4 hover:font-semibold p-2 duration-200">
                    Add Product
                  </p>
                </Link>
                <Link to="/manage/product/listproducts">
                  <p className="hover:pl-4 hover:font-semibold p-2 duration-200">
                    List Product
                  </p>
                </Link>
                <Link to="/manage">
                  <p className="hover:pl-4 hover:font-semibold p-2 duration-200">
                    Comming soon
                  </p>
                </Link>
              </div>
            ) : (
              <></>
            )}
          </div>
          {/* </Link> */}

          {/* <Link to="/manage/bill"> */}
          <div>
            <div className="flex gap-2 items-center px-6 py-3 border-l-4 hover:bg-white hover:border-[#000] cursor-pointer duration-300">
              <RiBillLine size={20} />
              <p>Bill</p>
            </div>
          </div>
          {/* </Link> */}

          <Link to="/manage/delivery">
            <div className="flex gap-2 items-center px-6 py-3 border-l-4 hover:bg-white hover:border-[#000] cursor-pointer duration-300">
              <GrDeliver size={20} />
              <p>Delivery</p>
            </div>
          </Link>

          <div>
            <div className="flex gap-2 items-center px-6 py-3 border-l-4 hover:bg-white hover:border-[#000] cursor-pointer duration-300">
              <BsPeople size={20} />
              <p>Staff</p>
            </div>
          </div>

        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Navigation;
