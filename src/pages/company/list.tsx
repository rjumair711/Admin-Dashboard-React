import {
  List,
  CreateButton,
  EditButton,
  DeleteButton,
} from '@refinedev/antd';
import { useGo, useTable } from '@refinedev/core';
import { Input, Space, Table, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { COMPANIES_LIST_QUERY } from '@/components/account-settings/queries';
import CustomAvatar from '@/components/custom-avatar';
import { Company } from '@/graphql/schema.types';
import { currencyNumber } from '@/utilities';
import { useState } from 'react';

const CompanyList = ({ children }: React.PropsWithChildren) => {
  const go = useGo();
  const [searchText, setSearchText] = useState('');

  const {
    tableQueryResult: { data, isLoading },
    current,
    pageSize,
    setCurrent,
    setPageSize,
    setFilters,
  } = useTable({
    resource: 'companies',
    pagination: {
      pageSize: 12,
    },
    sorters: {
      initial: [
        {
          field: 'createdAt',
          order: 'desc',
        },
      ],
    },
    meta: {
      gqlQuery: COMPANIES_LIST_QUERY,
    },
  });

  const companies = data?.data ?? [];

  const handleSearch = (value: string) => {
    setSearchText(value);
    setFilters([
      {
        field: 'name',
        operator: 'contains',
        value: value || undefined,
      },
    ]);
  };

  return (
    <div>
      <List
        breadcrumb={false}
        headerButtons={() => (
          <CreateButton
            onClick={() => {
              go({
                to: {
                  resource: 'companies',
                  action: 'create',
                },
                options: {
                  keepQuery: true,
                },
                type: 'replace',
              });
            }}
          />
        )}
      >
        <div style={{ marginBottom: 16 }}>
          <Input
            placeholder="Search Company"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            allowClear
            style={{ width: 300 }}
          />
        </div>

        <Table
          dataSource={companies}
          rowKey="id"
          loading={isLoading}
          pagination={{
            current,
            pageSize,
            onChange: setCurrent,
            onShowSizeChange: (_, size) => setPageSize(size),
          }}
        >
          <Table.Column<Company>
            dataIndex="name"
            title="Company Title"
            render={(value, record) => (
              <Space>
                <CustomAvatar shape="square" name={record.name} src={record.avatarUrl} />
                <Typography.Text style={{ whiteSpace: 'nowrap' }}>{record.name}</Typography.Text>
              </Space>
            )}
          />
          <Table.Column<Company>
            dataIndex="totalRevenue"
            title="Open deals amount"
            render={(value, company) => (
              <Typography.Text>
                {currencyNumber(company?.dealsAggregate?.[0].sum?.value || 0)}
              </Typography.Text>
            )}
          />
          <Table.Column<Company>
            dataIndex="id"
            title="Actions"
            fixed="right"
            render={(value) => (
              <Space>
                <EditButton hideText size="small" recordItemId={value} />
                <DeleteButton hideText size="small" recordItemId={value} />
              </Space>
            )}
          />
        </Table>
      </List>
      {children}
    </div>
  );
};

export default CompanyList;
