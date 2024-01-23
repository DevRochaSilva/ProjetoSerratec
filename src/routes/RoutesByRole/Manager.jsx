import { Route, Routes } from "react-router-dom";
import TelaInicial from "../../pages/TelaInicial";

export const ManagerRoutes = ({
  HandledarkMode,
  isDarkMode,
  decreaseFontSize,
  increaseFontSize,
  handleOpenModal,
}) => {
  return (
    <Routes>
      {/* Adicione Rotas Privadas para o Manager Aqui*/}
      {/* 
      Exemplo:
            <Route
              path="/manager"
              element={
                <ManagerPage
                  increaseFontSize={increaseFontSize}
                  decreaseFontSize={decreaseFontSize}
                  HandledarkMode={HandledarkMode}
                  isDarkMode={isDarkMode}
                  logOut={handleOpenModal}
                />
              }
            /> 
      */}
    </Routes>
  );
};
