import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Offcanvas from "react-bootstrap/Offcanvas";

import { CgHome } from "react-icons/cg";
import { BsArrowBarLeft } from "react-icons/bs";
import { CgMenuRound } from "react-icons/cg";
import { BiUserCircle } from "react-icons/bi";
import { BiAward } from "react-icons/bi";
import { BiUser } from "react-icons/bi";
import { BiBuilding } from "react-icons/bi";
import { FiTool } from "react-icons/fi";
import {
  MdContrast,
  MdOutlineExitToApp,
  MdOutlineTextDecrease,
  MdOutlineTextIncrease,
} from "react-icons/md";
import {
  SidebarMobileStyle,
  SidebarMobileNavStyle,
  LogoArea,
  CloseIconArea,
} from "./style.js";
import { SystemInfo } from "../../utils/SystemInfo.jsx";

import { useContext } from "react";
import { AuthenticationContext } from "../../services/context/AuthContext";

function SidebarMobile({
  logOut,
  HandledarkMode,
  isDarkMode,
  decreaseFontSize,
  increaseFontSize,
}) {
  const [show, setShow] = useState(false);
  const [pageTitle, setPageTitle] = useState("Sistema de Gestão de Competência");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const { user } = useContext(AuthenticationContext);
  const pathAtual = window.location.pathname;
  const sistemas = pathAtual === "/"

  useEffect(() => {
    setPageTitle(sistemas ? SystemInfo.title : "Sistema de Competência");
  }, [pathAtual, sistemas]);

  function navigateTo(route) {
    setShow(false);
    window.scrollTo(0, 0);
    navigate(route);
  }

  const RenderSystemLogo = () => {
    return isDarkMode ? (
      <img
        src={SystemInfo.logoWhite}
        alt="T2M"
        style={{ cursor: "pointer" }}
        onClick={() => navigateTo("/")}
      />
    ) : (
      <img
        src={SystemInfo.logo}
        alt="T2M"
        style={{ cursor: "pointer" }}
        onClick={() => navigateTo("/")}
      />
    );
  };

  const SideBarMobileItem = ({ title, icon, action, value }) => {
    return (
      <div className="sidebar-nav-item" tabIndex={-1}>
        <div onClick={() => action(value)} tabIndex={-1}>
          <div className="area-icons-label" tabIndex={-1}>
            {icon}
            <span tabIndex={-1}>{title}</span>
          </div>
        </div>
      </div>
    );
  };

  const UserInfo = () => {
    return (
      <div className="user-container mt-3" tabIndex={-1}>
        <BiUserCircle onClick={() => navigate('/perfil')} />
        <div className="user-info" tabIndex={-1}>
          <span title="User" className="label-sidebar" tabIndex={-1}>
            {user.fullName}
          </span>
          <span
            tabIndex={-1}
            id="user-department"
            className="label-sidebar"
            title="Departamento Pessoal"
            onClick={() => navigate('/perfil')}

          >
            Departamento pessoal
          </span>
        </div>
      </div>
    );
  };

  return (
    <SidebarMobileStyle>
      <Row>
        <Col className="px-0 col">
          <div className="button-show-area" tabIndex={-1}>
            <div className="button-show" tabIndex={-1}>
              <CgMenuRound onClick={handleShow} />
            </div>
            <div className="central-area" tabIndex={-1}>{RenderSystemLogo()}</div>
            <div className="right-area">
              <BiUserCircle onClick={() => navigate('/perfil')} />
            </div>
          </div>
          <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header
              style={{ backgroundColor: "var(--branco-primario)" }}
            >
              <Offcanvas.Title>
                <LogoArea>
                  <div className="area-central">{RenderSystemLogo()}</div>
                  <span>{pageTitle}</span>
                </LogoArea>
              </Offcanvas.Title>
              <CloseIconArea>
                <BsArrowBarLeft onClick={handleClose} />
              </CloseIconArea>
            </Offcanvas.Header>
            <Offcanvas.Body
              style={{ backgroundColor: "var(--branco-primario)" }}
            >
              <SidebarMobileNavStyle>
                <div className="flex-column sidebar-mobile-nav">
                  <SideBarMobileItem
                    title={"Alto Contraste"}
                    icon={<MdContrast title="Alto Contraste" size={28} />}
                    action={HandledarkMode}
                  />
                  <SideBarMobileItem
                    title={"Aumentar Fonte"}
                    icon={
                      <MdOutlineTextIncrease title="Aumentar Fonte" size={28} />
                    }
                    action={increaseFontSize}
                  />

                  <SideBarMobileItem
                    title={"Diminuir Fonte"}
                    icon={
                      <MdOutlineTextDecrease title="Diminuir Fonte" size={24} />
                    }
                    action={decreaseFontSize}
                  />
                </div>
                {sistemas ? null : <>
                  <div className="flex-column sidebar-mobile-nav">
                    <SideBarMobileItem
                      title={"Início"}
                      icon={<CgHome />}
                      action={navigateTo}
                      value={"/"}
                    />
                  </div>
                </>}
                {sistemas ? null : <>
                  <div className="flex-column sidebar-mobile-nav" tabIndex={-1}>
                    <SideBarMobileItem
                      title={"Competência"}
                      icon={<BiAward />}
                      action={navigateTo}
                      value={"/competencia"}
                    />
                  </div>
                </>}
                {sistemas ? null : <>
                  <div className="flex-column sidebar-mobile-nav" tabIndex={-1}>
                    <SideBarMobileItem
                      title={"Colaborador"}
                      icon={<BiUser />}
                      action={navigateTo}
                      value={"/buscarColaborador"}
                    />
                  </div>
                </>}
                {sistemas ? null : <>
                  <div className="flex-column sidebar-mobile-nav" tabIndex={-1}>
                    <SideBarMobileItem
                      title={"Serviço"}
                      icon={<FiTool />}
                      action={navigateTo}
                      value={"/servico"}
                    />
                  </div>
                </>}
                {sistemas ? null : <>
                  <div className="flex-column sidebar-mobile-nav" tabIndex={-1}>
                    <SideBarMobileItem
                      title={"Empresa"}
                      icon={<BiBuilding />}
                      action={navigateTo}
                      value={"/empresa"}
                    />
                  </div>
                </>}

                <UserInfo />

                <div className="sidebar-mobile-nav">
                  <div className="sidebar-nav-item mt-3">
                    <div onClick={() => logOut()}>
                      <div className="area-icons-label">
                        <MdOutlineExitToApp />
                        <span>Sair</span>
                      </div>
                    </div>
                  </div>
                </div>
              </SidebarMobileNavStyle>
            </Offcanvas.Body>
          </Offcanvas>
        </Col>
      </Row>
    </SidebarMobileStyle>
  );
}

export default SidebarMobile;
