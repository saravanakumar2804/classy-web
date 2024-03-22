import React, { useState } from 'react';
import { Table, Modal, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import MyForm from './lang-form';

import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { IMutation, IQuery, LanguageModel } from '../../graphql';
import { ColumnsType } from 'antd/es/table';
import {
  createLanguageTable,
  deleteLanguage,
  GetLanguages,
  updateLanguage,
} from './query';

const Language: React.FC = () => {
  const client = useApolloClient();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<LanguageModel | null>(
    null
  );
  const { data } = useQuery<IQuery>(GetLanguages);
  const getLanguagesInfo = data?.getLanguages;
  const [createLanguageMutation] = useMutation<IMutation>(createLanguageTable);
  const [updateLanguageMutation] = useMutation(updateLanguage);
  const [deleteLanguageMutation] = useMutation(deleteLanguage);

  const columns: ColumnsType<LanguageModel> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: LanguageModel) => (
        <span>
          <a onClick={() => handleEdit(record)}>Edit</a>
          <span style={{ margin: '0 8px' }}>|</span>
          <a onClick={() => handleDelete(record)}>Delete</a>
        </span>
      ),
    },
  ];
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingRecord(null);
  };
  const addDataToTable = async (newData: LanguageModel) => {
    if (editingRecord) {
      await updateLanguageMutation({
        variables: {
          updateLanguageId: editingRecord.id,
          description: newData.description,
          name: newData.name,
        },
        refetchQueries: [{ query: GetLanguages }],
      });
    } else {
      const { data } = await createLanguageMutation({
        variables: {
          languageDto: { name: newData.name, description: newData.description },
        },
        refetchQueries: [{ query: GetLanguages }],
      });
      if (data) {
        const existingData = client.readQuery({ query: GetLanguages }) as {
          trial?: LanguageModel[];
        };
        const newLanguage = data.createLanguage;
        const updatedData = {
          trial: existingData?.trial
            ? [...existingData.trial, newLanguage]
            : [newLanguage],
        };
        client.writeQuery({
          query: GetLanguages,
          data: updatedData,
        });
      }
    }
    setIsModalVisible(false);
    setEditingRecord(null);
  };
  const handleEdit = (record: LanguageModel) => {
    setEditingRecord(record);
    showModal();
  };
  const handleDelete = async (record: LanguageModel) => {
    console.log(record);
    await deleteLanguageMutation({
      variables: { deleteLanguageId: record.id },
      refetchQueries: [{ query: GetLanguages }],
    });
  };
  return (
    <>
      <div>
        <Button className="Lang_Btn" onClick={showModal}>
          <PlusOutlined />
        </Button>
      </div>
      <br />
      <Modal
        title={editingRecord ? 'Edit Language' : 'Add Language'}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <MyForm
          onCancel={handleCancel}
          //  type={Testing?.STEPS}
          addDataToTable={addDataToTable}
          editingRecord={editingRecord}
          onDelete={handleDelete}
          //  isStepForm={false}
        />
      </Modal>
      <Table columns={columns} dataSource={getLanguagesInfo} />
    </>
  );
};
export default Language;
