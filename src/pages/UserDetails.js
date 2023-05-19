import {  MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Alert } from 'antd';
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

    return (
        <>
            <MDBTable align='middle'>
                <MDBTableHead>
                    <tr>
                        <th scope='col'>Full name</th>
                        <th scope='col'>User name</th>
                        <th scope='col'>Email</th>
                        <th scope='col'>Phone</th>
                        <th scope='col'>Role</th>
                        <th scope='col'>Actions</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {data.map(row => (
                        <tr key={row.id}>
                            <td>
                                <div className='d-flex align-items-center'>
                                    <UserOutlined />
                                    <div className='ms-3'>
                                        <p className='fw-bold mb-1'>{row.fullName}</p>

                                    </div>
                                </div>
                            </td>


                            <td>
                                <p className='fw-normal mb-1'>{row.username}</p>
                            </td>
                            <td>
                                <p className='fw-normal mb-1'>{row.email}</p>
                            </td>

                            <td>
                                <p className='fw-normal mb-1'>{row.phone}</p>
                            </td>

                            <td>
                                <p className='fw-normal mb-1'>{row.roles.join(", ")}</p>

                            </td>
                            <td className='actions-cell'>
                                <MDBBtn
                                    color='info'
                                    style={{ boxShadow: "none" }}
                                    onClick={() => handleEditClick(row.id)}
                                >
                                    Edit
                                </MDBBtn>
                                <MDBBtn
                                    className='me-1'
                                    color='danger'
                                    style={{ boxShadow: "none" }}
                                    onClick={() => handleDeleteClick(row.id)}
                                >
                                    Delete
                                </MDBBtn>
                            </td>
                        </tr>
                    ))}
                </MDBTableBody>
            </MDBTable>

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

                    UserName:
                    <Input
                        defaultValue={dataOfEditUser.username}
                        name="userName"
                        type="text"
                        //value={formValues.username}
                        onChange={handleInputChange}
                        rules={[{ required: true, message: 'Please input your UserName!' }]}
                    />

                    FullName:
                    <Input
                        defaultValue={dataOfEditUser.fullName}
                        name="fullName"
                        type="text"
                        // value={formValues.fullName}
                        onChange={handleInputChange}
                        rules={[{ required: true, message: 'Please input your FullName!' }]}
                    />
                    Email:
                    <Input
                        defaultValue={dataOfEditUser.email}
                        name="email"
                        type="email"
                        //value={formValues.email}
                        onChange={handleInputChange}
                        rules={[{ required: true, message: 'Please input your Email!' }]}
                    />
                    Phone
                    <Input
                        defaultValue={dataOfEditUser.phone}
                        name="phone"
                        type="tel"
                        //value={formValues.phone}
                        onChange={handleInputChange}
                        rules={[{ required: true, message: 'Please input your Phone!' }]}
                    />
                </Form>
                {err &&
                    <Alert
                        message="Error"
                        description={errInfo}
                        type="error"
                        showIcon={true}
                    />
                }
            </Modal>
        </>



    );
}
