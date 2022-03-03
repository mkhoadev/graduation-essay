import React from "react";
import {Route, Routes, useLocation} from "react-router-dom";
import NotFound from "../components/NotFound";
import Menu from "./components/Menu";
import Navigation from "./components/Navigation";

import LoginManage from "./pages/LoginManage";

const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Delivery = React.lazy(() => import("./pages/Delivery"));
const Product = React.lazy(() => import("./pages/Product"));
const Bill = React.lazy(() => import("./pages/Bill"));

function Manage() {
  const location = useLocation();
  const title = location.pathname.slice(8);

  return (
    <div className="flex">
      <div className="w-[280px]">
        <Navigation />
      </div>
      <div className="flex-1">
        <div>
          <Menu title={title} />
        </div>
        <div className="mt-8">
          <Routes>
            <Route path="/login" element={<LoginManage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/product/*" element={<Product />} />
            <Route path="/bill" element={<Bill />} />
            <Route path="/delivery" element={<Delivery />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Manage;