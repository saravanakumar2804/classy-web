import React, { useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { DataType } from "./language";
import { CREATE_LANGUAGE} from "./query";
import { useMutation } from "@apollo/client";

interface FormProps {
    onFormSubmit: (formData: DataType) => void;
  }
  

const Language_form: React.FC<FormProps> = ({onFormSubmit}) => {
    const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [createLanguage] = useMutation(CREATE_LANGUAGE);

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
    const { data} = await createLanguage({
      variables: { name: formData.name, description: formData.description },
    });

    if (data && data.createLanguage) {
      onFormSubmit(data.createLanguage);
    } else {
      console.error("Error creating language. Data or createLanguage is undefined.");
    }
  } catch (error) {
    console.error("Error creating language: "+ error);
  }
  setFormData({ name: " ", description: " " });
  setModalVisible(false);
 
};

  return (
    <div>
       
      <Button className="Lang_Btn" onClick={showModal}>
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
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input value={formData.name} onChange={handleChange} />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Add Description" }]}
          >
            <textarea
              className="formText"
              value={formData.description}
              onChange={handleChange}
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

export default Language_form;