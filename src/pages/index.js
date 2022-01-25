/* This example requires Tailwind CSS v2.0+ */
import React, { useState } from "react";
import { Button } from "../components/button/button";
import DynamicInput from "../components/dynamicInput";
import { rules } from "../utils/rules";
import "./style.scss";

export default function Example() {
  const [values, setValues] = useState();
  const onSubmit = (e) => {
    e.preventDefault();
  };
  const dataCacher = (data) => {
    console.log(data, "data");
    // setValues(data);
  };

  console.log(values, "values");
  return (
    <>
      <DynamicInput
        onChange={dataCacher}
        rules={rules}
        label={"name"}
        name={["name"]}
      >
        <input className="bg-slate-400" />
        <DynamicInput name={["thing", "price"]} rules={rules} label={"thing"}>
          <input className="bg-slate-400" />
          <input className="bg-slate-400" />
        </DynamicInput>
      </DynamicInput>

      <Button onClick={onSubmit}>submit</Button>
    </>
  );
}
