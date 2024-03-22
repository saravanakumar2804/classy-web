import React, { useState } from 'react';
import { Button, Modal, Table } from 'antd';
import Users_form from './users-form';
import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { IMutation, IQuery, usersModel } from '../../graphql';
import { PlusOutlined } from '@ant-design/icons';
import { createUsersTable, GetUsers, updateUsers, deleteUsers } from './query';

const Users: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<usersModel | null>(null);
  const { data } = useQuery<IQuery>(GetUsers);
  const getUsersInfo = data?.getUsers;

  const [createUsersMutation] = useMutation<IMutation>(createUsersTable);
  const [updateUsersMutation] = useMutation(updateUsers);
  const [deleteUsersMutation] = useMutation(deleteUsers);
  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Mobile Number',
      dataIndex: 'mobileNumber',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: usersModel) => (
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

  const addDataToTable = async (newData: usersModel) => {
    if (editingRecord) {
      await updateUsersMutation({
        variables: {
          updateUsersId: editingRecord.id,
          ...newData,
        },
        refetchQueries: [{ query: GetUsers }],
      });
    } else {
      await createUsersMutation({
        variables: {
          userDto: newData,
        },
        refetchQueries: [{ query: GetUsers }],

        update: (cache, { data }) => {
          const newUsers = data?.createUsers;
          cache.modify({
            fields: {
              getUsers(existingUsers = []) {
                return [...existingUsers, newUsers];
              },
            },
          });
        },
      });
    }
    setIsModalVisible(false);
    setEditingRecord(null);
  };

  const handleEdit = (record: usersModel) => {
    setEditingRecord(record);
    showModal();
  };

  const handleDelete = async (record: usersModel) => {
    await deleteUsersMutation({
      variables: { deleteUsersId: record.id },
      refetchQueries: [{ query: GetUsers }],
    });
  };

  return (
    <div>
      <div>
        <Button className="Users_Btn" onClick={showModal}>
          <PlusOutlined />
        </Button>
      </div>
      <Modal
        title={editingRecord ? 'Edit Users' : 'Add Users'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Users_form
          onCancel={handleCancel}
          addDataToTable={addDataToTable}
          editingRecord={editingRecord}
          onDelete={handleDelete}
        />
      </Modal>
      <Table
        className="Users_Table"
        columns={columns}
        dataSource={getUsersInfo}
      />
    </div>
  );
};

export default Users;
