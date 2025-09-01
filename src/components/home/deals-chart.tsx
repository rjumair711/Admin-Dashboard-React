import React from 'react';
import { Card, Typography } from 'antd';
import { DollarOutlined } from '@ant-design/icons';
import { Area, AreaConfig } from '@ant-design/plots';
import { useList } from '@refinedev/core';
import { DASHBOARD_DEALS_CHART_QUERY } from '@/graphql/queries';
import { GetFieldsFromList } from '@refinedev/nestjs-query';
import { DashboardDealsChartQuery } from '@/graphql/mutations';
import { mapDealsData } from '@/utilities/helper';

const DealsChart = () => {
  const { data } = useList<GetFieldsFromList<DashboardDealsChartQuery>>({
    resource: 'dealStages',
    filters: [
      {
        field: 'title', operator: 'in', value: ['WON', 'LOST']
      }
    ],
    meta: {
      gqlQuery: DASHBOARD_DEALS_CHART_QUERY,
    },
  });

  const dealData = React.useMemo(() => {
    return mapDealsData(data?.data ?? []);
  }, [data?.data]);

  const config: AreaConfig = {
    data: dealData,
    xField: 'timeText',
    yField: 'value',
    seriesField: 'state',
    isStack: false,
    animation: true,
    startOnZero: false,
    smooth: true,
    legend: {
      offsetY: -6,
    },
    yAxis: {
      tickCount: 4,
      label: {
        formatter: (v: string) => `$${Number(v) / 1000}k`,
      },
    },
    tooltip: {
      formatter: (data) => ({
        name: data.state,
        value: `$${Number(data.value) / 1000}k`,
      }),
    },
  };

  return (
    <Card
      style={{ height: '100%' }}
      headStyle={{ padding: '8px 16px' }}
        bodyStyle={{ padding: '24px', height: 'calc(100% - 50px)' }} // ensure body has height minus header
        title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <DollarOutlined />
          <Typography.Text style={{ fontSize: '16px', fontWeight: 500 }}>
            Deals
          </Typography.Text>
        </div>
      }
    >
      <Area {...config} />
    </Card>
  );
};

export default DealsChart;
