import React from "react";
import Form from "react-bootstrap/Form";

import { PaginationStyle } from "./style";
import {
  MdNavigateNext,
  MdNavigateBefore,
  MdLastPage,
  MdFirstPage,
} from "react-icons/md";

function PaginationComponent({
  currentPage,
  totalPages,
  totalRecords,
  onPageChange,
  itensPorPagina, // 
  setItensPorPagina, // 
}) {  

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  const totalPorPagina = Math.ceil(totalRecords / itensPorPagina);

  return (
    <PaginationStyle>
      <Form.Select
        className="select-per-page"
        value={itensPorPagina}
        onChange={(e) => setItensPorPagina(Number(e.target.value))} //
      >
        <option>10</option>
        <option>25</option> 
       <option>50</option>
       <option>100</option>
      </Form.Select>
      <div>
        <span>Total de registros: {totalRecords}</span>
      </div>
      <div className="area-paginacao">
        <div onClick={() => handlePageChange(1)}>
          <MdFirstPage />
        </div>
        <div onClick={() => handlePageChange(currentPage - 1)}>
          <MdNavigateBefore />
        </div>
        <div>
          <span>{`${currentPage} de ${totalPages}`}</span>
        </div>
        <div onClick={() => handlePageChange(currentPage + 1)}>
          <MdNavigateNext />
        </div>
        <div onClick={() => handlePageChange(totalPages)}>
          <MdLastPage />
        </div>
      </div>
    </PaginationStyle>
  );
}

export default PaginationComponent;
