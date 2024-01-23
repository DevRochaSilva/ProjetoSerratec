import styled from "styled-components";

export const ButtonStyleBack = styled.div`
  .botao-default {
    width: 10rem !important;
    height: ${(props) => props.height} !important;
    background-color: ${(props) => props.bgColor} !important;
    color: ${(props) => props.textColor} !important;
    border: none !important;
    transition: 0.3s;

    &:hover {
      filter: brightness(0.8);
    }
  }
`;
