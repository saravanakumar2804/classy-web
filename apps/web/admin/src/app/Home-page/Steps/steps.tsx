import React, { useState } from 'react';
import { Table, Modal, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@apollo/client';
import { IMutation, IQuery, StepsModel, stepsDTO } from '../../graphql';
import { createStepsTable, deleteSteps, GetSteps, updateSteps } from './query';
import StepsForm from './steps-form';

const Steps: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<StepsModel | null>(null);
  const { data } = useQuery<IQuery>(GetSteps);
  const getStepsInfo = data?.getSteps;
  const [createStepsMutation] = useMutation<IMutation>(createStepsTable);
  const [updateStepsMutation] = useMutation(updateSteps);
  const [deleteStepsMutation] = useMutation(deleteSteps);

  const columns = [
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
      render: (text: string, record: StepsModel) => (
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
  const addDataToTable = async (newData: StepsModel) => {
    if (editingRecord) {
      await updateStepsMutation({
        variables: {
          updateStepsId: editingRecord.id,
          name: newData.name,
          description: newData.description,
        },
        refetchQueries: [{ query: GetSteps }],
      });
    } else {
      await createStepsMutation({
        variables: {
          stepsDto: {
            name: newData.name,
            description: newData.description,
            languageId: newData.languageId,
          },
        },
        refetchQueries: [{ query: GetSteps }],
        update: (cache, { data }) => {
          const newSteps = data?.createSteps;
          cache.modify({
            fields: {
              getSteps(existingSteps = []) {
                return [...existingSteps, newSteps];
              },
            },
          });
        },
      });
    }
    setIsModalVisible(false);
    setEditingRecord(null);
  };
  const handleEdit = (record: StepsModel) => {
    setEditingRecord(record);
    showModal();
  };
  const handleDelete = async (record: StepsModel) => {
    console.log(record);
    await deleteStepsMutation({
      variables: { deleteStepsId: record.id },
      refetchQueries: [{ query: GetSteps }],
    });
  };
  return (
    <>
      <div>
        <Button className="Steps_Btn" onClick={showModal}>
          <PlusOutlined />
        </Button>
      </div>
      <br />
      <Modal
        title={editingRecord ? 'Edit Steps' : 'Add Steps'}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <StepsForm
          onCancel={handleCancel}
          addDataToTable={addDataToTable}
          editingRecord={editingRecord}
          onDelete={handleDelete}
        />
      </Modal>
      <Table columns={columns} dataSource={getStepsInfo} />
    </>
  );
};
export default Steps;
