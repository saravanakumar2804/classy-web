import React, { useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { useMutation } from '@apollo/client';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '../FireBase/firebase.config';

interface FormProps {
  onFormSubmit: () => void;
}

const Sign_up: React.FC<FormProps> = ({ onFormSubmit }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    conformPassword: '',
    mobileNumber: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const onRegisterSubmit = async () => {
    const auth = getAuth(app);
  
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      console.log('User registered:', user);
      navigate('/Home');
    } catch (error:any) {
      console.error('Error registering user:', error.message);
    }
  };
  
  const handlePhoneChange = (value: string, data: any, event: any) => {
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
        className='register_form'
        onFinish={onRegisterSubmit}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please Enter your username!' }]}
        >
          <Input value={formData.name} onChange={handleChange} />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Enter Your email' }]}
        >
          <Input value={formData.email} onChange={handleChange} />
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
          <Input.Password />
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
          <Input.Password />
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
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Sign_up;
