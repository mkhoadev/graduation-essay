import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useSnackbar} from "notistack";
import {useSelector} from "react-redux";

import productAPI from "../../../../api/productAPI";
import imageAPI from "../../../../api/imageAPI";
import detailProductAPI from "../../../../api/detailProductAPI";

const defaultValues = {
  kichthuoc: "KT05",
  loaisanpham: "LSP01",
  tensanpham: "Nike Shoes",
  thongtinsanpham: "ABC",
  thuonghieu: "TH01",
  giaban: "1500000",
};

function AddProduct() {
  const {register, handleSubmit, formState, reset} = useForm({defaultValues: defaultValues});

  const [imageUrl, setImageUrl] = useState([]);
  const [listImage, setListImage] = useState([]);
  const [submittedData, setSubmittedData] = useState({});
  const [detailProduct, setDetailProduct] = useState([]);
  const [addFormData, setAddFormData] = useState({
    mausac: "",
    kichthuoc: "",
  });

  const {enqueueSnackbar} = useSnackbar();

  const color = useSelector((state) => state?.color?.colorlist);
  const size = useSelector((state) => state?.size?.sizelist);
  const brand = useSelector((state) => state?.brand?.brandlist);
  const typeProduct = useSelector((state) => state?.typeProduct?.typeProductlist);

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (err) => {
        reject(err);
      };
    });
  };

  const uploadImage = async (e) => {
    setListImage(e.target.files);
    const imageNumber = e.target.files.length + imageUrl.length;
    if (imageNumber <= 5) {
      let i = 0;
      for (i; i < e.target.files.length; i++) {
        const file = e.target.files[i];
        if (!file) return;
        const base64 = await getBase64(file);
        setImageUrl((oldFile) => [...oldFile, {url: base64}]);
      }
    } else {
      enqueueSnackbar("Image is max 5", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  const btnActive = () => {
    document.getElementById("default-btn").click();
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset(defaultValues);
    }
  }, [formState, submittedData, reset]);

  const dataProduct = (data) => {
    return {
      tensanpham: data.tensanpham,
      giaban: data.giaban,
      loaisanpham: data.loaisanpham,
      thuonghieu: data.thuonghieu,
      thongtinsanpham: data.thongtinsanpham,
    };
  };

  const setData = async (data) => {
    setSubmittedData(data);
    try {
      const idsp = await productAPI.createProduct(dataProduct(data));

      if (detailProduct) {
        for (let i = 0; i < detailProduct.length; i++) {
          await detailProductAPI.createdetailProductAPI({
            idsp: idsp[0].id_sp,
            idkt: detailProduct[i]?.kichthuoc,
            idms: detailProduct[i]?.mausac,
          });
        }
      }

      const formData = new FormData();
      if (listImage) {
        for (let i = 0; i < listImage.length; i++) {
          formData.append("photos", listImage[i]);
        }

        formData.append("idsp", idsp[0]?.id_sp);
        await imageAPI.createImage(formData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveImage = (e) => {
    const name = e.target.getAttribute("name");
    setImageUrl(imageUrl.filter((item) => item.url !== name));
  };

  const renderImage = imageUrl?.map((urlImage, idx) => {
    return (
      <div className="relative" key={idx}>
        <img className="w-[100px] h-[100px] rounded-lg" src={urlImage.url} alt="anhsanpham" />
        <div
          className="absolute -top-1 -right-1 bg-red-600 text-center text-[12px] text-white px-[6px] rounded-full cursor-pointer"
          name={urlImage.url}
          onClick={handleRemoveImage}
        >
          x
        </div>
      </div>
    );
  });

  const handleAddFormChange = (e) => {
    e.preventDefault();
    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;

    const newFormData = {...addFormData};

    newFormData[fieldName] = fieldValue;

    console.log(newFormData);

    setAddFormData(newFormData);
  };

  const handleAddFormSubmit = (e) => {
    e.preventDefault();
    const newDetailProduct = {
      mausac: addFormData.mausac,
      kichthuoc: addFormData.kichthuoc,
      giaban: addFormData.giaban,
      gianhap: addFormData.gianhap,
    };

    const newDetailProducts = [...detailProduct, newDetailProduct];
    setDetailProduct(newDetailProducts);
  };

  return (
    <div>
      <form id="addProduct" onSubmit={handleSubmit((data) => setData(data))}>
        <button className="ml-7 px-10 py-2 mb-5 text-white bg-slate-400 rounded shadow-lg">Add</button>
        <div className="px-7">
          <div className="mt-5">
            <span>Tên sản phẩm </span>
            <input
              className="px-2 py-1 w-full border border-slate-400 rounded-lg"
              type="text"
              name="tensanpham"
              {...register("tensanpham")}
            />
          </div>

          <div className="mt-6">
            <span>Hình ảnh</span>
            <div className="flex gap-4">
              <div className="flex gap-4">
                <input
                  type="file"
                  id="default-btn"
                  className="hidden"
                  name="file"
                  onChange={(e) => {
                    uploadImage(e);
                  }}
                  multiple
                />
                <div
                  className="w-[100px] h-[100px] border border-slate-400 rounded-lg cursor-pointer"
                  onClick={() => btnActive()}
                >
                  <div className="text-[25px] text-[#ccc] text-center leading-[90px] ">+</div>
                </div>
                {renderImage}
              </div>
            </div>
          </div>

          <div className="flex gap-5">
            <div>
              <div className="mt-5">
                <span className="block">Loại sản phẩm</span>
                <select
                  className="p-1 w-[200px] border border-slate-400 rounded-lg"
                  name="loaisanpham"
                  {...register("loaisanpham")}
                >
                  {typeProduct &&
                    typeProduct?.map(({id_lsp, ten_lsp}, idx) => (
                      <option key={idx} value={id_lsp}>
                        {ten_lsp}
                      </option>
                    ))}
                </select>
              </div>

              <div className="mt-5">
                <span className="block">Thương hiệu</span>
                <select
                  className="p-1 w-[200px] border border-slate-400 rounded-lg"
                  name="thuonghieu"
                  {...register("thuonghieu")}
                >
                  {brand &&
                    brand?.map(({id_th, ten_th}, idx) => (
                      <option key={idx} value={id_th}>
                        {ten_th}
                      </option>
                    ))}
                </select>
              </div>
              {/* <div className="mt-5">
                <span className="block">Giá nhập</span>
                <input
                  name="gianhap"
                  {...register("gianhap")}
                  className="p-1 w-[200px] border border-slate-400 rounded-lg"
                />
              </div> */}
              <div className="mt-5">
                <span className="block">Giá bán</span>
                <input
                  name="giaban"
                  {...register("giaban")}
                  className="p-1 w-[200px] border border-slate-400 rounded-lg"
                />
              </div>
            </div>
          </div>

          <div className="mt-5">
            <span>Thông tin sản phẩm</span> <br />
            <textarea
              className="w-full p-2 border border-slate-400 rounded-lg"
              name="thongtinsanpham"
              id=""
              rows="10"
              {...register("thongtinsanpham")}
            ></textarea>
          </div>
        </div>
      </form>

      <form onSubmit={handleAddFormSubmit}>
        <div className="flex justify-between gap-5 w-[50%] mt-6 px-7">
          <div className="w-full">
            <select
              name="mausac"
              onChange={handleAddFormChange}
              className="h-8 px-2 w-full border border-slate-400 outline-none rounded-lg"
            >
              <option value="">Màu sắc</option>
              {color &&
                color?.map(({id_ms, ten_ms}, idx) => (
                  <option key={idx} value={id_ms}>
                    {ten_ms}
                  </option>
                ))}
            </select>
          </div>
          <div className="w-full">
            <select
              name="kichthuoc"
              onChange={handleAddFormChange}
              className="h-8 px-2 w-full border border-slate-400 outline-none rounded-lg"
            >
              <option value="">Kích thước</option>
              {size &&
                size?.map(({id_kt, ten_kt}, idx) => (
                  <option key={idx} value={id_kt}>
                    {ten_kt}
                  </option>
                ))}
            </select>
          </div>

          <button className="px-4 bg-slate-400 rounded-lg">ADD</button>
        </div>
      </form>

      <div className="mt-4 mb-10 px-7">
        <table className="w-[40%]">
          <thead>
            <tr>
              <th className="w-[20%] h-8 border border-slate-400">Màu Sắc</th>
              <th className="w-[20%] h-8 border border-slate-400">Kích Thước</th>
            </tr>
          </thead>
          <tbody>
            {detailProduct?.map(({mausac, kichthuoc}, idx) => (
              <tr key={idx}>
                <td className="text-center border border-slate-400">{mausac}</td>
                <td className="text-center border border-slate-400">{kichthuoc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AddProduct;
