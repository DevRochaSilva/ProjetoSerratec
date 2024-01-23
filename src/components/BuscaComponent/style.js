import styled from "styled-components";

export const SearchStyle = styled.div`
  input {
    outline: none !important;
    box-shadow: none !important;

    &:focus {
      border-bottom: 2px solid var(--verde-primario) !important;
      border: 0px;
      border-radius: 0px;
    }
  }
`;
