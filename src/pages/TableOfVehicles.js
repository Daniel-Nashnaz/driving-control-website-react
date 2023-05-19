import React from 'react';
import { Button, Form, Input, InputNumber, Modal, Popconfirm, Result, Table, Typography } from 'antd';
import { useState, useEffect } from 'react';
import VehicleService from '../services/vehicle.services';

const EditableCell = ({ editing, dataIndex, title, inputType, record, index, children, ...restProps }) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item name={dataIndex} style={{ margin: 0 }} rules={[{ required: true, message: `Please Input ${title}!` }]}>
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const TableOfVehicles = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('');
    const [vehicleNumber, setVehicleNumber] = useState('');
    const [vehicleName, setVehicleName] = useState('');
    const [typeOfVehicle, setTypeOfVehicle] = useState('');
    const [year, setYear] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const info = async (infoRow) => {
        await VehicleService.getAllDrivingOfVehicle(infoRow.id).then(result => {
            const users = result.data;
            Modal.info({
                title: 'Users of vehicle: ' + infoRow.vehicleNumber,
                content: (
                    <div>
                        {users.length === 0 ? (   
                            <h4 style={{color:'red'}}>No Users of this vehicle!</h4>
                        ) : users.map(user => (
                            <div key={user.userName}>
                                <p>Full Name: {user.fullName}</p>
                                <p>User Name: {user.userName}</p>
                                <p>Email: {user.email}</p>
                                <p>Phone: {user.phone}</p>
                                <hr></hr>
                            </div>

                        ))}
                    </div>
                ),
                onOk() { },
            });


        })
    };


    const showModal = () => {
        setOpen(true);
    };
    const handleOk = async () => {

        // Validate input
        if (!vehicleName || !vehicleNumber || !vehicleNumber || !year) {
            setModalText('Please fill in all fields');
            setConfirmLoading(false);
            return;
        }

        if (isNaN(year)) {
            setModalText('Year must be number');
            setConfirmLoading(false);
            return;
        }
        setConfirmLoading(true);
        const vehicleInfo = {
            vehicleName,
            vehicleNumber,
            typeOfVehicle,
            year
        };

        await VehicleService.addVehicle(vehicleInfo).then(() => {
            setTimeout(() => {
                setOpen(false);
                setConfirmLoading(false);
            }, 3000);
            window.location.reload();

        }).catch(error => {
            const resMessage =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            setModalText(resMessage);
            return;
        })

    };

    const handleCancel = () => {
        setOpen(false);
    };

    const fetchData = async () => {
        const response = await VehicleService.getAllVehicle();
        setData(response);
    };

    const isEditing = (record) => record.id === editingKey;

    const edit = (record) => {
        form.setFieldsValue({ vehicleNumber: '', vehicleName: '', typeOfVehicle: '', year: '', ...record });
        setEditingKey(record.id);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (id) => {
        console.log(id);
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => id === item.id);
            if (index > -1) {
                const item = newData[index];
                const response = await VehicleService.updateVehicleById(id, row);
                newData.splice(index, 1, { ...item, ...response });
                setData(newData);
                setEditingKey('');
                window.location.reload();
            } else {
                const response = await VehicleService.addVehicle(row);
                newData.push(response.data);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const handleDelete = async (id) => {
        try {
            await VehicleService.deleteVehicleById(id);
            const newData = [...data];
            const index = newData.findIndex((item) => id === item.id);
            newData.splice(index, 1);
            setData(newData);
        } catch (err) {
            console.log(err);
        }
    };
    const columns = [
        {
            title: 'Vehicle Number',
            key: 'vehicleNumber',
            dataIndex: 'vehicleNumber',
            width: '25%',
            editable: true,
        },
        {
            title: 'Vehicle Name',
            key: 'vehicleName',
            dataIndex: 'vehicleName',
            width: '25%',
            editable: true,

        },
        {
            title: 'Type of Vehicle',
            key: 'typeOfVehicle',
            dataIndex: 'typeOfVehicle',
            width: '25%',
            editable: true,
            sorter: (a, b) => a.typeOfVehicle.length - b.typeOfVehicle.length,
            sortDirections: ['descend', 'ascend'],

        },
        {
            title: 'Year',
            key: 'year',
            dataIndex: 'year',
            width: '20%',
            editable: true,
            sorter: {
                compare: (a, b) => a.year - b.year,
                multiple: 1,
            },
        },
        {
            title: 'Edit',
            key: 'edit',
            dataIndex: 'edit',
            render: (_, record) => {


                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link onClick={() => save(record.id)} style={{ marginRight: 8 }}>
                            Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <Typography.Link onClick={() => edit(record)}>
                        Edit
                    </Typography.Link>
                );
            },
        },
        {
            title: 'Delete',
            key: 'delete',
            dataIndex: 'delete',
            render: (_, record) => {
                return (
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
                        <a style={{ color: 'red' }}>Delete</a>
                    </Popconfirm>
                );
            },
        },
        {
            title: 'See Drivers',
            dataIndex: 'seeDrivers',
            key: 'seeDrivers',
            render: (_, record) => {
                return (<span>
                    <a style={{ color: 'lightgreen' }} onClick={() => info(record)}>Show</a>
                </span>);
            },
        },

    ];


    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'year' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (<>

        <Button onClick={showModal} type="primary" style={{ marginBottom: 16 }}>
            Add a vehicle
        </Button>

        <Form form={form} component={false}>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={data}
                columns={mergedColumns}
                rowClassName="editable-row"
                warnKey="id"
                pagination={{
                    onChange: cancel,
                }}
            />
        </Form>

        <Modal
            title="User Information"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
        >
            <Input placeholder="Vehicle Number" value={vehicleNumber} onChange={(e) => setVehicleNumber(e.target.value)} />
            <Input placeholder="Vehicle Name" value={vehicleName} onChange={(e) => setVehicleName(e.target.value)} />
            <Input placeholder="Type Of Vehicle" value={typeOfVehicle} onChange={(e) => setTypeOfVehicle(e.target.value)} />
            <Input placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} />
            {modalText && <p style={{ color: 'red' }}>{modalText}</p>}
        </Modal>


    </>
    );
};

export default TableOfVehicles;