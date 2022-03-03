import React, {useState, useEffect} from "react";
import {DataGrid} from "@mui/x-data-grid";
import productAPI from "../../../../api/productAPI";
import moment from "moment";
import {useSnackbar} from "notistack";
import {Backdrop, Button, Fade, Modal, Typography} from "@mui/material";
import {product} from "../../../../redux/productSlice";
import {unwrapResult} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import {Box} from "@mui/system";
import Grid from "@mui/material/Grid";

import importInvoiceAPI from "../../../../api/importInvoiceAPI";
import colorAPI from "../../../../api/colorAPI";
import sizeAPI from "../../../../api/sizeAPI";
import brandAPI from "../../../../api/brandAPI";
import typeProductAPI from "../../../../api/typeProductAPI";
import imageAPI from "../../../../api/imageAPI";
import {useNavigate} from "react-router-dom";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "#fff",
  p: 2,
};

function ListProducts() {
  const [open, setOpen] = useState(false);
  const [dataDetailProduct, setDataDetailProduct] = useState("");
  const [dataBrand, setDataBrand] = useState("");
  const [dataColor, setDataColor] = useState("");
  const [dataSize, setDataSize] = useState("");
  const [dataImage, setDataImage] = useState("");
  const [dataTypeProduct, setDataTypeProduct] = useState("");
  const [count, setCount] = useState(0);
  const {enqueueSnackbar} = useSnackbar();
  const dispatch = useDispatch();
  const dataProduct = useSelector((state) => state?.product?.productlist);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        unwrapResult(dispatch(await product()));
      } catch (error) {
        enqueueSnackbar(error.message, {
          variant: "error",
          autoHideDuration: 2000,
        });
      }
    })(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  const deleteProduct = async (id_sp, id_hdn) => {
    try {
      await productAPI.deleteProduct(id_sp);
      await importInvoiceAPI.deleteImportInvoice(id_hdn);
      enqueueSnackbar("Xóa sản phẩm thành công", {
        variant: "success",
        autoHideDuration: 2000,
      });
      setCount((e) => e + 1);
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  const detailProduct = async (idsp) => {
    const resProduct = await productAPI.getProduct(idsp);
    const resColor = await colorAPI.getColor(resProduct[0].id_ms);
    const resTypeProduct = await typeProductAPI.getTypeProduct(resProduct[0].id_lsp);
    const resBrand = await brandAPI.getBrand(resProduct[0].id_th);
    const resSize = await sizeAPI.getSize(resProduct[0].id_kt);
    const resImage = await imageAPI.getImage(resProduct[0].id_sp);
    setDataImage(resImage);
    setDataTypeProduct(resTypeProduct);
    setDataBrand(resBrand);
    setDataSize(resSize);
    setDataColor(resColor);
    setDataDetailProduct(resProduct);
    handleOpen();
  };

  const editProduct = (id) => {
    console.log(id);
    navigate(`/manage/product/edit/${id}`, {replace: true});
  };

  const columns = [
    {field: "id_sp", headerName: "ID", width: 100},
    {field: "ten_sp", headerName: "Tên Sản Phẩm", width: 200},
    {field: "gia_nhap", headerName: "Giá Mua", width: 120},
    {field: "gia_ban", headerName: "Giá Bán", width: 120},
    {field: "so_luong_nhap", headerName: "Số Lượng", width: 100},
    {field: "ngay_nhap", headerName: "Ngày Nhập", width: 150},
    {field: "khuyen_mai", headerName: "Khuyễn Mãi", width: 120},
    {
      field: "hanh_dong",
      headerName: "Hành Động",
      width: 300,
      renderCell: (params) => (
        <div className="flex justify-between w-full">
          <div onClick={() => deleteProduct(params.row.id_sp, params.row.id_hdn)}>
            <Button variant="contained" color="error">
              Delete
            </Button>
          </div>

          <div onClick={() => detailProduct(params.row.id_sp)}>
            <Button variant="contained" color="primary">
              Detail
            </Button>
          </div>

          <div onClick={() => editProduct(params.row.id_sp)}>
            <Button variant="contained" color="secondary">
              Edit
            </Button>
          </div>
        </div>
      ),
    },
  ];

  const rows = dataProduct?.map(
    ({id_sp, id_hdn, id_th, id_ms, id_kt, id_lsp, ten_sp, gia_nhap, gia_ban, so_luong_nhap, ngay_lap_hdx}, idx) => ({
      id: idx,
      id_sp: id_sp,
      id_hdn: id_hdn,
      id_th: id_th,
      id_ms: id_ms,
      id_kt: id_kt,
      id_lsp: id_lsp,
      ten_sp: ten_sp,
      gia_nhap: gia_nhap,
      gia_ban: gia_ban,
      so_luong_nhap: so_luong_nhap,
      ngay_nhap: moment(ngay_lap_hdx).format("DD-MM-YYYY"),
      khuyen_mai: "",
    }),
  );

  const renderImage =
    dataImage &&
    dataImage?.map(({hinh_anh_sp}, idx) => (
      <div key={idx}>
        <img
          className="w-[100px] h-[100px] rounded-lg"
          src={hinh_anh_sp.slice(12, hinh_anh_sp.length)}
          alt="hinh anh san pham"
        />
      </div>
    ));

  return (
    <div>
      <div className="px-[20px]">
        <div className="border border-slate-300">
          <div style={{height: "80vh", width: "100%"}}>
            <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10]} />
          </div>
        </div>
      </div>
      {dataDetailProduct && (
        <>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <Box sx={{...style, borderRadius: "16px"}}>
                <Typography id="transition-modal-title" variant="h6" component="h2">
                  {dataDetailProduct[0]?.id_sp} - {dataDetailProduct[0]?.ten_sp}
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography id="transition-modal-description" sx={{mt: 1}}>
                      Price Buy:{" "}
                      {dataDetailProduct[0]?.gia_nhap.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </Typography>
                    <Typography sx={{mt: 1}}>
                      Price Sell:{" "}
                      {dataDetailProduct[0]?.gia_ban.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </Typography>
                    <Typography sx={{mt: 1}}>Number: {dataDetailProduct[0]?.so_luong_nhap}</Typography>
                    <Typography sx={{mt: 1}}>Weight : {dataDetailProduct[0]?.can_nang} (cm)</Typography>
                    <Typography sx={{mt: 1}}>Width : {dataDetailProduct[0]?.chieu_rong} (cm)</Typography>
                    <Typography sx={{mt: 1}}>Height : {dataDetailProduct[0]?.chieu_dai} (cm)</Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography id="transition-modal-description" sx={{mt: 1}}>
                      Date: {moment(dataDetailProduct[0]?.ngay_lap_hdn).format("DD-MM-YYYY")}
                    </Typography>
                    <Typography sx={{mt: 1}}>Type Product: {dataTypeProduct[0]?.ten_lsp}</Typography>
                    <Typography sx={{mt: 1}}>Size: {dataSize[0]?.ten_kt}</Typography>
                    <Typography sx={{mt: 1}}>Color: {dataColor[0]?.ten_ms}</Typography>
                    <Typography sx={{mt: 1}}>Brand: {dataBrand[0]?.ten_th}</Typography>
                  </Grid>
                </Grid>
                <Box
                  sx={{
                    display: "grid",
                    mt: 2,
                    gap: 1,
                    gridTemplateColumns: "repeat(6, 1fr)",
                  }}
                >
                  {renderImage}
                </Box>
              </Box>
            </Fade>
          </Modal>
        </>
      )}
    </div>
  );
}

export default ListProducts;
