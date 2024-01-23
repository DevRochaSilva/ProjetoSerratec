import React from "react";
import axios from "axios";

const ExcluirCompetencia = ({
  apiUrl,
  competenciaId,
  carregarCompetencias,
}) => {
  const handleExcluirCompetencia = async () => {
    try {
      await axios.delete(`${apiUrl}/${competenciaId}`);
      carregarCompetencias();
    } catch (error) {
      console.error("Erro ao excluir competencia:", error);
    }
  };

  return (
    <button onClick={handleExcluirCompetencia}>Excluir Competência</button>
  );
};

export default ExcluirCompetencia;
