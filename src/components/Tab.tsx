import { useEffect,useState } from 'react';
import * as echarts from 'echarts';
import '../App.css';
import graph1Data from "./data/graph1.json";
import graph2Data from "./data/graph2.json";
import graph3Data from "./data/graph3.json";
import graph4Data from "./data/graph4.json";

interface DataPoint {
    X: number;
    Y: string;
}

interface ChartComponentProps {
    title: string;
    data: DataPoint[];
    x_name:string;
    y_name:string;
    color?: string;
}


interface ChartComponentProps1 {
    title: string;
    data: DataPoint1[];
}

interface DataPoint1 {
    X: number;
    Y1: string;
    Y2: string;
}
const Chart2: React.FC<ChartComponentProps1> = ({ title, data }) => {
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
                    nameGap: 25, // 向下偏移 25 像素
                    nameTextStyle: {
                        fontSize: 14
                    }
                },
                yAxis: [
                    {
                        type: 'value',
                        name: '收益(万元)',
                        position: 'left',
                    }
                ],
                grid: {
                    left: '20%', // 调整左边距
                    right: '2%'
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

        run(data);

        return () => {
            myChart.dispose();
        };
    }, [title, data]);

    return <div id={title} style={{ width: '100%', height: '324px' }}></div>;
};


const Chart: React.FC<ChartComponentProps> = ({ title, data,x_name, y_name,color }) => {
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
                    left: '20%', // 调整左边距
                    right: '2%'
                },
                series: seriesList,
            };

            myChart.setOption(option);
        };

        run(data);

        return () => {
            myChart.dispose();
        };
    }, [title, data]);

    return <div id={title} style={{ width: '100%', height: '324px' }}></div>;
};


const App = () => {
    const [oilPrice,setOilPrice] =useState("");
    const [gasPrice,setGasPrice] =useState("2100");
    const [param3,setParam3] =useState("99.1");
    const [param4,setParam4] =useState("96");
    const [param5,setParam5] =useState("8,836.81");
    const [param6,setParam6] =useState("21.94");
    const [param7,setParam7] =useState("21");
    const [param8,setParam8] =useState("350");
    const [param9,setParam9] =useState("120");
    const [param10,setParam10] =useState("500");
    const [param11,setParam11] =useState("100");
    const [param12,setParam12] =useState("");
    const [param13,setParam13] =useState("12");
    const [param14,setParam14] =useState("200");
    const [param15,setParam15] =useState("29");
    const [param16,setParam16] =useState("25");

    const [key, setKey] = useState(0);


    const renderCharts = () => {
        // 通过更新 key 强制重新渲染组件
        setKey(prevKey => prevKey + 1);
    };


    return (
        <div className="app">
            <h1 className="title">页岩油绿色开发与碳埋存效益分析系统</h1>
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
                        <label>改造井数(口): <input type="text" value={param9}
                                                    onChange={(e) => setParam9(e.target.value)}/></label>
                        <label>单位改造成本(万元/口): <input type="text" value={param10}
                                                             onChange={(e) => setParam10(e.target.value)}/></label>
                        <label>碳埋存补贴(元/吨): <input type="text" value={param11}
                                                         onChange={(e) => setParam11(e.target.value)}/></label>
                        <label>碳价(元/吨): <input type="text" value={param12}
                                                   onChange={(e) => setParam12(e.target.value)}/></label>
                        <label>项目折现率(%): <input type="text" value={param13}
                                                     onChange={(e) => setParam13(e.target.value)}/></label>
                        <label>运输距离(km): <input type="text" value={param14}
                                                    onChange={(e) => setParam14(e.target.value)}/></label>
                        <label>CO₂循环比例(%): <input type="text" value={param15}
                                                      onChange={(e) => setParam15(e.target.value)}/></label>
                        <label>综合税率(%): <input type="text" value={param16}
                                                   onChange={(e) => setParam16(e.target.value)}/></label>
                    </div>

                    <div className="buttons" >
                        {/*按钮靠右侧展示*/}

                        <button onClick={renderCharts} >计算</button>
                    </div>

                    <div className="param-inputs">
                        <h2>导入Excel：</h2>
                        <input type="file" id="file" name="file" accept=".xls,.xlsx"/>
                    </div>
                    <div className="buttons">
                        <button onClick={renderCharts}>计算</button>
                    </div>

                </div>
                <div className="charts-section">
                    <div className="chart">
                        <h3>成本曲线：</h3>
                        <Chart key={`graph1-${key}`} title="成本曲线" data={graph1Data} x_name="CO2埋存量(万吨)" y_name="总成本(万元)" color="#5470C6"/>
                    </div>
                    <div className="chart">
                        <h3>环境效益曲线：</h3>
                        <Chart  key={`graph2-${key}`} title="环境效益曲线" data={graph2Data} x_name="碳价格(元/吨)" y_name="环境效益(万元)" color="#91CC75"/>
                    </div>
                    <div className="chart">
                        <h3>社会效益曲线：</h3>
                        <Chart   key={`graph3-${key}`} title="社会效益曲线" data={graph3Data} x_name="增油量(万吨)" y_name="社会效益(万元)" color="#FAC858"/>
                    </div>

                    <div className="chart">
                        <h3>收益曲线：</h3>
                        <Chart2  key={`graph4-${key}`} title="收益曲线" data={graph4Data}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
