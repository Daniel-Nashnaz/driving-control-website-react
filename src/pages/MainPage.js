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
              title={<Title level={3} style={{textAlign:'center'}}>Welcome to driving control system</Title>}
              description={
                <Text>
                  Real time driving control system RTDI (Real time driving information)
                  <br></br>The system receives real-time data about driving in any means of transportation we have that is installed in the system, the vehicle manager can know exactly how he drove and where there were problems, etc.
                  <br></br>Register or login now.
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