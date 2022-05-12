import React from "react";
import {useSelector} from "react-redux";
import Banner from "../../../components/Banner";
import Card from "../../../components/Card";
import Footer from "../../../components/Footer";
import "../../components/Chat";

function Home() {
  const dataProduct = useSelector((state) => state?.product?.productlist);
  return (
    <div>
      <Banner />
      <div className="grid grid-cols-4 gap-10 w-[80%] mx-auto mt-20">
        {dataProduct?.map((data, idx) => (
          <Card key={idx} data={data} />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
