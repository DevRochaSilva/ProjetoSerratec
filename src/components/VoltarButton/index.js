import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

import { ButtonStyle, ButtonStyleBack } from "./style";
import { FaChevronLeft } from "react-icons/fa";
import { useHistory, useLocation } from "react-router-dom";

function VoltarButton({
  size,
  height,
  bgColor,
  textColor,
  action,
  alternativeText,
  children,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleVoltar = () => {
    const isRota1 = location.pathname.startsWith("/servicoEmpresa/");
    const isRota2 = location.pathname === "/buscarEmpresa";
    const isRota3 = location.pathname === "/empresa";
    const isRota4 = location.pathname.startsWith("/competenciaServico/");
    const isRota5 = location.pathname === "/buscarServico";
    const isRota6 = location.pathname === "/servico";
    const isRota7 = location.pathname.startsWith("/competenciaColaborador/");
    const isRota8 = location.pathname === "/buscarColaborador";
    const isRota9 = location.pathname === "/buscarComp";
    const isRota10 = location.pathname === "/competencia";

    if (isRota1) {
      navigate("/buscarEmpresa");
    } else if (isRota2) {
      navigate("/empresa");
    } else if (isRota3) {
      navigate("/home");
    } else if (isRota4) {
      navigate("/buscarServico");
    } else if (isRota5) {
      navigate("/servico");
    } else if (isRota6) {
      navigate("/home");
    } else if (isRota7) {
      navigate("/buscarColaborador");
    } else if (isRota8) {
      navigate("/home");
    } else if (isRota9) {
      navigate("/competencia");
    } else if (isRota10) {
      navigate("/home");
    } else {
      navigate(-1);
    }
  };
  return (
    <ButtonStyleBack
      size={size}
      height={height}
      bgColor="var(--cinza-primario)"
      textColor="var(--branco)"
    >
      <Button
        role="button"
        aria-label={alternativeText}
        title={alternativeText}
        variant={bgColor}
        className="botao-default"
        style={{ maxWidth: "100%" }}
        onClick={handleVoltar}
      >
        <FaChevronLeft />
        <span>Voltar</span>
      </Button>
    </ButtonStyleBack>
  );
}

export default VoltarButton;
