import { React } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { PageHeaderContainerStyle } from "./style";

function PageHeaderContainer({ title, icon }) {
  return (
    <Row>
      <Col>
        <PageHeaderContainerStyle>
          {icon}
          <span>{title}</span>
        </PageHeaderContainerStyle>
      </Col>
    </Row>
  );
}

export default PageHeaderContainer;
