import { Outlet } from 'react-router-dom';

const TabContent = () => {
    return (
        <div className="tab-content">
            <Outlet />
        </div>
    );
};

export default TabContent;
