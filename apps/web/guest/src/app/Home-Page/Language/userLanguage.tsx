import React, { useState } from 'react';
import { Button, Divider, Spin, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { useQuery } from '@apollo/client';
import { GetLanguages } from './query';
import { DoubleRightOutlined } from '@ant-design/icons';
import { IQuery, LanguageModel } from '../../../../../admin/src/app/graphql';
// import { useParams } from 'react-router-dom';

const UserLanguage: React.FC = () => {
  // const { languageId } = useParams<{ languageId: string }>();
  // const selectedLanguage = availableLanguages.find((language: { id: string | undefined; }) => language.id === languageId);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: 'Details',
      dataIndex: 'details',
      render: (text: string, record: LanguageModel) => (
        <div onClick={() => console.log(record)}>
          <DoubleRightOutlined />
        </div>
      ),
    },
  ];

  const { loading, error, data } = useQuery<IQuery>(GetLanguages);
  if (loading) return <Spin />;
  if (error) return <div> error:{error.message} </div>;

  console.log(data?.getLanguages, 'languages');
  const availableLanguages = data?.getLanguages;
  return (
    <div>
      <Divider />
      <Table
        className="Language_Table"
        columns={columns}
        dataSource={availableLanguages}
      />
    </div>
  );
};

export default UserLanguage;
