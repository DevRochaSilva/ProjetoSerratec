import { React } from "react";
import Button from "react-bootstrap/Button";

import { ButtonStyle } from "./style";

function ButtonComponent({
  type,
  size,
  height,
  bgColor,
  textColor,
  action,
  alternativeText,
  children,
}) {
  return (
    <ButtonStyle
      size={size}
      height={height}
      bgColor={bgColor}
      textColor={textColor}
    >
      <Button
        role="button"
        aria-label={alternativeText}
        title={alternativeText}
        variant={bgColor}
        className="botao-default"
        style={{ maxWidth: "100%" }}
        onClick={action}
        type={type}
      >
        {children}
      </Button>
    </ButtonStyle>
  );
}

export default ButtonComponent;
