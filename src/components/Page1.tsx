import React, { useEffect } from 'react';
import * as echarts from 'echarts';
import '../App.css';

interface DataPoint {
    X: number;
    Y: string;
}

interface LineData {
    name: string;         // 线条名称
    data: DataPoint[];    // 数据点
    color?: string;       // 线条颜色（可选）
}

interface ChartComponentProps {
    title: string;
    lines: LineData[];    // 多条线的数据
    x_name: string;
    y_name: string;
}

const Chart: React.FC<ChartComponentProps> = ({ title, lines, x_name, y_name }) => {
    useEffect(() => {
        const chartDom = document.getElementById(title);
        if (!chartDom) return;

        const myChart = echarts.init(chartDom);
        let option;

        const run = () => {
            const seriesList: echarts.SeriesOption[] = lines.map(line => ({
                type: 'line',
                name: line.name,
                data: line.data.map(item => ({
                    name: item.X.toString(),
                    value: [item.X, parseFloat(item.Y)]
                })),
                symbolSize: 1, // 点的大小
                itemStyle: {
                    color: line.color, // 线条颜色
                },
                lineStyle: {
                    width: 2, // 线条宽度
                },
            }));

            option = {
                animationDuration: 1000,
                tooltip: {
                    trigger: 'axis',
                    formatter: (params: any[]) => {
                        return params.map((param: any) => `${param.seriesName}: ${param.value[1]}`).join('<br/>');
                    }
                },
                legend: {
                    data: lines.map(line => line.name), // 自动生成图例
                },
                xAxis: {
                    type: 'value',
                    name: x_name,
                    nameLocation: 'middle', // X 轴名称位置
                    nameGap: 30,
                    interval: 1, // 强制显示所有刻度
                    min: 'dataMin',     // X 轴最小值
                },
                yAxis: {
                    type: 'value',
                    name: y_name,
                },
                grid: {
                    left: '15%', // 调整左边距
                    right: '5%'
                },
                series: seriesList,
            };

            myChart.setOption(option);
        };

        run();

        return () => {
            myChart.dispose();
        };
    }, [title, lines]);

    return <div id={title} style={{ width: '100%', height: '400px' }}></div>;
};

const Page1: React.FC = () => {
    const handleBack = () => {
        window.history.back(); // 浏览器的后退功能
    };

    const graph1Data = [
        {
            name: '预测一',
            data: [
                { X: 2024, Y: '75.96' },
                { X: 2025, Y: '80.79' },
                { X: 2026, Y: '91.32' },
                { X: 2027, Y: '98.77' },
                { X: 2028, Y: '106.67' },
                { X: 2029, Y: '113.25' },
                { X: 2030, Y: '122.89' },
                { X: 2031, Y: '129.04' },
                { X: 2032, Y: '136.49' },
                { X: 2033, Y: '142.63' },
                { X: 2034, Y: '149.21' },
                { X: 2035, Y: '156.67' },
                { X: 2036, Y: '161.49' },
                { X: 2037, Y: '167.63' },
                { X: 2038, Y: '173.77' },
                { X: 2039, Y: '178.60' },
            ],
            color: '#5470C6',
        },
        {
            name: '预测二',
            data: [
                { X: 2024, Y: '75.96' },
                { X: 2025, Y: '80.79' },
                { X: 2026, Y: '87.37' },
                { X: 2027, Y: '92.63' },
                { X: 2028, Y: '98.33' },
                { X: 2029, Y: '104.04' },
                { X: 2030, Y: '109.30' },
                { X: 2031, Y: '114.56' },
                { X: 2032, Y: '119.39' },
                { X: 2033, Y: '125.09' },
                { X: 2034, Y: '131.23' },
                { X: 2035, Y: '134.74' },
                { X: 2036, Y: '139.12' },
                { X: 2037, Y: '143.95' },
                { X: 2038, Y: '149.21' },
                { X: 2039, Y: '153.16' },
            ],
            color: '#91CC75',
        },
        {
            name: '预测三',
            data: [
                { X: 2024, Y: '75.96' },
                { X: 2025, Y: '80.79' },
                { X: 2026, Y: '82.98' },
                { X: 2027, Y: '86.93' },
                { X: 2028, Y: '90.88' },
                { X: 2029, Y: '93.95' },
                { X: 2030, Y: '97.46' },
                { X: 2031, Y: '100.96' },
                { X: 2032, Y: '105.35' },
                { X: 2033, Y: '108.86' },
                { X: 2034, Y: '112.81' },
                { X: 2035, Y: '114.56' },
                { X: 2036, Y: '118.51' },
                { X: 2037, Y: '120.26' },
                { X: 2038, Y: '124.21' },
                { X: 2039, Y: '128.16' },
            ],
            color: '#FAC858',
        },
    ];


    return (
        <div className="page1">
            <button className="back-button" onClick={handleBack}>返回</button>
            <h1>碳价预测</h1>
            <Chart
                title="碳价预测图"
                lines={graph1Data}
                x_name="时间(年)"
                y_name="碳价(元/吨)"
            />
        </div>
    );
};

export default Page1;
