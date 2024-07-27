import Tabs from './Tabs';
import Tab1 from './Tab1';
import Tab2 from './Tab2';
import {Routes, Route, Navigate} from 'react-router-dom';
import "../App.css";
import {useState} from "react";

const MenuPage = () => {
    const [uploadedData, setUploadedData] = useState<any>(null);

    const handleUploadSuccess = (data: any) => {
        // 在这里处理上传成功后的逻辑
        // 例如：更新状态、获取处理后的数据等
        setUploadedData(data);
    };


    return (


        <div className="app">
            <div className="sidebar">
                <Tabs/>
            </div>
            <div className="main-content">
                <Routes>
                    {/*默认展示第一个选项卡*/}
                    <Route index element={<Navigate to="tab1"/>}/>
                    <Route path="/tab1" element={<Tab1 onUploadSuccess={handleUploadSuccess} />}/>
                    <Route path="/tab2" element={<Tab2 uploadedData={uploadedData} />}/>
                </Routes>
            </div>
        </div>
    );
};

export default MenuPage;
