import React, { useState, useEffect } from "react"; // Adicione 'useEffect' ao import
import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";
import "bootstrap/dist/css/bootstrap.min.css";
import { useContext } from "react";
import { Col, Container, Row, ToastContainer } from "react-bootstrap";
import ButtonComponent from "../../components/Button";
import { ButtonContainer } from "./style";
import { ContainerWithSidebar } from "../../components/ContainerWithSidebar";
import { AuthenticationContext } from "../../services/context/AuthContext";
import Input from "../../components/Input";
import SubTitle from "../../components/SubTitle";
import BackButton from "../../components/VoltarButton";
import { IoMdAddCircleOutline } from "react-icons/io";
import { ModalComponent } from "../../components/Modal";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function CadastrarCompetencia({
  HandledarkMode,
  isDarkMode,
  decreaseFontSize,
  increaseFontSize,
  logOut,
}) {
  const { user } = useContext(AuthenticationContext);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [competencia, setCompetencia] = useState("");
  const [descricao, setDescricao] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const [competencias, setCompetencias] = useState([]); 

  const carregarCompetencias = async () => {
    try {
      const response = await axios.get(
        "http://35.184.203.56:8016/competencias"
      );
      setCompetencias(response.data);
    } catch (error) {
      console.error("Erro na requisição carregarCompetencias:", error);
      toast.error("Erro ao carregar competências", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
   
    carregarCompetencias();
  }, []);

  const handleChange = (event) => {
    setDescricao(event.target.value);
  };
  const handleChange1 = (event) => {
    setCompetencia(event.target.value);
  };

  function notify(type) {
    switch (type) {
      case "success":
        return toast.success("Competência cadastrada!", {
          position: toast.POSITION.TOP_RIGHT,
        });
    }
  }

  const handleConfirmClick = () => {
    
    setShowConfirmModal(true);
  };

  const confirmClick = async () => {
    
    if (!competencia || !descricao) {
      setIsSubmitting(true);
    } else {
     
      setShowConfirmModal(true);
    }

    if (showConfirmModal) {
      try {
        const response = await axios.post(
          "http://35.184.203.56:8016/competencias",
          {
            nome: competencia,
            descricao: descricao,
          }
        );

        console.log("Response:", response); 

        if (response.status === 201) {
          notify("success");
          setShowConfirmModal(false);
        } else {
          console.error("Erro ao cadastrar competência:", response.status);
          toast.error(
            response.data.message || "Erro ao cadastrar competência",
            {
              position: toast.POSITION.TOP_RIGHT,
            }
          );
          setShowConfirmModal(false); 
        }
      } catch (error) {
        console.error("Erro ao cadastrar competência:", error);
        toast.error(
          error.response.data.message || "Erro ao cadastrar competência",
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
        setShowConfirmModal(false); 
      }
    }
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
          title="Cadastrar Competência"
          icon={<IoMdAddCircleOutline size="35px" />}
        />
        <PageContentContainer>
          <SubTitle subtitle="Selecione o nome da competência e sua descrição" />
          <Container>
            <Row className="justify-content-center">
              <Col sm={12} md={6} lg={6} title={"Cadastrar Competência"}>
                <Input
                  title={
                    <span>
                      Competência <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  placeholder="Nome da Competência"
                  type="text"
                  value={competencia}
                  onChange={handleChange1}
                  isInvalid={isSubmitting && competencia.trim() === ""}
                  maxLength={30}
                />
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col sm={12} md={6} lg={6} title={"Cadastrar Competência"}>
                <Input
                  title={
                    <span>
                      Descrição <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  placeholder="Descrição da Competência"
                  as="textarea"
                  width="433px"
                  value={descricao}
                  onChange={handleChange}
                  isInvalid={isSubmitting && descricao.trim() === ""}
                  maxLength={200}
                />
              </Col>
            </Row>
          </Container>
          <ButtonContainer>
            <BackButton
              size="18rem"
              bgColor="var(--cinza-primario)"
              textColor=""
            ></BackButton>
            <ButtonComponent
              size="10rem"
              bgColor="var(--verde-primario)"
              textColor="#FFF"
              action={confirmClick}
              type="submit"
            >
              <span>Confirmar Cadastro</span>
            </ButtonComponent>
            <ModalComponent
              showModal={showConfirmModal}
              setShowModal={setShowConfirmModal}
              action={() => {
                setShowConfirmModal(false);
                confirmClick();
                navigate(`/buscarComp`, {
                });
              }}
              header="Deseja confirmar o cadastro?"
              title="Confirmação"
              cancelText="Cancelar"
              acceptText="Confirmar"
            />
          </ButtonContainer>
        </PageContentContainer>
      </PageContainer>
      <ToastContainer />
    </ContainerWithSidebar>
  );
}

export default CadastrarCompetencia;
