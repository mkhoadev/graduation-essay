module.exports = (app) => {
  const customer = require("../controllers/khachhang.controller");

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post("/api/auth/signup", customer.createUser);

  app.post("/api/auth/signin", customer.getUser);

  app.get("/api/checkuser/email=:email", customer.checkUser)
  
  app.get("/api/get_user/id_kh=:id_kh", customer.getOneUser)

  app.put("/api/change_password/email=:email", customer.changePassword)
};


