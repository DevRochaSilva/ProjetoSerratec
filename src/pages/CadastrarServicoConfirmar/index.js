import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import { TableStyle } from "./style";
import { useNavigate, useParams } from "react-router-dom";
import { ModalComponent } from "../../components/Modal";
import { BsEye } from "react-icons/bs";
import { toast } from "react-toastify";
import SearchComponent from "../../components/BuscaComponent";
import PaginationComponent from "../../components/Paginacao";
import { ContainerWithSidebar } from "../../components/ContainerWithSidebar";
import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";
import { IoMdAddCircleOutline } from "react-icons/io";
import ButtonComponent from "../../components/Button";
import { ButtonContainer } from "../CadastrarServico/style";
import VoltarButton from "../../components/VoltarButton";

function CadastrarServicoConfirmar({
  HandledarkMode,
  isDarkMode,
  decreaseFontSize,
  increaseFontSize,
  logOut,
}) {
  const [competencias, setCompetencias] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [updateTable, setUpdateTable] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { servicoId } = useParams();
  const [selectedCompetencias, setSelectedCompetencias] = useState([]);

  const url = "http://35.184.203.56:8016/competencias";

  const exibirDescricao = (competencia) => {
    navigate(`/descricaoCompetencia/${competencia.id}`, {
      state: {
        descricao: competencia.descricao,
        name: competencia.nome,
        id: competencia.id,
      },
    });
  };

  const getServicoById = async (servicoId) => {
    try {
      const response = await axios.get(
        `http://35.184.203.56:8016/servicos/${servicoId}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao obter informações do serviço:", error);
      throw error;
    }
  };

  const handleAddComp = (competenciaId) => {
    if (!selectedCompetencias.includes(competenciaId)) {
      setSelectedCompetencias((prev) => [...prev, competenciaId]);
    } else {
      setSelectedCompetencias((prev) =>
        prev.filter((id) => id !== competenciaId)
      );
    }
  };

  const handleAddCompetencia = async () => {
    if (selectedCompetencias.length > 0) {
      try {
        const servicoData = await getServicoById(servicoId);

        servicoData.competencias = servicoData.competencias || [];

        const existingIds = servicoData.competencias.map((comp) => comp.id);

        const newCompetenciaIds = existingIds.concat(selectedCompetencias);

        await axios.put(`http://35.184.203.56:8016/servicos/${servicoId}`, {
          ...servicoData,
          competenciaIds: newCompetenciaIds,
        });
        setUpdateTable((prev) => !prev);
      } catch (error) {
        console.error("Erro ao adicionar competência:", error);

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
          alert("Erro desconhecido ao adicionar competência.");
        }
      } finally {
        setSelectedCompetencias([]);
        notify("success");
      }
    }
  };

  const carregarCompetencias = async () => {
    try {
      const servicoData = await getServicoById(servicoId);
      const competenciasVinculadasIds = servicoData.competencias.map(
        (comp) => comp.id
      );

      const response = await axios.get(url);

      const competenciasNaoVinculadas = response.data.filter(
        (competencia) => !competenciasVinculadasIds.includes(competencia.id)
      );

      console.log(competenciasNaoVinculadas);
      setCompetencias(competenciasNaoVinculadas);
    } catch (error) {
      console.error("Erro na requisição carregarCompetencias:", error);
    }
  };

  const [itensPorPagina, setItensPorPagina] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataToShow, setDataToShow] = useState([]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPorPagina) {
      setCurrentPage(newPage);
    }
  };

  const totalPorPagina = Math.ceil(competencias.length / itensPorPagina);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itensPorPagina;
    const endIndex = startIndex + itensPorPagina;
    setDataToShow(competencias.slice(startIndex, endIndex));
    console.log(currentPage, competencias, itensPorPagina);
  }, [currentPage, competencias, itensPorPagina]);

  useEffect(() => {
    setCurrentPage(1);
  }, [itensPorPagina]);

  useEffect(() => {
    const fetchData = async () => {
      await getServicoById(servicoId);
      carregarCompetencias();
    };

    fetchData();
  }, [updateTable, servicoId]);

  useEffect(() => {
    if (showConfirmModal) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [showConfirmModal]);

  const notify = (type) => {
    switch (type) {
      case "success":
        toast.success("Competência vinculada com sucesso!", {
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
          icon={<IoMdAddCircleOutline size="35px" />}
          title="Adicionar Competência ao Serviço"
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
                              onClick={() => handleAddComp(competencia.id)}
                              color={
                                selectedCompetencias.includes(competencia.id)
                                  ? "var(--verde-secundario)"
                                  : "var(--preto-primario)"
                              }
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
                action={() => setShowConfirmModal(true)}
              >
                <span>Confirmar Cadastro</span>
              </ButtonComponent>

              <ModalComponent
                showModal={showConfirmModal}
                setShowModal={setShowConfirmModal}
                action={async () => {
                  await handleAddCompetencia();
                  navigate(`/competenciaServico/${servicoId}`, {
                    state: {
                      descricao: servicoId.descricao,
                      dataServico: servicoId.dataServico,
                      name: servicoId.nome,
                      id: servicoId.id,
                      competenciaIds: [],
                    },
                  });
                }}
                header="Deseja Finalizar a Vinculação?"
                title="Confirmação"
                cancelText="Cancelar"
                acceptText="Confirmar"
              />
            </ButtonContainer>
          </TableStyle>
        </PageContentContainer>
      </PageContainer>
    </ContainerWithSidebar>
  );
}

export default CadastrarServicoConfirmar;