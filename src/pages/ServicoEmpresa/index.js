import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import axios from "axios";
import { TableStyle, TableStyle2 } from "./style";
import { useNavigate } from "react-router-dom";
import { ModalComponent } from "../../components/Modal";
import { toast } from "react-toastify";
import SearchComponent from "../../components/BuscaComponent";
import PaginationComponent from "../../components/Paginacao";
import { ContainerWithSidebar } from "../../components/ContainerWithSidebar";
import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import { IoMdAddCircleOutline } from "react-icons/io";
import ButtonComponent from "../../components/Button";
import { ButtonContainer } from "../CadastrarServico/style";
import VoltarButton from "../../components/VoltarButton";
import { FaListUl } from "react-icons/fa";
import { BsEye, BsTrash } from "react-icons/bs";
import { useParams } from "react-router-dom";

function ServicoEmpresa({
  HandledarkMode,
  isDarkMode,
  decreaseFontSize,
  increaseFontSize,
  logOut,
}) {
  const [servicos, setServicos] = useState([]);
  const [servicoIdToDelete, setServicoIdToDelete] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [updateTable, setUpdateTable] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { empresaId } = useParams();

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

  const url = `http://35.184.203.56:8016/empresas/${empresaId}`;
  const [itensPorPagina, setItensPorPagina] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);
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
    const carregarServicos = async (EmpresaId) => {
      try {
        const response = await axios.get(
          `http://35.184.203.56:8016/empresas/${empresaId}`
        );
        console.log("carregue empresa", response.data);
        const servicosData = response.data.servicos || [];
        setServicos(servicosData);
      } catch (error) {
        console.error("Erro na requisição carregarServicos:", error);
      }
    };
    carregarServicos(empresaId);
  }, [updateTable, empresaId]);

  const handleConfirmClick = (servicoId) => {
    setServicoIdToDelete(servicoId);
    setShowConfirmModal(true);
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

  const handleExcluirServico = async () => {
    if (servicoIdToDelete) {
      try {
        const empresaData = await getEmpresaById(empresaId);

        const updatedServicos = servicos.filter(
          (serv) => serv.id !== servicoIdToDelete
        );
        setServicos(updatedServicos);

        await axios.put(`http://35.184.203.56:8016/empresas/${empresaId}`, {
          ...empresaData,
          servicoIds: updatedServicos.map((serv) => serv.id),
        });

        setUpdateTable((prev) => !prev);
      } catch (error) {
        console.error("Erro ao excluir serviço:", error);

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
        setServicoIdToDelete(null);
        setShowConfirmModal(false);
      }
    }
  };
  const notify = (type) => {
    switch (type) {
      case "success":
        toast.success("Serviço desvinculado com sucesso!", {
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
          icon={<FaListUl size="35px" />}
          title="Serviços da Empresa"
        />
        <TableStyle2>
          <div className="table-area mt-4">
            <SearchComponent onSearch={setSearchTerm} />
            <Table hover striped>
              <thead>
                <tr>
                  <th>Serviços</th>
                  <th className="col-1 text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {dataToShow
                  .filter(
                    (servico) =>
                      servico.nome &&
                      servico.nome
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                  )
                  .map((servico) => (
                    <tr key={servico.id}>
                      <td>{servico.nome}</td>
                      <td>
                        <div className="acoes-button">
                          <BsEye
                            onClick={() => exibirDescricao(servico)}
                            color="var(--preto-primario)"
                          />
                          <BsTrash
                            onClick={() => handleConfirmClick(servico.id)}
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
              totalRecords={servicos.length}
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
                size="10rem"
                bgColor="var(--verde-primario)"
                textColor="#FFF"
                action={() =>
                  navigate(`/selecionarServicoEmpresa/${empresaId}`, {
                    state: {
                      nome: empresaId.nome,
                      cnpj: empresaId.cnpj,
                      contato: empresaId.contato,
                      setor: empresaId.setor,
                      id: empresaId.id,
                      servicoIds: [],
                    },
                  })
                }
              >
                <span>Adicionar</span>
              </ButtonComponent>
            </ButtonContainer>
            {servicoIdToDelete && (
              <ModalComponent
                showModal={showConfirmModal}
                setShowModal={setShowConfirmModal}
                action={() => {
                  handleExcluirServico();
                  setUpdateTable((prev) => !prev);
                  notify("success");
                }}
                header="Tem Certeza que deseja desvincular o serviço?"
                title="Confirmação"
                cancelText="Cancelar"
                acceptText="Confirmar"
              />
            )}
          </div>
        </TableStyle2>
      </PageContainer>
    </ContainerWithSidebar>
  );
}

export default ServicoEmpresa;
