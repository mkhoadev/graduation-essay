import React, {useEffect, useState} from "react";
import reviewAPI from "../../../api/reviewsAPI";
import Rating from "@mui/material/Rating";
import {AiFillEyeInvisible, AiFillEye} from "react-icons/ai";
import moment from "moment";

function Reviews() {
  const [reviewList, setReviewList] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    (async () => {
      const reviewList = await reviewAPI.getListReview();
      console.log(reviewList);
      setReviewList(reviewList);
    })();
  }, [count]);

  const updateStatus = async (iddg, status) => {
    console.log(status);
    await reviewAPI.updateStatus(iddg, status);
    setCount((e) => e + 1);
  };
  return (
    <div className="grid grid-cols-4 gap-5 mx-4">
      {reviewList?.map(({id_dg, ten_sp, so_sao, ngay_dg, noi_dung_dg, trang_thai_dg}, idx) => (
        <div key={idx} className="px-3 py-3 bg-slate-100 rounded-lg ">
          <p>Ngày đánh giá: {moment(ngay_dg).format("DD-MM-YYYY")}</p>
          <Rating name="read-only" value={so_sao} readOnly />
          <p>Tên sản phẩm: {ten_sp}</p>
          <p>
            Nội dung: <span className="font-medium">{noi_dung_dg}</span>
          </p>
          {trang_thai_dg === 0 ? (
            <button onClick={() => updateStatus(id_dg, 1)} className="block ml-auto mr-0">
              <AiFillEye size={25} />
            </button>
          ) : (
            <button onClick={() => updateStatus(id_dg, 0)} className="block ml-auto mr-0">
              <AiFillEyeInvisible size={25} />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Reviews;
