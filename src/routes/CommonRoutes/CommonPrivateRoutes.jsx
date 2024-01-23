import { Route, Routes } from "react-router-dom";
import TelaInicial from "../../pages/TelaInicial";
import Home from "../../pages/Home";
import Competencia from "../../pages/Competencia";
import Servico from "../../pages/Servico";
import Empresa from "../../pages/Empresa";
import BuscarComp from "../../pages/BuscarComp";
import CadastrarCompetencia from "../../pages/CadastrarCompetecia";
import CadastrarServico from "../../pages/CadastrarServico";
import CadastrarEmpresa from "../../pages/CadastrarEmpresa";
import BuscarEmpresa from "../../pages/BuscarEmpresa";
import BuscarServico from "../../pages/BuscarServico";
import BuscarColaborador from "../../pages/BuscarColaborador";
import DetalharColaborador from "../../pages/DetalharColaborador";
import DetalharEmpresa from "../../pages/DetalharEmpresa";
import Perfil from "../../pages/Perfil";
import DetalharServico from "../../pages/DescricaoServico";
import CompetenciaServico from "../../pages/CompetenciaServico";
import CompetenciaColaborador from "../../pages/CompetenciaColaborador";
import AddCompColab from "../../pages/AddCompColab";
import AddEmpresaColab from "../../pages/AddEmpresaColab";
import CadastrarServicoConfirmar from "../../pages/CadastrarServicoConfirmar";
import DetalharCompetencia from "../../pages/DetalharCompetencia";
import ServicoEmpresa from "../../pages/ServicoEmpresa";
import AddServicoAempresa from "../../pages/AddServicoAempresa";

export const CommonPrivateRoutes = ({
  HandledarkMode,
  isDarkMode,
  decreaseFontSize,
  increaseFontSize,
  handleOpenModal,
}) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <TelaInicial
            increaseFontSize={increaseFontSize}
            decreaseFontSize={decreaseFontSize}
            HandledarkMode={HandledarkMode}
            isDarkMode={isDarkMode}
            logOut={handleOpenModal}
          />
        }
      />
      <Route
        path="/home"
        element={
          <Home
            increaseFontSize={increaseFontSize}
            decreaseFontSize={decreaseFontSize}
            HandledarkMode={HandledarkMode}
            isDarkMode={isDarkMode}
            logOut={handleOpenModal}
          />
        }
      />
      <Route
        path="/competencia"
        element={
          <Competencia
            increaseFontSize={increaseFontSize}
            decreaseFontSize={decreaseFontSize}
            HandledarkMode={HandledarkMode}
            isDarkMode={isDarkMode}
            logOut={handleOpenModal}
          />
        }
      />
      <Route
        path="/servico"
        element={
          <Servico
            increaseFontSize={increaseFontSize}
            decreaseFontSize={decreaseFontSize}
            HandledarkMode={HandledarkMode}
            isDarkMode={isDarkMode}
            logOut={handleOpenModal}
          />
        }
      />
      <Route
        path="/empresa"
        element={
          <Empresa
            increaseFontSize={increaseFontSize}
            decreaseFontSize={decreaseFontSize}
            HandledarkMode={HandledarkMode}
            isDarkMode={isDarkMode}
            logOut={handleOpenModal}
          />
        }
      />
      <Route
        path="/buscarComp"
        element={
          <BuscarComp
            increaseFontSize={increaseFontSize}
            decreaseFontSize={decreaseFontSize}
            HandledarkMode={HandledarkMode}
            isDarkMode={isDarkMode}
            logOut={handleOpenModal}
          />
        }
      />
      <Route
        path="/cadastrarCompetencia"
        element={
          <CadastrarCompetencia
            increaseFontSize={increaseFontSize}
            decreaseFontSize={decreaseFontSize}
            HandledarkMode={HandledarkMode}
            isDarkMode={isDarkMode}
            logOut={handleOpenModal}
          />
        }
      />
      <Route
        path="/cadastrarServico"
        element={
          <CadastrarServico
            increaseFontSize={increaseFontSize}
            decreaseFontSize={decreaseFontSize}
            HandledarkMode={HandledarkMode}
            isDarkMode={isDarkMode}
            logOut={handleOpenModal}
          />
        }
      />

      <Route
        path="/buscarServico"
        element={
          <BuscarServico
            increaseFontSize={increaseFontSize}
            decreaseFontSize={decreaseFontSize}
            HandledarkMode={HandledarkMode}
            isDarkMode={isDarkMode}
            logOut={handleOpenModal}
          />
        }
      />

      <Route
        path="/descricaoCompetencia/:competenciaId"
        element={
          <DetalharCompetencia
            increaseFontSize={increaseFontSize}
            decreaseFontSize={decreaseFontSize}
            HandledarkMode={HandledarkMode}
            isDarkMode={isDarkMode}
            logOut={handleOpenModal}
          />
        }
      />
      <Route
        path="/cadastrarEmpresa"
        element={
          <CadastrarEmpresa
            increaseFontSize={increaseFontSize}
            decreaseFontSize={decreaseFontSize}
            HandledarkMode={HandledarkMode}
            isDarkMode={isDarkMode}
            logOut={handleOpenModal}
          />
        }
      />
      <Route
        path="/buscarEmpresa"
        element={
          <BuscarEmpresa
            increaseFontSize={increaseFontSize}
            decreaseFontSize={decreaseFontSize}
            HandledarkMode={HandledarkMode}
            isDarkMode={isDarkMode}
            logOut={handleOpenModal}
          />
        }
      />
      <Route
        path="/buscarColaborador"
        element={
          <BuscarColaborador
            increaseFontSize={increaseFontSize}
            decreaseFontSize={decreaseFontSize}
            HandledarkMode={HandledarkMode}
            isDarkMode={isDarkMode}
            logOut={handleOpenModal}
          />
        }
      />
      <Route
        path="/detalharColaborador/:colaboradorId"
        element={
          <DetalharColaborador
            increaseFontSize={increaseFontSize}
            decreaseFontSize={decreaseFontSize}
            HandledarkMode={HandledarkMode}
            isDarkMode={isDarkMode}
            logOut={handleOpenModal}
          />
        }
      />

      <Route
        path="/detalharEmpresa/:empresaId"
        element={
          <DetalharEmpresa
            increaseFontSize={increaseFontSize}
            decreaseFontSize={decreaseFontSize}
            HandledarkMode={HandledarkMode}
            isDarkMode={isDarkMode}
            logOut={handleOpenModal}
          />
        }
      />

      <Route
        path="/perfil"
        element={
          <Perfil
            increaseFontSize={increaseFontSize}
            decreaseFontSize={decreaseFontSize}
            HandledarkMode={HandledarkMode}
            isDarkMode={isDarkMode}
            logOut={handleOpenModal}
          />
        }
      />
      <Route
        path="/descricaoServico/:servicoId"
        element={
          <DetalharServico
            increaseFontSize={increaseFontSize}
            decreaseFontSize={decreaseFontSize}
            HandledarkMode={HandledarkMode}
            isDarkMode={isDarkMode}
            logOut={handleOpenModal}
          />
        }
      />
      <Route
        path="/competenciaServico/:servicoId"
        element={
          <CompetenciaServico
            increaseFontSize={increaseFontSize}
            decreaseFontSize={decreaseFontSize}
            HandledarkMode={HandledarkMode}
            isDarkMode={isDarkMode}
            logOut={handleOpenModal}
          />
        }
      />
      <Route
        path="/servicoEmpresa/:empresaId"
        element={
          <ServicoEmpresa
            increaseFontSize={increaseFontSize}
            decreaseFontSize={decreaseFontSize}
            HandledarkMode={HandledarkMode}
            isDarkMode={isDarkMode}
            logOut={handleOpenModal}
          />
        }
      />
      <Route
        path="/competenciaColaborador/:colaboradorId"
        element={
          <CompetenciaColaborador
            increaseFontSize={increaseFontSize}
            decreaseFontSize={decreaseFontSize}
            HandledarkMode={HandledarkMode}
            isDarkMode={isDarkMode}
            logOut={handleOpenModal}
          />
        }
      />
      <Route
        path="/adicionarCompetencia/:colaboradorId"
        element={
          <AddCompColab
            increaseFontSize={increaseFontSize}
            decreaseFontSize={decreaseFontSize}
            HandledarkMode={HandledarkMode}
            isDarkMode={isDarkMode}
            logOut={handleOpenModal}
          />
        }
      />
      <Route
        path="/addEmpresaColab/:colaboradorId"
        element={
          <AddEmpresaColab
            increaseFontSize={increaseFontSize}
            decreaseFontSize={decreaseFontSize}
            HandledarkMode={HandledarkMode}
            isDarkMode={isDarkMode}
            logOut={handleOpenModal}
          />
        }
      />
      <Route
        path="/cadastrarServicoConfirmar/:servicoId"
        element={
          <CadastrarServicoConfirmar
            increaseFontSize={increaseFontSize}
            decreaseFontSize={decreaseFontSize}
            HandledarkMode={HandledarkMode}
            isDarkMode={isDarkMode}
            logOut={handleOpenModal}
          />
        }
      />
      <Route
        path="/selecionarServicoEmpresa/:empresaId"
        element={
          <AddServicoAempresa
            increaseFontSize={increaseFontSize}
            decreaseFontSize={decreaseFontSize}
            HandledarkMode={HandledarkMode}
            isDarkMode={isDarkMode}
            logOut={handleOpenModal}
          />
        }
      />
    </Routes>
  );
};
