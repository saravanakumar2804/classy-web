import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import '../app-style.less';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    navigate('/Home');
    console.log('Received values of form: ', values);
  };

  return (
    <div>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item className="Login_logo">
          <img src="assets/Logo1.png" alt="Login_Logo" />

          <p>Admin</p>
        </Form.Item>
        <Form.Item
          className="input_form"
          name="username"
          rules={[{ required: true, message: 'Please Enter your Username!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          className="input_form"
          name="password"
          rules={[{ required: true, message: 'Please Enter your Password!' }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item className="login_remember">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <br />
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Link to={'/Home'}>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
