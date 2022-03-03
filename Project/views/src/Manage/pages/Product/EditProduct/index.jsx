import moment from "moment";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useSnackbar} from "notistack";
import productAPI from "../../../../api/productAPI";
import importInvoiceAPI from "../../../../api/importInvoiceAPI";
import detailImportInvoiceAPI from "../../../../api/detailImportInvoiceAPI";
import imageAPI from "../../../../api/imageAPI";
import {NavLink, useParams} from "react-router-dom";
import {useSelector} from "react-redux";

const defaultValues = {
  cannang: "",
  chieucao: "",
  chieudai: "",
  chieurong: "",
  giaban: "",
  kichthuoc: "",
  loaisanpham: "",
  mausac: "",
  tensanpham: "",
  thongtinsanpham: "",
  thuonghieu: "",
  soluong: "",
  gianhap: "",
};

function EditProduct() {
  const {register, handleSubmit, reset} = useForm({...defaultValues});

  const [open, setOpen] = useState(false);
  const [dataDetailProduct, setDataDetailProduct] = useState("");
  const [dataTypeProduct, setDataTypeProduct] = useState("");
  const [imageUrl, setImageUrl] = useState([]);
  const [listImage, setListImage] = useState([]);
  const {enqueueSnackbar} = useSnackbar();

  let params = useParams();

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
      console.log("Image is max 5");
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
    (async () => {
      try {
        const resProduct = await productAPI.getProduct(params.idsp);
        reset({
          tensanpham: resProduct[0].ten_sp,
          thongtinsanpham: resProduct[0].thong_tin_sp,
          cannang: resProduct[0]?.can_nang,
          chieucao: resProduct[0]?.chieu_cao,
          chieudai: resProduct[0]?.chieu_dai,
          chieurong: resProduct[0]?.chieu_rong,
          giaban: resProduct[0]?.gia_ban,
          kichthuoc: resProduct[0]?.id_kt,
          loaisanpham: resProduct[0]?.id_lsp,
          mausac: resProduct[0]?.id_ms,
          thuonghieu: resProduct[0]?.id_th,
          soluong: resProduct[0]?.so_luong_nhap,
          gianhap: resProduct[0]?.gia_nhap,
        });
        setDataDetailProduct(resProduct);
      } catch (error) {
        console.log(error);
        enqueueSnackbar(error.message, {
          variant: "error",
          autoHideDuration: 2000,
        });
      }
    })();
  }, [reset]);

  const dataProduct = (data) => {
    return {
      cannang: data.cannang,
      chieucao: data.chieucao,
      chieudai: data.chieudai,
      chieurong: data.chieurong,
      giaban: data.giaban,
      kichthuoc: data.kichthuoc,
      loaisanpham: data.loaisanpham,
      mausac: data.mausac,
      tensanpham: data.tensanpham,
      thongtinsanpham: data.thongtinsanpham,
      thuonghieu: data.thuonghieu,
    };
  };

  const setData = async (data) => {
    try {
      await productAPI.updateProduct(params.idsp, dataProduct(data));
      enqueueSnackbar("Sửa sản phẩm thành công", {
        variant: "success",
        autoHideDuration: 2000,
      });
      
      // const formData = new FormData();
      // if (listImage) {
      //   for (let i = 0; i < listImage.length; i++) {
      //     formData.append("photos", listImage[i]);
      //   }

      //   formData.append("idsp", idsp[0]?.id_sp);
      //   await imageAPI.createImage(formData);
      // }
    
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 2000,
      });
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

  return (
    <div>
      <NavLink to="/manage/product/listproducts">
        <button className="ml-7 px-10 py-2 mb-5 text-white bg-slate-400 rounded shadow-lg">Back</button>
      </NavLink>
      <form id="addProduct" onSubmit={handleSubmit((data) => setData(data))}>
        <div className="px-7">
          <div className="mt-5">
            <span>Tên sản phẩm </span>
            <input
              className="px-2 py-1 w-full border border-slate-400 rounded-lg"
              type="text"
              name="tensanpham"
              defaultValue={dataDetailProduct[0]?.ten_sp}
              {...register("tensanpham")}
            />
          </div>

          <div className="mt-5">
            <span>Thông tin sản phẩm</span> <br />
            <textarea
              className="w-full p-2 border border-slate-400 rounded-lg"
              name="thongtinsanpham"
              id=""
              rows="10"
              ref={register}
              {...register("thongtinsanpham")}
            ></textarea>
          </div>

          <div>
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
                  id=""
                  ref={register}
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
                  id=""
                  ref={register}
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

              <div className="mt-5">
                <span className="block">Giá nhập</span>
                <input
                  className="p-1 w-[200px] border border-slate-400 rounded-lg"
                  type="text"
                  name="gianhap"
                  ref={register}
                  {...register("gianhap")}
                />
              </div>
            </div>

            <div>
              <div className="mt-5">
                <span className="block">Cân nặng (g)</span>
                <input
                  className="p-1 w-[200px] border border-slate-400 rounded-lg"
                  type="text"
                  name="cannang"
                  ref={register}
                  {...register("cannang")}
                />
              </div>
              <div className="mt-5">
                <span className="block">Chiều cao (cm)</span>
                <input
                  className="p-1 w-[200px] border border-slate-400 rounded-lg"
                  type="text"
                  name="chieucao"
                  ref={register}
                  {...register("chieucao")}
                />
              </div>
              <div className="mt-5">
                <span className="block">Chiều rộng (cm)</span>
                <input
                  className="p-1 w-[200px] border border-slate-400 rounded-lg"
                  type="text"
                  name="chieurong"
                  ref={register}
                  {...register("chieurong")}
                />
              </div>
            </div>
            <div>
              <div className="mt-5">
                <span className="block">Chiều dài (cm)</span>
                <input
                  className="p-1 w-[200px] border border-slate-400 rounded-lg"
                  type="text"
                  name="chieudai"
                  ref={register}
                  {...register("chieudai")}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 mb-[100px]">
            <table className="w-[1000px]">
              <thead>
                <tr>
                  <th className="h-8 border border-slate-400">Màu sắc</th>
                  <th className="h-8 border border-slate-400">Kích thước</th>
                  <th className="h-8 border border-slate-400">Số lượng</th>
                  <th className="h-8 border border-slate-400">Giá bán</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="w-[25%] border border-slate-400">
                    <select
                      name="mausac"
                      id=""
                      className="h-8 px-2 w-full outline-none"
                      ref={register}
                      {...register("mausac")}
                    >
                      {color &&
                        color?.map(({id_ms, ten_ms}, idx) => (
                          <option key={idx} value={id_ms}>
                            {ten_ms}
                          </option>
                        ))}
                    </select>
                  </td>
                  <td className="w-[25%] border border-slate-400">
                    <select
                      name="kichthuoc"
                      id=""
                      className="h-8 px-2 w-full outline-none"
                      ref={register}
                      {...register("kichthuoc")}
                    >
                      {size &&
                        size?.map(({id_kt, ten_kt}, idx) => (
                          <option key={idx} value={id_kt}>
                            {ten_kt}
                          </option>
                        ))}
                    </select>
                  </td>
                  <td className="w-[25%] border border-slate-400">
                    <input
                      name="soluong"
                      className="h-8 px-2 w-full outline-none"
                      type="text"
                      ref={register}
                      {...register("soluong")}
                    />
                  </td>
                  <td className="w-[25%] border border-slate-400">
                    <input
                      name="giaban"
                      className="h-8 px-2 w-full outline-none"
                      type="text"
                      ref={register}
                      {...register("giaban")}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <button className="mt-7 px-10 py-2 mb-5 text-white bg-sky-600 rounded shadow-lg">Edit</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
