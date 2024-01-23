import React, { useState, useEffect } from "react";
import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Form, Row, ToastContainer } from "react-bootstrap";
import ButtonComponent from "../../components/Button";
import { ButtonContainer } from "./style";
import { ContainerWithSidebar } from "../../components/ContainerWithSidebar";
import { AuthenticationContext } from "../../services/context/AuthContext";
import Input from "../../components/Input";
import SubTitle from "../../components/SubTitle";
import BackButton from "../../components/VoltarButton";
import { toast } from "react-toastify";
import { ModalComponent } from "../../components/Modal";
import { FaListUl } from "react-icons/fa";
import { BsEye, BsPencilSquare } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { CiEdit } from "react-icons/ci";



function DetalharColaborador({
  HandledarkMode,
  isDarkMode,
  decreaseFontSize,
  increaseFontSize,
  logOut,
}) {
  const location = useLocation();
  const { dataNasc, telefone, nome, email, id, dataAdimissao } =
    location.state || {};
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { colaboradorId } = useParams();
  const [companyName, setCompanyName] = useState('');
  const [colaboradorDetails, setColaboradorDetails] = useState({});


  useEffect(() => {
    loadCompanyName();
    loadColaboradorDetails();
  }, []);

  const loadColaboradorDetails = () => {
    fetch(`http://35.184.203.56:8016/Consulta-user/${colaboradorId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(response => response.json())
      .then(data => {

        console.log('Detalhes do Colaborador:', data);


        setColaboradorDetails(data);
      })
      .catch(error => {
        console.error('Error while fetching user details:', error.message);
      });
  };

  const loadCompanyName = () => {
    fetch(`http://35.184.203.56:8016/Colaborador/${colaboradorId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })

      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch user details: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        setCompanyName(data.empresas && data.empresas.length > 0 ? data.empresas[0].nomeEmpresa : 'N/A');
      })
      .catch(error => {
        console.error('Error while fetching user details:', error.message);

        setCompanyName('N/A');
      });
  };

  const adicionarCompetencia = (colaborador) => {
    localStorage.setItem('id', colaborador.id);
    navigate(`/competenciaColaborador/${colaborador.id}`, {
      state: {
        nome: colaborador.fullName,
      },
    });
  };


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
          title="Detalhar Colaborador"
          icon={<BsEye size="30px" />}
        />
        <PageContentContainer>
          <Container>
            <SubTitle subtitle="Dados Pessoais" />
            <Row className="mb-3">
              <Col xs={12} md={3}>
                <strong>Nome</strong>
                <p>{colaboradorDetails.fullName}</p>
              </Col>
              <Col xs={12} md={3}>
                <strong>Data de Nascimento</strong>
                <p>{colaboradorDetails.birthDate}</p>
              </Col>
              <Col xs={12} md={3}>
                <strong>Telefone</strong>
                <p>
                  {colaboradorDetails.phone !== "null"
                    ? telefone
                      ? telefone.replace(
                        /(\d{2})(\d{4,5})(\d{4})/,
                        "($1) $2-$3"
                      )
                      : "-"
                    : "-"}
                </p>
              </Col>
              <Col xs={12} md={3}>
                <strong>Email</strong>
                <p>{colaboradorDetails.corporativeEmail}</p>
              </Col>
            </Row>
            <SubTitle subtitle="Dados Empresariais" />
            <Row className="mb-3">
              <Col xs={12} md={3}>
                <strong>Data de Admissão</strong>
                <p>{colaboradorDetails.admissionDate}</p>
              </Col>
              <Col xs={12} md={3}>
                <strong>
                  <Link
                    to={`/addEmpresaColab/${colaboradorId}`}

                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Empresa <CiEdit color="var(--verde-primario)" />
                  </Link>
                </strong>
                <p>{companyName}</p>
              </Col>
            </Row>
            <SubTitle subtitle="Outras Opções" />
            <Row>
              <Col xs={12} md={3}>
                <strong
                  onClick={() => adicionarCompetencia({ id: colaboradorDetails.id })}
                  style={{ cursor: "pointer" }}
                >
                  Visualizar Competências
                </strong>
              </Col>
            </Row>
          </Container>
          <ButtonContainer>
            <BackButton
              size="18rem"
              bgColor="var(--cinza-primario)"
              textColor=""
            ></BackButton>
          </ButtonContainer>
        </PageContentContainer>
      </PageContainer>
      <ToastContainer />
    </ContainerWithSidebar>
  );
}

export default DetalharColaborador;
