import React from "react";
import { ButtonWrapper } from "./Button.styled";

const Button = (props) => {
  return <ButtonWrapper {...props}>{props.children}</ButtonWrapper>;
};

export default Button;
