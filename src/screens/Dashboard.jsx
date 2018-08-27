import React from 'react';
import CustomNavBar from 'components/CustomNavBar';

const Dashboard = ({ children }) => {
    return (
        <div className="dashboardPage">
            <CustomNavBar />
            <div className="dashboardContent">
                {children}
            </div>
        </div>
    );
}

export default Dashboard