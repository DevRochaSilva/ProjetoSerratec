import styled from "styled-components";

export const SidebarMobileNavStyle = styled.div`
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  color: var(--preto-primario);
  background-color: var(--branco-primario);

  .collapse-sidebar-action {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .collapse-sidebar-action:hover {
    cursor: pointer;
  }

  .sidebar-mobile-nav {
    display: flex;
    gap: 1.2rem;

    .sidebar-nav-item {
      .area-icons-label {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        svg {
          font-size: 24px;
        }
      }
    }
  }

  .user-container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: ${(props) =>
      props.collapse ? "var(--branco-primario)" : "var(--verde-primario3)"};
    color: var(--branco-primario);
    padding: 0.4rem;
    width: 100%;
    border-radius: 5px;

    svg {
      font-size: 28px;
      color: var(--branco);
    }

    .user-info {
      display: flex;
      flex-direction: column;
      font-size: 100%;

      #user-departamento {
        font-size: 100%;
        font-weight: 200;
      }
    }
  }
`;

export const LogoArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  padding: 0.2rem;
  background-color: var(--branco-primario) !important;

  img {
    width: 100%;
    max-width: 7rem;
  }

  span {
    color: var(--verde-primario3);
    font-weight: bold;
    text-align: center;
  }
`;

export const SidebarMobileStyle = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  background-color: var(--branco) !important;
  z-index: 999;

  .button-show-area {
    padding: 1rem;
    box-shadow: 1px 1px 5px var(--preto-primario);
    display: flex !important;
    justify-content: space-between;
    align-items: center;
    background-color: var(--branco) !important;

    .central-area {
      display: flex;

      justify-content: center;
      align-items: center;

      img {
        width: 5rem;
      }

      span {
        color: var(--verde-secundario);
        font-weight: bold;
        text-align: center;
        font-size: 1.8rem;
      }

      span::before {
        content: " - ";
      }
    }

    .right-area {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 0.5rem;

      svg {
        font-size: 36px;
      }
    }

    .button-show {
      background-color: var(--branco) !important;

      width: 42px !important;
      svg {
        font-size: 36px;
        transition: 0.3s;
        color: var(--preto-primario);
        &:hover {
          cursor: pointer;
          color: var(--verde-primario) !important;
        }
      }
    }
  }
`;

export const CloseIconArea = styled.div`
  svg {
    font-size: 24px !important;
    transition: 0.3s;

    &:hover {
      cursor: pointer;
      color: var(--verde-primario) !important;
    }
  }
`;
