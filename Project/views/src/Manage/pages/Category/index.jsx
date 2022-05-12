import React from "react";
import {Routes, Route} from "react-router-dom";
import Color from "./Color";
import Size from "./Size";
function Category() {
  return (
    <div>
      <Routes>
        <Route path="/size" element={<Size />} />
        <Route path="/color" element={<Color />} />
      </Routes>
    </div>
  );
}

export default Category;
