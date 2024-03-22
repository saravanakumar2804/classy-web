import React, { useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useNavigate } from 'react-router-dom';
import { userDTO } from 'apps/web/admin/src/app/graphql';
import { getAuth, createUserWithEmailAndPassword,  UserCredential } from 'firebase/auth';
import { useMutation } from '@apollo/client';
import { createUsersTable } from './query';

const Sign_up: React.FC = () => {
  const navigate = useNavigate();
  const Auth = getAuth();
  const [createUser] = useMutation(createUsersTable)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobileNumber: '',
  });
  const onRegisterSubmit = async () => {
    // console.log(formData, 'Formdata');
  
    try {
      const usercredential: UserCredential = await createUserWithEmailAndPassword(Auth, formData.email, formData.password)
      const userDto = {
        name: formData.name,
        email: formData.email,
        mobileNumber: formData.mobileNumber,
        uid:usercredential?.user?.uid,
      };
      // console.log('User registered:', userDto);
      navigate('/Home');
      await createUser({
        variables:{
          userDto: userDto
        },
        refetchQueries:[{query: createUsersTable}]
      })
    } catch (error) {
      // Handle errors here
      console.error('Registration failed:', error);
    }
  };

  const handlePhoneChange = (value: string) => {
    setFormData({
      ...formData,
      mobileNumber: value,
    });
  };

  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        className="register_form"
        onFinish={onRegisterSubmit}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please Enter your username!' }]}
        >
          <Input
            value={formData.name}
            onChange={(e) => {
              setFormData({
                ...formData,
                name: e.target.value,
              });
            }}
          />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Enter Your email' }]}
        >
          <Input
            value={formData.email}
            onChange={(e) => {
              setFormData({
                ...formData,
                email: e.target.value,
              });
            }}
          />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password
            onChange={(e) => {
              setFormData({
                ...formData,
                password: e.target.value,
              });
            }}
          />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The new password that you entered do not match!')
                );
              },
            }),
          ]}
        >
          <Input.Password
            onChange={(e) => {
              setFormData({
                ...formData,
                confirmPassword: e.target.value,
              });
            }}
          />
        </Form.Item>
        <Form.Item
          label="Mobile Number"
          name="mobileNumber"
          rules={[{ required: true, message: 'Enter Your Number' }]}
        >
          <PhoneInput
            country={'in'}
            value={formData.mobileNumber}
            onChange={handlePhoneChange}
            inputProps={{
              name: 'mobileNumber',
              required: true,
              autoFocus: true,
            }}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button type="primary" htmlType="submit" onClick={onRegisterSubmit}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Sign_up;
