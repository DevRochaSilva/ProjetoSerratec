import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./style/GlobalStyle.js";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import Root from "./routes/root";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import useFontSize from "./utils/hooks/useFontSize";
import { darkTheme, lightTheme } from "./utils/Themes";
import { AuthenticationProvider } from "./services/context/AuthContext.jsx";

function App() {
  const savedDarkMode = localStorage.getItem("darkMode");
  const [darkMode, setDarkMode] = useState(savedDarkMode === "true");
  const { size, increaseFontSize, decreaseFontSize } = useFontSize();

  const HandledarkMode = () => {
    setDarkMode(!darkMode);
  };

  const theme = {
    ...(darkMode ? darkTheme : lightTheme),
    font: {
      size: `${size}px`,
    },
  };

  return (
    <AuthenticationProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Root
          increaseFontSize={increaseFontSize}
          decreaseFontSize={decreaseFontSize}
          HandledarkMode={HandledarkMode}
          isDarkMode={darkMode}
        />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </ThemeProvider>
    </AuthenticationProvider>
  );
}

export default App;
