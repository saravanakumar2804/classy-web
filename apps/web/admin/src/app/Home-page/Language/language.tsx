import React, { useState } from 'react';
import { Button, Divider, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import Language_form from './lang-form';
import { useQuery } from '@apollo/client';
import { GetLanguages } from './query';

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

const Language: React.FC = () => {
  const { data } = useQuery(GetLanguages);
  console.log(data?.getLanguages, 'languages');
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
      <Language_form onFormSubmit={handleFormSubmit} />
      <Table
        className="Language_Table"
        columns={columns}
        dataSource={tabledata || []}
      />
    </div>
  );
};

export default Language;
