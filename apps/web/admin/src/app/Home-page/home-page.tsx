import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  HomeOutlined,
  PoweroffOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Modal, Alert, Space } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import '../app-style.less';

const Home: React.FC = () => {
  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigateToLogOut = useNavigate();
  
  const NavigateToContent = () => {
    navigateToLogOut('/Home')
  }
  const Logout = () => {
    navigateToLogOut('/');
  };
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div />
        <Menu className="Vertical_Navbar" theme="dark" mode="inline">
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/Home/Language">Language</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            <Link to="/Home/Steps">Steps</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />}>
            <Link to="/Home/Users">Users</Link>
          </Menu.Item>
          {/* <Menu.Item key="4" icon={<UploadOutlined />}>
            <Link to="/Home/Medium">Medium</Link>
          </Menu.Item> */}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 30,
              height: 30,
              margin: 10,
            }}
          />
          <Button
            type="text"
            icon={<HomeOutlined />}
             onClick={() => NavigateToContent()}
            style={{
              fontSize: '16px',
              width: 30,
              height: 30,
              margin: 10,
              color: 'cornflowerblue',
            }}
          />
          <Button
            type="text"
            icon={<PoweroffOutlined 
              className='Logout_btn'
              />}
            onClick={() => Logout()}
            style={{
              fontSize: '16px',
              width: 30,
              height: 30,
              color: 'red',
              float: 'right',
              margin: 10,
            }}
          />          
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 600,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
