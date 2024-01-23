import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ButtonComponent from "../Button";
import { HiOutlineLockClosed } from "react-icons/hi";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { ContainerFormLoginStyle } from "./style";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthenticationContext } from "../../services/context/AuthContext";
import { Spinner } from "react-bootstrap";

function FormLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingButton, setLoadingButton] = useState(false);
  const { login } = useContext(AuthenticationContext);

  let navigate = useNavigate();

  const handleLogin = async (e) => {
    setLoadingButton(true);
    e.preventDefault();
    const respostaLogin = await login(email.concat("@t2mlab.com"), password);
    if (!respostaLogin) {
      setLoadingButton(false);
    } else {
      setLoadingButton(false);
      navigate("/");
    }
  };

  return (
    <ContainerFormLoginStyle>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
            <Form.Control
              placeholder="Digite seu e-mail (não é necessário incluir o domínio)"
              aria-label="Email"
              aria-describedby="basic-addon2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputGroup.Text id="basic-addon2">@t2mlab.com</InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              <HiOutlineLockClosed />
            </InputGroup.Text>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Digite sua senha"
              aria-label="Senha"
              aria-describedby="basic-addon2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputGroup.Text
              id="basic-addon2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <BsEye /> : <BsEyeSlash />}
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Row>
          <Col className="d-flex justify-content-center mt-3">
            <ButtonComponent
              size="18rem"
              disabled={loadingButton}
              bgColor="var(--verde-primario)"
              textColor="#FFF"
              action={handleLogin}
            >
              {loadingButton ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                <span>Entrar</span>
              )}
            </ButtonComponent>
          </Col>
        </Row>
        <p className="mt-3">
          Esqueci minha senha <a href="null">Recuperar senha</a>
        </p>
      </Form>
    </ContainerFormLoginStyle>
  );
}

export default FormLogin;
