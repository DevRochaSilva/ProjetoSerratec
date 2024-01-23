import { Route, Routes } from "react-router-dom";

export const SystemAdministratorRoutes = ({
  HandledarkMode,
  isDarkMode,
  decreaseFontSize,
  increaseFontSize,
  handleOpenModal,
}) => {
  return (
    <Routes>
      {/* Adicione Rotas Privadas para o SystemAdministrator Aqui*/}
      {/* 
      Exemplo:
            <Route
              path="/systemadministrator"
              element={
                <SystemAdministratorPage
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
