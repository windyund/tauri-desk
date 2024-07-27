import { Link } from 'react-router-dom';

const Tabs = () => {
    return (
        <div className="tabs">
            <ul>
                <li><Link to="/menu/tab1">导入</Link></li>
                <li><Link to="/menu/tab2">查看</Link></li>
            </ul>
        </div>
    );
};

export default Tabs;
