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
    params: any;
}

const TabChart: React.FC<ChartComponentProps> = ({title, lines, x_name, y_name, params}) => {
    let newLines = lines
    useEffect(() => {
        const chartDom = document.getElementById(title);
        if (!chartDom) return;

        const myChart = echarts.init(chartDom);
        let option;

        let paramsInt = parseInt(params)
        if ("碳价格(元/吨)" === x_name) {
            if (paramsInt >= 85 && paramsInt <= 155) {
                let diff = Math.floor((155 - 85) / 10)
                let index = Math.floor((parseInt(params) - 85) / 10)
                if (index < 0) {
                    index = 0
                }
                if (index >= diff) {
                    index = diff - 1
                }
                newLines = lines.slice(index, index + 1)
            }
        } else if ("CO2埋存量(吨)" === x_name) {
            if (paramsInt >= 100 && paramsInt <= 200) {
                let diff = Math.floor((200 - 100) / 20)
                let index = Math.floor((parseInt(params) - 100) / 20)
                if (index < 0) {
                    index = 0
                }
                if (index >= diff) {
                    index = diff - 1
                }
                newLines = lines.slice(index, index + 1)
            }
        } else if ("增油量(万吨)" === x_name) {
            if (paramsInt >= 3 && paramsInt <= 15) {
                let diff = Math.floor((15 - 3) / 2)
                let index = Math.floor((parseInt(params) - 3) / 2)
                if (index < 0) {
                    index = 0
                }
                if (index >= diff) {
                    index = diff - 1
                }
                newLines = lines.slice(index, index + 1)
            }
        }


        const run = () => {
            const seriesList: echarts.SeriesOption[] = newLines.map(line => ({
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
                    data: newLines.map(line => line.name), // 自动生成图例
                },
                // 如果min和max都为0，则设置为自动，否则设置为传入的值
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
    }, [title, newLines]);

    return <div id={title} style={{width: '100%', height: '286px'}}></div>;
};
export default TabChart;