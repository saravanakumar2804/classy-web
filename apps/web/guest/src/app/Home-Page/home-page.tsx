import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  HomeOutlined,
  PoweroffOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme,Popover} from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigateToLogOut = useNavigate();

  const Logout = () => {
    navigateToLogOut('/');
  };
 
const Logout_hover = (
  <div>
    <p>Logout</p>
  </div>
);
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div />
        <Menu className="Vertical_Navbar" theme="dark" mode="inline">
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/Home">Home</Link>
          </Menu.Item>

          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to="/Home/Language">Language</Link>
          </Menu.Item>
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

          <Popover content={Logout_hover} title="">
            <Button
              type="text"
              icon={<PoweroffOutlined className="Logout_btn" />}
              onClick={() => Logout()}
              style={{
                fontSize: '16px',
                width: 50,
                height: 50,
                color: 'red',
                float: 'right',
                margin: 10,
                marginRight: 50,
              }}
            />
          </Popover>
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
