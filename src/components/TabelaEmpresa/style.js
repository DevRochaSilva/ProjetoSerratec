import styled from "styled-components";

export const TableStyle2 = styled.div`
  .table-area {
    width: 100%;
    background-color: var(--branco) !important;
    flex: 1 1;
    overflow-y: hidden !important;
  }

  .table {
    thead {
      th {
        color: var(--preto-primario);
      }
    }
    tbody {
      tr {
        td {
          border-bottom: none !important;
          color: var(--preto-primario);
        }
      }

      .action-column {
        text-align: center;

        #delete-icon {
          color: var(--vermelho-perigo);
          &:hover {
            color: var(--verde-primario);
            cursor: pointer;
          }
        }

        svg {
          font-size: 24px;
          &:hover {
            color: var(--verde-primario);
            cursor: pointer;
          }
        }
      }
    }
  }

  @media screen and (max-width: 800px) {
    .table-area {
      overflow-y: scroll !important;
    }
  }

  .action-column {
    display: flex;
    gap: 8px;
  }

  .action-column a {
    text-decoration: none;
  }

  .icon {
    vertical-align: middle;
  }
  .acoes-button {
    display: flex;
    gap: 30px;
  }

  .acoes {
    display: flex;
    margin-left: 45px;
  }
`;
