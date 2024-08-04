// 生成示例数据的函数
const generateChartData1 = () => {
    const data = [];
    for (let x = 0; x <= 30000; x += 2000) {
        // 使用公式生成 Y 值
        const y = (12.21 * Math.pow(x, 3) - 59.95 * Math.pow(x, 2) + 88.45 * x + 343.05) / 10000;
        data.push({
            X: x,
            Y: y.toFixed(2) // 保留两位小数
        });
    }
    return data;
};

const generateChartData2 = () => {
    const data = [];
    for (let x = 75; x <= 160; x += 2.5) {
        // 使用公式生成 Y 值
        const y = (49699 * Math.pow(x, 3) - 157680 * Math.pow(x, 2) + 167840 * x + 390570) / 10000;
        data.push({
            X: x,
            Y: y.toFixed(2) // 保留两位小数
        });
    }
    return data;
};

const generateChartData3 = () => {
    const data = [];
    for (let x = 3; x <= 15; x += 0.5) {
        // 使用公式生成 Y 值
        const y = 2968.4 * Math.pow(x, 3) - 20085 * Math.pow(x, 2) + 33304 * x + 89408;
        data.push({
            X: x,
            Y: y.toFixed(2) // 保留两位小数
        });
    }
    return data;
};

function netIncome(x) {
    const term1 = 2.5959e6 * Math.exp(-Math.pow((x - 150.0385) / 35.5451, 2));
    const term2 = 1.2848e6 * Math.exp(-Math.pow((x - 109.5184) / 20.5296, 2));
    return term1 + term2;
}

function cumulativeIncome(x) {
    return -1.7312 + 159.6481 * Math.pow(x, 2) + 65947 * x - 5.5695e6;
}

const generateChartData4 = () => {
    const data = [];
    for (let x = 75; x <= 160; x += 5) {
        // 使用公式生成 Y 值
        const y1 = netIncome(x)/10000;
        const y2 = cumulativeIncome(x)/10000;
        data.push({
            X: x,
            Y1: y1.toFixed(2),
            Y2: y2.toFixed(2)
        });
    }
    return data;
};


// 生成示例数据
const exampleData = generateChartData4();

// 转换数据为 JSON 字符串
const jsonData = JSON.stringify(exampleData);
console.log(jsonData);