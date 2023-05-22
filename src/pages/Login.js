import React, { useState,  useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, Card } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import AuthContext from "../common/AuthContext"
import logo from "../../src/images/Logo-drivind-control.png"; 

const Login = () => {
  const { login } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    setErrorMessage("");

    try {
      await login(values.username, values.password);
      navigate("/");
    } catch (error) {
      // handle errors
      if (error.response) {
        // server responded with a status code outside of the 2xx range
        const errorMessage  = error.response.data.message;
        setErrorMessage(errorMessage);
      } else if (error.request) {
        // no response received from the server
        setErrorMessage("No response received from the server.");
      } else {
        // something else went wrong
        setErrorMessage("An error occurred: " + error);
      }
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh" ,marginLeft:"60px" }}>
    <div >
          <img className="logo" src={logo} alt="Logo" /> 
        </div>
        <Card title={<p><h4><i style={{color:"paleturquoise"}}>Login to the system</i></h4></p>} className="card-container" >
      <Form
        name="login-form"
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }, { min: 3, message: 'Username must be at least 3 characters!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }, { min: 6, message: 'Password must be at least 6 characters!' }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>

        {errorMessage && (
          <Form.Item>
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          </Form.Item>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} style={{marginLeft: '75px'}} >
            {loading ? 'Loading' : 'Login'}
          </Button>
        </Form.Item>
      </Form>

      <p className="text-center">
        <h5>Need an Account?</h5>
        <Link to={"/register"} >
          Sign Up
        </Link>
      </p>
    </Card>
  </div>
  );
};

export default Login;
