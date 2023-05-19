import React, { useState } from "react";
import { Form, Input, Button, Card } from "antd";
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined, EnvironmentOutlined, HomeOutlined, ApartmentOutlined, GlobalOutlined } from "@ant-design/icons";
import logo from "../../src/images/Logo-drivind-control.png";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import AdminServices from "../services/admin.service";

const Register = (props) => {
  const { myprops } = props;
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);
  const navigate = useNavigate();
  


  const onFinish = async (values) => {
    setLoading(true);
    setMessage("");
    const registerData = {
      fullName: values.fullname,
      userName: values.username,
      email: values.email,
      password: values.password,
      phone: values.phone,
      address: values.address,
      apartmentNumber: values.apartmentNumber,
      city: values.city,
      country: values.country
    }
    if (myprops === "Admin") {
      AuthService.register(registerData).then(
        (response) => {
          setMessage(response.status + " Status You are added successfully! Go to Sign In");
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    } else if (myprops === "User") {
      AdminServices.adminAddDriver(registerData).then(
        (response) => {
          setMessage(response.status + " Status User add successfully!");
          setSuccessful(true);
          setTimeout(() => {
            navigate("/home");
          }, 2000);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
    
    setLoading(false);
    
  };

  return (<>
    <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div >
        <img className="logo" src={logo} alt="Logo" />
      </div>
      <Card title={<p><h4><b style={{ color: "gold" }}>Create account for system</b></h4></p>} className="card-container text-center" >
        <Form
          name="register-form"
          onFinish={onFinish}
        >
          <div className="row">
            <div className="col-md-4 form-group">
              <Form.Item
                name="fullname"
                rules={[{ required: true, message: 'Please input your full name!' },
                { min: 2, message: 'Fullname must be at least 2 characters!' },
                { max: 100, message: 'Fullname must be less than 100 characters!' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Full Name" />
              </Form.Item>
            </div>
            <div className="col-md-4 form-group">
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your username!' },
                { min: 3, message: 'Username must be at least 3 characters!' },
                { max: 50, message: 'Username must be less than 50 characters!' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Username" />
              </Form.Item>
            </div>
            <div className="col-md-4 form-group">
              <Form.Item
                name="phone"
                rules={[{ required: true, message: 'Please input your phone number!' },
                { min: 5, message: 'Phone must be at least 5 characters!' },
                { max: 20, message: 'Phone must be less than 20 characters!' }]}
              >
                <Input prefix={<PhoneOutlined />} placeholder="Phone" />
              </Form.Item>
            </div>

            <div className="col-md-4 form-group">
              <Form.Item
                name="email"
                rules={[{ required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' },
                { min: 6, message: 'Email must be at least 6 characters!' },
                { max: 50, message: 'Email must be less than 50 characters!' }]}
              >
                <Input prefix={<MailOutlined />} placeholder="Email" />
              </Form.Item>
            </div>
            <div className="col-md-4 form-group">
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' },
                { min: 6, message: 'Password must be at least 6 characters!' },
                { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, message: 'Password must contain at least one lowercase letter, one uppercase letter, and a number!' }]}

              >
                <Input.Password prefix={<LockOutlined />} placeholder="Password" />
              </Form.Item>
            </div>
            <div className="col-md-4 form-group">
              <Form.Item
                name="confirmPassword"
                dependencies={['password']}
                rules={[
                  { required: true, message: 'Please confirm your password!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The two passwords that you entered do not match!'));
                    },
                  }),
                ]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" />
              </Form.Item>
            </div>

            <div className="col-md-3 form-group">
              <Form.Item
                name="address"
                rules={[{ required: true, message: 'Please input your address!' },
                { min: 2, message: 'Address must be at least 2 characters!' },
                { max: 100, message: 'Address must be less than 100 characters!' }]}
              >
                <Input prefix={<EnvironmentOutlined />} placeholder="Address" />
              </Form.Item>
            </div>
            <div className="col-md-3 form-group">
              <Form.Item
                name="apartmentNumber"
                rules={[{ required: true, message: 'Please input your apartment number!' },
                { min: 1, message: 'ApartmentNumber must be at least 1 characters!' },
                { max: 10, message: 'ApartmentNumber must be less than 10 characters!' }]}
              >
                <Input prefix={<ApartmentOutlined />} placeholder="Apartment Number" />
              </Form.Item>
            </div>
            <div className="col-md-3 form-group">
              <Form.Item
                name="city"
                rules={[{ required: true, message: 'Please input your city!' },
                { min: 2, message: 'City must be at least 2 characters!' },
                { max: 50, message: 'City must be less than 50 characters!' }]}
              >
                <Input prefix={<HomeOutlined />} placeholder="City" />
              </Form.Item>
            </div>
            <div className="col-md-3 form-group">
              <Form.Item
                name="country"
                rules={[{ required: true, message: 'Please input your country!' },
                { min: 2, message: 'Country must be at least 2 characters!' },
                { max: 50, message: 'Country must be less than 50 characters!' }]}
              >
                <Input prefix={<GlobalOutlined />} placeholder="Country" />
              </Form.Item>
            </div>
          </div>

          {message && (
            <Form.Item>
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </Form.Item>
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              {loading ? 'Loading' : 'Register'}
            </Button>
          </Form.Item>
        </Form>
        {myprops === "Admin" &&
          <p className="text-center">
            <h5>Already registered?</h5>
            <Link to={"/login"} >
              Sign In
            </Link>
          </p>}
      </Card>
    </div>
  </>
  );
};

export default Register;