import React from "react";

function FormProfile() {
  return (
    <div className="w-[500px] p-4 bg-slate-200 rounded-lg">
      <form>
        <div className="flex gap-20">
          <p>Name</p>
          <input className="w-full py-1 px-2 rounded-lg" type="text" />
        </div>
        <div className="flex gap-20 mt-2">
          <p>Phone</p>
          <input className="w-full py-1 px-2 rounded-lg" type="text" />
        </div>
        <div className="flex gap-16 mt-2">
          <p>Address</p>
          <input className="w-full py-1 px-2 rounded-lg" type="text" />
        </div>
        <button className="mt-5 py-2 px-6 text-white bg-slate-500 rounded-lg">Submit</button>
      </form>
    </div>
  );
}

export default FormProfile;
