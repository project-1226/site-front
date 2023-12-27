import React from "react";
import { Col, Row } from "react-bootstrap";

import {
    FaSquareFacebook,
    FaSquareTwitter,
    FaSquareGithub,
} from "react-icons/fa6";

const FooterPage = () => {
    return (
        <>
            <hr />
            <Row>
                <Col
                    className="py-5"
                    md={7}
                    style={{ backgroundColor: "lightcoral" }}
                >
                    Brand Name
                </Col>
                <Col
                    className="py-5"
                    md={5}
                    style={{ backgroundColor: "lightpink" }}
                >
                    <h5>About the company</h5>
                    <div className="my-3">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Contrary to popular belief, Lorem
                        Ipsum is not simply random text.
                    </div>
                    <span style={{fontSize:'2.5rem'}}>
                        <FaSquareFacebook />
                        <FaSquareTwitter />
                        <FaSquareGithub />
                    </span>
                </Col>
            </Row>
        </>
    );
};

export default FooterPage;
