import { React, useState, useEffect, useContext } from "react";

import { BrowserRouter } from "react-router-dom";

import { AuthenticationContext } from "../services/context/AuthContext";

import { ModalComponent } from "../components/Modal";

import { CommonPrivateRoutes } from "./CommonRoutes/CommonPrivateRoutes";
import { CommonPublicRoutes } from "./CommonRoutes/CommonPublicRoutes";
import { SystemAdministratorRoutes } from "./RoutesByRole/SystemAdministrator";
import { CollaboratorRoutes } from "./RoutesByRole/Collaborator";
import { AdministrativeDepartmentRoutes } from "./RoutesByRole/AdministrativeDepartment";
import { ManagerRoutes } from "./RoutesByRole/Manager";
import { LoadingComponent } from "../components/LoadingComponent";
import { useCallback } from "react";

function Root({
  HandledarkMode,
  isDarkMode,
  decreaseFontSize,
  increaseFontSize,
}) {
  const [windowSize, setWindowSize] = useState(getWindowsSize());
  const { token, auth, isAuthenticated, user, logOut } = useContext(
    AuthenticationContext
  );
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  function handleOpenModal() {
    setShowModal(true);
  }

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowsSize());
    }
    window.addEventListener("resize", handleWindowResize);
  }, [windowSize]);

  const handleAuth = useCallback(async () => {
    await isAuthenticated();
    setLoading(false);
  }, [isAuthenticated]);

  useEffect(() => {
    setLoading(true);
    handleAuth();
  }, [token, user, handleAuth]);

  function getWindowsSize() {
    return window.screen.width;
  }

  function handleLogOut() {
    logOut();
    setShowModal(false);
  }

  const RenderLogOutModal = () => {
    return (
      <>
        {showModal ? (
          <ModalComponent
            showModal={showModal}
            setShowModal={setShowModal}
            action={handleLogOut}
            header={"Deseja mesmo sair?"}
            title={"Atenção"}
            cancelText={"Não"}
            acceptText={"Sim"}
          />
        ) : (
          <></>
        )}
      </>
    );
  };

  const RenderPrivateRoutesByRole = () => {
    switch (user.role) {
      case "COLLABORATOR":
        return (
          <CollaboratorRoutes
            increaseFontSize={increaseFontSize}
            decreaseFontSize={decreaseFontSize}
            HandledarkMode={HandledarkMode}
            isDarkMode={isDarkMode}
            handleOpenModal={handleOpenModal}
          />
        );
      case "ADMINISTRATIVE_DEPARTMENT":
        return (
          <AdministrativeDepartmentRoutes
            increaseFontSize={increaseFontSize}
            decreaseFontSize={decreaseFontSize}
            HandledarkMode={HandledarkMode}
            isDarkMode={isDarkMode}
            handleOpenModal={handleOpenModal}
          />
        );
      case "SYSTEM_ADMINISTRATOR":
        return (
          <SystemAdministratorRoutes
            increaseFontSize={increaseFontSize}
            decreaseFontSize={decreaseFontSize}
            HandledarkMode={HandledarkMode}
            isDarkMode={isDarkMode}
            handleOpenModal={handleOpenModal}
          />
        );
      case "MANAGER":
        return (
          <ManagerRoutes
            increaseFontSize={increaseFontSize}
            decreaseFontSize={decreaseFontSize}
            HandledarkMode={HandledarkMode}
            isDarkMode={isDarkMode}
            handleOpenModal={handleOpenModal}
          />
        );
      default:
        logOut();
        break;
    }
  };

  if(!auth)
  if (loading) return <LoadingComponent />;

  return (
    <BrowserRouter>
      {auth ? (
        <>
          <RenderLogOutModal />
          <CommonPrivateRoutes
            increaseFontSize={increaseFontSize}
            decreaseFontSize={decreaseFontSize}
            HandledarkMode={HandledarkMode}
            isDarkMode={isDarkMode}
            handleOpenModal={handleOpenModal}
          />
          <RenderPrivateRoutesByRole />
        </>
      ) : (
        <CommonPublicRoutes
          increaseFontSize={increaseFontSize}
          decreaseFontSize={decreaseFontSize}
          HandledarkMode={HandledarkMode}
          isDarkMode={isDarkMode}
        />
      )}
    </BrowserRouter>
  );
}

export default Root;
