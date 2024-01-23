import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import { BsEye, BsTrash } from "react-icons/bs";
import { TableStyle } from "./style";
import { useNavigate } from "react-router-dom";
import { ModalComponent } from "../../components/Modal";
import { toast } from "react-toastify";
import SearchComponent from "../../components/BuscaComponent";
import PaginationComponent from "../../components/Paginacao";

function TabelaComp() {
  const [competencias, setCompetencias] = useState([]);
  const [competenciaIdToDelete, setCompetenciaIdToDelete] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [updateTable, setUpdateTable] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const exibirDescricao = (competencia) => {
    navigate(`/descricaoCompetencia/${competencia.id}`, {
      state: {
        descricao: competencia.descricao,
        name: competencia.nome,
        id: competencia.id,
      },
    });
  };

  const url = "http://35.184.203.56:8016/competencias";
  const [itensPorPagina, setItensPorPagina] = useState(10); //
  const [currentPage, setCurrentPage] = useState(1);
  const [dataToShow, setDataToShow] = useState([]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPorPagina) {
      setCurrentPage(newPage);
    }
  };

  const totalPorPagina = Math.ceil(competencias.length / itensPorPagina); //

  useEffect(() => {
    const startIndex = (currentPage - 1) * itensPorPagina;
    const endIndex = startIndex + itensPorPagina;
    setDataToShow(competencias.slice(startIndex, endIndex));
  }, [currentPage, competencias, itensPorPagina]);

  useEffect(() => {
    setCurrentPage(1);
  }, [itensPorPagina]);

  const carregarCompetencias = async () => {
    try {
      const response = await axios.get(url);
      setCompetencias(response.data);
    } catch (error) {
      console.error("Erro na requisição carregarCompetencias:", error);
    }
  };

  const handleConfirmClick = (competenciaId) => {
    setCompetenciaIdToDelete(competenciaId);
    setShowConfirmModal(true);
  };

  const handleExcluirCompetencia = async () => {
    if (competenciaIdToDelete) {
      try {
        await axios.delete(`${url}/${competenciaIdToDelete}`);
        carregarCompetencias();
        notify("success");
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          
          notify("danger");
        } else {
        }
      } finally {
        setCompetenciaIdToDelete(null);
        setShowConfirmModal(false);
      }
    }
  };

  
  useEffect(() => {
    console.log("searchTerm:", searchTerm);
    
  }, [searchTerm]);

  useEffect(() => {
    carregarCompetencias();
  }, [updateTable]);

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
        toast.success("Competência excluida com sucesso!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        break;
      default:
      case "danger":
        return toast.error(
          "Não é possível excluir a competência, porque está vinculada a um colaborador !",
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
    }
  };

  return (
    <TableStyle>
      <div className="table-area">
        <SearchComponent onSearch={setSearchTerm} />
        <Table hover striped>
          <thead>
            <tr>
              <th>Nome</th>
              <th class="col-1 text-center">Ações</th>
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
          itensPorPagina={itensPorPagina} //
          setItensPorPagina={setItensPorPagina} //
          onPageChange={handlePageChange}
        />
      </div>
      {competenciaIdToDelete && (
        <ModalComponent
          showModal={showConfirmModal}
          setShowModal={setShowConfirmModal}
          action={() => {
            handleExcluirCompetencia();
            setUpdateTable((prev) => !prev);
          }}
          header="Tem Certeza que deseja Excluir a competência?"
          title="Confirmação"
          cancelText="Cancelar"
          acceptText="Confirmar"
        />
      )}
    </TableStyle>
  );
}

export default TabelaComp;
