const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

app.use(cors());
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
require("./routes/chitiethdn.routes")(app);
require("./routes/thuonghieu.routes")(app);
require("./routes/loaisanpham.routes")(app);


//

const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
