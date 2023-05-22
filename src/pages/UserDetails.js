import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Alert, Table, Space, Button } from 'antd';
import {
    UserOutlined,
} from "@ant-design/icons";
import AdminService from '../services/admin.service';

export default function UserDetails() {

    const [data, setData] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(0);


    const [openEdit, setopenEdit] = useState(false);
    const [openDelete, setopenDelete] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState("Are you sure you want to delete user?");
    const [formValues, setFormValues] = useState({
        userName: '',
        fullName: '',
        email: '',
        phone: '',
    });
    const [dataOfEditUser, setdataOfEditUser] = useState({});

    const [err, setErr] = useState(false);
    const [errInfo, setErrInfo] = useState("");

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });

    };

    const handleUpdateUser = () => {
        AdminService.updateUserByAdmin(selectedUserId, formValues).then(() => {
            setopenEdit(false);
            window.location.reload();
        }).catch(
            (error) => {
                console.log(error);
                let content = (error.response && error.response.data && error.response.data.email) || error.message || error.toString()
                if (error.response && error.response.data && error.response.data.fullName) {
                    content += "\n" + error.response.data.fullName;
                }
                if (error.response && error.response.data && error.response.data.email) {
                    content += "\n" + error.response.data.email;
                }
                if (error.response && error.response.data && error.response.data.userName) {
                    content += "\n" + error.response.data.username;
                }
                setErrInfo(content)
                setErr(true);
            }
        );
    };


    const handleOk = () => {
        AdminService.deleteUserByAdmin(selectedUserId).then((response) => {
            console.log(response.data.message);
            setModalText(response.data.message);
        },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setErrInfo(_content)
            });
        setModalText('Loadging...');
        setConfirmLoading(true);
        window.location.reload();
        setTimeout(() => {
            setopenDelete(false);
            setConfirmLoading(false);
        }, 1000);
    };

    const handleCancelDelete = () => {
        setopenDelete(false);
    };

    const handleCancelEdit = () => {
        setErr(false);
        setopenEdit(false);
    };

    const handleDeleteClick = (userId) => {
        setSelectedUserId(userId);
        setopenDelete(true);
    };

    const handleEditClick = (userId) => {
        setSelectedUserId(userId);
        setopenEdit(true);
    };

    useEffect(() => {
        // const currentUser = AuthService.getCurrentUser();
        // if (!currentUser.roles.includes("ROLE_ADMIN")) {
        //     return;
        // }

        AdminService.getAllUsersOfAdmin().then(
            (response) => {
                setData(response.data);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setErrInfo(_content)
            }
        );
    }, []);

    const columns = [
        {
            title: 'Full name',
            dataIndex: 'fullName',
            key: 'fullName',
            sorter: (a, b) => a.fullName.localeCompare(b.fullName),
            defaultSortOrder: 'descend', // set default sort order to descending
            render: (text, record) => (
                <Space size="middle">
                    <UserOutlined />
                    <p className='fw-bold mb-1'>{text}</p>
                </Space>
            ),
        },
        {
            title: 'User name',
            dataIndex: 'username',
            key: 'username',
            sorter: (a, b) => a.username.localeCompare(b.username),
            defaultSortOrder: 'descend', // set default sort order to descending
            render: text => <p className='fw-normal mb-1'>{text}</p>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: text => <p className='fw-normal mb-1'>{text}</p>,
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            render: text => <p className='fw-normal mb-1'>{text}</p>,
        },
        {
            title: 'Role',
            dataIndex: 'roles',
            key: 'roles',
            render: roles => <p className='fw-normal mb-1'>{roles.join(", ")}</p>,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => handleEditClick(record.id)}>Edit</Button>
                    <Button type="primary" danger onClick={() => handleDeleteClick(record.id)}>Delete</Button>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Table 
            columns={columns} 
            bordered={true}
            dataSource={data} />

            <Modal
                title="Delete User"
                open={openDelete}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancelDelete}
            >
                <p>{modalText}</p>

            </Modal>

            <Modal title="Edit User" open={openEdit} onOk={handleUpdateUser} onCancel={handleCancelEdit} centered={true}>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 450,
                    }}
                    onFinish={handleEditClick}

                >

                    <Form.Item
                        label="UserName"
                        name="userName"
                        rules={[{ required: true, message: 'Please input your UserName!' }]}
                    >
                        <Input defaultValue={dataOfEditUser.username} name="userName" type="text" onChange={handleInputChange} />
                    </Form.Item>

                    <Form.Item
                        label="FullName"
                        name="fullName"
                        rules={[{ required: true, message: 'Please input your FullName!' }]}
                    >
                        <Input defaultValue={dataOfEditUser.fullName} name="fullName" type="text" onChange={handleInputChange} />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your Email!' }]}
                    >
                        <Input defaultValue={dataOfEditUser.email} name="email" type="email" onChange={handleInputChange} />
                    </Form.Item>

                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[{ required: true, message: 'Please input your Phone!' }]}
                    >
                        <Input defaultValue={dataOfEditUser.phone} name="phone" type="tel" onChange={handleInputChange} />
                    </Form.Item>
                </Form>
                {err && <Alert message={errInfo} type="error" />}
            </Modal>
        </>
    );
}