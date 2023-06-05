import React from 'react';
import { Alert } from 'antd';
const AlertReport = (props) => {
    const { report, score } = props;

    const getType = () => {
        if (score > 90) {
            return "success";
        } else if (score < 60) {
            return "error";
        } else {
            return "warning";
        }
    }

    return (<>
        <Alert
            message="Information about the current driver"
            description={<div style={{ color: 'black' }} dangerouslySetInnerHTML={{ __html: report }} />}
            type={getType()}
            showIcon
        />


    </>);
};
export default AlertReport;