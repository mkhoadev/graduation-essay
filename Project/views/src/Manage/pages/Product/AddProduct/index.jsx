import moment from "moment";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useSnackbar} from "notistack";
import productAPI from "../../../../api/productAPI";
import importInvoiceAPI from "../../../../api/importInvoiceAPI";
import detailImportInvoiceAPI from "../../../../api/detailImportInvoiceAPI";
import imageAPI from "../../../../api/imageAPI";

const defaultValues = {
  cannang: "50",
  chieucao: "50",
  chieudai: "50",
  chieurong: "50",
  giaban: "1000000",
  kichthuoc: "KT05",
  loaisanpham: "LSP01",
  mausac: "MS01",
  tensanpham: "Nike Shoes",
  thongtinsanpham: "ABC",
  thuonghieu: "TH01",
  soluong: "50",
  gianhap: "300000",
};

function AddProduct() {
  const {
    register,
    handleSubmit,
    watch,
    formState,
    formState: {errors, isSubmitSuccessful},
    reset,
  } = useForm({defaultValues: defaultValues});

  const [imageUrl, setImageUrl] = useState([]);
  const [listImage, setListImage] = useState([]);
  const [submittedData, setSubmittedData] = useState({});
  const {enqueueSnackbar} = useSnackbar();

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
    if (formState.isSubmitSuccessful) {
      reset(defaultValues);
    }
  }, [formState, submittedData, reset]);

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

  const dataBill = () => {
    return {
      ngaylaphdn: moment().format("YYYY-MM-DD"),
    };
  };

  // const dataImage = (data) => {
  //   formData.append("photos", file);
  //   formData.append("MaSP", data.masanpham);
  //   return formData;
  // };

  const setData = async (data) => {
    setSubmittedData(data);
    try {
      const idsp = await productAPI.createProduct(dataProduct(data));
      const idhdn = await importInvoiceAPI.createImportInvoiceAPI(dataBill());
      if (idsp && idhdn) {
        await detailImportInvoiceAPI.createdetailImportInvoiceAPI({
          soluong: data.soluong,
          gianhap: data.gianhap,
          idsp: idsp[0].id_sp,
          idhdn: idhdn[0].id_hdn,
        });
        enqueueSnackbar("Thêm sản phẩm thành công", {
          variant: "success",
          autoHideDuration: 2000,
        });
        const formData = new FormData();
        if (listImage) {
          for (let i = 0; i < listImage.length; i++) {
            formData.append("photos", listImage[i]);
          }

          formData.append("idsp", idsp[0]?.id_sp);
          await imageAPI.createImage(formData);
        }
      }
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
        <img
          className="w-[100px] h-[100px] rounded-lg"
          src={urlImage.url}
          alt="anhsanpham"
        />
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
      <form id="addProduct" onSubmit={handleSubmit((data) => setData(data))}>
        <button className="ml-7 px-10 py-2 mb-5 text-white bg-slate-400 rounded shadow-lg">
          Add
        </button>
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
                  <div className="text-[25px] text-[#ccc] text-center leading-[90px] ">
                    +
                  </div>
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
                  {...register("loaisanpham")}
                >
                  <option value=""></option>
                  <option value="LSP01">Giày</option>
                </select>
              </div>

              <div className="mt-5">
                <span className="block">Thương hiệu</span>
                <select
                  className="p-1 w-[200px] border border-slate-400 rounded-lg"
                  name="thuonghieu"
                  id=""
                  {...register("thuonghieu")}
                >
                  <option value=""></option>
                  <option value="TH01">Nike</option>
                  <option value="TH02">Balenciaga</option>
                </select>
              </div>

              <div className="mt-5">
                <span className="block">Giá nhập</span>
                <input
                  className="p-1 w-[200px] border border-slate-400 rounded-lg"
                  type="text"
                  name="gianhap"
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
                  {...register("cannang")}
                />
              </div>
              <div className="mt-5">
                <span className="block">Chiều cao (cm)</span>
                <input
                  className="p-1 w-[200px] border border-slate-400 rounded-lg"
                  type="text"
                  name="chieucao"
                  {...register("chieucao")}
                />
              </div>
              <div className="mt-5">
                <span className="block">Chiều rộng (cm)</span>
                <input
                  className="p-1 w-[200px] border border-slate-400 rounded-lg"
                  type="text"
                  name="chieurong"
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
                      {...register("mausac")}
                    >
                      <option value=""></option>
                      <option value="MS01">Hồng</option>
                    </select>
                  </td>
                  <td className="w-[25%] border border-slate-400">
                    <select
                      name="kichthuoc"
                      id=""
                      className="h-8 px-2 w-full outline-none"
                      {...register("kichthuoc")}
                    >
                      <option value=""></option>
                      <option value="KT05">39</option>
                    </select>
                  </td>
                  <td className="w-[25%] border border-slate-400">
                    <input
                      name="soluong"
                      className="h-8 px-2 w-full outline-none"
                      type="text"
                      {...register("soluong")}
                    />
                  </td>
                  <td className="w-[25%] border border-slate-400">
                    <input
                      name="giaban"
                      className="h-8 px-2 w-full outline-none"
                      type="text"
                      {...register("giaban")}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
