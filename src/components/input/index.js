import React from "react";

function Input(props) {
  return (
    <>
      <div>
        <label>{props.label}:</label>
        <input className="bg-slate-400" type={props.type} />
      </div>
    </>
  );
}
export default Input;
