import "./App.css";
import React, {Suspense} from "react";
import {Routes, Route, Navigate} from "react-router-dom";

const Shop = React.lazy(() => import("./Shop"));
const Manage = React.lazy(() => import("./Manage"));
const NotFound = React.lazy(() => import("./components/NotFound"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Navigate replace to="/shop" />} />
          <Route
            path="/manage"
            element={<Navigate replace to="/manage/login" />}   
          />
          <Route path="/shop/*" element={<Shop />} />
          <Route path="/manage/*" element={<Manage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
