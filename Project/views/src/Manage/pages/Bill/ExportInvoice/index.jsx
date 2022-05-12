import React, {useEffect, useState} from "react";
import {DataGrid} from "@mui/x-data-grid";
import moment from "moment";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {useSnackbar} from "notistack";

import exportInvoiceAPI from "../../../../api/exportInvoiceAPI";
import detailExportInvoiceAPI from "../../../../api/detailExportInvoiceAPI";
import detailProductAPI from "../../../../api/detailProductAPI";
import employeeAPI from "../../../../api/employeeAPI";
import deliverAPI from "../../../../api/deliverAPI";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -80%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

const styleView = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function ExportInvoice() {
  const [dataBill, setDataBill] = useState([]);
  const [deliver, setDeliver] = useState("");
  const [shipper, setShipper] = useState([]);
  const [count, setCount] = useState(0);
  const [listOrder, setListOrder] = useState([]);
  const [idOrder, setIdOrder] = useState("");

  const [openConfirm, setOpenConfirm] = useState(false);
  const [openCancel, setOpenCancel] = useState(false);
  const [openView, setOpenView] = useState(false);

  const handleOpenConfirm = () => setOpenConfirm(true);
  const handleCloseConfirm = () => setOpenConfirm(false);
  const handleOpenCancel = () => setOpenCancel(true);
  const handleCloseCancel = () => setOpenCancel(false);
  const handleOpenView = () => setOpenView(true);
  const handleCloseView = () => setOpenView(false);

  const {enqueueSnackbar} = useSnackbar();

  useEffect(() => {
    (async () => {
      const result = await exportInvoiceAPI.getAll();
      const res = await employeeAPI.getAllShiper();
      setShipper(res);
      setDataBill(result);
    })();
  }, [count]);

  const handleConfirm = async () => {
    if (deliver) {
      await exportInvoiceAPI.updateStatus(idOrder, {
        status: "Đã xác nhận",
      });

      await deliverAPI.createDeliver({
        idnv: deliver,
        trangthai: "Đang xử lý",
        idhdx: idOrder,
      });

      setCount((e) => e + 1);
      handleCloseConfirm();
    } else {
      enqueueSnackbar("Vui lòng chọn người giao hàng", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  const handleCancel = async () => {
    const data_hdx = await detailExportInvoiceAPI.getDetailExportInvoice(idOrder);
    await detailProductAPI.addNumberProduct(data_hdx);
    await exportInvoiceAPI.updateStatus(idOrder, {
      status: "Hủy",
    });
    setCount((e) => e + 1);
    handleCloseCancel();
  };

  const handleView = async (id_hdx) => {
    handleOpenView();
    const data = await detailExportInvoiceAPI.getDetailExportInvoice(id_hdx);
    setListOrder(data);
  };

  const columns = [
    {field: "id_hdx", headerName: "Mã hóa đơn", width: 125, headerAlign: "center", align: "center"},
    {field: "tong_tien", headerName: "Tổng tiền", width: 130, headerAlign: "center", align: "center"},
    {field: "trang_thai", headerName: "Trạng thái", width: 130, headerAlign: "center", align: "center"},
    {field: "ngay_lap", headerName: "Ngày lập", width: 100, headerAlign: "center", align: "center"},
    {field: "hinh_thuc", headerName: "Thanh toán", width: 170, headerAlign: "center", align: "center"},

    {
      field: "hanh_dong",
      headerName: "Hành Động",
      headerAlign: "center",
      width: 400,
      renderCell: (params) => (
        <div className="flex gap-5">
          {params.row.trang_thai === "Đang xử lý" ? (
            <>
              <div>
                <button
                  onClick={() => {
                    setIdOrder(params.row.id_hdx);
                    handleOpenConfirm();
                  }}
                  className="py-2 px-4 text-white bg-sky-500 rounded-lg shadow-md"
                >
                  Xác nhận
                </button>
                <Modal
                  open={openConfirm}
                  onClose={handleCloseConfirm}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <p className="text-[24px] text-center font-bold">Xác nhận hóa đơn {params.row.id_hdx}</p>
                    <div className="mt-6">
                      <select onChange={(e) => setDeliver(e.target.value)} className="mt-2 py-2 px-4 border w-full">
                        <option value="">Chọn người giao hàng</option>
                        {shipper?.map(({id_nv, ten_nv}, idx) => (
                          <option key={idx} value={id_nv}>
                            {ten_nv}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <button
                        onClick={() => handleConfirm()}
                        className="block mt-6 mx-auto py-2 px-4 text-white bg-sky-500 rounded-lg shadow-md"
                      >
                        Xác nhận hóa đơn
                      </button>
                    </div>
                  </Box>
                </Modal>
              </div>
              <div>
                <button
                  onClick={() => {
                    setIdOrder(params.row.id_hdx);
                    handleOpenCancel();
                  }}
                  className="py-2 px-4 text-white bg-red-500 rounded-lg shadow-md"
                >
                  Hủy
                </button>
                <Modal
                  open={openCancel}
                  onClose={handleCloseCancel}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <p className="text-[24px] text-center font-bold">Xác nhận hủy hóa đơn {params.row.id_hdx}</p>
                    <div>
                      <button
                        onClick={() => handleCancel()}
                        className="block mt-6 mx-auto py-2 px-4 text-white bg-sky-500 rounded-lg shadow-md"
                      >
                        Hủy hóa đơn
                      </button>
                    </div>
                  </Box>
                </Modal>
              </div>
            </>
          ) : (
            <>
              <div>
                <button className="py-2 px-4 text-white bg-sky-500 opacity-50 rounded-lg shadow-md cursor-not-allowed">
                  Xác nhận
                </button>
              </div>
              <div>
                <button className="py-2 px-4 text-white bg-red-500 opacity-50 rounded-lg shadow-md cursor-not-allowed">
                  Hủy
                </button>
              </div>
            </>
          )}
          <div>
            <button
              onClick={() => handleView(params.row.id_hdx)}
              className="py-2 px-4 text-white bg-slate-800 rounded-lg shadow-md"
            >
              Xem hóa đơn
            </button>
            <Modal
              open={openView}
              onClose={handleCloseView}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={styleView}>
                <p className="text-[24px] text-center font-medium">Thông tin hóa đơn</p>
                <div className="">
                  <div className="">
                    <p>
                      Tên khách hàng: <strong>{params.row.ten_kh}</strong>
                    </p>
                    <p>
                      Số điện thoại: <strong>{params.row.sdt_kh}</strong>
                    </p>
                    <p>
                      Địa chỉ: <strong>{params.row.dia_chi}</strong>
                    </p>
                  </div>
                  <div>
                    {listOrder?.map(
                      ({ten_sp, gia_ban_sp, giam_gia, hinh_anh, so_luong_xuat, kich_thuoc, mau_sac}, idx) => (
                        <div className="relative mt-4 flex gap-5 items-center" key={idx}>
                          <div className="w-[12%]">
                            <img className="border-2 border-slate-500 rounded-md" src={hinh_anh} alt="" />
                          </div>
                          <div className="w-[40%] text-[16px]">
                            <p>{ten_sp}</p>
                          </div>
                          <div className="w-[15%]">
                            <p className="text-[18px] font-bold">
                              {!!giam_gia ? (
                                <>
                                  {new Intl.NumberFormat("vi-VN", {style: "currency", currency: "VND"}).format(
                                    gia_ban_sp - (gia_ban_sp * giam_gia) / 100,
                                  )}
                                </>
                              ) : (
                                <>
                                  {new Intl.NumberFormat("vi-VN", {style: "currency", currency: "VND"}).format(
                                    gia_ban_sp,
                                  )}
                                </>
                              )}
                            </p>
                          </div>
                          <div className="w-[33%] text-center">
                            <p className="text-[16px] text-slate-600">Số lượng: {so_luong_xuat}</p>
                          </div>

                          <div className="absolute flex gap-5 left-[13.5%] top-[75%] text-slate-500 text-[14px]">
                            <div>
                              <p>Màu sắc: {mau_sac}</p>
                            </div>
                            <div>
                              <p>Kích thước: {kich_thuoc}</p>
                            </div>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>
                <div>
                  <button
                    onClick={handleCloseView}
                    className="block mt-6 mx-auto py-2 px-4 text-white bg-sky-500 rounded-lg shadow-md"
                  >
                    Đóng
                  </button>
                </div>
              </Box>
            </Modal>
          </div>
        </div>
      ),
    },
  ];

  const rows = dataBill?.map(
    (
      {id_hdx, ten_kh, so_dien_thoai, tong_tien_hdx, trang_thai, ngay_lap_hdx, hinh_thuc_thanh_toan, dia_chi_hdx},
      idx,
    ) => ({
      id: idx,
      id_hdx: id_hdx,
      ten_kh: ten_kh,
      sdt_kh: so_dien_thoai,
      dia_chi: dia_chi_hdx,
      tong_tien: `${new Intl.NumberFormat("vi-VN", {style: "currency", currency: "VND"}).format(tong_tien_hdx)}`,
      trang_thai: trang_thai,
      ngay_lap: moment(ngay_lap_hdx).format("DD-MM-YYYY"),
      hinh_thuc: hinh_thuc_thanh_toan === "offline" ? "Khi nhận hàng" : "Qua ngân hàng",
    }),
  );

  return (
    <div className="px-[20px]">
      <div style={{height: 550, width: "100%"}}>
        <DataGrid rows={rows} columns={columns} pageSize={8} rowsPerPageOptions={[8]} />
      </div>
    </div>
  );
}

export default ExportInvoice;
