import { React } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import FormLogin from "../../components/FormLogin";

import "./style.css";
import {
  MdContrast,
  MdOutlineTextDecrease,
  MdOutlineTextIncrease,
} from "react-icons/md";
import { SystemInfo } from "../../utils/SystemInfo";

function Login({
  HandledarkMode,
  isDarkMode,
  decreaseFontSize,
  increaseFontSize,
}) {
  const AcessibilityItem = ({ index, action, icon }) => {
    return (
      <Col>
        <div
          tabIndex={index}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              action();
            }
          }}
        >
          {icon}
        </div>
      </Col>
    );
  };

  return (
    <Container fluid>
      <Row>
        <Col className="coluna-esquerda" md={7}></Col>
        <Col className="coluna-direita" md={5}>
          <Row className="container-acessibility align-self-end mb-3">
            <AcessibilityItem
              index={0}
              action={HandledarkMode}
              icon={
                <MdContrast
                  onClick={HandledarkMode}
                  className="item-acessibility"
                  title="Alto Contraste"
                  size={28}
                />
              }
            />
            <AcessibilityItem
              index={0}
              action={increaseFontSize}
              icon={
                <MdOutlineTextIncrease
                  onClick={increaseFontSize}
                  className="item-acessibility"
                  title="Aumentar Fonte"
                  size={28}
                />
              }
            />
            <AcessibilityItem
              index={0}
              action={decreaseFontSize}
              icon={
                <MdOutlineTextDecrease
                  onClick={decreaseFontSize}
                  className="item-acessibility"
                  title="Diminuir Fonte"
                  size={24}
                />
              }
            />
          </Row>
          <Row>
            <Col className="titulo-area">
              {isDarkMode ? (
                <img src={SystemInfo.logoWhite} alt="T2M" />
              ) : (
                <img src={SystemInfo.logo} alt="T2M" />
              )}
              <span id="sigla">{SystemInfo.title}</span>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col>
              <FormLogin />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
