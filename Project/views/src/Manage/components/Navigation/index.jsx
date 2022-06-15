import React, {useEffect, useState} from "react";
import {AiOutlineBarChart, AiOutlineAppstoreAdd} from "react-icons/ai";
import {BsBoxSeam, BsPeople} from "react-icons/bs";
import {TiThMenuOutline} from "react-icons/ti";
import { RiBillLine } from "react-icons/ri";
import {MdOutlineReviews} from "react-icons/md"
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import exportInvoiceAPI from "../../../api/exportInvoiceAPI";

function Navigation() {
  const [openMenuProduct, setOpenMenuProduct] = useState(false);
  const [number, setNumber] = useState([]);
  const [openCategory, setOpenCategory] = useState(false);

  const handleMenuProduct = () => {
    setOpenMenuProduct(!openMenuProduct);
  };

  const handleCategory = () => {
    setOpenCategory(!openCategory);
  };

  const isLogin = useSelector((state) => state.employee?.current[0]?.email_nv);

  const role = useSelector((state) => state.employee?.current[0]?.id_cv);

  useEffect(() => {
    (async () => {
      const waitOrder = await exportInvoiceAPI.numberWait();
      setNumber(waitOrder);
    })();
  }, []);

  return (
    <div className="h-[100vh] bg-slate-200">
      <div className="py-6">
        <p className="text-[30px] text-center font-bold bg-text-color bg-clip-text text-transparent">ShopShoes</p>
      </div>
      {isLogin ? (
        <div className="grid grid-cols-1 mt-6">
          {role === "CV01" && (
            <Link to="/manage/dashboard">
              <div className="flex gap-2 items-center px-6 py-3 border-l-4 hover:bg-white hover:border-[#000] cursor-pointer duration-300">
                <AiOutlineBarChart size={30} />
                <p className="text-[16px]">Thống kê</p>
              </div>
            </Link>
          )}

          {(role === "CV01" || role === "CV03") && (
            <>
              <div>
                <div
                  onClick={handleMenuProduct}
                  className="flex gap-2 items-center px-6 py-3 border-l-4 hover:bg-white hover:border-[#000] cursor-pointer duration-300"
                >
                  <BsBoxSeam size={30} />
                  <p className="text-[16px]">Sản phẩm</p>
                </div>
                {openMenuProduct ? (
                  <div className="pl-14 text-[14px]">
                    <Link to="/manage/product/add">
                      <p className="hover:pl-4 hover:font-semibold p-2 text-[16px] duration-200">Thêm sản phẩm</p>
                    </Link>
                    <Link to="/manage/product/listproducts">
                      <p className="hover:pl-4 hover:font-semibold p-2 text-[16px] duration-200">Danh sách sản phẩm</p>
                    </Link>
                  </div>
                ) : (
                  <></>
                )}
              </div>

              {role === "CV01" && (
                <>
                  <div
                    onClick={handleCategory}
                    className="flex gap-2 items-center px-6 py-3 border-l-4 hover:bg-white hover:border-[#000] cursor-pointer duration-300"
                  >
                    <TiThMenuOutline size={30} />
                    <p className="text-[16px]">Danh mục</p>
                  </div>

                  {openCategory ? (
                    <div className="pl-14 text-[14px]">
                      <Link to="/manage/category/color">
                        <p className="hover:pl-4 hover:font-semibold p-2 text-[16px] duration-200">Màu sắc</p>
                      </Link>
                      <Link to="/manage/category/size">
                        <p className="hover:pl-4 hover:font-semibold p-2 text-[16px] duration-200">Kích thước</p>
                      </Link>
                      <Link to="/manage/category/brand">
                        <p className="hover:pl-4 hover:font-semibold p-2 text-[16px] duration-200">Thương hiệu</p>
                      </Link>
                      <Link to="/manage/category/type_product">
                        <p className="hover:pl-4 hover:font-semibold p-2 text-[16px] duration-200">Loại sản phẩm</p>
                      </Link>
                    </div>
                  ) : (
                    <></>
                  )}
                </>
              )}

              {(role === "CV01" || role === "CV03") && (
                <Link to="/manage/bill/import_invoice">
                  <div className="flex gap-2 items-center px-6 py-3 border-l-4 hover:bg-white hover:border-[#000] cursor-pointer duration-300">
                    <AiOutlineAppstoreAdd size={30} />
                    <p className="text-[16px]">Lập hóa đơn</p>
                  </div>
                </Link>
              )}

              {(role === "CV01" || role === "CV02") && (
                <Link to="/manage/bill/export_invoice">
                  <div className="flex gap-2 items-center px-6 py-3 border-l-4 hover:bg-white hover:border-[#000] cursor-pointer duration-300">
                    <RiBillLine size={30} />
                    <p className="text-[16px]">
                      Đơn hàng <span className="font-bold text-red-500">({number.length})</span>
                    </p>
                  </div>
                </Link>
              )}
            </>
          )}

          {role === "CV01" && (
            <Link to="/manage/staff">
              <div className="flex gap-2 items-center px-6 py-3 border-l-4 hover:bg-white hover:border-[#000] cursor-pointer duration-300">
                <BsPeople size={30} />
                <p className="text-[16px]">Nhân viên</p>
              </div>
            </Link>
          )}

          {role === "CV01" && (
            <Link to="/manage/customer">
              <div className="flex gap-2 items-center px-6 py-3 border-l-4 hover:bg-white hover:border-[#000] cursor-pointer duration-300">
                <BsPeople size={30} />
                <p className="text-[16px]">Khách hàng</p>
              </div>
            </Link>
          )}

          {role === "CV01" && (
            <Link to="/manage/reviews">
              <div className="flex gap-2 items-center px-6 py-3 border-l-4 hover:bg-white hover:border-[#000] cursor-pointer duration-300">
                <MdOutlineReviews size={30} />
                <p className="text-[16px]">Đánh giá</p>
              </div>
            </Link>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Navigation;
