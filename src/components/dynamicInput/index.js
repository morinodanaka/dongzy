import React, { useState, useEffect } from "react";
import { Button } from "../button/button";
import "./style.scss";

function DynamicInput({ name, rules, labels, children, ...props }) {
  const [counter, setConter] = useState(1);
  const [values, setValues] = useState(props.value ? props.value : {});

  const handleAdd = () => {
    setConter(counter + 1);
  };
  const handleRemove = (deletingIndex) => {
    setConter(counter - 1);
    const values = Object.values(values);
    values.splice(deletingIndex, 1);
    const valuesObj = Object.assign({}, values);
    setValues(valuesObj);
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
        items: data,
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
      <Button type={"add"} onClick={handleAdd}>
        +
      </Button>
      <div className="fieldWrp">
        {rows.map((_, counterIndex) => {
          return (
            <div className="flieldData" key={counterIndex}>
              {rows.length > 1 && (
                <Button
                  type={"remove"}
                  onClick={() => handleRemove(counterIndex)}
                >
                  -
                </Button>
              )}
              {children.length
                ? children.map((child, i) => {
                    return React.cloneElement(
                      child,
                      child.type.name === "Input"
                        ? {
                            value:
                              values[counterIndex] &&
                              values[counterIndex][name[i]],
                            onChange: (e) => handleOnchange(e, counterIndex, i),
                          }
                        : {
                            value:
                              values[counterIndex] &&
                              values[counterIndex].items,
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
