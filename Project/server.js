const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routes Init
require("./routes/khachhang.routes")(app);
require("./routes/nhanvien.routes")(app);
require("./routes/sanpham.routes")(app);
require("./routes/kichthuoc.routes")(app);
require("./routes/mausac.routes")(app);
require("./routes/hinhanh.routes")(app);
require("./routes/hoadonnhap.routes")(app);
require("./routes/hoadonxuat.routes")(app);
require("./routes/chitiethdn.routes")(app);
require("./routes/chitiethdx.routes")(app);
require("./routes/thuonghieu.routes")(app);
require("./routes/loaisanpham.routes")(app);
require("./routes/khuyenmai.routes")(app);
require("./routes/chucvu.routes")(app);
require("./routes/diachi.routes")(app);
require("./routes/thanhtoanonline.routes")(app);
require("./routes/verifyEmail.routes")(app);
require("./routes/boloc.routes")(app);
require("./routes/danhgia.routes")(app);
require("./routes/chitietsanpham.routes")(app);
require("./routes/giaohang.routes")(app);
require("./routes/hinhanhdanhgia.routes")(app);

const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

