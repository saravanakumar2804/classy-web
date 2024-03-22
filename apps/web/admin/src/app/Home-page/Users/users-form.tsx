import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { usersModel } from '../../graphql';
import {
  getAuth,
  createUserWithEmailAndPassword,
  UserCredential,
  Auth
} from '@firebase/auth';
interface FormProps<usersModel> {
  onCancel: () => void;
  addDataToTable: (newData: usersModel) => Promise<void>;
  editingRecord: usersModel | null;
  onDelete: (record: usersModel) => Promise<void>;
}

const Users_form: React.FC<FormProps<usersModel>> = ({
  onCancel,
  addDataToTable,
  editingRecord,
  onDelete,
}) => {
  const [form] = Form.useForm();
  const [authInitialized, setAuthInitialized] = useState(false);
  const [auth, setAuth] = useState<Auth | null>(null);

  useEffect(() => {
    const initializeFirebase = async () => {
      const authInstance = getAuth();
    if (editingRecord) {
      form.setFieldsValue({
        name: editingRecord.name,
        email: editingRecord.email,
        mobileNumber: editingRecord.mobileNumber,
      });
    }
    setAuth(authInstance);
    setAuthInitialized(true);
  };initializeFirebase();
  }, [editingRecord, form]);

  const onFinish = async () => {
    const values = await form?.validateFields();
   
    console.log('Submitted values:', values);
    if (auth !== null) {
      const userCredential: UserCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const newData: usersModel = {
        name: values.name,
        email: values.email,
        mobileNumber: values.mobileNumber,
        uid: userCredential.user.uid,
      };
      console.log('User Registered and signed in with UID:', userCredential.user.uid);
  
      addDataToTable(newData);
      onCancel();
      form.resetFields();
    } else {
      console.error('Firebase Auth is not initialized.');
    }
  };

  return (
    <div>
      <Form
        form={form}
        name="myForm"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ name: '', email: '', mobileNumber: '' }}
        autoComplete="off"
        onFinish={onFinish}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please enter your name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please enter your email!' }]}
        >
          <Input />
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
          <Input.Password/>
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
          <Input.Password/>
        </Form.Item>
        <Form.Item
          label="Mobile Number"
          name="mobileNumber"
          rules={[
            { required: true, message: 'Please enter your mobile number!' },
          ]}
        >
          <PhoneInput
            country={'in'}
            inputProps={{
              name: 'mobileNumber',
              required: true,
              autoFocus: true,
            }}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Users_form;
