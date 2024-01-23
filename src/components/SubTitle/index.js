import React from "react";
import { SubTitleStyle } from "./style";

const SubTitle = ({ subtitle }) => {
  return (
    <SubTitleStyle>
      <span>{subtitle}</span>
      <hr />
    </SubTitleStyle>
  );
};

export default SubTitle;
