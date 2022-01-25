/* This example requires Tailwind CSS v2.0+ */
import React, { useState } from "react";
import { Button } from "../components/button/button";
import DynamicInput from "../components/dynamicInput";
import "./style.scss";

export default function Example() {
  const [person, setPerson] = useState("");
  const [things, setThings] = useState("");
  const [price, setPrice] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <DynamicInput label={"label"}>
          <input
            className="bg-slate-400"
            value={person}
            onChange={(e) => setPerson(e.target.value)}
          />
          <DynamicInput label={"label"}>
            <input
              className="bg-slate-400"
              value={things}
              onChange={(e) => setThings(e.target.value)}
            />
            <input
              className="bg-slate-400"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </DynamicInput>
        </DynamicInput>
        <Button type={"submit"}>submit</Button>
      </form>
    </>
  );
}
