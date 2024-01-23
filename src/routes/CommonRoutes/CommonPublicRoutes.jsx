import { Route, Routes } from "react-router-dom";
import Login from "../../pages/Login";

export const CommonPublicRoutes = ({
  HandledarkMode,
  isDarkMode,
  decreaseFontSize,
  increaseFontSize,
}) => {
  return (
    <Routes>
      <Route
        path="*"
        element={
          <Login
            increaseFontSize={increaseFontSize}
            decreaseFontSize={decreaseFontSize}
            HandledarkMode={HandledarkMode}
            isDarkMode={isDarkMode}
          />
        }
      />
    </Routes>
  );
};
