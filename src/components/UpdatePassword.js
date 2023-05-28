import { Alert, Form, Input, Modal, } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import ActionService from '../services/action.service';
const formItemLayout = {
    labelCol: {
        span: 10,
    },
    wrapperCol: {
        span: 10,
    },
};

const useResetFormOnCloseModal = ({ form, open }) => {
    const prevOpenRef = useRef();
    useEffect(() => {
        prevOpenRef.current = open;
    }, [open]);
    const prevOpen = prevOpenRef.current;
    useEffect(() => {
        if (!open && prevOpen) {
            form.resetFields();
        }
    }, [form, prevOpen, open]);
};


const UpdatePassword = ({ open, onCancel }) => {
    const [isErr, setIsErr] = useState(false);
    const [isGood, setIsGood] = useState(false);
    const [message, setMessage] = useState("");
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        const updatePass = {
            currentPassword: values.currentPassword,
            newPassword: values.password
        }
        try {
            const response = await ActionService.updatePasswordOfCurrentUser(updatePass);
            setMessage(response.data.message);
            setIsErr(false);
            setIsGood(true);
            setTimeout(onCancel, 1500);
        } catch (error) {
            const resMessage =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            setMessage(resMessage);
            setIsGood(false);
            setIsErr(true);
        }
    };

    useResetFormOnCloseModal({ form, open, });

    const onOk = () => {
        form.submit();
    };
    return (
        <Modal style={{marginTop:'150px'}} title="Update your password" open={open} onOk={onOk} onCancel={onCancel}>
            <Form
                form={form}
                name="updatePassword"
                onFinish={onFinish}
                style={{
                    maxWidth: 600,
                }}
                scrollToFirstError
            >
                <Form.Item
                    {...formItemLayout}
                    name="currentPassword"
                    label="Current password:"
                    rules={
                        [{ required: true, message: 'Please input your password!' },
                        { min: 6, message: 'Password must be at least 6 characters!' },
                        { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, message: 'Password must contain at least one lowercase letter, one uppercase letter, and a number!' }
                        ]}>

                    <Input.Password />
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    name="password"
                    label="New password:"
                    rules={
                        [{ required: true, message: 'Please input your password!' },
                        { min: 6, message: 'Password must be at least 6 characters!' },
                        { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, message: 'Password must contain at least one lowercase letter, one uppercase letter, and a number!' }
                        ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    {...formItemLayout}
                    name="confirm"
                    label="Confirm new password:"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
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
                    <Input.Password />
                </Form.Item>
            </Form>
            {isGood &&
                <Alert
                    message="Success"
                    description={message}
                    type="success"
                    showIcon
                />}
            {isErr &&
                <Alert
                    message="Error"
                    description={message}
                    type="error"
                    showIcon
                />}
        </Modal>
    );
};
export default UpdatePassword;