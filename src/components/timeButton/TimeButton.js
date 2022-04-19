import React from "react";
import { styled } from "@mui/system";

const TimeButton = ({ state, setDays, days }) => {
  const Button = styled("button")(({ theme }) => ({
    [theme.breakpoints.up("lg")]: {
      margin: "10px",
      padding: "10px",
      borderRadius: "10px",
      outline: "none",
      border: "0",
      cursor: "pointer",
      width: "200px",
      backgroundColor: `${days === state.value ? "#EEBC1D" : "transparent"}`,
      border: "1px solid #EEBC1D",
      color: `${days === state.value ? "black" : "white"}`,
      fontWeight: "bold",
    },
    [theme.breakpoints.down("lg")]: {
      margin: "10px",
      color: "white",
      padding: "10px",
      borderRadius: "10px",
      outline: "none",
      border: "0",
      cursor: "pointer",
      backgroundColor: `${days === state.value ? "#EEBC1D" : "transparent"}`,
      border: "1px solid #EEBC1D",
      color: `${days === state.value ? "black" : "white"}`,
      fontWeight: "bold",
    },
  }));

  return (
    <div>
      <Button onClick={(e) => setDays(state.value)}>{state.label}</Button>
    </div>
  );
};

export default TimeButton;
