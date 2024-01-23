import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BsEye, BsTrash } from "react-icons/bs";
import { ButtonContainer, TableStyle2 } from "./style";
import { useNavigate } from "react-router-dom";
import { ModalComponent } from "../../components/Modal";
import SearchComponent from "../../components/BuscaComponent";
import PaginationComponent from "../../components/Paginacao";
import { ContainerWithSidebar } from "../../components/ContainerWithSidebar";
import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";
import { FaListUl } from "react-icons/fa";
import ButtonComponent from "../../components/Button";
import VoltarButton from "../../components/VoltarButton";
import { toast } from "react-toastify";

function AddCompetenciaColab({
  HandledarkMode,
  isDarkMode,
  decreaseFontSize,
  increaseFontSize,
  logOut,
}) {
  const [competencias, setCompetencias] = useState([]);
  const [competenciaIdToDelete, setCompetenciaIdToDelete] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [updateTable, setUpdateTable] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { servicoId } = useParams();

  const exibirDescricao = (competencia) => {
    navigate(`/descricaoCompetencia/${competencia.id}`, {
      state: {
        name: competencia.nome,
        descricao: competencia.descricao,
        id: competencia.id,
      },
    });
  };

  const url = `http://35.184.203.56:8016/servicos/${servicoId}`;
  const [itensPorPagina, setItensPorPagina] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);
  const [dataToShow, setDataToShow] = useState([]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPorPagina) {
      setCurrentPage(newPage);
    }
  };

  const totalPorPagina = Math.ceil(competencias.length / itensPorPagina);

  const carregarCompetencias = async () => {
    try {
      const response = await axios.get(url);
      setCompetencias(response.data.competencias);
    } catch (error) {
      console.error("Erro na requisição carregarCompetencias:", error);
    }
  };

  useEffect(() => {
    const startIndex = (currentPage - 1) * itensPorPagina;
    const endIndex = startIndex + itensPorPagina;
    setDataToShow(competencias.slice(startIndex, endIndex));
  }, [currentPage, competencias, itensPorPagina]);

  useEffect(() => {
    setCurrentPage(1);
  }, [itensPorPagina]);

  useEffect(() => {
    const carregarCompetencias = async (servicoId) => {
      try {
        const response = await axios.get(
          `http://35.184.203.56:8016/servicos/${servicoId}`
        );
        const competenciasData = response.data.competencias || [];
        setCompetencias(competenciasData);
      } catch (error) {
        console.error("Erro na requisição carregarCompetencias:", error);
      }
    };

    carregarCompetencias(servicoId);
  }, [updateTable, servicoId]);

  const handleConfirmClick = (competenciaId) => {
    setCompetenciaIdToDelete(competenciaId);
    setShowConfirmModal(true);
  };

  const getServicoById = async (servicoId) => {
    try {
      const response = await axios.get(
        `http://35.184.203.56:8016/servicos/${servicoId}`
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao obter informações do serviço:", error);
      throw error;
    }
  };

  const handleExcluirCompetencia = async () => {
    if (competenciaIdToDelete) {
      try {
        const servicoData = await getServicoById(servicoId);

        const updatedCompetencias = competencias.filter(
          (comp) => comp.id !== competenciaIdToDelete
        );
        setCompetencias(updatedCompetencias);

        await axios.put(`http://35.184.203.56:8016/servicos/${servicoId}`, {
          ...servicoData,
          competenciaIds: updatedCompetencias.map((comp) => comp.id),
        });

        setUpdateTable((prev) => !prev);
      } catch (error) {
        console.error("Erro ao excluir competencia:", error);

        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          const errorMessages = error.response.data.errors;
          console.error("Mensagens de erro:", errorMessages);

          alert(errorMessages.join("\n"));
        } else {
          console.error("Erro desconhecido:", error);
          alert("Erro desconhecido ao excluir competência.");
        }
      } finally {
        setCompetenciaIdToDelete(null);
        setShowConfirmModal(false);
      }
    }
  };
  const notify = (type) => {
    switch (type) {
      case "success":
        toast.success("Competência desvinculada com sucesso!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        break;
      default:
      case "danger":
        return toast.error("Competência já vinculado !", {
          position: toast.POSITION.TOP_RIGHT,
        });
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
          icon={<FaListUl style={{ fontSize: "30px" }} />}
          title="Competências do Serviço"
        />
        <PageContentContainer>
          <TableStyle2>
            <div className="table-area mt-4">
              <SearchComponent onSearch={setSearchTerm} />
              <Table hover striped>
                <thead>
                  <tr>
                    <th>Competências</th>
                    <th className="col-1 text-center">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {dataToShow.map((competencia) => (
                    <tr key={competencia.id}>
                      <td>{competencia.nome}</td>
                      <td>
                        <div className="acoes-button">
                          <BsEye
                            onClick={() => exibirDescricao(competencia)}
                            color="var(--preto-primario)"
                          />
                          <BsTrash
                            onClick={() => handleConfirmClick(competencia.id)}
                            color="var(--vermelho-constraste)"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPorPagina}
                totalRecords={competencias.length}
                itensPorPagina={itensPorPagina}
                setItensPorPagina={setItensPorPagina}
                onPageChange={handlePageChange}
              />
              <ButtonContainer>
                <VoltarButton
                  size="18rem"
                  bgColor="var(--cinza-primario)"
                  textColor=""
                ></VoltarButton>
                <ButtonComponent
                  tabIndex={-1}
                  height="2rem"
                  size="10rem"
                  bgColor="var(--verde-primario)"
                  textColor="#FFF"
                  action={() =>
                    navigate(`/cadastrarServicoConfirmar/${servicoId}`, {
                      state: {
                        descricao: servicoId.descricao,
                        dataServico: servicoId.dataServico,
                        name: servicoId.nome,
                        id: servicoId.id,
                        competenciaIds: [],
                      },
                    })
                  }
                >
                  <span>Adicionar</span>
                </ButtonComponent>
              </ButtonContainer>
            </div>
            {competenciaIdToDelete && (
              <ModalComponent
                showModal={showConfirmModal}
                setShowModal={setShowConfirmModal}
                action={() => {
                  handleExcluirCompetencia();
                  setUpdateTable((prev) => !prev);
                  notify("success");
                }}
                header="Tem Certeza que deseja desvincular a competência?"
                title="Confirmação"
                cancelText="Cancelar"
                acceptText="Confirmar"
              />
            )}
          </TableStyle2>
        </PageContentContainer>
      </PageContainer>
    </ContainerWithSidebar>
  );
}

export default AddCompetenciaColab;
