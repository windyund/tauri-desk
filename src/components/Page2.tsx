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
                markLine: {
                    data: [
                        {
                            xAxis: 130, // 设置竖线所在的 X 轴位置，例如 130
                            lineStyle: {
                                type: 'dashed', // 线条类型为虚线
                                color: '#050505', // 线条颜色
                                width: 1 // 线条宽度
                            },
                        }
                    ]
                }
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
            "name": "注高温复合流体",
            "data": [
                { "X": 80, "Y": "5.93" },
                { "X": 90, "Y": "7.26" },
                { "X": 100, "Y": "8.58" },
                { "X": 110, "Y": "9.9" },
                { "X": 120, "Y": "11.22" },
                { "X": 130, "Y": "11.84" },
                { "X": 140, "Y": "10.46" },
                { "X": 150, "Y": "9.08" },
                { "X": 160, "Y": "8.69" }
            ],
            "color": "#5470C6"
        },
        {
            "name": "常规注CO2",
            "data": [
                { "X": 80, "Y": "4.79" },
                { "X": 90, "Y": "6.12" },
                { "X": 100, "Y": "7.46" },
                { "X": 110, "Y": "8.8" },
                { "X": 120, "Y": "10.13" },
                { "X": 130, "Y": "10.78" },
                { "X": 140, "Y": "9.42" },
                { "X": 150, "Y": "8.06" },
                { "X": 160, "Y": "7.88" }
            ],
            "color": "#91CC75"
        }
    ]

    const graph2Data = [
        {
            "name": "注高温复合流体",
            "data": [
                { "X": 0, "Y": "8.16" },
                { "X": 33, "Y": "9.8" },
                { "X": 66, "Y": "11.42" },
                { "X": 100, "Y": "14.04" },
                { "X": 130, "Y": "15.28" },
                { "X": 165, "Y": "13.03" },
                { "X": 198, "Y": "13.13" }
            ],
            "color": "#5470C6"
        },
        {
            "name": "常规注CO2",
            "data": [
                { "X": 0, "Y": "7.12" },
                { "X": 33, "Y": "8.76" },
                { "X": 66, "Y": "10.38" },
                { "X": 100, "Y": "13.01" },
                { "X": 130, "Y": "14.24" },
                { "X": 165, "Y": "11.77" },
                { "X": 198, "Y": "11.76" }
            ],
            "color": "#983030"
        }
    ];
    return (
        <div className="page1">
            <button className="back-button" onClick={handleBack}>返回</button>
            <h1>内部收益率</h1>
            <Chart
                title="碳排放权交易价格"
                lines={graph1Data}
                x_name="碳排放权交易价格(元/吨)"
                y_name="百分比"
            />
            <Chart
                title="碳封存补贴价格"
                lines={graph2Data}
                x_name="碳封存补贴价格(元/吨)"
                y_name="百分比"
            />
        </div>
    );
};

export default Page1;
