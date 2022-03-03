import React from "react";

function CardProfile() {
  return (
    <div className="w-full h-[200px] mb-4 p-3 bg-slate-200 rounded-lg">
      <input className="w-5 h-5" type="radio" name="address" />
      <div className="leading-8">
        <p><strong>Name:</strong> Dao Minh Khoa</p>
        <p><strong>Email:</strong> khoab1809248@student.ctu.edu.vn</p>
        <p><strong>Phone:</strong> 0398423952</p>
        <p><strong>Address:</strong> 30/4, Hung Loi, Ninh Kieu, Can Tho</p>
      </div>
    </div>
  );
}

export default CardProfile;
