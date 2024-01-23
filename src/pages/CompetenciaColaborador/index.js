import React, { useState, useEffect } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BsEye, BsTrash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { ModalComponent } from "../../components/Modal";
import { toast } from "react-toastify";
import SearchComponent from "../../components/BuscaComponent";
import PaginationComponent from "../../components/Paginacao";
import { ContainerWithSidebar } from "../../components/ContainerWithSidebar";
import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import { IoMdAddCircleOutline } from "react-icons/io";
import PageContentContainer from "../../components/PageContentContainer";
import { FaListUl } from "react-icons/fa";
import ButtonComponent from "../../components/Button";
import VoltarButton from "../../components/VoltarButton";
import { ButtonContainer, TableStyle, TableStyle2 } from "./style";

function CompetenciaColaborador({
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
  const { colaboradorId } = useParams();

  const exibirDescricao = (competencia) => {
    navigate(`/descricaoCompetencia/${competencia.id}`, {
      state: {
        name: competencia.nome,
        descricao: competencia.descricao,
        id: competencia.id,
      },
    });
  };

  const url = `http://35.184.203.56:8016/api/colaborador-competencias/${colaboradorId}`;
  const [itensPorPagina, setItensPorPagina] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);
  const [dataToShow, setDataToShow] = useState([]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPorPagina) {
      setCurrentPage(newPage);
    }
  };

  const totalPorPagina = Math.ceil(competencias.length / itensPorPagina);

  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const carregarCompetencias = async () => {
    try {
      const response = await axiosInstance.get(url);
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
    const carregarCompetencias = async (colaboradorId) => {
      try {
        const response = await axiosInstance.get(
          `http://35.184.203.56:8016/api/colaborador-competencias/${colaboradorId}`
        );
        const competenciasData = response.data.competencias || [];
        setCompetencias(competenciasData);
      } catch (error) {
        console.error("Erro na requisição carregarCompetencias:", error);
      }
    };

    carregarCompetencias(colaboradorId);
  }, [updateTable, colaboradorId]);

  const handleConfirmClick = (competenciaId) => {
    setCompetenciaIdToDelete(competenciaId);
    setShowConfirmModal(true);
  };

  const getServicoById = async (colaboradorId) => {
    try {
      const response = await axiosInstance.get(
        `http://35.184.203.56:8016/api/colaborador-competencias/${colaboradorId}`
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
        console.log("Enviando solicitação para desvincular:", {
          idColaborador: colaboradorId,
          idCompetencias: [competenciaIdToDelete],
        });

        await axios.delete(
          "http://35.184.203.56:8016/api/colaborador-competencias/desvincular",
          {
            data: {
              idColaborador: colaboradorId,
              idCompetencias: [competenciaIdToDelete],
            },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const updatedCompetencias = competencias.filter(
          (comp) => comp.id !== competenciaIdToDelete
        );
        setCompetencias(updatedCompetencias);

        setUpdateTable((prev) => !prev);
      } catch (error) {
        console.error("Erro ao desvincular competência:", error);
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
        return toast.error("Serviço já vinculado !", {
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
          title="Competências do Colaborador"
        />
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
                          onClick={() => {
                            console.log(competencia.id); // Adicione esta linha para verificar o ID
                            handleConfirmClick(competencia.id);
                          }}
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
                  navigate(`/adicionarCompetencia/${colaboradorId}`, {
                    state: {
                      id: colaboradorId,
                      competencias: [],
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
      </PageContainer>
    </ContainerWithSidebar>
  );
}

export default CompetenciaColaborador;
