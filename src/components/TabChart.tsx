import React, {useEffect} from "react";
import * as echarts from "echarts";

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
    chart: number;
}

const TabChart: React.FC<ChartComponentProps> = ({ title, lines, x_name, y_name,chart }) => {
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
                    nameGap: 40,
                    min: 'dataMin', // 设置X轴的最小值为数据的最小值
                    max: 'dataMax', // 设置X轴的最大值为数据的最大值
                    nameTextStyle: {
                        fontSize: 14
                    }

                },
                yAxis: {
                    type: 'value',
                    name: y_name,
                    nameGap: 20,
                },
                grid: {
                    left: '15%', // 调整左边距
                    right: '5%'
                },
                series: seriesList,
            };

            myChart.setOption(option);
        };
        /*if (chart <= 0) {
            lines = []
        }*/
        run();

        return () => {
            myChart.dispose();
        };
    }, [title, lines]);

    return <div id={title} style={{ width: '90%', height: '286px' }}></div>;
};
export default TabChart;