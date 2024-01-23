import styled from "styled-components";

export const SideBarItemStyle = styled.div`
  
    width: ${(props) => (props.collapse ? "auto" : "100%")};
    padding: 0.5rem;
    transition: 0.3s;
    :hover {
      color: ${(props) =>
        props.collapse
          ? "var(--preto-primario) !important"
          : "var(--branco) !important"};
      background-color: ${(props) =>
        props.collapse ? "none" : "var(--verde-primario2)"};
    }
  

  .acessibility-icons-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: ${(props) =>
      props.collapse
        ? "var(--preto-primario) !important"
        : "var(--preto-primario) !important"};
    &:hover {
      cursor: pointer;
      color: ${(props) =>
        props.collapse ? "var(--verde-primario2) !important" : ""};
    }
    svg {
      font-size: 24px;
      &:hover {
        color: ${(props) =>
          props.collapse
            ? "var(--verde-primario2) !important"
            : "var(--verde-primario2) !important"};
      }
    }
  }

  .label-sidebar {
    user-select: none;
    font-size: "19px";
  }

  .item-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    user-select: none;
  }

  .item-label {
    margin-top: 1px;
    font-size: 16px;
    font-weight: bold;
  }
`;
