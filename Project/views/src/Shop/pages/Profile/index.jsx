import React from "react";
import CardProfile from "../../../components/CardProfile";
import FormProfile from "../../../components/FormProfile";

function Profile() {
 
  return (
    <div className="flex gap-4 w-[60%] mx-auto">
      <div className="w-[40%]">
        <CardProfile />
        <CardProfile />
      </div>
      <div className="w-[60%]">
        <FormProfile />
      </div>
    </div>
  );
}

export default Profile;
