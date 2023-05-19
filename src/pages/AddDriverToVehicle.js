import React from 'react';
import { Button, message, Form, Input } from 'antd';
import VehicleService from '../services/vehicle.services';

function AddDriverToVehicle() {

    const [messageApi, contextHolder] = message.useMessage();

    let states =false;
    const key = 'updatable';

    const openMessage = () => {
        messageApi.open({
            key,
            type: 'loading',
            content: 'Loading...',
        });
        setTimeout(() => {
            if (states) {
                success();
            } else {
                error();
            }

        }, 1000);
    };


    const success = () => {
        messageApi.open({
            key,
            type: 'success',
            content: 'User added to vehicle!',
            duration: 5
        });
    };
    const error = () => {
        messageApi.open({
            key,
            type: 'error',
            content: 'User Not added to vehicle!',
            duration: 5
        });
    };


    const onFinish = async (values) => {
        await VehicleService.addUserToVehicle(values).then((result) => {
            states =true;
        }).catch(
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                states = false;
            }

        );

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <> {contextHolder}
            <Form
                name="basic"
                labelCol={{
                    span: 5,
                }}
                wrapperCol={{
                    span: 20,
                }}
                style={{
                    maxWidth: 650
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="VehicleNumber:"
                    name="vehicleNumber"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your vehicle number!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="UserNameOrEmail"
                    name="userNameOrEmail"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username or email of user!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>


                <Button type="primary" htmlType="submit" onClick={openMessage} style={{
                    left: 300
                }} >
                    Add
                </Button>

            </Form>
        </>
    )
};
export default AddDriverToVehicle;