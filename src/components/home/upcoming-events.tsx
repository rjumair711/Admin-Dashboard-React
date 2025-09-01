import { CalendarOutlined } from '@ant-design/icons';
import { Badge, Card, List, Typography } from 'antd';
import React from 'react';
import { UpcomingEventsSkeleton } from '../skeleton/upcoming-event';
import { getDate } from '@/utilities';
import { useList } from '@refinedev/core';
import { } from '@/graphql/queries';
import { DASHBOARD_CALENDAR_UPCOMING_EVENTS_QUERY } from '@/graphql/queries';

const UpcomingEvents = () => {
  const { data, isLoading } = useList({
    resource: 'events',
    pagination: { pageSize: 5 },
    sorters: [
      {
        field: 'startDate',
        order: 'asc'
      }
    ],
    meta: {
      gqlQuery: DASHBOARD_CALENDAR_UPCOMING_EVENTS_QUERY
    }
  });


  return (
    <Card
      style={{ height: '100%' }}
      headStyle={{ padding: '8px 16px' }}
      bodyStyle={{ padding: '0 1rem' }}
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CalendarOutlined />
          <Typography.Text style={{ marginLeft: '0.7rem', fontSize: '0.875rem' }}>
            Upcoming Events
          </Typography.Text>
        </div>
      }
    >
      {isLoading ? (
        <List itemLayout='horizontal'
          dataSource={Array.from({ length: 5 }).map((_, index) => ({
            id: index
          }))}
          renderItem={() => <UpcomingEventsSkeleton />}
        />
      ) : (
        <List itemLayout='horizontal' dataSource={data?.data || ''} renderItem={(item) => {
          const renderDate = getDate(item.startDate, item.endDate)
          return (
            <List.Item>
              <List.Item.Meta avatar={
                <Badge color={item.color} />}
                title={<Typography.Text style={{ fontSize: '0.875rem' }}>{renderDate}</Typography.Text>}
                description={<Typography.Text ellipsis={{ tooltip: true }} strong>{item.title}</Typography.Text>}>
              </List.Item.Meta>
            </List.Item>
          )
        }}
        />
      )}
      {!isLoading && data?.data.length === 0 && (
        <span style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '220px'
        }}>
          No Upcoming Events
        </span>
      )}
    </Card>
  );
};

export default UpcomingEvents;
