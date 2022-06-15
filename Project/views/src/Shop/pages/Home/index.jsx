import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import productAPI from "../../../api/productAPI";
import Banner from "../../../components/Banner";
import Card from "../../../components/Card";
import Footer from "../../../components/Footer";

function Home() {
  const dataProduct = useSelector((state) => state?.product?.productlist);

  const [newProduct, setNewProduct] = useState([]);
  const [discountProduct, setDiscountProduct] = useState([]);

  useEffect(() => {
    (async () => {
      const resNewProduct = await productAPI.getNewProduct();
      const resDiscountProduct = await productAPI.getDiscountProduct();
      setNewProduct(resNewProduct);
      setDiscountProduct(resDiscountProduct);
    })();
  }, []);
  return (
    <div>
      <Banner />
      <div className="w-[80%] mx-auto mt-20">
        <p className="my-2 text-[24px] text-center text-teal-700 font-bold  uppercase">Sản phẩm mới</p>

        <div className="grid grid-cols-4 gap-10">
          {newProduct?.map((data, idx) => (
            <Card key={idx} data={data} />
          ))}
        </div>
      </div>

      <div className="w-[80%] mx-auto mt-20">
        <p className="my-2 text-[24px] text-center text-teal-700 font-bold  uppercase">Sản phẩm khuyễn mãi</p>

        <div className="grid grid-cols-4 gap-10">
          {discountProduct?.map((data, idx) => (
            <Card key={idx} data={data} />
          ))}
        </div>
      </div>
      {/* <div className="grid grid-cols-4 gap-10 w-[80%] mx-auto mt-20">
        {dataProduct?.map((data, idx) => (
          <Card key={idx} data={data} />
        ))}
      </div> */}
      <Footer />
    </div>
  );
}

export default Home;
