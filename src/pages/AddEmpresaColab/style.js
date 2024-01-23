import styled from "styled-components";

export const TableStyle = styled.div`
.table-area {
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: 90vh;
  background-color: var(--branco) !important;
  flex: 1;
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
        widht: 30px;
        heigth: 30px;
        border-bottom: none !important;
        color: var(--preto-primario);
      }
    }

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

.acoes-button {
  display: flex;
  margin-left:50px:
  
}  
.custom {
  width: 25px;
  height: 25px;
  // margin-left: 12px;
}
`;
