import React, { useContext, useState } from 'react';
import { Layout, Form, Input, Button } from 'antd';
import AuthContext from '../common/AuthContext';

const { Content } = Layout;

const UserProfile = () => {
    const {user} =  useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
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

export default UserProfile;