import React from "react";
import "./style.scss";
function Input({ label, ...props }) {
  return (
    <>
      <div className="inputWrp">
        <label>{label}:</label>
        <input {...props} className="bg-slate-400" />
      </div>
    </>
  );
}
export default Input;
