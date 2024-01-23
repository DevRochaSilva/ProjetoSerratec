import { Route, Routes } from "react-router-dom";

export const AdministrativeDepartmentRoutes = ({
  HandledarkMode,
  isDarkMode,
  decreaseFontSize,
  increaseFontSize,
  handleOpenModal,
}) => {
  return (
    <Routes>
      {/* Adicione Rotas Privadas para o AdministrativeDepartment Aqui*/}
      {/* 
      Exemplo:
            <Route
              path="/administrativedepartment"
              element={
                <AdministrativeDepartmentPage
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
