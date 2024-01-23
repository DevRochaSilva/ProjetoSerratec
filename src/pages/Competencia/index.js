import React from "react";
import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";
import ButtonComponent from "../../components/Button";
import { CompetenciaStyle } from "./style";
import { ContainerWithSidebar } from "../../components/ContainerWithSidebar";
import { Link } from "react-router-dom";
import VoltarButton from "../../components/VoltarButton";
import { BiAward } from "react-icons/bi";

function Competencia({
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
          title={`Competência`}
          icon={<BiAward style={{ fontSize: '30px' }} />}
        />
        <PageContentContainer>
          <CompetenciaStyle>
            <Container>
              <Row
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Col
                  sm={12}
                  md={12}
                  lg={12}
                  title={"Cadastrar Competência"}
                >
                  <Link to="/cadastrarCompetencia">
                    <ButtonComponent
                      height="6rem"
                      size="18rem"
                      bgColor="var(--verde-primario)"
                      textColor="#FFF"
                    >
                      <span>Cadastrar Competência</span>
                    </ButtonComponent>
                  </Link>
                </Col>
              </Row>
            </Container>
            <Container>
              <Row
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Col sm={12} md={12} lg={12} title={"Buscar Competência"}>
                  <Link to="/buscarComp">
                    <ButtonComponent
                      height="6rem"
                      size="18rem"
                      bgColor="var(--verde-primario)"
                      textColor="#FFF"
                    >
                      <span>Buscar Competência</span>
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
          </CompetenciaStyle>
        </PageContentContainer>
      </PageContainer>
    </ContainerWithSidebar>
  );
}

export default Competencia;
