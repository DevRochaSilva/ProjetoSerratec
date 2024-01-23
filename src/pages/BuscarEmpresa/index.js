import React from "react";
import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { ContainerWithSidebar } from "../../components/ContainerWithSidebar";
import { FaListUl } from "react-icons/fa";
import VoltarButton from "../../components/VoltarButton";
import TabelaEmpresa from "../../components/TabelaEmpresa/index";

function BuscarEmpresa({
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
          icon={<FaListUl style={{ fontSize: "30px" }} />}
          title={`Buscar Empresa`}
        />
        <PageContentContainer>
          <Container className="mb-3">
            <TabelaEmpresa />
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

export default BuscarEmpresa;
