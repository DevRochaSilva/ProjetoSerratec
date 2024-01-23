import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import SideBarMenuBs from "../SidebarMobile";
import SidebarComponent from "../SideBar";
import { useNavigate } from "react-router-dom";

export const ContainerWithSidebar = ({
  children,
  HandledarkMode,
  isDarkMode,
  decreaseFontSize,
  increaseFontSize,
  logOut,
}) => {
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const navigate = useNavigate();

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(getWindowSize());
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  function getWindowSize() {
    return window.screen.width;
  }

  return (
    <>
      <Container style={{ backgroundColor: "var(--branco)" }} fluid>
        {windowSize < 992 ? (
          <Row>
            <Col className="px-0 col">
              <SideBarMenuBs
                navigate={navigate}
                HandledarkMode={HandledarkMode}
                isDarkMode={isDarkMode}
                increaseFontSize={increaseFontSize}
                decreaseFontSize={decreaseFontSize}
                logOut={logOut}
              />
            </Col>
          </Row>
        ) : null}
        <Row>
          {windowSize > 991 ? (
            <Col className={windowSize > 991 ? "px-0 col-1" : "px-0 col-0 "}>
              <SidebarComponent
                navigate={navigate}
                HandledarkMode={HandledarkMode}
                isDarkMode={isDarkMode}
                increaseFontSize={increaseFontSize}
                decreaseFontSize={decreaseFontSize}
                logOut={logOut}
              />
            </Col>
          ) : null}
          <Col className={windowSize > 991 ? "col-11" : "col-12"}>
            {children}
          </Col>
        </Row>
      </Container>
    </>
  );
};
