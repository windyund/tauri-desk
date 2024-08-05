// 生成公式生成数据
const generateChartData1 = () => {
    const data = [];
    for (let x = 0; x <= 5000; x += 100) {
        // 使用公式生成 Y 值
        // const y = (12.21 * Math.pow(x, 3) - 59.95 * Math.pow(x, 2) + 88.45 * x + 343.05) / 10000;
        const term1 = 1.0288 * Math.pow(10, 10) * Math.exp(-2.5062 * Math.pow(10, -4) * x);
        const term2 = 1.0288 * Math.pow(10, 10) * Math.exp(-2.5080 * Math.pow(10, -4) * x);
        const y = (term1 - term2)/10000;
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
        // const y = (49699 * Math.pow(x, 3) - 157680 * Math.pow(x, 2) + 167840 * x + 390570) / 10000;
        let y =  1.1930 * Math.pow(x, 3) - 552.1503 * Math.pow(x, 2) + 8.4604 * Math.pow(10, 4) * x - 3.8297 * Math.pow(10, 6);
        y = y /10000;
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
        // const y = 2968.4 * Math.pow(x, 3) - 20085 * Math.pow(x, 2) + 33304 * x + 89408;
        let y =  55.0031 * Math.pow(10, 3) * Math.pow(x, 3) - 2.8659 * Math.pow(10, 4) * Math.pow(x, 2) + 4.6600 * Math.pow(10, 4) * x - 1.3662 * Math.pow(10, 5);
        y = y /10000;
        data.push({
            X: x,
            Y: y.toFixed(2) // 保留两位小数
        });
    }
    return data;
};

function netIncome(x) {
    return -2.9195 * Math.pow(x, 3) + 312.9279 * Math.pow(x, 2) + 7.7701 * Math.pow(10, 4) * x - 6.5784 * Math.pow(10, 6);
}

function cumulativeIncome(x) {
    return  -4.2544 * Math.pow(x, 3) + 907.9101 * Math.pow(x, 2) - 6.7611 * Math.pow(10, 3) * x - 3.2541 * Math.pow(10, 6);
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