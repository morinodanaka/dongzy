import React, { useState, useEffect } from "react";
import { Button } from "../button/button";
import "./style.scss";

function DynamicInput({ name, rules, label, children, ...props }) {
  const [counter, setConter] = useState(2);
  const [values, setValues] = useState(
    props.value
      ? props.value
      : {
          0: {
            dong: {
              0: { thing: "moz", price: "1000" },
              1: { thing: "sib", price: "2000" },
            },

            name: "alireza",
          },

          1: {
            dong: {
              0: { thing: "an", price: "1000" },
              1: { thing: "goh", price: "3000" },
            },

            name: "tina",
          },
        }
  );

  const handleAdd = () => {
    setConter(counter + 1);
  };
  const handleRemove = (deletingIndex) => {
    setConter(counter - 1);
    const initialValues = Object.values(values);
    initialValues.splice(deletingIndex, 1);
    const initialValuesObj = Object.assign({}, initialValues);
    setValues(initialValuesObj);
  };
  const handleOnchange = (e, counterIndex, nameIndex) => {
    // onChange Inputs d1 & d2
    setValues({
      ...values,
      [counterIndex]: {
        ...values[counterIndex],
        [name[nameIndex]]: e.target.value,
      },
    });
  };
  const handleOnchangeDynamic = (data, rowIndex) => {
    // onChange d2
    setValues({
      ...values,
      [rowIndex]: {
        ...values[rowIndex],
        dong: data,
      },
    });
  };

  useEffect(() => {
    // onChange d1 && d2
    props.onChange && props.onChange(values);
  }, [values]);

  const rows = Array.from(new Array(counter));
  return (
    <div className="dynamicInput row">
      <label>{label}</label>:
      <Button type={"add"} onPress={handleAdd}>
        +
      </Button>
      <div className="fieldWrp">
        {rows.map((_, counterIndex) => {
          return (
            <div className="flieldData" key={counterIndex}>
              {rows.length > 1 && (
                <Button
                  type={"remove"}
                  onPress={() => handleRemove(counterIndex)}
                >
                  -
                </Button>
              )}
              {children.length
                ? children.map((child, i) => {
                    return React.cloneElement(
                      child,
                      child.type === "input"
                        ? {
                            value:
                              values[counterIndex] &&
                              values[counterIndex][name[i]],
                            onChange: (e) => handleOnchange(e, counterIndex, i),
                          }
                        : {
                            value:
                              values[counterIndex] && values[counterIndex].dong,
                            onChange: (values) =>
                              handleOnchangeDynamic(values, counterIndex),
                          }
                    );
                  })
                : React.cloneElement(children, {
                    value:
                      values[counterIndex] &&
                      values[counterIndex][name[counterIndex]],
                    onChange: (e) => handleOnchange(e, counterIndex, 0),
                  })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default DynamicInput;
