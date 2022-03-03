import React from "react";
import {Routes, Route} from "react-router-dom";
import Header from "../components/Header";
import NotFound from "../components/NotFound";

const Home = React.lazy(() => import("../Shop/pages/Home"));
const Products = React.lazy(() => import("../Shop/pages/Products"));
const Login = React.lazy(() => import("../Shop/pages/Login"));
const Register = React.lazy(() => import("../Shop/pages/Register"));
const Profile = React.lazy(() => import("../Shop/pages/Profile"));
const Orders = React.lazy(() => import("../Shop/pages/Orders"));

function Shop() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default Shop;
