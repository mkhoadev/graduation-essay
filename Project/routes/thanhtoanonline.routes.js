module.exports = (app) => {
  const payOnline = require("../controllers/thanhtoanonline.controller");

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post("/create_payment_url", payOnline.create_payment_url);

  app.get("/vnpay_ipn", payOnline.vnpay_ipn);
};
