import { Select,  Switch, Checkbox, Divider, Button, Typography, message, Form } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import AuthContext from "../common/AuthContext";
import AdminService from '../services/admin.service';
import {  Table } from 'antd';
const CheckboxGroup = Checkbox.Group;
const plainOptions = ['ExceededSpeedLimit', 'ForwardDirections', 'LaneDeparture', 'PedestrianAndCyclistCollision', 'SuddenBraking'];
const defaultCheckedList = ['ExceededSpeedLimit', 'SuddenBraking'];

const { Title, Paragraph } = Typography;
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
  },
];
const SettigAlerts = () => {
    const [checkedList, setCheckedList] = useState(defaultCheckedList);
    const [indeterminate, setIndeterminate] = useState(true);
    const [checkAll, setCheckAll] = useState(false);
    const [selectedOption, setSelectedOption] = useState(undefined);
    const [switchEnabled, setSwitchEnabled] = useState(true);
    const [havaData, setHavaData] = useState(false);
    const [err, setErr] = useState(null);
    const { user } = useContext(AuthContext);
    const onChange = (list) => {
        setCheckedList(list);
        setIndeterminate(!!list.length && list.length < plainOptions.length);
        setCheckAll(list.length === plainOptions.length);
    };

    const setDefaultValues = (apiObject) => {
        // Set the default values for the Select component
        if (apiObject.alertLevel) {
            setSelectedOption(apiObject.alertLevel);
        }

        // Set the default values for the Switch component
        if (apiObject.reports !== undefined) {
            setSwitchEnabled(apiObject.reports);
        }

        // Set the default values for the CheckboxGroup component
        const defaultCheckedList = [];
        if (apiObject.exceededSpeedLimit) {
            defaultCheckedList.push('ExceededSpeedLimit');
        }
        if (apiObject.forwardDirections) {
            defaultCheckedList.push('ForwardDirections');
        }
        if (apiObject.laneDeparture) {
            defaultCheckedList.push('LaneDeparture');
        }
        if (apiObject.pedestrianAndCyclistCollision) {
            defaultCheckedList.push('PedestrianAndCyclistCollision');
        }
        if (apiObject.suddenBraking) {
            defaultCheckedList.push('SuddenBraking');
        }
        if (apiObject.reports) {
            defaultCheckedList.push('Reports');
        }
        setCheckedList(defaultCheckedList);
        setIndeterminate(!!defaultCheckedList.length && defaultCheckedList.length < plainOptions.length);
        setCheckAll(defaultCheckedList.length === plainOptions.length);
    };

    useEffect(() => {

        AdminService.getAllMessagesSendOfAdmin(user.id).then(
            (response) => {
                //If have setting in system for admin!
                if (response.data[0]) {
                    setDefaultValues(response.data[0]);
                    setHavaData(true);
                }
            },
            (error) => {
                const content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setErr(content);

            }
        );


    }, []);


    const onCheckAllChange = (e) => {
        setCheckedList(e.target.checked ? plainOptions : []);
        setIndeterminate(false);
        setCheckAll(e.target.checked);
    };

    const handleSelectChange = (value) => {
        setSelectedOption(value);
    }

    const handleSwitchChange = (checked) => {
        setSwitchEnabled(checked);
    }

    const createDataObject = () => {
        return {
            userId: user.id,
            alertLevel: selectedOption,
            exceededSpeedLimit: checkedList.includes('ExceededSpeedLimit'),
            forwardDirections: checkedList.includes('ForwardDirections'),
            laneDeparture: checkedList.includes('LaneDeparture'),
            pedestrianAndCyclistCollision: checkedList.includes('PedestrianAndCyclistCollision'),
            reports: switchEnabled,
            suddenBraking: checkedList.includes('SuddenBraking')
        };

    };


    const handleButtonClick = () => {
        if (!selectedOption) {
            message.error('Please Select a level of alert');
            return;
        }
        const data = createDataObject();
        if (havaData) {
            AdminService.updateAllowSendAlert(data).then(res => {
                message.success(res.data.message);
            }).catch(err => {
                console.error(err);
                message.error(err);
            })
        } else {
            AdminService.addAllowSendAlert(data).then(res => {
                message.success(res.data.message);
            }).catch(err => {
                console.error(err);
                message.error(err);
            })
        }
    }

    return (
        <>
            <div>
                <Paragraph>
                    Here's some information about what you can do:
                </Paragraph>
                <ul>
                    <li>
                        <Paragraph>
                            Select the dropdown menu option: low, medium, high, none
                        </Paragraph>
                    </li>
                    <li>
                        <Paragraph>
                            Toggle the switch to enable/disable summary reports
                        </Paragraph>
                    </li>
                    <li>
                        <Paragraph>
                        <Table 
                        pagination={false}
                        bordered={true}
                        style={{width:400}}
                        columns={columns} 
                        dataSource={data} 
                        size="small" />
                        </Paragraph>
                    </li>
                </ul>
                <Paragraph>
                    Here's an explanation of each option:
                </Paragraph>
                <ul>
                    <li>
                        <Paragraph>
                            ExceededSpeedLimit: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </Paragraph>
                    </li>
                    <li>
                        <Paragraph>
                            ForwardDirections: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </Paragraph>
                    </li>
                    <li>
                        <Paragraph>
                            LaneDeparture: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </Paragraph>
                    </li>
                    <li>
                        <Paragraph>
                            PedestrianAndCyclistCollision: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </Paragraph>
                    </li>
                    <li>
                        <Paragraph>
                            SuddenBraking: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </Paragraph>
                    </li>
                </ul>
            </div>
            <Divider />
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Title level={5}>Select a level of alert:</Title>
                <Select
                    value={selectedOption}

                    style={{ width: 125, marginLeft: 15 }}
                    allowClear
                    options={[
                        { value: 0, label: 'No' },
                        { value: 1, label: 'Low' },
                        { value: 2, label: 'Medium' },
                        { value: 3, label: 'High' },
                    ]}
                    onChange={handleSelectChange}
                />
                <Title style={{ marginLeft: 30 }} level={5}>Enable/disable Reports:</Title>
                <Switch
                    style={{ marginLeft: 10 }}
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    checked={switchEnabled}
                    onChange={handleSwitchChange}
                />
            </div>
            <Divider />
            <div>
                <Title level={4}>Select/deselect an alert type:</Title>
                <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
                <div style={{ marginTop: '8px' }}>
                    <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                        <Title level={2}>Check all</Title>
                    </Checkbox>
                </div>
            </div>
            <Divider />
            {err && (
                <Form.Item>
                    <div
                        role="alert"
                    >
                        {err}
                    </div>
                </Form.Item>
            )}
            <Button type="primary" style={{ left: 400 }} onClick={handleButtonClick}>Save</Button>
        </>
    );
};

export default SettigAlerts;