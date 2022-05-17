// const {v4: uuidv4} = require("uuid");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
// const httpServer = require("http").createServer();
// const io = require("socket.io")(httpServer, {
//   cors: {
//     origin: "*",
//   },
// });

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

// ====================== Socket =======================
// let users = [];
// io.on("connection", (socket) => {
//   socket.on("user_connected", (username) => {
//     users.push({
//       id: socket.id,
//       username: username,
//     });
//     io.emit("user_connected", username);

//     io.emit("users", users);
//   });

//   var message = [];
//   socket.on("send_message", (data) => {
//     const userId = users.findIndex((item) => item.username === data.receiver);
//     const socketId = users[userId].id;
//     message.push(data);
//     io.to(socketId).emit("new_message", message);
//   });

//   socket.on("disconnect", () => {
//     users = users.filter((item) => item.id !== socket.id);
//     console.log("User Disconnect", socket.id);
//   });
// });

// io.listen(3108, () => {
//   console.log("Server đang chay tren cong 3108");
// });
