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
import ButtonComponent from "../../components/Button";
import { ButtonContainer } from "../CadastrarServico/style";
import VoltarButton from "../../components/VoltarButton";

const CadastrarEmpresaconfirmar = ({
  HandledarkMode,
  isDarkMode,
  decreaseFontSize,
  increaseFontSize,
  logOut,
}) => {
  const [empresas, setEmpresas] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [updateTable, setUpdateTable] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [colaboradorInfo, setColaboradorInfo] = useState({});
  const navigate = useNavigate();
  const { colaboradorId } = useParams();

  const url = "http://35.184.203.56:8016/empresas";

  const [itensPorPagina, setItensPorPagina] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataToShow, setDataToShow] = useState([]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPorPagina) {
      setCurrentPage(newPage);
    }
  };
  const totalPorPagina = Math.ceil(empresas.length / itensPorPagina);

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const response = await axios.get(url);
        setEmpresas(response.data || []);
      } catch (error) {
        console.error("Error fetching empresas:", error);
      }
    };
  
    fetchEmpresas();
  }, [url]);
  
  useEffect(() => {
    const fetchColaboradorInfo = async () => {
      try {
        const response = await axios.get(`http://35.184.203.56:8016/Colaborador/${colaboradorId}`, {
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
    const startIndex = (currentPage - 1) * itensPorPagina;
    const endIndex = startIndex + itensPorPagina;
  
    // Filtra as empresas que NÃO estão vinculadas ao colaborador
    const empresasNaoVinculadas = empresas.filter(empresa => (
      !colaboradorInfo.empresas || // Se o colaborador não tiver empresas vinculadas, exibe todas as empresas
      colaboradorInfo.empresas.every(colaboradorEmpresa => colaboradorEmpresa.id !== empresa.id)
    ));
  
    setDataToShow(empresasNaoVinculadas.slice(startIndex, endIndex));
  }, [currentPage, empresas, colaboradorInfo, itensPorPagina]);

  const notify = (type) => {
    switch (type) {
      case "success":
        toast.success("Empresa vinculada com sucesso!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
        break;
      default:
      case "danger":
        return toast.error("Empresa já vinculada!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
    }
  };

  const handleAddOrChangeEmpresa = async () => {
    let requestData;
    try {
      requestData = {
        idColaborador: String(colaboradorId),
        idEmpresa: selectedCompany,
      };

      const response = await axios.post('http://35.184.203.56:8016/Colaborador/vincular', requestData);

      notify('success');
    } catch (error) {
      console.error('Erro ao vincular empresa:', error);

      if (error.response) {

        if (error.response.status === 400) {

          try {
            const putResponse = await axios.put('http://35.184.203.56:8016/Colaborador/alterarVinculo', requestData);
            notify('success');
          } catch (putError) {
            console.error('Erro ao alterar vínculo:', putError);

            if (putError.response && putError.response.status !== 400) {
              notify('danger');
            }
          }
        } else {

          notify('danger');
        }
      } else if (error.request) {
        console.error('Solicitação feita, mas sem resposta do servidor');
      } else {
        console.error('Erro durante a solicitação:', error.message);
      }

      setShowConfirmModal(false);
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
          title="Adicionar Empresa ao Colaborador"
        />
        <PageContentContainer>
          <TableStyle>
            <div className="table-area">
              <SearchComponent onSearch={setSearchTerm} />
              <Table hover striped>
                <thead>
                  <tr>
                    <th>Nome da Empresa</th>
                    <th className="col-1 text-center">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {dataToShow
                    .filter((empresa) =>
                      empresa.nomeEmpresa.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((empresa) => (
                      <tr key={empresa.id}>
                        <td>{empresa.nomeEmpresa}</td>
                        <td>
                          <div className="acoes-button">
                            <input
                              type="radio"
                              id={empresa.id}
                              name="companySelection"
                              className="custom"
                              checked={selectedCompany === empresa.id}
                              onChange={() => setSelectedCompany(empresa.id)}
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
            </ButtonContainer>
            {(
              <ModalComponent
                showModal={showConfirmModal}
                setShowModal={setShowConfirmModal}
                action={() => {
                  navigate(`/detalharColaborador/${colaboradorId}`, {
                    state: {
                      id: colaboradorId,
                      Competencias: [],
                    },
                  });
                  setShowConfirmModal(false);
                  handleAddOrChangeEmpresa();
                  setUpdateTable((prev) => !prev);
                }}
                header="Tem Certeza que deseja Adicionar a empresa?"
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

export default CadastrarEmpresaconfirmar;
