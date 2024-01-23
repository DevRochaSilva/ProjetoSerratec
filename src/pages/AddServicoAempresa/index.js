import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import { BsEye, BsTrash } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { TableStyle2 } from "./styles";
import { useNavigate } from "react-router-dom";
import { ModalComponent } from "../../components/Modal";
import SearchComponent from "../../components/BuscaComponent";
import { IoMdAddCircleOutline } from "react-icons/io";
import PaginationComponent from "../../components/Paginacao";
import { format } from "date-fns";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import { ContainerWithSidebar } from "../../components/ContainerWithSidebar";
import PageContentContainer from "../../components/PageContentContainer";
import ButtonComponent from "../../components/Button";
import VoltarButton from "../../components/VoltarButton";
import { ButtonContainer } from "../CadastrarEmpresa/style";
import SubTitle from "../../components/SubTitle";
import { toast } from "react-toastify";

function AddServicoAempresa({
  HandledarkMode,
  isDarkMode,
  decreaseFontSize,
  increaseFontSize,
  logOut,
}) {
  const [servicos, setServicos] = useState([]);
  const navigate = useNavigate();
  const [updateTable, setUpdateTable] = useState(false);
  const [servicoIdToDelete, setServicoIdToDelete] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [competenciaIdToDelete, setCompetenciaIdToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { empresaId } = useParams();
  const [selectedServicos, setSelectedServicos] = useState([]);
  const [servicosVinculados, setServicosVinculados] = useState([]);

  const url = "http://35.184.203.56:8016/servicos";

  const exibirDescricao = (servico) => {
    navigate(`/descricaoServico/${servico.id}`, {
      state: {
        descricao: servico.descricao,
        dataServico: servico.dataServico,
        name: servico.nome,
        id: servico.id,
      },
    });
  };

  const adicionarServico = (empresa) => {
    navigate(`/servicoEmpresa/${empresa.id}`, {
      state: {
        nome: empresa.nomeEmpresa,
        cnpj: empresa.cnpj,
        contato: empresa.contato,
        setor: empresa.setor,
        id: empresa.id,
      },
    });
  };

  const exibirCadastro = (servico) => {
    navigate(`/competenciaServico/${servico.id}`, {
      state: {
        descricao: servico.descricao,
        dataServico: servico.dataServico,
        name: servico.nome,
        id: servico.id,
      },
    });
  };

  const getEmpresaById = async (empresaId) => {
    try {
      const response = await axios.get(
        `http://35.184.203.56:8016/empresas/${empresaId}`
      );
      console.log(response.data);

      return response.data;
    } catch (error) {
      console.error("Erro ao obter informações do serviço:", error);
      throw error;
    }
  };

  const handleAddServico = (servicoId) => {
    if (!selectedServicos.includes(servicoId)) {
      setSelectedServicos((prev) => [...prev, servicoId]);
    } else {
      setSelectedServicos((prev) => prev.filter((id) => id !== servicoId));
    }
  };

  const handleConfirmCadastro = async () => {
    if (selectedServicos.length > 0) {
      try {
        const empresaData = await getEmpresaById(empresaId);

        empresaData.servicos = empresaData.servicos || [];

        const existingIds = empresaData.servicos.map((serv) => serv.id);

        const newServicoIds = existingIds.concat(selectedServicos);

        await axios.put(`http://35.184.203.56:8016/empresas/${empresaId}`, {
          ...empresaData,
          servicoIds: newServicoIds,
        });

        setUpdateTable((prev) => !prev);
      } catch (error) {
        console.error("Erro ao adicionar serviço:", error);

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
        setSelectedServicos([]);
        notify("success");
      }
    }
  };

  const carregarServicos = async () => {
    try {
      const empresaData = await getEmpresaById(empresaId);

      const servicosVinculadosIds = empresaData.servicos.map((serv) => serv.id);

      const response = await axios.get(url);

      const servicosNaoVinculados = response.data.filter(
        (servico) => !servicosVinculadosIds.includes(servico.id)
      );

      setServicos(servicosNaoVinculados);
    } catch (error) {
      console.error("Erro na requisição carregarServicos:", error);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itensPorPagina, setItensPorPagina] = useState(10);
  const [dataToShow, setDataToShow] = useState([]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPorPagina) {
      setCurrentPage(newPage);
    }
  };

  const totalPorPagina = Math.ceil(servicos.length / itensPorPagina);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itensPorPagina;
    const endIndex = startIndex + itensPorPagina;
    setDataToShow(servicos.slice(startIndex, endIndex));
  }, [currentPage, servicos, itensPorPagina]);

  useEffect(() => {
    setCurrentPage(1);
  }, [itensPorPagina]);

  useEffect(() => {
    const fetchData = async () => {
      await getEmpresaById(empresaId);
      carregarServicos();
    };

    fetchData();
  }, [updateTable, empresaId]);

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
        toast.success("Serviço vinculado com sucesso!", {
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
      <PageHeaderContainer
        title={`Adicionar Serviço`}
        icon={<IoMdAddCircleOutline size="35px" />}
      />
      <PageContentContainer>
        <SubTitle subtitle="Selecione os Serviços da Empresa" />
        <TableStyle2>
          <div className="table-area">
            <SearchComponent onSearch={setSearchTerm} />
            <Table hover striped>
              <thead>
                <tr>
                  <th>Serviço</th>
                  <th class="col-1 text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {dataToShow
                  .filter((servico) =>
                    servico.nome
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  )
                  .map((servico) => (
                    <tr key={servico.id}>
                      <td>{servico.nome}</td>
                      <td>
                        <div className="acoes-button">
                        <BsEye onClick={() => exibirDescricao(servico)} />
                          <IoMdAddCircleOutline
                            onClick={() => handleAddServico(servico.id)}
                            color={
                              selectedServicos.includes(servico.id)
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
              totalRecords={servicos.length}
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
              <span>Confirmar Cadastro</span>
            </ButtonComponent>
            <ModalComponent
              showModal={showConfirmModal}
              setShowModal={setShowConfirmModal}
              action={async () => {
                await handleConfirmCadastro();
                navigate(`/servicoEmpresa/${empresaId}`, {
                  state: {
                    nome: empresaId.nome,
                    cnpj: empresaId.cnpj,
                    contato: empresaId.contato,
                    setor: empresaId.setor,
                    servicoIds: [],
                  },
                });
                setShowConfirmModal(false);
                
              }}
              header="Deseja Finalizar a Viculação?"
              title="Confirmação"
              cancelText="Cancelar"
              acceptText="Confirmar"
            />
          </ButtonContainer>

          {servicoIdToDelete && (
            <ModalComponent
              showModal={showConfirmModal}
              setShowModal={setShowConfirmModal}
              action={() => {
                setUpdateTable((prev) => !prev);
              }}
              header="Tem Certeza que deseja Excluir o serviço?"
              title="Confirmação"
              cancelText="Cancelar"
              acceptText="Confirmar"
            />
          )}
        </TableStyle2>
      </PageContentContainer>
    </ContainerWithSidebar>
  );
}

export default AddServicoAempresa;
