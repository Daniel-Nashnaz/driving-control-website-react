import React from "react";
import { Button, Card, Col, Divider, Row, Typography } from "antd";
import { Link } from "react-router-dom";
import logo from "../../src/images/Logo-drivind-control.png"; 
const { Title, Text } = Typography;

function MainPage() {
  return (
    <div>
      <Row justify="center" style={{ marginBottom: "2rem" }}>
        <Col>
          <Card
            style={{ width: 500 }}
            hoverable
            cover={<img alt="My Site" src={logo} />}
          >
            <Card.Meta
              title={<Title level={2}>Welcome to My Site</Title>}
              description={
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  pharetra neque auctor, rutrum velit et, ultricies quam.
                  Nullam eleifend, nunc a fringilla hendrerit, lacus velit
                  faucibus elit, vitae ultricies elit quam a enim.
                </Text>
              }
            />
            <Divider />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Link to="/login">
                <Button type="primary" style={{ marginRight: "1rem" }}>
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button>Register</Button>
              </Link>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default MainPage;