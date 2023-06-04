import React, { useContext } from "react";
import { Layout, Menu, } from "antd";
import {
    BranchesOutlined,
    UsergroupAddOutlined,
    ContactsOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../common/AuthContext";

const { Header } = Layout;


function Navbar() {
    const { logout, user } = useContext(AuthContext);

    const role = user.roles.includes("ROLE_ADMIN");

    const navigate = useNavigate();
    const location = useLocation();
    const handleMenuClick = (e) => {
        if (e.key === "0") {
            return;
        }
        navigate(e.key);
    };

    return (
        <Header className="header">
            <div className="logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={[location.pathname]}
                onClick={handleMenuClick}
                style={{ backgroundColor: "transparent", borderBottom: "none" }}
            >
                <Menu.Item key="/">
                    <BranchesOutlined />
                    <span>Driving control</span>
                </Menu.Item>
                {role && <>
                    <Menu.Item key="/addDriver">
                        <UsergroupAddOutlined />
                        <span>Adding Drivers</span>
                    </Menu.Item>
                    <Menu.Item key="/userDetails">
                        <ContactsOutlined />
                       <span> All Users</span>
                    </Menu.Item>
                </>}
                <Menu.Item key="0" style={{ position: "absolute", right: 0 }} onClick={() => logout()}>
                    SignOut
                </Menu.Item>


            </Menu>
        </Header>
    );
}

export default Navbar;