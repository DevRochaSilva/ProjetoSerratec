import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import { BsEye } from "react-icons/bs";
import { TableStyle } from "./style";
import { Link, useNavigate } from "react-router-dom";
import { ModalComponent } from "../Modal";
import SearchComponent from "../../components/BuscaComponent";
import PaginationComponent from "../../components/Paginacao";
import { IoMdAddCircleOutline } from "react-icons/io";
import api from "../../config/Api";
import { LoadingComponent } from "../LoadingComponent/index";

function TabelaColaboradores() {
  const [colaboradores, setColaboradores] = useState([]);
  const [colaboradorIdToDelete, setColaboradorIdToDelete] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [dataToShow, setDataToShow] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [itensPorPagina, setItensPorPagina] = useState(10);

  const url = "/Consulta-user";
  const companyEndpoint = "http://35.184.203.56:8016/Colaborador/";

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const totalPorPagina = Math.ceil(colaboradores.length / itensPorPagina);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itensPorPagina;
    const endIndex = startIndex + itensPorPagina;
    setDataToShow(colaboradores.slice(startIndex, endIndex));
  }, [currentPage, colaboradores, itensPorPagina]);

  useEffect(() => {
    setCurrentPage(1);
  }, [itensPorPagina]);

  const carregarColaboradores = async () => {
    setIsLoading(true);
    try {
     const response = await api.get(url);
     const colaboradoresData = response.data;
   
     const promises = colaboradoresData.map(async (colaborador) => {
       try {
         const companyResponse = await axios.get(`${companyEndpoint}${colaborador.id}`, {
           headers: {
             Authorization: `Bearer ${localStorage.getItem("token")}`,
           },
         });
   
         colaborador.empresa = companyResponse.data.empresas[0]?.nomeEmpresa || "N/A";
       } catch (error) {
         console.error(`Erro ao obter informações da empresa para o colaborador ${colaborador.id}:`, error);
         colaborador.empresa = "N/A";
       }
     });
   
     await Promise.all(promises);
   
     setColaboradores(colaboradoresData);
    } catch (error) {
     console.error("Erro na requisição carregarColaboradores:", error);
    } finally {
     setIsLoading(false);
    }
   }

  const handleConfirmClick = (colaboradorId) => {
    setColaboradorIdToDelete(colaboradorId);
    setShowConfirmModal(true);
  };

  const handleExcluirColaborador = async () => {
    if (colaboradorIdToDelete) {
      try {
        carregarColaboradores();
      } catch (error) {
        console.error("Erro ao excluir colaborador:", error);
      } finally {
        setColaboradorIdToDelete(null);
        setShowConfirmModal(false);
      }
    }
  };

  useEffect(() => {
    carregarColaboradores();
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itensPorPagina;
    const endIndex = startIndex + itensPorPagina;

    const filteredData = colaboradores
      .filter((colaborador) =>
        colaborador.fullName.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(startIndex, endIndex);

    setDataToShow(filteredData);
  }, [searchTerm, currentPage, colaboradores, itensPorPagina]);

  const exibirDescricao = (colaborador) => {
    navigate(`/detalharColaborador/${colaborador.id}`, {
      state: {
        telefone: colaborador.phone,
        nome: colaborador.fullName,
        email: colaborador.personalEmail,
        dataAdimissao: colaborador.admissionDate,
        dataNasc: colaborador.birthDate,
        id: colaborador.id,
      },
    });
  };

  const adicionarCompetencia = (colaborador) => {
    navigate(`/competenciaColaborador/${colaborador.id}`, {
      state: {
        nome: colaborador.fullName,
      },
    });
  };

  return (
 <TableStyle>
   {isLoading ? (
     <LoadingComponent />
   ) : (
     <div className="table-area">
        <SearchComponent onSearch={setSearchTerm} />
        <Table hover striped>
          <thead>
            <tr>
              <th>Nome</th>
              <th className="col-2">Email</th>
              <th className="col-3">Empresa</th>
              <th className="col-1 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {dataToShow.map((colaborador) => (
              <tr key={colaborador.id}>
                <td>{colaborador.fullName}</td>
                <td>{colaborador.personalEmail}</td>
                <td>{colaborador.empresa}</td>
                <td className="acoes-button">
                  <BsEye onClick={() => exibirDescricao(colaborador)} />
                  <IoMdAddCircleOutline
                    onClick={() => adicionarCompetencia(colaborador)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPorPagina}
          totalRecords={colaboradores.length}
          itensPorPagina={itensPorPagina}
          setItensPorPagina={setItensPorPagina}
          onPageChange={handlePageChange}
        />
      </div>
      )}
      {colaboradorIdToDelete && (
        <ModalComponent
          showModal={showConfirmModal}
          setShowModal={setShowConfirmModal}
          action={() => {
            handleExcluirColaborador();
          }}
          header="Tem Certeza que deseja Excluir o colaborador?"
          title="Confirmação"
          cancelText="Cancelar"
          acceptText="Confirmar"
        />
      )}
    </TableStyle>
  );
}

export default TabelaColaboradores;
