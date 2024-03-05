import React, { useState } from 'react';
import { Button, Divider, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import Steps_form from './steps-form';
import { useQuery } from '@apollo/client';
import { GetSteps } from './query';

export interface DataType {
  key: React.Key;
  name: string;
  description: string;
  action: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: 'Description',
    dataIndex: 'description',
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

const Steps: React.FC = () => {
  const { data } = useQuery(GetSteps);
  console.log(data?.getSteps, 'steps');
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
      <Steps_form onFormSubmit={handleFormSubmit} />
      <Table
        className="Steps_Table"
        columns={columns}
        dataSource={tabledata || []}
      />
    </div>
  );
};

export default Steps;
