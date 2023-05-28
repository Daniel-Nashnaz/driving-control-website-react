import React, { useContext, useEffect, useState } from 'react';
import { Card, Form, Input, Button, Avatar, Row, Col, message } from 'antd';
import AuthContext from '../common/AuthContext';
import ActionService from '../services/action.service';
import { EditOutlined, SaveOutlined,EditTwoTone } from "@ant-design/icons";
import UpdatePassword from '../components/UpdatePassword';


const UserDetails = () => {

  const [editing, setEditing] = useState(false);
  const [form] = Form.useForm();
  const { user } = useContext(AuthContext);
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await ActionService.getAddressOfCurrentUser();
      setData({ ...user, ...response.data[0] });
    } catch (error) {
      message.error(error.message);
      console.error('Error fetching driving data:', error);
    }
  };


  const handleEdit = () => {
    form.setFieldsValue(data);
    setEditing(true);
  };


  /**
   * Handles the save action when editing the user details.
   * It validates the form fields, updates the user data in the backend,
   * updates the local storage with the new data, and sets the editing state to false.
   */
  const handleSave = () => {
    form.validateFields().then(async (values) => {
      const updateData = {
        fullName: values.fullName,
        username: values.username,
        email: values.email,
        phone: values.phone,
        address: values.address,
        apartmentNumber: values.apartmentNumber,
        city: values.city,
        country: values.country
      }
      try {
        const response = await ActionService.updateCurrentUser(updateData);
        message.success(response.data.message);
        //update local storage of new data
        let userProfle = JSON.parse(localStorage.getItem("userProfile"));
        if (userProfle) {
          for (const key in updateData) {
            if (userProfle.hasOwnProperty(key) && updateData.hasOwnProperty(key)) {
              userProfle[key] = updateData[key];
            }
          }
          localStorage.setItem("userProfile", JSON.stringify(userProfle));
        }
        setData(updateData);
      } catch (error) {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        message.error(resMessage);
      }
      console.log(values);
      setEditing(false);
    });
  };

  const handleCancel = () => {
    setEditing(false);
  };
  

  const showUserModal = () => {
    setOpen(true);
  };
  const hideUserModal = () => {
    setOpen(false);
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '25px' }}>
      <h1 style={{ color: 'GrayText' }}>User Profile</h1>
      <Card style={{ width: 800 }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <Avatar size={100} src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" style={{ marginRight: '20px' }} />
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '5px' }}>{data.fullName}</h2>
            <p style={{ fontSize: '16px', color: '#888888' }}>{user.roles}</p>
          </div>
        </div>

        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="User Name:" name="username" rules={[{ required: true, message: 'Please input your username!' },
              { min: 3, message: 'Username must be at least 3 characters!' },
              { max: 50, message: 'Username must be less than 50 characters!' }]}>
                {editing ? <Input /> : <span style={{ fontSize: '20px' }}>{data.username}</span>}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Email:" name="email" rules={[{ required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
              { min: 6, message: 'Email must be at least 6 characters!' },
              { max: 50, message: 'Email must be less than 50 characters!' }]}>
                {editing ? <Input /> : <span style={{ fontSize: '20px' }}>{data.email}</span>}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Phone:" name="phone" rules={[{ required: true, message: 'Please input your phone number!' },
              { min: 5, message: 'Phone must be at least 5 characters!' },
              { max: 20, message: 'Phone must be less than 20 characters!' }]}>
                {editing ? <Input /> : <span style={{ fontSize: '20px' }}>{data.phone}</span>}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Full Name:" name="fullName" rules={[{ required: true, message: 'Please input your full name!' },
              { min: 2, message: 'Fullname must be at least 2 characters!' },
              { max: 100, message: 'Fullname must be less than 100 characters!' }]}>
                {editing ? <Input /> : <span style={{ fontSize: '20px' }}>{data.fullName}</span>}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Address:" name="address" rules={[{ required: true, message: 'Please input your address!' },
              { min: 2, message: 'Address must be at least 2 characters!' },
              { max: 100, message: 'Address must be less than 100 characters!' }]}>
                {editing ? <Input /> : <span style={{ fontSize: '20px' }}>{data.address}</span>}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Apartment Number:" name="apartmentNumber" rules={[{ required: true, message: 'Please input your country!' },
              { min: 2, message: 'Country must be at least 2 characters!' },
              { max: 50, message: 'Country must be less than 50 characters!' }]}>
                {editing ? <Input /> : <span style={{ fontSize: '20px' }}>{data.apartmentNumber}</span>}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="City:" name="city" rules={[{ required: true, message: 'Please input your city!' },
              { min: 2, message: 'City must be at least 2 characters!' },
              { max: 50, message: 'City must be less than 50 characters!' }]}>
                {editing ? <Input /> : <span style={{ fontSize: '20px' }}>{data.city}</span>}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Country:" name="country" rules={[{ required: true, message: 'Please input your country!' },
              { min: 2, message: 'Country must be at least 2 characters!' },
              { max: 50, message: 'Country must be less than 50 characters!' }]}>
                {editing ? <Input /> : <span style={{ fontSize: '20px' }}>{data.country}</span>}
              </Form.Item>
            </Col>
          </Row>
          {editing ? (
            <div>
              <Button type="primary" onClick={handleSave}>
                <React.Fragment>
                  <SaveOutlined />{" "}
                  Save
                </React.Fragment>

              </Button>
              <Button style={{ marginLeft: '10px' }} onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          ) : (
            <Button type="primary" onClick={handleEdit}>
              <React.Fragment>
                <EditOutlined />{" "}
                Edit
              </React.Fragment>
            </Button>
          )}



            <Button
              htmlType="button"
              style={{
                margin: '0 8px',
                 marginLeft: '10px' 
              }}
              onClick={showUserModal}
            >
              <React.Fragment>
                <EditTwoTone />{" "}
                Update Password
              </React.Fragment>
              
            </Button>


          <UpdatePassword open={open} onCancel={hideUserModal} />
        </Form>
      </Card>
    </div>
  );
};

export default UserDetails;


/*import { Layout, Form, Input, Button, message } from 'antd';
import AuthContext from '../common/AuthContext';
import ActionService from '../services/action.service';

const { Content } = Layout;

const UserProfile = () => {
  const {user} =  useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [date, setData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await ActionService.getAddressOfCurrentUser();
      console.log(response.data);
      setData({...user , ...response.data[0]});
    } catch (error) {
      message.error(error.message);
      console.error('Error fetching driving data:', error);
    }
  };

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    console.log(date);
    setIsEditing(false);
  };

  return (
    <Layout>
      <Content>
        <h1>User Profile</h1>
        <Form
          name="basic"
          style={{ maxWidth: 600 }}
          initialValues={{
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            phone: user.phone,
            roles: user.roles.join(', '),
          }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: true, message: 'Please input your full name!' }]}
          >
            <Input disabled={!isEditing} />
          </Form.Item>

          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input disabled={!isEditing} />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input disabled={!isEditing} />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: 'Please input your phone number!' }]}
          >
            <Input disabled={!isEditing} />
          </Form.Item>

          <Form.Item
            label="Roles"
            name="roles"
            rules={[{ required: true, message: 'Please input your roles!' }]}
          >
            <Input disabled={!isEditing} />
          </Form.Item>

          {isEditing ? (
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
              <Button
                style={{ marginLeft: '10px' }}
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </Form.Item>
          ) : (
            <Button type="primary" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          )}
        </Form>
      </Content>
    </Layout>
  );
};

export default UserProfile;*/