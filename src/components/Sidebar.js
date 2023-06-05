import React, { useContext, useState } from "react";
import { Layout, Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import {
  HomeOutlined,
  CarOutlined,
  ApiOutlined,
  UserOutlined,
  SettingOutlined,
  DashboardOutlined,
  EyeOutlined,
  AlertOutlined,
  MessageOutlined ,
} from "@ant-design/icons";
import SubMenu from "antd/es/menu/SubMenu";
import MessageList from "./ShowAllMessage";
import AuthContext from "../common/AuthContext";


const { Sider } = Layout;

function Sidebar() {
  const { user } = useContext(AuthContext);

  const role = user.roles.includes("ROLE_ADMIN");

  const navigate = useNavigate();
  const location = useLocation();

  const [theme, setTheme] = useState('light');

  const changeTheme = () => {
    if (theme === 'light') {
      setTheme('dark');

    } else {

      setTheme('light');
    }
  };

  const handleMenuClick = (e) => {
    if (e.key === "0" || e.key === "3") {
      return;
    }
    navigate(e.key);
  };


  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(!open);
  };


  return (
    <>

      <Sider className="sidebar">

        <Menu
          defaultSelectedKeys={[location.pathname]}
          onClick={handleMenuClick}
          mode="vertical"
          theme={theme}
          getPopupContainer={(node) => node.parentNode}
          style={{
            height: "100%",
          }}
        >
          <Menu.Item key="/">
            <HomeOutlined />
            <span>Home</span>
          </Menu.Item>
          <Menu.Item key="/dashboard">
            <DashboardOutlined />
            <span>Dashboard</span>
          </Menu.Item>
          {role && <>
            <SubMenu key="1" title={<span><ApiOutlined /><span>Action</span></span>}>
              <Menu.Item key="/addVeicle"><CarOutlined /><span> All Veicles</span></Menu.Item>
              <Menu.Item key="/addDriverToVehicle">Add Driver To Vehicle</Menu.Item>
            </SubMenu>
            <SubMenu key="2" title={<span><SettingOutlined /><span>Setting</span></span>}>
              <Menu.Item key="0" onClick={changeTheme}><EyeOutlined /><span>Change Style</span></Menu.Item>
              <Menu.Item key="/settingAlerts"><AlertOutlined /><span>Setting Alerts</span></Menu.Item>
              <Menu.Item key="3" onClick={showDrawer}><MessageOutlined /><span>Messages send</span></Menu.Item>
            </SubMenu>
          </>}
          <Menu.Item key="/profile">
            <UserOutlined />
            <span>Profile</span>
          </Menu.Item>
        </Menu>
      </Sider>

      {open && <MessageList openDrawer={open} />}
    </>

  );
}

export default Sidebar;