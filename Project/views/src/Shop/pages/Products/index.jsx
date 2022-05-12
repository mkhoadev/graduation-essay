import React, {useEffect, useState} from "react";

import brandAPI from "../../../api/brandAPI";
import sizeAPI from "../../../api/sizeAPI";
import filterAPI from "../../../api/filterAPI";

import Card from "../../../components/Card";
import Footer from "../../../components/Footer";
import {addListProduct} from "../../../redux/productSlice";
import {useDispatch, useSelector} from "react-redux";

function Products() {
  const [brand, setBrand] = useState([]);
  const [size, setSize] = useState([]);

  const dispatch = useDispatch();

  const dataProduct = useSelector((state) => state?.product?.productlist);

  useEffect(() => {
    (async () => {
      const brand = await brandAPI.getList();
      const size = await sizeAPI.getList();
      setSize(size);
      setBrand(brand);
    })();
  }, []);

  const filterSort = async (data) => {
    const dataFilter = await filterAPI.sortBy(data);
    dispatch(addListProduct(dataFilter));
  };

  const filterBrand = async (data) => {
    const dataFilter = await filterAPI.sortBrand(data);
    dispatch(addListProduct(dataFilter));
  };

  // const filterSize = async (data) => {
  //   const dataFilter = await filterAPI.sortSize(data);
  //   dispatch(addListProduct(dataFilter));
  // };

  return (
    <div>
      <div className="flex gap-5 w-[80%] mx-auto mt-10">
        <div className="w-[20%] mt-5">
          <div className="mb-5">
            <select
              onChange={(e) => filterSort(e.target.value)}
              className="w-full py-[6px] px-4 bg-gray-200 outline-none rounded-lg shadow-md"
            >
              <option value="">Sort by</option>
              <option value="ASC">Slow to hight</option>
              <option value="DESC">High to slow</option>
            </select>
          </div>
          <div className="mb-5">
            <select
              onChange={(e) => filterBrand(e.target.value)}
              className="w-full py-[6px] px-4 bg-gray-200 outline-none rounded-lg shadow-md"
            >
              <option value="">Brand</option>
              {brand?.map(({id_th, ten_th}, idx) => (
                <option key={idx} value={id_th}>
                  {ten_th}
                </option>
              ))}
            </select>
          </div>
          {/* <div className="mb-5">
            <select
              // onChange={(e) => filterSize(e.target.value)}
              className="w-full py-[6px] px-4 bg-gray-200 outline-none rounded-lg shadow-md"
            >
              <option value="">Size</option>
              {size?.map(({id_kt, ten_kt}, idx) => (
                <option key={idx} value={id_kt}>
                  {ten_kt}
                </option>
              ))}
            </select>
          </div> */}
        </div>
        <div className="grid grid-cols-4 gap-5 w-[80%] mx-auto mt-5">
          {dataProduct?.map((data, idx) => (
            <Card key={idx} data={data} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Products;
