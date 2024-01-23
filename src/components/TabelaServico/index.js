import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import { BsEye, BsTrash } from "react-icons/bs";
import { TableStyle2 } from "./style";
import { useNavigate } from "react-router-dom";
import { ModalComponent } from "../Modal";
import SearchComponent from "../BuscaComponent";
import { IoMdAddCircleOutline } from "react-icons/io";
import PaginationComponent from "../Paginacao";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TabelaServicos() {
  const [servicos, setServicos] = useState([]);
  const navigate = useNavigate();
  const [updateTable, setUpdateTable] = useState(false);
  const [servicoIdToDelete, setServicoIdToDelete] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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

  const carregarServicos = async () => {
    try {
      const response = await axios.get(url);
      setServicos(response.data);
    } catch (error) {
      console.error("Erro na requisição carregarServicos:", error);
    }
  };

  const handleConfirmClick = (servicoId) => {
    setServicoIdToDelete(servicoId);
    setShowConfirmModal(true);
  };

  const handleExcluirServico = async () => {
    if (servicoIdToDelete) {
      try {
        await axios.delete(`${url}/${servicoIdToDelete}`);
        carregarServicos();
        toast.success("Serviço excluído com sucesso!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      } catch (error) {
        const errorMessage =
          (error.response && error.response.data && error.response.data.message) ||
          "Erro ao excluir serviço";
        console.error("Erro ao excluir serviço:", error);
        toast.error(errorMessage, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      } finally {
        setServicoIdToDelete(null);
        setShowConfirmModal(false);
      }
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

  // Fim da Paginação

  useEffect(() => {
    carregarServicos();
  }, [updateTable]);

  useEffect(() => {
    if (showConfirmModal) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [showConfirmModal]);

  return (
    <TableStyle2>
      <div className="table-area">
        <SearchComponent onSearch={setSearchTerm} />
        <Table hover striped>
          <thead>
            <tr>
              <th>Nome</th>
              {/* <th>Data de inicio</th> */}
              <th class="col-1 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {dataToShow
              .filter((servico) =>
                servico.nome.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((servico) => (
                <tr key={servico.id}>
                  <td>{servico.nome}</td>
                  {/* <td>{format(new Date(servico.dataServico), 'dd/MM/yyyy')}</td> */}
                  <td>
                    <div className="acoes-button">
                      <BsEye
                        onClick={() => exibirDescricao(servico)}
                        color="var(--preto-primario)"
                      />

                      <IoMdAddCircleOutline
                        className="oMdAddCircleOutline"
                        color="var(--preto-primario)"
                        onClick={() => exibirCadastro(servico)}
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
      </div>
      {servicoIdToDelete && (
        <ModalComponent
          showModal={showConfirmModal}
          setShowModal={setShowConfirmModal}
          action={() => {
            handleExcluirServico();
            setUpdateTable((prev) => !prev);
          }}
          header="Tem Certeza que deseja Excluir o serviço?"
          title="Confirmação"
          cancelText="Cancelar"
          acceptText="Confirmar"
        />
      )}
    </TableStyle2>
  );
}

export default TabelaServicos;
