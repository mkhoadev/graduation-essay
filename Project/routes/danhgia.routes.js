module.exports = (app) => {
  const review = require("../controllers/danhgia.controller");

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post("/api/manage/review/add", review.createReview);

  app.get("/api/manage/review/list", review.getListReview);

  app.get("/api/manage/review/idhdx=:idhdx", review.getReview);

  app.get("/api/manage/review/idsp=:idsp", review.getReviewProduct);

  app.get("/api/manage/review/idhdx=:idhdx", review.getReviewInvoice);

  app.get("/api/manage/one_review", review.getOneReview);

  app.put("/api/manage/update_status/status=:status/iddg=:iddg", review.updateStatus);
};
