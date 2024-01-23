import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import { BsEye, BsTrash } from "react-icons/bs";
import { TableStyle2 } from "./style";
import { Link, useNavigate } from "react-router-dom";

import { ModalComponent } from "../../components/Modal";
import SearchComponent from "../../components/BuscaComponent";
import PaginationComponent from "../../components/Paginacao";
import { IoMdAddCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";

function TabelaEmpresa() {
  const [empresas, setEmpresas] = useState([]);
  const navigate = useNavigate();
  const [empresaIdToDelete, setEmpresaIdToDelete] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [updateTable, setUpdateTable] = useState(false);

  const url = "http://35.184.203.56:8016/empresas";

  const exibirDetalhes = (empresa) => {
    navigate(`/detalharEmpresa/${empresa.id}`, {
      state: {
        nome: empresa.nomeEmpresa,
        cnpj: empresa.cnpj,
        contato: empresa.contato,
        setor: empresa.setor,
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

  const carregarEmpresas = async () => {
    try {
      const response = await axios.get(url);
      setEmpresas(response.data);
    } catch (error) {
      console.error("Erro na requisição carregarEmpresas:", error);
    }
  };

  const handleConfirmClick = (empresaId) => {
    setEmpresaIdToDelete(empresaId);
    setShowConfirmModal(true);
  };

  const handleExcluirEmpresa = async () => {
    if (empresaIdToDelete) {
      try {
        await axios.delete(`${url}/${empresaIdToDelete}`);
        carregarEmpresas();
        notify("success");
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          notify("danger");
        } else {
          console.error("Erro ao excluir empresa:", error);
        }
      } finally {
        setEmpresaIdToDelete(null);

        setShowConfirmModal(false);
      }
    }
  };

  useEffect(() => {
    carregarEmpresas();
  }, [updateTable]);

  useEffect(() => {
    if (showConfirmModal) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [showConfirmModal]);

  // Filter empresas based on searchTerm
  const filteredEmpresas = empresas.filter(
    (empresa) =>
      empresa.nomeEmpresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      empresa.cnpj.toLowerCase().includes(searchTerm.toLowerCase()) ||
      empresa.contato.toLowerCase().includes(searchTerm.toLowerCase()) ||
      empresa.setor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginação
  const [itensPorPagina, setItensPorPagina] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPorPagina = Math.ceil(filteredEmpresas.length / itensPorPagina);
  const [dataToShow, setDataToShow] = useState([]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPorPagina) {
      setCurrentPage(newPage);
    }
  };

  useEffect(() => {
    const startIndex = (currentPage - 1) * itensPorPagina;
    const endIndex = startIndex + itensPorPagina;
    setDataToShow(filteredEmpresas.slice(startIndex, endIndex));
  }, [currentPage, filteredEmpresas, itensPorPagina]);

  useEffect(() => {
    setCurrentPage(1);
  }, [itensPorPagina]);

  const notify = (type) => {
    switch (type) {
      case "success":
        toast.success("Empresa excluída com sucesso!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
        break;
      default:
      case "danger":
        return toast.error("A exclusão da empresa não foi possível devido à sua vinculação com colaboradores.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
    }
  };

  return (
    <TableStyle2>
      <div className="table-area">
        <SearchComponent onSearch={setSearchTerm} />
        <Table hover striped>
          <thead>
            <tr>
              <th className="nome-column">Nome</th>
              <th>CNPJ</th>
              <th>Contato</th>
              <th>Setor de Atuação</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {dataToShow.map((empresa) => (
              <tr key={empresa.id}>
                <td>{empresa.nomeEmpresa}</td>
                <td>
                  {empresa.cnpj
                    ? empresa.cnpj.replace(
                        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
                        "$1.$2.$3/$4-$5"
                      )
                    : "-"}
                </td>
                <td>
                  {empresa.contato !== "null"
                    ? empresa.contato
                      ? empresa.contato.replace(
                          /(\d{2})(\d{4,5})(\d{4})/,
                          "($1) $2-$3"
                        )
                      : "-"
                    : "-"}
                </td>
                <td>{empresa.setor}</td>
                <td className="action-column">
                  <div className="acoes-button">
                    <BsEye
                      onClick={() => exibirDetalhes(empresa)}
                      color="var(--preto-primario)"
                    />

                    <IoMdAddCircleOutline
                      onClick={() => adicionarServico(empresa)}
                      className="oMdAddCircleOutline"
                      color="var(--preto-primario)"
                    />

                    <BsTrash
                      onClick={() => handleConfirmClick(empresa.id)}
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
          totalRecords={filteredEmpresas.length}
          itensPorPagina={itensPorPagina}
          setItensPorPagina={setItensPorPagina}
          onPageChange={handlePageChange}
        />
      </div>
      {empresaIdToDelete && (
        <ModalComponent
          showModal={showConfirmModal}
          setShowModal={setShowConfirmModal}
          action={handleExcluirEmpresa}
          header="Tem Certeza que deseja Excluir a empresa?"
          title="Confirmação"
          cancelText="Cancelar"
          acceptText="Confirmar"
        />
      )}
    </TableStyle2>
  );
}

export default TabelaEmpresa;
