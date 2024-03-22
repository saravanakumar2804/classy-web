import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Modal, Dropdown, Menu, Select } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { IQuery, stepsDTO } from '../../graphql';

import { LanguageModel, StepsModel } from '../../graphql';
import { GetLanguages } from '../Language/query';
import { useQuery } from '@apollo/client';

const { confirm } = Modal;
interface MyFormProps<T> {
  onCancel: () => void;
  addDataToTable: (newData: T) => Promise<void>;
  editingRecord: T | null;
  onDelete: (record: T) => Promise<void>;
}
const StepsForm: React.FC<MyFormProps<StepsModel>> = ({
  onCancel,
  addDataToTable,
  editingRecord,
  onDelete,
}) => {
  const [form] = Form.useForm();
  const [isDeleteConfirmation, setDeleteConfirmation] = useState(false);
  const { data, loading } = useQuery<IQuery>(GetLanguages);
  const availableLanguages = data?.getLanguages;

  useEffect(() => {
    if (editingRecord) {
      form.setFieldsValue({
        name: editingRecord.name,
        description: editingRecord.description,
      });
    }
  }, [editingRecord, form]);

  const onFinish = async (values: any) => {
    console.log('Submitted values:', values);
    const newData: stepsDTO = {
      name: values.name,
      description: values.description,
      languageId: undefined,
    };
    addDataToTable(newData as unknown as StepsModel);
    onCancel(); // Close the modal after submitting the form
    form.resetFields();
  };
  const showDeleteConfirmation = () => {
    confirm({
      title: 'Do you want to delete this record ?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        if (editingRecord) {
          onDelete(editingRecord);
          onCancel();
          form.resetFields();
        }
      },
      onCancel() {
        setDeleteConfirmation(false);
      },
    });
  };
  const { Option } = Select;

  return (
    <Form
      form={form}
      name="myForm"
      initialValues={{ name: '', description: '' }}
      onFinish={onFinish}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please enter a name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Please enter a description!' }]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item label="Select Language" name="select_language">
        <Select loading={loading} placeholder="select language" showSearch>
          {availableLanguages?.map((language: LanguageModel) => (
            <Option key={language.id} value={language.id}>
              {language.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      <Modal
        title="Confirmation"
        open={isDeleteConfirmation}
        onOk={() => showDeleteConfirmation()}
        onCancel={() => setDeleteConfirmation(false)} // Set visible to false on cancel
      >
        <p>Are you Sure you Want to Delete this Record ?</p>
      </Modal>
    </Form>
  );
};
export default StepsForm;
