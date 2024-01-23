import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { TableStyle } from "./style";
import { useNavigate, useParams } from "react-router-dom";
import { ModalComponent } from "../../components/Modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchComponent from "../../components/BuscaComponent";
import PaginationComponent from "../../components/Paginacao";
import { ContainerWithSidebar } from "../../components/ContainerWithSidebar";
import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";
import { IoMdAddCircleOutline } from "react-icons/io";
import { BsEye } from "react-icons/bs";
import ButtonComponent from "../../components/Button";
import { ButtonContainer } from "../CadastrarServico/style";
import VoltarButton from "../../components/VoltarButton";

const CadastrarCompconfirmar = ({
  HandledarkMode,
  isDarkMode,
  decreaseFontSize,
  increaseFontSize,
  logOut,
}) => {
  const [competencias, setCompetencias] = useState([]);
  const [competenciaIdToAdd, setCompetenciaIdToAdd] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [updateTable, setUpdateTable] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { colaboradorId } = useParams();

  const url = "http://35.184.203.56:8016/competencias";

  const [itensPorPagina, setItensPorPagina] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataToShow, setDataToShow] = useState([]);
  const [selectedCompetencias, setSelectedCompetencias] = useState([]);
  const [colaboradorInfo, setColaboradorInfo] = useState({});

  useEffect(() => {
    const fetchColaboradorInfo = async () => {
      try {
        const response = await axios.get(`http://35.184.203.56:8016/api/colaborador-competencias/${colaboradorId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setColaboradorInfo(response.data || {});
      } catch (error) {
        console.error("Error fetching colaborador info:", error);
      }
    };

    fetchColaboradorInfo();
  }, [colaboradorId]);

  useEffect(() => {
    const carregarCompetencias = async () => {
      try {
        const response = await axios.get(url);
        const competenciasData = response.data || [];

        // Filtra as competências que não estão vinculadas ao colaborador
        const competenciasNaoVinculadas = competenciasData.filter(
          (comp) => !comp.vinculada && comp.idColaborador !== colaboradorId
        );

        setCompetencias(competenciasNaoVinculadas);
      } catch (error) {
        console.error("Erro na requisição carregarCompetencias:", error);
      }
    };

    carregarCompetencias();
  }, [updateTable, url, selectedCompetencias, colaboradorId]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itensPorPagina;
    const endIndex = startIndex + itensPorPagina;

    // Filtra as empresas que NÃO estão vinculadas ao colaborador
    const competenciasNaoVinculadas = competencias.filter(competencia => (
      !colaboradorInfo.competencias || // Se o colaborador não tiver empresas vinculadas, exibe todas as empresas
      colaboradorInfo.competencias.every(colaboradorCompetencia => colaboradorCompetencia.id !== competencia.id)
    ));

    setDataToShow(competenciasNaoVinculadas.slice(startIndex, endIndex));
  }, [currentPage, competencias, colaboradorInfo, itensPorPagina]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPorPagina) {
      setCurrentPage(newPage);
    }
  };

  const totalPorPagina = Math.ceil(competencias.length / itensPorPagina);

  const handleConfirmClick = (competenciaId) => {
    setSelectedCompetencias((prevSelected) => {
      // Verifica se a competência já está na lista
      const competenciaIndex = prevSelected.indexOf(competenciaId);

      if (competenciaIndex === -1) {
        // Se não estiver, adiciona à lista
        return [...prevSelected, competenciaId];
      } else {
        // Se já estiver, remove da lista
        const updatedSelected = [...prevSelected];
        updatedSelected.splice(competenciaIndex, 1);
        return updatedSelected;
      }
    });
  };

  const handleAddCompetencia = async () => {
    if (selectedCompetencias.length > 0) {
      try {
        const competenciasVinculadas = selectedCompetencias.filter(
          (competenciaId) =>
            competencias.find(
              (comp) => comp.id === competenciaId && comp.vinculada
            )
        );

        if (competenciasVinculadas.length > 0) {
          notify("danger");
          return;
        }

        await axios.post(
          "http://35.184.203.56:8016/api/colaborador-competencias/vincular",
          {
            idColaborador: colaboradorId,
            idCompetencias: selectedCompetencias,
          }
        );

        const updatedCompetencias = competencias.filter(
          (comp) => !selectedCompetencias.includes(comp.id)
        );
        setCompetencias(updatedCompetencias);

        setUpdateTable((prev) => !prev);
        setSelectedCompetencias([]);
      } catch (error) {
        console.error("Erro ao vincular competências:", error);
      } finally {
        setShowConfirmModal(false);
        navigate(`/competenciaColaborador/${colaboradorId}`, {
          state: {
            id: colaboradorId,
            Competencias: [],
          },
        });
      }
    }
  };

  const notify = (type) => {
    switch (type) {
      case "success":
        toast.success("Competência vinculada com sucesso!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
        break;
      default:
      case "danger":
        return toast.error("Competência já vinculada!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
    }
  };
  const exibirDescricao = (competencia) => {
    navigate(`/descricaoCompetencia/${competencia.id}`, {
      state: {
        descricao: competencia.descricao,
        name: competencia.nome,
        id: competencia.id,
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
          title="Adicionar Competência ao Colaborador"
        />
        <PageContentContainer>
          <TableStyle>
            <div className="table-area">
              <SearchComponent onSearch={setSearchTerm} />
              <Table hover striped>
                <thead>
                  <tr>
                    <th>Competências</th>
                    <th className="col-1 text-center">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {dataToShow
                    .filter((competencia) =>
                      competencia.nome
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    )
                    .map((competencia) => (
                      <tr key={competencia.id}>
                        <td>{competencia.nome}</td>
                        <td>
                          <div className="acoes-button">
                            <BsEye
                              onClick={() => exibirDescricao(competencia)}
                              color="var(--preto-primario)"
                            />
                            <IoMdAddCircleOutline
                              onClick={() => handleConfirmClick(competencia.id)}
                              color={
                                selectedCompetencias.includes(competencia.id)
                                  ? "var(--verde-secundario)"
                                  : "var(--preto-primario)"
                              }
                              disabled={selectedCompetencias.includes(
                                competencia.id
                              )}
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
                totalRecords={dataToShow.length}
                itensPorPagina={itensPorPagina}
                setItensPorPagina={setItensPorPagina}
                onPageChange={handlePageChange}
              />
            </div>
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
                      marginRight: "-100px",
                    }}
                  >
                    <span
                      style={{
                        backgroundColor: "var(--branco)",
                        padding: "0 8px",
                      }}
                    >
                      Etapa 2
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
                        background: "var(--verde-primario)",
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
                action={() => {
                  setShowConfirmModal(true);
                }}
              >
                <span>Confirmar</span>
              </ButtonComponent>
              <ModalComponent
                showModal={showConfirmModal}
                setShowModal={setShowConfirmModal}
                action={() => {
                  navigate(`/competenciaColaborador/${colaboradorId}`, {
                    state: {
                      id: colaboradorId,
                      Competencias: [],
                    },
                  });
                  setShowConfirmModal(false);
                }}
                header="Tem Certeza que deseja Excluir a competência?"
                title="Confirmação"
                cancelText="Cancelar"
                acceptText="Confirmar"
              />
            </ButtonContainer>
            {selectedCompetencias.length > 0 && (
              <ModalComponent
                showModal={showConfirmModal}
                setShowModal={setShowConfirmModal}
                action={() => {
                  handleAddCompetencia();
                  setUpdateTable((prev) => !prev);
                  notify("success");
                }}
                header="Tem Certeza que deseja Adicionar a competência?"
                title="Confirmação"
                cancelText="Cancelar"
                acceptText="Confirmar"
              />
            )}
          </TableStyle>
        </PageContentContainer>
      </PageContainer>
    </ContainerWithSidebar>
  );
};

export default CadastrarCompconfirmar;
