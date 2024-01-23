import React from "react";
import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";
import "bootstrap/dist/css/bootstrap.min.css";
import { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ButtonComponent from "../../components/Button";
import { EmpresaStyle } from "./style";
import { ContainerWithSidebar } from "../../components/ContainerWithSidebar";
import { AuthenticationContext } from "../../services/context/AuthContext";
import { Link } from "react-router-dom";
import VoltarButton from "../../components/VoltarButton";
import { BiBuilding } from "react-icons/bi";

function Empresa({
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
          title={`Empresa`}
          icon={<BiBuilding style={{ fontSize: '30px' }} />}
        />
        <PageContentContainer>
          <EmpresaStyle>
            <Container>
              <Row
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Col
                  sm={12}
                  md={12}
                  lg={12}
                  title={"Cadastrar Empresa"}>
                  <Link to="/cadastrarEmpresa">
                    <ButtonComponent
                      height="6rem"
                      size="18rem"
                      bgColor="var(--verde-primario)"
                      textColor="#FFF"
                    >
                      <span>Cadastrar Empresa</span>
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
                  title={"Buscar Empresa"}>
                  <Link to="/buscarEmpresa">
                    <ButtonComponent
                      height="6rem"
                      size="18rem"
                      bgColor="var(--verde-primario)"
                      textColor="#FFF"
                    >
                      <span>Buscar Empresa</span>
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
          </EmpresaStyle>
        </PageContentContainer>
      </PageContainer>
    </ContainerWithSidebar>
  );
}

export default Empresa;
