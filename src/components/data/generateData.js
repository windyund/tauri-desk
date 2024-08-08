// 生成公式生成数据
const generateChartData1 = () => {
    const data = [];
    for (let x = 0; x <= 10000; x += 500) {
        let y = -4.2903 * Math.pow(10, -8) *  Math.pow(x,3) - 0.0044 * Math.pow(x,2) + 70.8661 * x + 8.6288 * Math.pow(10,3);

        data.push({
            X: x,
            Y: y.toFixed(2) // 保留两位小数
        });
    }
    return data;
};

const generateChartData2 = () => {
    const data = [];
    for (let x = 75; x <= 160; x += 5) {
        let y =  1.1930 * Math.pow(x, 3) - 552.1503 * Math.pow(x, 2) + 8.4604 * Math.pow(10, 4) * x - 3.8297 * Math.pow(10, 6);
        data.push({
            X: x,
            Y: y.toFixed(2) // 保留两位小数
        });
    }
    return data;
};

const generateChartData3 = () => {
    const data = [];
    for (let x = 5; x <= 15; x += 0.5) {
        let y =  55.0031 * Math.pow(x, 3) - 2.8659 * Math.pow(10, 3) * Math.pow(x, 2) + 4.6600 * Math.pow(10, 4) * x - 1.3662 * Math.pow(10, 5);
        data.push({
            X: x,
            Y: y.toFixed(2) // 保留两位小数
        });
    }
    return data;
};

function netIncome(x) {
    return -7.1350 * Math.pow(x, 3) + 1.8978 *  Math.pow(10, 3) * Math.pow(x, 2) - 1.0849 * Math.pow(10, 5) * x +  4.3881 * Math.pow(10, 5);
}

function cumulativeIncome(x) {
    return  -7.1930 * Math.pow(x, 3) + 2.0833 *  Math.pow(10, 3) * Math.pow(x, 2) - 1.5869 * Math.pow(10, 5) * x + 3.1302 * Math.pow(10, 6);
}

const generateChartData4 = () => {
    const data = [];
    for (let x = 75; x <= 160; x += 5) {
        // 使用公式生成 Y 值
        const y1 = netIncome(x);
        const y2 = cumulativeIncome(x);
        data.push({
            X: x,
            Y1: y1.toFixed(2),
            Y2: y2.toFixed(2)
        });
    }
    return data;
};



// 生成示例数据
const exampleData = generateChartData3();

// 转换数据为 JSON 字符串
const jsonData = JSON.stringify(exampleData);
console.log(jsonData);