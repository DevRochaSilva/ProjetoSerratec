import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

import { BsArrowBarRight, BsArrowBarLeft } from "react-icons/bs";
import { CgHome } from "react-icons/cg";
import { MdOutlineExitToApp } from "react-icons/md";
import {
  MdContrast,
  MdOutlineTextDecrease,
  MdOutlineTextIncrease,
} from "react-icons/md";
import { BiUserCircle } from "react-icons/bi";
import { BiAward } from "react-icons/bi";
import { BiUser } from "react-icons/bi";
import { BiBuilding } from "react-icons/bi";
import { FiTool } from "react-icons/fi";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { SidebarStyle } from "./style.js";
import { SideBarItem } from "../SideBarItem/index.jsx";
import { useContext } from "react";
import { AuthenticationContext } from "../../services/context/AuthContext";
import { SystemInfo } from "../../utils/SystemInfo.jsx";
function Sidebar({
  logOut,
  windowSize,
  HandledarkMode,
  isDarkMode,
  decreaseFontSize,
  increaseFontSize,
}) {
  const [sideBarCollapse, setSideBarCollapse] = useState(true);
  const navigate = useNavigate();
  const { user } = useContext(AuthenticationContext);
  const sistemas = window.location.pathname === "/";
  const [systemAbbreviation, setSystemAbbreviation] = useState("SC");
  const isHomeRoute = window.location.pathname === "/";

  const navigateTo = (route) => {
    setSideBarCollapse(true);
    window.scrollTo(0, 0);

    if (!isHomeRoute && route !== "/home") {
      setSystemAbbreviation("SC");
    }

    navigate(route);
  };


  const handleSidebarCollapse = () => {
    setSideBarCollapse(!sideBarCollapse);
  };

  const showRoleName = (role) => {
    switch (role) {
      case "COLLABORATOR":
        return "Colaborador";
      case "ADMINISTRATIVE_DEPARTMENT":
        return "Departamento Administrativo";
      case "SYSTEM_ADMINISTRATOR":
        return "Administrador do Sistema";
      case "MANAGER":
        return "Gestor";
      default:
        return "";
    }
  };

  const SystemLogo = () => {
    return (
      <div className="logo-area">
        {isDarkMode ? (
          <img
            src={SystemInfo.logoWhite}
            alt="T2M"
            onClick={() => navigateTo("/")}
          />
        ) : (
          <img
            src={SystemInfo.logo}
            alt="T2M"
            onClick={() => navigateTo("/")}
          />
        )}
        {sideBarCollapse ? (
          <div className="system-title">
            <strong>{isHomeRoute ? "SGC" : systemAbbreviation}</strong>
          </div>
        ) : (
          <div className="system-title">
            {isHomeRoute ? <strong>Sistema de Gestão de Conhecimento</strong> : <strong>Sistema de Competência</strong>}
          </div>
        )}
      </div>
    );
  };

  const UserInfo = () => {
    return (
      <div className="user-container">
        {sideBarCollapse ? (
          <SideBarItem
            index={0}
            smallText={"Perfil"}
            bigText={"Perfil"}
            action={navigateTo}
            value={"/perfil"}
            icon={<BiUserCircle title="Perfil" />}
            sideBarCollapse={sideBarCollapse}
          />
        ) : (
          <>
            <BiUserCircle onClick={() => navigate('/perfil')} className="user-icon" size={28} title="Perfil" />
            <div className="user-info">
              {sideBarCollapse ? (
                ""
              ) : (
                <span title="Usuário" className="label-sidebar">
                  {user.fullName}                  
                </span>
              )}
              {sideBarCollapse ? (
                ""
              ) : (
                <span
                  id="user-department"
                  className="label-sidebar"
                  title="Departamento Pessoal"
                >
                  {showRoleName(user.role)}
                </span>
              )}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <Col className={windowSize >= 992 ? "px-0 col-1" : "px-0 col-0"}>
      <SidebarStyle collapse={sideBarCollapse}>
        <Row>
          <Col className="column-container">
            <SystemLogo />
            <div className="sidebar-nav">
              <SideBarItem
                index={0}
                smallText={"Contraste"}
                bigText={"Alto Contraste"}
                action={HandledarkMode}
                icon={<MdContrast title="Alto Contraste" size={24} />}
                sideBarCollapse={sideBarCollapse}
              />
              <SideBarItem
                index={0}
                smallText={"Aumentar"}
                bigText={"Aumentar Fonte"}
                action={increaseFontSize}
                icon={
                  <MdOutlineTextIncrease title="Aumentar Fonte" size={24} />
                }
                sideBarCollapse={sideBarCollapse}
              />
              <SideBarItem
                index={0}
                smallText={"Diminuir"}
                bigText={"Diminuir Fonte"}
                action={decreaseFontSize}
                icon={
                  <MdOutlineTextDecrease title="Diminuir Fonte" size={24} />
                }
                sideBarCollapse={sideBarCollapse}
              />
            </div>
            <div className="sidebar-nav">
              <SideBarItem
                index={0}
                smallText={sideBarCollapse ? "Expandir" : "Retrair"}
                bigText={sideBarCollapse ? "Expandir" : "Retrair"}
                action={handleSidebarCollapse}
                icon={
                  sideBarCollapse ? (
                    <BsArrowBarRight title="Expandir" size={24} />
                  ) : (
                    <BsArrowBarLeft title="Retrair" size={24} />
                  )
                }
                sideBarCollapse={sideBarCollapse}
              />
            </div>
            {sistemas ? null : <>
              <div className="sidebar-nav">
                <SideBarItem
                  index={0}
                  smallText={"Início"}
                  bigText={"Início"}
                  action={navigateTo}
                  value={"/home"}
                  icon={<CgHome title="Início" />}
                  sideBarCollapse={sideBarCollapse}
                />
              </div>
            </>}

            {sistemas ? null : <>
              <div className="sidebar-nav">
                <SideBarItem
                  index={0}
                  smallText={"Competência"}
                  bigText={"Competência"}
                  action={navigateTo}
                  value={"/competencia"}
                  icon={<BiAward title="Competência" />}
                  sideBarCollapse={sideBarCollapse}
                />
              </div>
            </>}
            {sistemas ? null : <>
              <div className="sidebar-nav">
                <SideBarItem
                  index={0}
                  smallText={"Colaborador"}
                  bigText={"Colaborador"}
                  action={navigateTo}
                  value={"/buscarColaborador"}
                  icon={<BiUser title="Colaborador" />}
                  sideBarCollapse={sideBarCollapse}
                />
              </div>
            </>}
            {sistemas ? null : <>
              <div className="sidebar-nav">
                <SideBarItem
                  index={0}
                  smallText={"Serviço"}
                  bigText={"Serviço"}
                  action={navigateTo}
                  value={"/servico"}
                  icon={<FiTool title="Serviço" />}
                  sideBarCollapse={sideBarCollapse}
                />
              </div>
            </>}
            {sistemas ? null : <>
              <div className="sidebar-nav">
                <SideBarItem
                  index={0}
                  smallText={"Empresa"}
                  bigText={"Empresa"}
                  action={navigateTo}
                  value={"/empresa"}
                  icon={<BiBuilding title="Empresa" />}
                  sideBarCollapse={sideBarCollapse}
                />
              </div>
            </>}
            <UserInfo />
            <div className="sidebar-nav">
              <SideBarItem
                index={0}
                smallText={"Sair"}
                bigText={"Sair"}
                action={logOut}
                icon={<MdOutlineExitToApp title="Sair" />}
                sideBarCollapse={sideBarCollapse}
              />
            </div>
          </Col>
        </Row>
      </SidebarStyle>
    </Col>
  );
}

export default Sidebar;
