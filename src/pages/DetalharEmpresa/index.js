import React from "react";
import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Col, Container, Form, Row, ToastContainer } from "react-bootstrap";
import ButtonComponent from "../../components/Button";
import { ButtonContainer } from "./style";
import { ContainerWithSidebar } from "../../components/ContainerWithSidebar";
import SubTitle from "../../components/SubTitle";
import BackButton from "../../components/VoltarButton";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CiEdit } from "react-icons/ci";
import { ModalComponent } from "../../components/Modal";
import { FaListUl } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BsEye } from "react-icons/bs";

function DetalharEmpresa({
  HandledarkMode,
  isDarkMode,
  decreaseFontSize,
  increaseFontSize,
  logOut,
}) {
  const location = useLocation();
  const {
    nome: initialName,
    cnpj: initialCnpj,
    contato: initialContato,
    setor: initialSetor,
    endereco: initialEndereco,
    servicoIds: initialServicoIds,
  } = location.state || {};



  const [endereco, setEndereco] = useState(initialEndereco);
  const [servicoIds, setServicoIds] = useState(initialServicoIds);
  const [isNameEditing, setIsNameEditing] = useState(false);
  const [isCnpjEditing, setIsCnpjEditing] = useState(false);
  const [isContatoEditing, setIsContatoEditing] = useState(false);
  const [isSetorEditing, setIsSetorEditing] = useState(false);
  const [editedName, setEditedName] = useState(initialName);
  const [editedCnpj, setEditedCnpj] = useState(initialCnpj);
  const [editedContato, setEditedContato] = useState(initialContato);
  const [editedSetor, setEditedSetor] = useState(initialSetor);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const navigate = useNavigate();
  const empresaId = parseInt(useParams().empresaId, 10);

  const buscarEmpresas = async () => {
    try {
      const response = await axios.get("http://35.184.203.56:8016/empresas");
    } catch (error) {
      console.error("Erro ao buscar competencias:", error);
    }
  };
  const carregarEmpresas = () => {
    buscarEmpresas();
  };

  const handleExcluirCompetencia = () => {
    setShowDeleteConfirmModal(true);
  };

  const handleEditNameClick = () => {
    setIsNameEditing(true);
  };

  const handleEditCnpjClick = () => {
    setIsCnpjEditing(true);
  };

  const handleEditContatoClick = () => {
    setIsContatoEditing(true);
  };

  const handleEditSetorClick = () => {
    setIsSetorEditing(true);
  };

  const getEmpresaDetails = async () => {
    try {
      console.log(`Realizando solicitação para: http://35.184.203.56:8016/empresas/${empresaId}`);
      const response = await axios.get(`http://35.184.203.56:8016/empresas/${empresaId}`);


      console.log("Dados da resposta:", response.data);

      setEndereco(response.data.endereco || ''); 
      setServicoIds(response.data.servicoIds || []);
    } catch (error) {
     
      console.error("Resposta de erro:", error.response?.data);

      console.error("Erro ao buscar detalhes da empresa:", error);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://35.184.203.56:8016/empresas/${empresaId}`);
      carregarEmpresas();
      notifySuccess("Empresa excluída com sucesso!");
      navigate(`/buscarEmpresa`);
    } catch (error) {
      console.error("Erro ao excluir competencia:", error);
      const errorMessage = error.response?.data.message || "Erro ao excluir a empresa.";
      notifyError(errorMessage);
    }
    setShowDeleteConfirmModal(false);
  };
  
  function notifySuccess(message) {
    toast.success(message, { position: toast.POSITION.TOP_RIGHT });
  }
  
  function notifyError(message) {
    toast.error(message, { position: toast.POSITION.TOP_RIGHT });
  }

  const handleSaveChangesClick = async () => {
    try {
      await getEmpresaDetails();
      const data = {
        nomeEmpresa: editedName,
        cnpj: editedCnpj,
        contato: editedContato,
        setor: editedSetor,
        endereco: endereco, // Use the state variable here
        servicoIds: servicoIds, // And here
      };
      console.log("envio", data); // Log the data to the console
      const response = await axios.put(`http://35.184.203.56:8016/empresas/${empresaId}`, data);
      console.log(response.data); // Log the response data to the console
      setIsNameEditing(false);
      setIsCnpjEditing(false);
      setIsContatoEditing(false);
      setIsSetorEditing(false);
      notify("success");
      navigate(`/buscarEmpresa`);
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
      console.error("Resposta de erro:", error.response?.data); // Log the error response data
    }
  };

  const handleConfirmClick = () => {
    getEmpresaDetails();
    setShowConfirmModal(true);
  };

  function notify(type) {
    switch (type) {
      case "success":
        return toast.success("Alterações salvas com Sucesso!", {
          position: toast.POSITION.TOP_RIGHT,
        });
    }
  }

  const visualizarServicos = (empresa) => {
    navigate(`/servicoEmpresa/${empresaId}`, {
      state: {
        nome: empresa.nomeEmpresa,
        cnpj: empresa.cnpj,
        contato: empresa.contato,
        setor: empresa.setor,
        id: empresa.id,
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
        <PageHeaderContainer title="Detalhar Empresa" icon={<BsEye size="30px" />} />
        <PageContentContainer>
          {/* <BsFillTrashFill margin='left' size={30} color="#03A688" /> */}
          <Container>
            <div style={{ position: "relative" }}>
              <RiDeleteBin6Line
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  fontSize: "35px",
                  color: "var(--verde-primario)",
                  cursor: "pointer", 
                }}
                onClick={() => setShowDeleteConfirmModal(true)}
              />
            </div>
            <SubTitle subtitle="Dados Pessoais" />
            <Row className="mb-3">
              <Col xs={12} md={3}>
                <strong>
                  Nome{" "}
                  <CiEdit
                    style={{ cursor: "pointer" }}
                    color="var(--verde-primario)"
                    onClick={handleEditNameClick}
                  />
                </strong>
                {isNameEditing ? (
                  <>
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      maxLength={60}
                    />
                  </>
                ) : (
                  <p>{editedName}</p>
                )}
              </Col>
              <Col xs={12} md={3}>
                <strong>
                  CNPJ{" "}
                  <CiEdit
                    style={{ cursor: "pointer" }}
                    color="var(--verde-primario)"
                    onClick={handleEditCnpjClick}
                  />
                </strong>
                {isCnpjEditing ? (
                  <>
                    <input
                      type="text"
                      value={editedCnpj}
                      onChange={(e) => setEditedCnpj(e.target.value)}
                      maxLength={14}
                    />
                  </>
                ) : (
                  <p>{editedCnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")}</p>
                )}
              </Col>
              <Col xs={12} md={3}>
                <strong>
                  Telefone{" "}
                  <CiEdit
                    style={{ cursor: "pointer" }}
                    color="var(--verde-primario)"
                    onClick={handleEditContatoClick}                    
                  />
                </strong>
                {isContatoEditing ? (
                  <>
                    <input
                      type="text"
                      value={editedContato}
                      onChange={(e) => setEditedContato(e.target.value)}
                      maxLength={11}
                    />
                  </>
                ) : (
                  <p>{editedContato.replace(/(\d{2})(\d{4,5})(\d{4})/, "($1) $2-$3")}</p>
                )}
              </Col>
              <Col xs={12} md={3}>
                <strong>
                  Setor{" "}
                  <CiEdit
                    style={{ cursor: "pointer" }}
                    color="var(--verde-primario)"
                    onClick={handleEditSetorClick}
                  />
                </strong>
                {isSetorEditing ? (
                  <>
                    <input
                      type="text"
                      value={editedSetor}
                      onChange={(e) => setEditedSetor(e.target.value)}
                      maxLength={60}
                    />
                  </>
                ) : (
                  <p>{editedSetor}</p>
                )}
              </Col>
            </Row>
            <SubTitle subtitle="Outras Opções" /> 
            <div style={{ marginTop: "15px" }}>
              <strong
                onClick={visualizarServicos}
                style={{ cursor: "pointer" }}
              >
                Visualizar Serviços{" "}
              </strong>
            </div>
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
              action={handleConfirmClick}
              type="submit"
            >
              <span>Salvar alterações</span>
            </ButtonComponent>
            <ModalComponent
              showModal={showConfirmModal}
              setShowModal={setShowConfirmModal}
              action={() => {
                setShowConfirmModal(false);
                handleSaveChangesClick();
              }}
              header="Deseja salvar alteração?"
              title="Confirmação"
              cancelText="Cancelar"
              acceptText="Confirmar"
            />
            <ModalComponent
              showModal={showDeleteConfirmModal}
              setShowModal={setShowDeleteConfirmModal}
              action={() => {
                setShowConfirmModal(false);
                handleConfirmDelete();
              }}
              header="Confirmar a Exclusão?"
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

export default DetalharEmpresa;
