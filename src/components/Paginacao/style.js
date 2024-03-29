import styled from "styled-components";

export const PaginationStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid var(--cinza-primario);
  background-color: var(--branco);
  border-radius: 5px;
  padding: 0.5rem;

  select {
    outline: none !important;
    box-shadow: none !important;

    &:focus {
      border-bottom: 2px solid var(--verde-primario) !important;
      border: 0px;
    }
  }

  .select-per-page {
    width: 10%;
    min-width: 5rem;
    border-radius: 0 !important;

    &:focus {
      outline: none !important;
    }
  }

  .area-paginacao {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 50%;

    svg {
      font-size: 24px;
      color: var(--preto-primario);

      &:hover {
        color: var(--verde-primario);
        cursor: pointer;
      }
    }
  }
`;
