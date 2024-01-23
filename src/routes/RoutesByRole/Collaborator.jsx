import { Route, Routes } from "react-router-dom";


export const CollaboratorRoutes = ({
  HandledarkMode,
  isDarkMode,
  decreaseFontSize,
  increaseFontSize,
  handleOpenModal,
}) => {
  return (
    <Routes>
      {/* Adicione Rotas Privadas para o Collaborator Aqui*/}
      {/* 
      Exemplo:
            <Route
              path="/collaborator"
              element={
                <CollaboratorPage
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
