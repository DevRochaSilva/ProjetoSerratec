import React from "react";
import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row, ToastContainer } from "react-bootstrap";
import ButtonComponent from "../../components/Button";
import { ButtonContainer, CadastroServicoStyle } from "./style";
import { ContainerWithSidebar } from "../../components/ContainerWithSidebar";
import { IoMdAddCircleOutline } from "react-icons/io";
import Input from "../../components/Input";
import SubTitle from "../../components/SubTitle";
import VoltarButton from "../../components/VoltarButton";
import { ModalComponent } from "../../components/Modal";
import { toast } from "react-toastify";
import axios from "axios";

function CadastrarServico({
  HandledarkMode,
  isDarkMode,
  decreaseFontSize,
  increaseFontSize,
  logOut,
}) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [dataServico, setDataServico] = useState(new Date().toISOString().split("T")[0]);
  const [descricao, setDescricao] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    setDescricao(event.target.value);
  };
  const handleChange2 = (event) => {
    setDataServico(event.target.value);
  };
  const handleChange3 = (event) => {
    setNome(event.target.value);
  };


  const notify = (type) => {
    switch (type) {
      case "success":
        return toast.success("Serviço cadastrado com sucesso!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      default:
        break;
    }
  };

  const confirmClick = async () => {
    // Validar se os campos obrigatórios estão preenchidos
    if (!nome || !descricao || !dataServico) {
      setIsSubmitting(true);
    } else {
      setShowConfirmModal(true);
      // Formatar a data no formato YYYY-MM-DD
      const formattedDate = new Date(dataServico).toISOString().split("T")[0];
      if (showConfirmModal) {
        try {
          const response = await axios.post(
            "http://35.184.203.56:8016/servicos",
            {
              nome: nome,
              descricao: descricao,
              dataServico: formattedDate,
              competenciaIds: [],
            }
          );

          console.log("Response:", response);

          if (response.status === 201) {
            notify("success");
            setShowConfirmModal(false);
           
            etapaDois(response.data);
          } else {
            console.error("Erro ao cadastrar serviço:", response.status);
            toast.error(response.data.message || "Erro ao cadastrar serviço", {
              position: toast.POSITION.TOP_RIGHT,
            });
            setShowConfirmModal(false);
          }
        } catch (error) {
          console.error("Erro ao cadastrar serviço:", error);
          toast.error(
            error.response.data.message || "Erro ao cadastrar serviço",
            {
              position: toast.POSITION.TOP_RIGHT,
            }
          );
          setShowConfirmModal(false);
        }
      }
    }
  };

  const etapaDois = (servico) => {
    navigate(`/cadastrarServicoConfirmar/${servico.id}`, {
      state: {
        nome: servico.nome,
        descricao: servico.descricao,
        dataServico: servico.formattedDate,
        competenciaIds: [],
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
          icon={<IoMdAddCircleOutline size="35px" />}
          title="Cadastrar Serviço"
        />
        <PageContentContainer>
          <SubTitle subtitle="Selecione o nome do serviço e sua descrição" />
          <Container>
            <Row
              className="justify-content-center"
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Col sm={12} md={6} lg={6} title={"Cadastrar Serviço"}>
                <Input
                  title={
                    <span>
                      Nome <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  placeholder="Nome do Serviço"
                  type="text"
                  value={nome}
                  onChange={handleChange3}
                  isInvalid={isSubmitting && nome.trim() === ""}
                  maxLength={30}
                />
                <Input
                  title={
                    <span>
                      Descrição <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  placeholder="Descrição do Serviço"
                  as="textarea"
                  width="433px"
                  value={descricao}
                  onChange={handleChange}
                  isInvalid={isSubmitting && descricao.trim() === ""}
                  maxLength={60}
                />
              </Col>
            </Row>
          </Container>
          <ButtonContainer>
            <VoltarButton
              size="18rem"
              bgColor="var(--cinza-primario)"
              textColor=""
            ></VoltarButton>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <div style={{ position: "relative", width: "200px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "10px",
                    marginRight: "120px",
                  }}
                >
                  <span style={{ backgroundColor: "var(--branco)", padding: "0 8px" }}>
                    Etapa 1
                  </span>{" "}
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div
                    style={{
                      width: "97px",
                      height: "6px",
                      background: "var(--verde-primario)",
                      flexShrink: 0,
                      borderRadius: "100px 0px 0px 100px",
                    }}
                  />
                  <div
                    style={{
                      width: "100%",
                      height: "6px",
                      background: "lightgray",
                      marginLeft: "8px",
                    }}
                  />
                </div>
              </div>
            </div>

            <ButtonComponent
              size="10rem"
              bgColor="var(--verde-primario)"
              textColor="#FFF"
              action={confirmClick}
            >
              <span>Confirmar Cadastro</span>
            </ButtonComponent>

            <ModalComponent
              showModal={showConfirmModal}
              setShowModal={setShowConfirmModal}
              action={() => {
                setShowConfirmModal(false);
                confirmClick();
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

export default CadastrarServico;
