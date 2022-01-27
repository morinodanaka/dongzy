/* This example requires Tailwind CSS v2.0+ */
import React, { useState } from "react";
import { Button } from "../components/button/button";
import DynamicInput from "../components/dynamicInput";
import Input from "../components/input";
import { rules } from "../utils/rules";
import "./style.scss";

export default function Example() {
  const [values, setValues] = useState();
  const [finalDong, setFinalDong] = useState();
  const onSubmit = () => {
    const userVal = Object.values(values).reduce((total, acc) => {
      const priceVal = Object.values(acc.items).reduce((sum, item) => {
        return sum + Number(item.price);
      }, 0);
      if (acc.name) {
        total[acc.name] = priceVal;
        total["total"] = total["total"] ? total["total"] + priceVal : priceVal;
        total["usersCount"] = total["usersCount"] ? total["usersCount"] + 1 : 1;
      }
      return total;
    }, {});
    userVal.dong = Math.floor(userVal.total / userVal.usersCount);
    userVal.userDong = Object.values(values).reduce((total, val) => {
      if (val.name) {
        total.push({ [val.name]: userVal[val.name] - userVal.dong });
      }
      return total;
    }, []);
    setFinalDong(userVal);
  };
  const dataCacher = (data) => {
    setValues(data);
  };

  console.log(finalDong, "finalDong");
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

      <Button type={"submit"} onClick={onSubmit}>
        submit
      </Button>
    </>
  );
}
