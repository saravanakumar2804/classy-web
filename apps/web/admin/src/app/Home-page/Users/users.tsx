import React, { useState } from 'react';
import { Button, Divider, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import Users_form from './users-form';
import { useQuery } from '@apollo/client';
import { GetUsers } from './query';

export interface DataType {
  key: React.Key;
  name: string;
  email: string;
  mobileNumber: number
  action: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: 'Mobile Number',
    dataIndex: 'mobileNumber',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: 'Action',
    dataIndex: 'action',
    render: (text: string, record: DataType) => (
      <div>
        <Button>Edit</Button>
        <br />
        <Button>Delete</Button>
      </div>
    ),
  },
];

const Users: React.FC = () => {
  const { data } = useQuery(GetUsers);
  console.log(data?.getUsers, 'users');
  const [tabledata, setTableData] = useState<DataType[]>([]);
  const handleFormSubmit = (formData: DataType) => {
    const newData: DataType[] = [
      ...tabledata,
      { ...formData, key: Date.now() },
    ];
    setTableData(newData);
  };

  return (
    <div>
      <Divider />
      <Users_form onFormSubmit={handleFormSubmit} />
      <Table
        className="Users_Table"
        columns={columns}
        dataSource={tabledata || []}
      />
    </div>
  );
};

export default Users;
