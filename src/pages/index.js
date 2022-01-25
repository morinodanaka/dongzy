/* This example requires Tailwind CSS v2.0+ */
import React, { useState } from "react";
import { Button } from "../components/button/button";
import DynamicInput from "../components/dynamicInput";
import { rules } from "../utils/rules";
import "./style.scss";

export default function Example() {
  const [values, setValues] = useState();
  const [initialState, setInitialState] = useState({
    0: {
      items: {
        0: { thing: "moz", price: "1000" },
        1: { thing: "sib", price: "2000" },
      },

      name: "alireza",
    },

    1: {
      items: {
        0: { thing: "an", price: "1000" },
        1: { thing: "goh", price: "3000" },
      },

      name: "tina",
    },
  });
  const onSubmit = () => {
    const userVal = Object.values(values).reduce((total, acc) => {
      const priceVal = Object.values(acc.items).reduce((sum, item) => {
        return sum + Number(item.price);
      }, 0);

      total[acc.name] = priceVal;
      total["total"] = total["total"] ? total["total"] + priceVal : priceVal;
      total["usersCount"] = total["usersCount"] ? total["usersCount"] + 1 : 1;
      return total;
    }, {});
    userVal.dong = userVal.total / userVal.usersCount;
    userVal.userDong = Object.values(values).map((val) => {
      return { [val.name]: userVal[val.name] - userVal.dong };
    });
    console.log(userVal, "userVal");
  };
  const dataCacher = (data) => {
    console.log(data, "data");
    setValues(data);
  };

  console.log(values, "values");
  return (
    <>
      <DynamicInput
        onChange={dataCacher}
        rules={rules}
        value={initialState}
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
