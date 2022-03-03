import React from "react";
import Card from "../../../components/Card";
import Filter from "../../../components/Filter";

function Products() {
  return (
    <div>
      <Filter />
      <div className="grid grid-cols-4 gap-10 w-[75%] mx-auto mt-5">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}

export default Products;
