/* This example requires Tailwind CSS v2.0+ */
import React, { useState } from "react";
import { Button } from "../components/button/button";
import DynamicInput from "../components/dynamicInput";
import Input from "../components/input";
import { rules } from "../utils/rules";
import "./style.scss";

export default function Example() {
  const [values, setValues] = useState();

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
        value={values}
        name={["name"]}
      >
        <Input type={"text"} label={"name"} />
        <DynamicInput name={["thing", "price"]} rules={rules}>
          <Input type={"text"} label={"thing"} />
          <Input type={"text"} label={"price"} />
        </DynamicInput>
      </DynamicInput>

      <Button onClick={onSubmit}>submit</Button>
    </>
  );
}
