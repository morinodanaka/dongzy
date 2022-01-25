import React from "react";
import "./style.scss";
export const Button = ({ children, onPress, type, ...props }) => {
  const handleType = () => {
    switch (type) {
      case "submit":
        return { background: "rgb(80 95 175)", color: "#fff" };
      case "remove":
        return {
          background: "rgb(204 55 106)",
          width: "40px",
          height: "40px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          marginLeft: "5px",
        };
      case "add":
        return {
          background: "#009688",
          width: "40px",
          height: "40px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
        };
    }
  };

  return (
    <button style={handleType()} onClick={onPress}>
      {children}
    </button>
  );
};
