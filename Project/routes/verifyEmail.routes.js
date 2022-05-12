module.exports = (app) => {
  const verifyEmail = require("../controllers/verifyEmail.controller");

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.get("/api/verify_email/email=:email", verifyEmail.sendCode);
};
