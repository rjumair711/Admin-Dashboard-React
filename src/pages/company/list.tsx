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
import { currencyNumber } from '@/utilities';
import { useState } from 'react';
import { HttpError } from "@refinedev/core";
import { CompaniesListQuery } from "@/graphql/types";

// Table row type: one node from the GraphQL query
type CompanyRow = CompaniesListQuery['companies']['nodes'][number];

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
  } = useTable<CompanyRow, HttpError>({
    resource: 'companies',
    pagination: { pageSize: 12 },
    sorters: { initial: [{ field: 'createdAt', order: 'desc' }] },
    meta: { gqlQuery: COMPANIES_LIST_QUERY },
  });

  // data?.data is already the array of nodes
  const companies: CompanyRow[] = data?.data ?? [];

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
                to: { resource: 'companies', action: 'create' },
                options: { keepQuery: true },
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

        <Table<CompanyRow>
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
          <Table.Column<CompanyRow>
            dataIndex="name"
            title="Company Title"
            render={(_, record) => (
              <Space>
                <CustomAvatar shape="square" name={record.name} src={record.avatarUrl} />
                <Typography.Text style={{ whiteSpace: 'nowrap' }}>
                  {record.name}
                </Typography.Text>
              </Space>
            )}
          />

          <Table.Column<CompanyRow>
            dataIndex="totalRevenue"
            title="Open deals amount"
            render={(_, record) => (
              <Typography.Text>
                {currencyNumber(record.dealsAggregate?.[0]?.sum?.value || 0)}
              </Typography.Text>
            )}
          />

          <Table.Column<CompanyRow>
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
