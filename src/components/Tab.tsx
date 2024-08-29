import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import TabChart from './TabChart';
import * as echarts from 'echarts';
import '../App.css';
import graph1Data from "./data/graph1.json";
import graph2Data from "./data/graph2.json";
import graph3Data from "./data/graph3.json";
import graph4Data from "./data/graph4.json";
import graph12Data from "./data/graph12.json";
import graph22Data from "./data/graph22.json";
import graph1 from "./data/graph_data1.json";
import graph2 from "./data/graph_data2.json";
import graph3 from "./data/graph_data3.json";


interface DataPoint {
    X: number;
    Y: string;
}

interface ChartComponentProps {
    title: string;
    data: DataPoint[];
    x_name: string;
    y_name: string;
    color?: string;
    chart: number;
}


interface ChartComponentProps1 {
    title: string;
    data: DataPoint1[];
    chart: number;
}

interface DataPoint1 {
    X: number;
    Y1: string;
    Y2: string;
}

const Chart2: React.FC<ChartComponentProps1> = ({title, data, chart}) => {
    useEffect(() => {
        const chartDom = document.getElementById(title);
        if (!chartDom) return;

        const myChart = echarts.init(chartDom);
        let option;

        const run = (_rawData: DataPoint1[]) => {

            option = {
                animationDuration: 1000,
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },
                legend: {
                    data: ['净收益', '累计净收益']
                },
                xAxis: {
                    type: 'value',
                    name: '碳交易价格(元/吨)',
                    nameLocation: 'middle',
                    nameGap: 40, // 向下偏移 25 像素
                    nameTextStyle: {
                        fontSize: 14
                    },
                    min: 'dataMin', // 设置X轴的最小值为数据的最小值
                    max: 'dataMax', // 设置X轴的最大值为数据的最大值
                },
                yAxis: [
                    {
                        type: 'value',
                        name: '收益(万元)',
                        position: 'left',
                    }
                ],
                grid: {
                    left: '15%', // 调整左边距
                    right: '5%'
                },
                series: [
                    {
                        name: '净收益',
                        type: 'line',
                        data: _rawData.map(item => [item.X, item.Y1]),
                        symbol: 'square',
                        symbolSize: 1,
                        itemStyle: {
                            color: '#000000', // 线条颜色
                        },
                        lineStyle: {
                            width: 2, // 线条宽度
                        },
                    },
                    {
                        name: '累计净收益',
                        type: 'line',
                        data: _rawData.map(item => [item.X, item.Y2]),
                        symbol: 'circle',
                        symbolSize: 1,
                        itemStyle: {
                            color: '#FF0000', // 线条颜色
                        },
                        lineStyle: {
                            width: 2, // 线条宽度
                        },
                    }
                ]
            };

            myChart.setOption(option);
        };
        console.log("number:", chart)
       /* if (chart <= 0) {
            data = []
        }*/
        run(data);

        return () => {
            myChart.dispose();
        };
    }, [title, data]);

    return <div id={title} style={{width: '80%', height: '286px'}}></div>;
};


const Chart: React.FC<ChartComponentProps> = ({title, data, x_name, y_name, color, chart}) => {
    useEffect(() => {
        const chartDom = document.getElementById(title);
        if (!chartDom) return;

        const myChart = echarts.init(chartDom);
        let option;


        const run = (_rawData: DataPoint[]) => {
            const seriesList: echarts.SeriesOption[] = [{
                type: 'line',
                data: _rawData.map(item => ({
                    name: item.X.toString(),
                    value: [item.X, parseFloat(item.Y)]
                })),
                symbolSize: 1, // 点的大小
                itemStyle: {
                    color: color, // 线条颜色
                },
                // showSymbol: false, // 是否显示点
                lineStyle: {
                    width: 2, // 线条宽度
                },
            }];
            if (x_name == 'CO2埋存量(吨)') {
                x_name = 'CO₂埋存量(吨)'
            }

            option = {
                animationDuration: 1000,
                tooltip: {
                    trigger: 'axis',
                    formatter: '{b0}: {c0}', // 提示框格式
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
        if (chart <= 0) {
            data = []
        }
        run(data);

        return () => {
           myChart.dispose();
        };
    }, [title, data]);

    return <div id={title} style={{width: '100%', height: '286px'}}></div>;
};


const App = () => {
    const [oilPrice, setOilPrice] = useState("75");
    const [gasPrice, setGasPrice] = useState("1600");
    const [param3, setParam3] = useState("99.1");
    const [param4, setParam4] = useState("96");
    const [param5, setParam5] = useState("16126");
    const [param6, setParam6] = useState("21.94");
    const [param7, setParam7] = useState("15");
    const [param8, setParam8] = useState("500");
    const [param11, setParam11] = useState("100");
    const [param12, setParam12] = useState("98");
    const [param14, setParam14] = useState("200");
    const [param15, setParam15] = useState("52");
    const [param16, setParam16] = useState("25");

    //分别控制每个曲线组件
    const [chart1, setChart1] = useState(0);
    const [chart2, setChart2] = useState(0);
    const [chart3, setChart3] = useState(0);
    const [chart4, setChart4] = useState(0);


    const getChart1Data = () => {
        // 根据param11的值决定使用哪个数据集
        return parseInt(param11) > 100 ? graph12Data : graph1Data;
    };

    const getChart2Data = () => {
        // 根据param11的值决定使用哪个数据集
        return parseInt(param12) > 100 ? graph22Data : graph2Data;
    };

    // 通过更新 key 强制重新渲染组件
    const renderCharts = (index: number) => {
        switch (index) {
            case 0:
                setChart1(prevState => prevState + 1);
                setChart2(prevState => prevState + 1);
                setChart3(prevState => prevState + 1);
                setChart4(prevState => prevState + 1);
                break;
            case 1:
                setChart1(prevState => prevState + 1);
                break;
            case 2:
                setChart2(prevState => prevState + 1);
                break;
            case 3:
                setChart3(prevState => prevState + 1);
                break;
            case 4:
                setChart4(prevState => prevState + 1);
                break;
            default:
                console.log("init")
        }
    };

    return (
        <div className="app">
            <h1 className="title">
                <div className="header-buttons">
                    <Link to="/page1">
                        <button>碳价预测</button>
                    </Link>
                    <Link to="/page2">
                        <button>内部收益率</button>
                    </Link>
                    <Link to="/page3">
                        <button>软件说明</button>
                    </Link>
                </div>
                页岩油绿色开发与碳埋存效益分析系统
            </h1>
            <div className="content-section">
                <div className="input-upload-section">
                    <h2>参数输入：</h2>
                    <div className="param-inputs">
                        <label>原油价格(美元/桶): <input type="text" value={oilPrice}
                                                         onChange={(e) => setOilPrice(e.target.value)}/> </label>
                        <label>天然气价格(元/千方): <input type="text" value={gasPrice}
                                                           onChange={(e) => setGasPrice(e.target.value)}/></label>
                        <label>原油商品率(%): <input type="text" value={param3}
                                                     onChange={(e) => setParam3(e.target.value)}/></label>
                        <label>天然气商品率(%): <input type="text" value={param4}
                                                       onChange={(e) => setParam4(e.target.value)}/></label>
                        <label>累计产油量(万吨): <input type="text" value={param5}
                                                        onChange={(e) => setParam5(e.target.value)}/></label>
                        <label>累计伴生气量(亿方): <input type="text" value={param6}
                                                          onChange={(e) => setParam6(e.target.value)}/></label>
                        <label>方案计算期(年): <input type="text" value={param7}
                                                      onChange={(e) => setParam7(e.target.value)}/></label>
                        <label>方案部署井口(口): <input type="text" value={param8}
                                                        onChange={(e) => setParam8(e.target.value)}/></label>
                        <label>碳埋存补贴(元/吨): <input type="text" value={param11}
                                                         onChange={(e) => setParam11(e.target.value)}/></label>
                        <label>碳价(元/吨): <input type="text" value={param12}
                                                   onChange={(e) => setParam12(e.target.value)}/></label>
                        <label>运输距离(km): <input type="text" value={param14}
                                                    onChange={(e) => setParam14(e.target.value)}/></label>
                        <label>CO₂循环比例(%): <input type="text" value={param15}
                                                      onChange={(e) => setParam15(e.target.value)}/></label>
                        <label>综合税率(%): <input type="text" value={param16}
                                                   onChange={(e) => setParam16(e.target.value)}/></label>
                    </div>

                    <div className="buttons">
                        <button onClick={() => renderCharts(0)}>计算</button>
                    </div>
                    <div className="param-inputs">
                        <h2>导入Excel：</h2>
                        <input type="file" id="file" name="file" accept=".xls,.xlsx" style={{width: '200px'}}/>
                    </div>
                    <div className="buttons">
                        <button onClick={() => renderCharts(0)}>优化对比</button>
                    </div>

                    <div className="buttons">
                        <button onClick={() => renderCharts(1)}>生成成本曲线</button>
                        <button onClick={() => renderCharts(2)}>生成环境效益</button>

                        <button onClick={() => renderCharts(3)}>生成社会效益</button>
                        <button onClick={() => renderCharts(4)}>生成收益曲线</button>
                    </div>

                </div>
                <div className="charts-section">
                    <div className="chart">
                        <h3>成本曲线：</h3>
                        {/*<Chart key={`graph1-${chart1}`} title="成本曲线" data={getChart1Data()} x_name="CO2埋存量(吨)"*/}
                        {/*       y_name="总成本(万元)" color="#5470C6" chart={chart1}/>*/}
                        <TabChart key={`graph1-${chart1}`} title="成本曲线" lines={graph1} x_name="CO2埋存量(吨)"
                                  y_name="总成本(万元)" chart={chart1}/>
                    </div>
                    <div className="chart">
                        <h3>环境效益曲线：</h3>
                        {/*<Chart key={`graph2-${chart2}`} title="环境效益曲线" data={getChart2Data()} x_name="碳价格(元/吨)"*/}
                        {/*       y_name="环境效益(万元)" color="#91CC75" chart={chart2}/>*/}
                        <TabChart key={`graph2-${chart2}`} title="环境效益曲线" lines={graph2} x_name="碳价格(元/吨)"
                                  y_name="环境效益(万元)" chart={chart2}/>
                    </div>
                    <div className="chart">
                        <h3>社会效益曲线：</h3>
                        {/*<Chart key={`graph3-${chart3}`} title="社会效益曲线" data={graph3Data} x_name="增油量(万吨)"*/}
                        {/*       y_name="社会效益(万元)" color="#FAC858" chart={chart3}/>*/}

                        <TabChart key={`graph3-${chart3}`} title="社会效益曲线" lines={graph3} x_name="增油量(万吨)"
                                  y_name="社会效益(万元)" chart={chart3}/>
                    </div>

                    <div className="chart">
                        <h3>收益曲线：</h3>
                        <Chart2 key={`graph4-${chart4}`} title="收益曲线" data={graph4Data} chart={chart4}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
