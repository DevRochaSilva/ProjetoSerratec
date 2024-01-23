import React from "react";
import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";
import "bootstrap/dist/css/bootstrap.min.css";
import { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ButtonComponent from "../../components/Button";
import { HomeStyle } from "./style";
import { ContainerWithSidebar } from "../../components/ContainerWithSidebar";
import { AuthenticationContext } from "../../services/context/AuthContext";
import { Link } from "react-router-dom";
import { CgHome } from "react-icons/cg";

function Home({
  HandledarkMode,
  isDarkMode,
  decreaseFontSize,
  increaseFontSize,
  logOut,
}) {
  const { user } = useContext(AuthenticationContext);

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
          title="Sistema de Competência" icon={<CgHome size="30px" />}
        />
        <PageContentContainer>
          <HomeStyle>
            <Container>
              <Row
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Col
                  sm={12}
                  md={12}
                  lg={12}
                  title={"Competência"}>
                  <Link to="/competencia">
                    <ButtonComponent 
                      tabIndex={-1}
                      height="6rem"
                      size="18rem"
                      bgColor="var(--verde-primario)"
                      textColor="#FFF"
                    >
                      <span>Competência</span>
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
                  title={"Colaborador"}>
                  <Link to="/buscarColaborador">
                    <ButtonComponent
                      tabIndex={-1}
                      height="6rem"
                      size="18rem"
                      bgColor="var(--verde-primario)"
                      textColor="#FFF"
                    >
                      <span>Colaborador</span>
                    </ButtonComponent>
                  </Link>
                </Col>
              </Row>
            </Container>
          </HomeStyle>
          <HomeStyle>
            <Container>
              <Row
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Col
                  sm={12}
                  md={12}
                  lg={12}
                  title={"Competência"}>
                  <Link to="/servico">
                    <ButtonComponent
                      tabIndex={-1}
                      height="6rem"
                      size="18rem"
                      bgColor="var(--verde-primario)"
                      textColor="#FFF"
                    >
                      <span>Serviço</span>
                    </ButtonComponent>
                  </Link>
                </Col>
              </Row>
            </Container>
          </HomeStyle>
          <HomeStyle>
            <Container>
              <Row
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Col
                  sm={12}
                  md={12}
                  lg={12}
                  title={"Empresa"}>
                  <Link to="/empresa">
                    <ButtonComponent
                      tabIndex={-1}
                      height="6rem"
                      size="18rem"
                      bgColor="var(--verde-primario)"
                      textColor="#FFF"
                    >
                      <span>Empresa</span>
                    </ButtonComponent>
                  </Link>
                </Col>
              </Row>
            </Container>
          </HomeStyle>
        </PageContentContainer>
      </PageContainer>
    </ContainerWithSidebar>
  );
}

export default Home;
