import { Box } from "@mui/material";
import React from "react";
import { Col, Row } from "react-bootstrap";

const HomePage = () => {
  return (
    <Box className="py-5 w-100" style={{ backgroundColor: "skyblue" }}>
      <Row>
        <Col>
          <div className="my-3"></div>
        </Col>
      </Row>
    </Box>
  );
};

export default HomePage;
