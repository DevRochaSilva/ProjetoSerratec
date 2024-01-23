import React from "react";
import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Col, Container, Row, ToastContainer } from "react-bootstrap";
import ButtonComponent from "../../components/Button";
import { ButtonContainer } from "./style";
import { ContainerWithSidebar } from "../../components/ContainerWithSidebar";
import Input from "../../components/Input";
import SubTitle from "../../components/SubTitle";
import VoltarButton from "../../components/VoltarButton";
import { IoMdAddCircleOutline } from "react-icons/io";
import { ModalComponent } from "../../components/Modal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CadastrarEmpresa({
  HandledarkMode,
  isDarkMode,
  decreaseFontSize,
  increaseFontSize,
  logOut,
}) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [nomeEmpresa, setNomeEmpresa] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [contato, setContato] = useState("");
  const [setor, setSetor] = useState("");
  const [endereco, setEndereco] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const formatCNPJ = (value) => {
    // Aplicar máscara ao CNPJ (XX.XXX.XXX/XXXX-XX)
    const cnpjRegex = /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/;
    return value.replace(cnpjRegex, "$1.$2.$3/$4-$5");
  };
  
  const formatPhoneNumber = (value) => {
    // Aplicar máscara ao número de telefone (99)99999-9999
    const phoneRegex = /(\d{2})(\d{5})(\d{4})/;
    return value.replace(phoneRegex, "($1)$2-$3");
  };
  const handleChange = (event) => {
    setNomeEmpresa(event.target.value);
  };
  const handleChange2 = (event) => {
    const formattedCNPJ = formatCNPJ(event.target.value);
    setCnpj(formattedCNPJ);
  };
  const handleChange3 = (event) => {
    const inputValue = event.target.value.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos
    const formattedPhoneNumber = formatPhoneNumber(inputValue);
    setContato(formattedPhoneNumber);
  };
  const handleChange4 = (event) => {
    setSetor(event.target.value);
  };
  const handleChange5 = (event) => {
    setEndereco(event.target.value);
  };

  const notify = (type) => {
    switch (type) {
      case "success":
        toast.success("Empresa cadastrada com sucesso!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        break;
      default:
    }
  };

  const confirmClick = () => {
    // Validar se os campos obrigatórios estão preenchidos
    if (!nomeEmpresa || !cnpj || !contato || !setor || !endereco) {
      setIsSubmitting(true);
    } else {
      setShowConfirmModal(true);
    }
  };

  const handleConfirmModalAccept = async () => {
    try {
      const cnpjToSend = cnpj.replace(/[^\d]+/g, '');
      const phoneToSend = contato.replace(/[^\d]+/g, '').slice(-11); // Pega os últimos 11 dígitos
    
      const response = await axios.post("http://35.184.203.56:8016/empresas", {
        nomeEmpresa: nomeEmpresa,
        cnpj: cnpjToSend,
        contato: phoneToSend,
        setor: setor,
        endereco: endereco,
        servicos: [],
      });

      console.log("Response:", response);

      if (response.status === 201) {
        notify("success");
        setShowConfirmModal(false);
        adicionarServico(response.data);
      } else {
        console.error("Erro ao cadastrar empresa:", response.status);
        toast.error(response.data.message || "Erro ao cadastrar empresa", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error("Erro ao cadastrar empresa:", error);
      toast.error(error.response.data.message || "Erro ao cadastrar empresa", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleConfirmModalCancel = () => {
    setShowConfirmModal(false);
  };
  const adicionarServico = (empresa) => {
    navigate(`/selecionarServicoEmpresa/${empresa.id}`, {
      state: {
        nome: empresa.nomeEmpresa,
        cnpj: empresa.cnpj,
        contato: empresa.contato,
        setor: empresa.setor,
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
          title={`Cadastrar Empresa`}
          icon={<IoMdAddCircleOutline size="35px" />}
        />
        <PageContentContainer>
          <SubTitle subtitle="Selecione o nome da empresa e suas informações" />
          <Container>
            <Row style={{ display: "flex", justifyContent: "flex-end" }}>
              <Col xs={12} md={4} lg={4} title={"Cadastrar Empresa"}>
                <Input
                  title={
                    <span>
                      Nome <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  placeholder="Empresa A"
                  type="text"
                  value={nomeEmpresa}
                  onChange={handleChange}
                  isInvalid={isSubmitting && nomeEmpresa.trim() === ""}
                  maxLength={60}
                />
              </Col>
              <Col xs={12} md={4} lg={4}>
                <Input
                  title={
                    <span>
                      CNPJ <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  placeholder="00.000.000/0000-00"
                  type="text"                  
                  value={cnpj}
                  onChange={handleChange2}
                  isInvalid={isSubmitting && cnpj.trim() === ""}
                  maxLength={14}
                />
              </Col>
              <Col xs={12} md={4} lg={4}>
                <Input
                  title={
                    <span>
                      Número de Contato <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  placeholder="(99)99999-9999"
                  type="tel"
                  value={contato}
                  onChange={handleChange3}
                  isInvalid={isSubmitting && contato.trim() === ""}
                  maxLength={11}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={4} lg={4}>
                <Input
                  title={
                    <span>
                      Setor de Atuação <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  placeholder="Setor de atuação"
                  type="text"
                  value={setor}
                  onChange={handleChange4}
                  isInvalid={isSubmitting && setor.trim() === ""}
                  maxLength={60}
                />
              </Col>
              <Col xs={12} md={4} lg={4}>
                <Input
                  title={
                    <span>
                      Endereço <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  placeholder="Rua..."
                  type="text"
                  as="textarea"
                  width="433px"
                  value={endereco}
                  onChange={handleChange5}
                  isInvalid={isSubmitting && endereco.trim() === ""}
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
              <span>Confirmar</span>
            </ButtonComponent>
            <ModalComponent
              showModal={showConfirmModal}
              setShowModal={setShowConfirmModal}
              action={handleConfirmModalAccept}
              cancelAction={handleConfirmModalCancel}
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

export default CadastrarEmpresa;

