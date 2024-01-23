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
import { ContainerWithSidebar } from "../../components/ContainerWithSidebar";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ModalComponent } from "../../components/Modal";
import { ButtonContainer } from "../CadastrarServico/style";
import { useNavigate } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import { Col, Container, Row } from "react-bootstrap";
import TextareaAutosize from "react-textarea-autosize";
import { useParams } from "react-router-dom";

function DetalharServico({
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
    dataServico: initialDataServico,
    id,
  } = location.state || {};

  const [isNameEditing, setIsNameEditing] = useState(false);
  const [isDescricaoEditing, setIsDescricaoEditing] = useState(false);
  const [isDataServicoEditing, setIsDataServicoEditing] = useState(false);
  const [editedName, setEditedName] = useState(initialName);
  const [editedDescricao, setEditedDescricao] = useState(initialDescricao);
  const [editedDataServico, setEditedDataServico] =
    useState(initialDataServico);
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const servicoId = parseInt(useParams().servicoId, 10);

  const handleEditNameClick = () => {
    setIsNameEditing(true);
  };

  const handleEditDescricaoClick = () => {
    setIsDescricaoEditing(true);
  };

  const handleSaveChangesClick = async () => {
    try {
      if (editedDataServico) {
        const formattedDate = new Date(editedDataServico)
          .toISOString()
          .split("T")[0];

        const requestBody = {
          nome: editedName,
          descricao: editedDescricao,
          dataServico: formattedDate,
          competenciaIds: [],
        };

        await axios.put(
          `http://35.184.203.56:8016/servicos/${id}`,
          requestBody
        );

        setIsNameEditing(false);
        setIsDescricaoEditing(false);
        setIsDataServicoEditing(false);

        notify("success", "Alterações salvas com sucesso!");

        navigate(`/buscarServico`);
      } else {
        console.error("Erro: editedDataServico é indefinido");
      }
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);

      toast.error(
        error.response?.data?.message || "Erro ao salvar alterações",
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
    }
  };

  const exibirDescricao = (servico) => {
    navigate(`/competenciaServico/${servicoId}`, {
      state: {
        descricao: servico.descricao,
        dataServico: servico.dataServico,
        name: servico.nome,
        id: servico.id,
      },
    });
  };

  function notify(type) {
    switch (type) {
      case "success":
        return toast.success("Alterações salvas!", {
          position: toast.POSITION.TOP_RIGHT,
        });

      case "delete":
        return toast.success("Competência excluída!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      default:
        break;
    }
  }

  const buscarServicos = async () => {
    try {
      const response = await axios.get("http://35.184.203.56:8016/servicos/");
    } catch (error) {
      console.error("Erro ao buscar servicos:", error);
    }
  };

  const carregarServicos = () => {
    buscarServicos();
  };

  const handleExcluirServico = () => {
    setShowDeleteConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://35.184.203.56:8016/servicos/${id}`);

      carregarServicos();
      notify("delete", "Serviço excluído com sucesso!");
      navigate(`/buscarServico`);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        console.error("Erro ao excluir Serviço:", error);
        notify("danger", "Erro ao excluir Serviço");
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
          title="Detalhar Serviço"
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
                onClick={handleExcluirServico}
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
                      maxLength={60}
                    />
                  </>
                ) : (
                  <p>{editedDescricao}</p>
                )}
              </Col>
            </Row>
            <SubTitle subtitle="Outras Opções" />
            <div style={{ marginTop: "15px" }}>
              <strong onClick={exibirDescricao} style={{ cursor: "pointer" }}>
                Visualizar Competências
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
              action={() => setShowConfirmModal(true)}
              type="submit"
            >
              <span>Salvar</span>
            </ButtonComponent>
            <ModalComponent
              showModal={showConfirmModal}
              setShowModal={setShowConfirmModal}
              action={() => {
                handleSaveChangesClick();
                setShowConfirmModal(false);
              }}
              header="Deseja confirmar o cadastro?"
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

export default DetalharServico;
