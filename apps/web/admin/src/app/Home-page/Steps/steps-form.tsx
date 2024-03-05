import React, { useState } from "react";
import { Button, Form, Input, Modal, Menu, Dropdown } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { DataType } from "./steps";
import { CREATE_STEPS } from "./query";
import { useMutation } from "@apollo/client";

interface FormProps {
  onFormSubmit: (formData: DataType) => void;
}

const Steps_form: React.FC<FormProps> = ({ onFormSubmit }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    select_language: "", // Added a state for language selection
  });
  const [createSteps] = useMutation(CREATE_STEPS);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLanguageSelect = (language: string) => {
    setFormData({
      ...formData,
      select_language: language,
    });
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const handleFormSubmit = async () => {
    try {
      const { data } = await createSteps({
        variables: {
          name: formData.name,
          description: formData.description,
          select_language: formData.select_language,
        },
      });

      if (data && data.createSteps) {
        onFormSubmit(data.createSteps);
      } else {
        console.error("Error creating steps. Data or createSteps is undefined.");
      }
    } catch (error) {
      console.error("Error creating Steps: " + error);
    }
    setFormData({ name: "", description: "", select_language: "" });
    setModalVisible(false);
  };

  const languageMenu = (
    <Menu>
      <Menu.Item key="english" onClick={() => handleLanguageSelect("English")}>
        English
      </Menu.Item>
      <Menu.Item key="spanish" onClick={() => handleLanguageSelect("Spanish")}>
        Spanish
      </Menu.Item>
      {/* Add more language items as needed */}
    </Menu>
  );

  return (
    <div>
      <Button className="Steps_Btn" onClick={showModal}>
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
            rules={[{ required: true, message: "Please Enter your username!" }]}
          >
            <Input value={formData.name} onChange={handleChange} />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Add Description" }]}
          >
            <textarea className="formText" value={formData.description} onChange={handleChange} />
          </Form.Item>

          <Form.Item label="Select Language" name="select_language">
            <Dropdown overlay={languageMenu} trigger={["click"]}>
              <Button>{formData.select_language || "Select Language"}</Button>
            </Dropdown>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Steps_form;
