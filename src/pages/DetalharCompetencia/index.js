import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";
import SubTitle from "../../components/SubTitle";
import BackButton from "../../components/VoltarButton";
import ButtonComponent from "../../components/Button";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { ButtonContainer } from "./style";
import { ContainerWithSidebar } from "../../components/ContainerWithSidebar";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ModalComponent } from "../../components/Modal";
import { Col, Container, Row } from "react-bootstrap";
import { BsEye } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";

function DetalharCompetencia({
  HandledarkMode,
  isDarkMode,
  decreaseFontSize,
  increaseFontSize,
  logOut,
}) {
  const location = useLocation();
  const {
    descricao: initialDescricao,
    name: initialName,
    id,
  } = location.state || {};

  const [isNameEditing, setIsNameEditing] = useState(false);
  const [isDescricaoEditing, setIsDescricaoEditing] = useState(false);
  const [editedName, setEditedName] = useState(initialName);
  const [editedDescricao, setEditedDescricao] = useState(initialDescricao);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const navigate = useNavigate();

  const buscarCompetencias = async () => {
    try {
      const response = await axios.get(
        "http://35.184.203.56:8016/competencias"
      );
    } catch (error) {
      console.error("Erro ao buscar competencias:", error);
    }
  };

  const handleSaveChangesClick = async () => {
    try {
      await axios.put(`http://35.184.203.56:8016/competencias/${id}`, {
        nome: editedName,
        descricao: editedDescricao,
      });

      setIsNameEditing(false);
      setIsDescricaoEditing(false);

      navigate(`/buscarComp`);
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
    }
  };

  const notify = (type, message = "") => {
    switch (type) {
      case "success":
        toast.success(message || "Competência excluída com sucesso!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
        break;
      default:
      case "danger":
        return toast.error(message || "Erro ao excluir a competência!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
    }
  };

  const handleEditNameClick = () => {
    setIsNameEditing(true);
  };

  const handleEditDescricaoClick = () => {
    setIsDescricaoEditing(true);
  };

  const carregarCompetencias = () => {
    buscarCompetencias();
  };

  const handleExcluirCompetencia = () => {
    setShowDeleteConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://35.184.203.56:8016/competencias/${id}`);
      carregarCompetencias();
      notify("success", "Competência excluída com sucesso!");

      navigate(`/buscarComp`);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        notify("danger", error.response.data.message);
      } else {
        console.error("Erro ao excluir competencia:", error);
        notify("danger", "Erro ao excluir competencia");
      }
    } finally {
      setShowDeleteConfirmModal(false);
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
          title="Detalhar Competência"
          icon={<BsEye size="30px" />}
        />
        <PageContentContainer>
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
                onClick={handleExcluirCompetencia}
              />
            </div>
            <SubTitle subtitle="Dados Gerais" />
            <Row>
              <Col sm={12} md={12} lg={12}>
                <strong>
                  Nome{" "}
                  <CiEdit
                    style={{ cursor: "pointer" }}
                    color="var(--verde-primario)"
                    onClick={handleEditNameClick}
                  />
                </strong>
              </Col>
            </Row>
            <Row className="mb-1">
              <Col sm={12} md={12} lg={12}>
                {isNameEditing ? (
                  <>
                    <TextareaAutosize
                      minRows={1}
                      style={{ width: "500px", height: "40px" }}
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      maxLength={30}
                    />
                  </>
                ) : (
                  <p>{editedName}</p>
                )}
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={12} lg={12}>
                <strong>
                  Descrição{" "}
                  <CiEdit
                    style={{ cursor: "pointer" }}
                    color="var(--verde-primario)"
                    onClick={handleEditDescricaoClick}
                  />
                </strong>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col sm={12} md={12} lg={12}>
                {isDescricaoEditing ? (
                  <>
                    <TextareaAutosize
                      minRows={4}
                      style={{ width: "500px", height: "200px" }}
                      value={editedDescricao}
                      onChange={(e) => setEditedDescricao(e.target.value)}
                      maxLength={200}
                    />
                  </>
                ) : (
                  <p>{editedDescricao}</p>
                )}
              </Col>
            </Row>
            <SubTitle subtitle="" />
            <div></div>
            <div></div>
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
              action={() => setShowConfirmModal(true)}
              type="button"
            >
              <span>Salvar</span>
            </ButtonComponent>
            <ModalComponent
              showModal={showConfirmModal}
              setShowModal={setShowConfirmModal}
              action={() => {
                setShowConfirmModal(false);
                handleSaveChangesClick();
              }}
              header="Deseja atualizar o cadastro?"
              title="Confirmação"
              cancelText="Cancelar"
              acceptText="Confirmar"
            />
            <ModalComponent
              showModal={showDeleteConfirmModal}
              setShowModal={setShowDeleteConfirmModal}
              action={handleConfirmDelete}
              header="Confirmar a Exclusão?"
              title="Confirmação"
              cancelText="Cancelar"
              acceptText="Confirmar"
            />
          </ButtonContainer>
        </PageContentContainer>
      </PageContainer>
    </ContainerWithSidebar>
  );
}
export default DetalharCompetencia;
