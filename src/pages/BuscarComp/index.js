import React from "react";
import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import PaginationComponent from "../../components/Paginacao";
import { FaListUl } from "react-icons/fa";

import { ContainerWithSidebar } from "../../components/ContainerWithSidebar";
import TabelaComp from "../../components/TabelaComp";
import BackButton from "../../components/VoltarButton";
import VoltarButton from "../../components/VoltarButton";

function BuscarComp({
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
          title="Buscar Competência"
          icon={<FaListUl style={{ fontSize: "30px" }} />}
        />
        <PageContentContainer>
          <Container className="mb-3">
            <TabelaComp />
          </Container>
          <Container>
            <VoltarButton
              size="18rem"
              bgColor="var(--cinza-primario)"
              textColor=""
            ></VoltarButton>
          </Container>
        </PageContentContainer>
      </PageContainer>
    </ContainerWithSidebar>
  );
}

export default BuscarComp;
