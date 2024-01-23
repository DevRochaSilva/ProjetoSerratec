import { React } from "react";

import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";

import LibrarySVG from "../../assets/img/library.svg";
import CaixaDeFerramentasSVG from "../../assets/img/caixa-de-ferramentas.svg";
import SistemaCompetenciaSVG from "../../assets/img/sistema-competencia.svg";
import ComunidadePraticaSVG from "../../assets/img/comunidade-pratica.svg";

import { TelaInicialStyle } from "./style";
import { ContainerWithSidebar } from "../../components/ContainerWithSidebar";
import { Col, Container, Row } from "react-bootstrap";
import { useContext } from "react";
import { AuthenticationContext } from "../../services/context/AuthContext";
import CardSystem from "../../components/CardSystem";

function TelaInicial({
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
          title={`Bem-vindo(a) ${user.fullName.split(" ")[0]}!`}
        />
        <PageContentContainer>
          <TelaInicialStyle>
            <Container>
              <Row style={{ display: "flex", justifyContent: "flex-end" }}>
                <Col sm={3} md={4} lg={3} title={"Sistema de Biblioteca"}>
                  <CardSystem
                    width={"500px"}
                    height={"500px"}
                    photo={LibrarySVG}
                    title={"SB"}
                    subtitle={"Sistema de Biblioteca"}
                    routeTo={"/"}
                  />
                </Col>
                <Col
                  sm={3}
                  md={4}
                  lg={3}
                  title={"Sistema Caixa de Ferramentas"}
                >
                  <CardSystem
                    width={"500px"}
                    height={"500px"}
                    photo={CaixaDeFerramentasSVG}
                    title={"SCF"}
                    subtitle={"Sistema Caixa de Ferramentas"}
                    routeTo={"/"}
                  />
                </Col>
                <Col sm={3} md={4} lg={3} title={"Sistema de Competência"}>
                  <CardSystem
                    width={"500px"}
                    height={"500px"}
                    photo={SistemaCompetenciaSVG}
                    title={"SC"}
                    subtitle={"Sistema de Competência"}
                    routeTo={"/home"}
                  />
                </Col>
                <Col sm={3} md={4} lg={3} title={"Sistema Comunidade Prática"}>
                  <CardSystem
                    width={"500px"}
                    height={"500px"}
                    photo={ComunidadePraticaSVG}
                    title={"SCP"}
                    subtitle={"Sistema Comunidade Prática"}
                    routeTo={"/"}
                  />
                </Col>
              </Row>
            </Container>
          </TelaInicialStyle>
        </PageContentContainer>
      </PageContainer>
    </ContainerWithSidebar>
  );
}

export default TelaInicial;
