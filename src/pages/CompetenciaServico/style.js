import styled from "styled-components";

export const TableStyle2 = styled.div`
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
  gap: 30px;

}  
`;

export const ButtonContainer = styled.div`
  display: flex;
  margin-top: 10px;
  width: 100%;
  text-align: right;
  padding: 30px 50px 20px;
  justify-content: space-between;
`;
