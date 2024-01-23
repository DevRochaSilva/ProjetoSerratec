import React from "react";
import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import SearchComponent from "../../components/BuscaComponent";
import PaginationComponent from "../../components/Paginacao";
import { FaListUl } from "react-icons/fa";

import { ContainerWithSidebar } from "../../components/ContainerWithSidebar";
import BackButton from "../../components/VoltarButton";
import TabelaColaboradores from "../../components/TabelaColaborador";

function BuscarColaborador({
  HandledarkMode,
  isDarkMode,
  decreaseFontSize,
  increaseFontSize,
  logOut,
}) {
  return (
    <ContainerWithSidebar
      increaseFontSize={increaseFontSize}
      decreaseFontSize={decreaseFontSize}
      HandledarkMode={HandledarkMode}
      isDarkMode={isDarkMode}
      logOut={logOut}
    >
      <PageContainer>
        <PageHeaderContainer
          title="Buscar Colaborador"
          icon={<FaListUl size="30px" />}
        />
        <PageContentContainer>
          <Container className="mb-3">
            <TabelaColaboradores />
          </Container>
          <Container>
            <BackButton
              size="18rem"
              bgColor="var(--cinza-primario)"
              textColor=""
            ></BackButton>
          </Container>
        </PageContentContainer>
      </PageContainer>
    </ContainerWithSidebar>
  );
}

export default BuscarColaborador;
