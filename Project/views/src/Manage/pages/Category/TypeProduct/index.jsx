import React, {useEffect, useState} from "react";
import {AiOutlineClose} from "react-icons/ai";
import typeProductAPI from "../../../../api/typeProductAPI";

function TypeProduct() {
  const [count, setCount] = useState(0);
  const [nameTypeProduct, setNameTypeProduct] = useState("");
  const [listTypeProduct, setListTypeProduct] = useState([]);

  useEffect(() => {
    (async () => {
      const resBrand = await typeProductAPI.getList();
      setListTypeProduct(resBrand);
    })();
  }, [count]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nameTypeProduct) {
      await typeProductAPI.createTypeProduct({
        loaisanpham: nameTypeProduct,
      });
      setCount((e) => e + 1);
    }
  };

  const deTypeProduct = async (idlsp) => {
    await typeProductAPI.deTypeProduct(idlsp);
    setCount((e) => e + 1);
  };

  const renTypeProduct =
    !!listTypeProduct &&
    listTypeProduct?.map(({id_lsp, ten_lsp}, idx) => (
      <div key={idx}>
        <div className="relative py-4 text-[20px] text-center border border-orange-500 rounded-lg opacity-80 shadow-lg">
          <p>{ten_lsp}</p>
          <AiOutlineClose onClick={() => deTypeProduct(id_lsp)} className="absolute right-1 top-1 cursor-pointer" />
        </div>
      </div>
    ));

  return (
    <div className="px-[20px]">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-6">
            <input
              onChange={(e) => setNameTypeProduct(e.target.value)}
              className="px-4 py-2 border rounded-lg"
              type="text"
              placeholder="Loại sản phẩm"
            />
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-lg">Thêm Loại Sản Phẩm</button>
          </div>
        </form>
      </div>
      <div className="grid grid-cols-6 gap-5 mt-5">{renTypeProduct}</div>
    </div>
  );
}

export default TypeProduct;
