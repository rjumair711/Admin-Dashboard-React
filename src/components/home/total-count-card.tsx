import variants from '@/constants'
import { Area, AreaConfig } from '@ant-design/plots'
import { Card, Skeleton, Typography } from 'antd'
import React from 'react'

type Props = {
    resource: "companies" | "contacts" | "deals",
    isLoading: boolean,
    totalCount?: number
}


const DashboardTotalCountCard = ({ resource, isLoading, totalCount }: Props) => {

    const { primaryColor, secondaryColor, icon, title } = variants[resource];

    const config: AreaConfig = {
        data: variants[resource].data,
        xField: 'index',
        yField: 'value',
        appendPadding: [1, 0, 0, 0],
        padding: 0,
        syncViewPadding: true,
        autoFit: true,
        tooltip: false,
        animation: false,
        smooth: true,
        line: {
            color: primaryColor,
        },
        areaStyle: () => {
            return {
                fill: `l(270) 0:#fff 0.2${secondaryColor} 1:${primaryColor}`
            }
        },
        xAxis: false,
        yAxis: {
            tickCount: 12,
            label: {
                style: {
                    stroke: 'transparent'
                }
            },
            grid: {
                line: {
                    style: {
                        stroke: 'transparent'
                    }
                }
            }
        }
    }

    return (
        <Card style={{ height: "96px", padding: 0 }}
            bodyStyle={{ padding: '8px 8px 8px 12px' }} size='small'>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}>
                {icon}
                <Typography.Text className='secondary' style={{ marginLeft: '8px', fontSize: '16px' }}>
                    {title}
                </Typography.Text>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography.Text
                    style={{
                        fontSize: '28px', flex: 1,
                        whiteSpace: 'nowrap', flexShrink: 0,
                        textAlign: 'start', marginLeft: '48px',
                        fontVariantNumeric: 'tabular-nums'
                    }} strong>{isLoading ? (
                        <Skeleton.Button style={{ marginTop: '8px', width: '74px' }} />) : (totalCount)}</Typography.Text>
                <Area {...config} style={{ width: '50%' }} />
            </div>
        </Card>
    )
}

export default DashboardTotalCountCard