import React from 'react';
import { Line } from '@ant-design/charts';

interface Tab2Props {
    uploadedData?: number[][]; // Use a 2D array for multiple line data
}



const Tab2: React.FC<Tab2Props> = ({ uploadedData }) => {
    // Default data if uploadedData is not provided or empty
    if (!uploadedData || uploadedData.length === 0) {
        uploadedData = [
            [65, 59, 80, 81, 56, 55, 40], // Data set 1
            [30, 40, 50, 60, 70, 80, 90], // Data set 2
            [50, 55, 60, 65, 70, 75, 80], // Data set 3
            [20, 30, 40, 50, 60, 70, 80], // Data set 4
        ];
    }

    // Prepare configuration for each line chart
    const chartConfigs = uploadedData.map((dataset, idx) => {
        // Convert data to chart format
        const data = dataset.map((value, index) => ({
            month: `Data Point ${index + 1}`,
            value: value,
            type: `Dataset ${idx + 1}`,
        }));

        // Chart configuration
        return {
            key: idx.toString(), // Unique key for React rendering
            data: data,
            xField: 'month',
            yField: 'value',
            seriesField: 'type',
            lineStyle: {
                lineJoin: 'round',
                lineCap: 'round',
            },
            yAxis: {
                label: {
                    formatter: (v: string) => `${v}个`,
                },
            },
        };
    });

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '20px' }}>
            {chartConfigs.map(config => (
                <div key={config.key} style={{ height: '300px' }}>
                    <Line {...config} />
                </div>
            ))}
        </div>
    );
};

export default Tab2;
