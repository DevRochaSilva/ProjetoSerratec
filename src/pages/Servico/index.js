import React from "react";
import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";
import ButtonComponent from "../../components/Button";
import { ServicoStyle } from "./style";
import { ContainerWithSidebar } from "../../components/ContainerWithSidebar";
import { Link } from "react-router-dom";
import VoltarButton from "../../components/VoltarButton";
import { FiTool } from "react-icons/fi";

function Servico({
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
          title={`Serviço`}
          icon={<FiTool style={{ fontSize: '30px' }} />}
        />
        <PageContentContainer>
          <ServicoStyle>
            <Container>
              <Row
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Col
                  sm={12}
                  md={12}
                  lg={12}
                  title={"Cadastrar Serviço"}>
                  <Link to="/cadastrarServico">
                    <ButtonComponent
                      height="6rem"
                      size="18rem"
                      bgColor="var(--verde-primario)"
                      textColor="#FFF"
                    >
                      <span>Cadastrar Serviço</span>
                    </ButtonComponent>
                  </Link>
                </Col>
              </Row>
            </Container>
            <Container>
              <Row
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Col
                  sm={12}
                  md={12}
                  lg={12}
                  title={"Buscar Serviço"}>
                  <Link to="/buscarServico">
                    <ButtonComponent
                      height="6rem"
                      size="18rem"
                      bgColor="var(--verde-primario)"
                      textColor="#FFF"
                    >
                      <span>Buscar Serviço</span>
                    </ButtonComponent>
                  </Link>
                </Col>
              </Row>
            </Container>
            <VoltarButton
              size="18rem"
              bgColor="var(--cinza-primario)"
              textColor=""
            >
            </VoltarButton>
          </ServicoStyle>
        </PageContentContainer>
      </PageContainer>
    </ContainerWithSidebar>
  );
}

export default Servico;
