import React, { useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { DataType } from "./users";
import { CREATE_USERS} from "./query";
import { useMutation } from "@apollo/client";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface FormProps {
    onFormSubmit: (formData: DataType) => void;
  }


const Users_form: React.FC<FormProps> = ({onFormSubmit}) => {
  const [form] = Form.useForm()
    const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
  });
  const [createUsers] = useMutation(CREATE_USERS);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const showModal = () => {
    setModalVisible(true);
  };

 const handleFormSubmit = async () => {
  try {
    const { data} = await createUsers({
      variables: { name: formData.name, email: formData.email, mobileNumber : formData.mobileNumber },
    });

    if (data && data.createUsers) {
      onFormSubmit(data.createUsers);
    } else {
      console.error("Error creating Users. Data or createUsers is undefined.");
    }
  } catch (error) {
    console.error("Error creating Users: "+ error);
  }
  form.resetFields();
  setModalVisible(false);
 
};
const handlePhoneChange = (value: string, data: any, event: any) => {
  setFormData({
    ...formData,
    mobileNumber: value,
  });
};

  return (
    <div>
       
      <Button className="Users_Btn" onClick={showModal}>
        <PlusOutlined />
      </Button>
      <Modal open={modalVisible} footer={[]} closable={false} onCancel={() => setModalVisible(false)}>
       <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={handleFormSubmit}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please Enter your Name!" }]}
          >
            <Input value={formData.name}  onChange={(e) => {
                setFormData({
                  ...formData,
                  name: e.target.value,
                });
              }} />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Enter Your email" }]}
          >
           <Input value={formData.email} 
           onChange={(e) => {
            setFormData({
              ...formData,
            })
           }} />
          </Form.Item> 
          <Form.Item
            label="Mobile Number"
            name="mobileNumber"
            rules={[{ required: true, message: "Enter Your Number" }]}
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
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit"  >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

    </div>
  )
}

export default Users_form;