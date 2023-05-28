import React, { useState } from "react";
import {  Layout, Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import {
  HomeOutlined,
  CarOutlined,
  ApiOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import SubMenu from "antd/es/menu/SubMenu";
import MessageList from "./ShowAllMessage";


const { Sider } = Layout;

function Sidebar() {
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
          <Menu.Item key="/travels">
            <CarOutlined />
            <span>Travels</span>
          </Menu.Item>
          <SubMenu key="1" title={<span><ApiOutlined /><span>Action</span></span>}>
            <Menu.Item key="/addVeicle">All Veicles</Menu.Item>
            <Menu.Item key="/addDriverToVehicle">Add Driver To Tehicle</Menu.Item>
          </SubMenu>
          <SubMenu key="2" title={<span><SettingOutlined /><span>Setting</span></span>}>
            <Menu.Item key="0" onClick={changeTheme}>Change Style</Menu.Item>
            <Menu.Item key="/settingAlerts">Setting Alerts</Menu.Item>
            <Menu.Item key="3" onClick={showDrawer}>Messages send</Menu.Item>
          </SubMenu>
          <Menu.Item key="/profile">
            <UserOutlined />
            Profile
          </Menu.Item>
        </Menu>
      </Sider>

      {open && <MessageList openDrawer={open} />}
    </>

  );
}

export default Sidebar;