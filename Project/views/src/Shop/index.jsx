import React from "react";
import {Routes, Route} from "react-router-dom";

import Header from "../components/Header";
import NotFound from "../components/NotFound";
import BuyNow from "./pages/InfoProduct/BuyNow";

const Home = React.lazy(() => import("./pages/Home"));
const Products = React.lazy(() => import("./pages/Products"));
const Login = React.lazy(() => import("./pages/Login"));
const ForgotPass = React.lazy(() => import("./pages/ForgotPass"));
const Register = React.lazy(() => import("./pages/Register"));
const Reviews = React.lazy(() => import("./pages/Reviews"));
const DetailReview = React.lazy(() => import("./pages/Reviews/DetailReview"));
const Orders = React.lazy(() => import("./pages/Orders"));
const DetailOrder = React.lazy(() => import("./pages/Orders/DetailOrder"));
const Cart = React.lazy(() => import("./pages/Cart"));
const CheckPay = React.lazy(() => import("./pages/CheckPay"));
const InfoProduct = React.lazy(() => import("./pages/InfoProduct"));

function Shop() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/SP=:SP" element={<InfoProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot_password" element={<ForgotPass />} />
        {/* <Route path="/reviews" element={<Reviews />} /> */}
        <Route path="/review/:idhdx" element={<DetailReview />} />
        <Route path="/register" element={<Register />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/order/:idhdx" element={<DetailOrder />} />
        <Route path="/order/detail_pay_order" element={<BuyNow />} />
        <Route path="/check_pay" element={<CheckPay />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default Shop;
