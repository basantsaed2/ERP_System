import React, { useCallback, useEffect, useState } from 'react';
import { DashboardIcon, EmployessIcon, SettingIcon, TeamsIcon } from '../assets/Icons/AllIcons';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const MeanSide = ({ closeSidebar }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const pathName = location.pathname;

    // Load state from localStorage, defaulting to true if not found
    const [isActiveDashboard, setIsActiveDashboard] = useState(() => {
        const savedState = localStorage.getItem('isActiveDashboard');
        return savedState !== null ? JSON.parse(savedState) : true;
    });
    const [isActiveDashboardIcon, setIsActiveDashboardIcon] = useState(() => {
        const savedState = localStorage.getItem('isActiveDashboardIcon');
        return savedState !== null ? JSON.parse(savedState) : true;
    });
    // Other state for Teams, Employees, and Settings
    const [isActiveTeams, setIsActiveTeams] = useState(() => {
        const savedState = localStorage.getItem('isActiveTeams');
        return savedState !== null ? JSON.parse(savedState) : true;
    });
    const [isActiveTeamsIcon, setIsActiveTeamsIcon] = useState(() => {
        const savedState = localStorage.getItem('isActiveTeamsIcon');
        return savedState !== null ? JSON.parse(savedState) : true;
    });
    const [isActiveEmployees, setIsActiveEmployees] = useState(() => {
        const savedState = localStorage.getItem('isActiveEmployees');
        return savedState !== null ? JSON.parse(savedState) : true;
    });
    const [isActiveEmployeesIcon, setIsActiveEmployeesIcon] = useState(() => {
        const savedState = localStorage.getItem('isActiveEmployeesIcon');
        return savedState !== null ? JSON.parse(savedState) : true;
    });
    const [isActiveSetting, setIsActiveSetting] = useState(() => {
        const savedState = localStorage.getItem('isActiveSetting');
        return savedState !== null ? JSON.parse(savedState) : true;
    });
    const [isActiveSettingIcon, setIsActiveSettingIcon] = useState(() => {
        const savedState = localStorage.getItem('isActiveSettingIcon');
        return savedState !== null ? JSON.parse(savedState) : true;
    });

    // Save to localStorage when any state changes
    useEffect(() => {
        localStorage.setItem('isActiveDashboard', JSON.stringify(isActiveDashboard));
        localStorage.setItem('isActiveDashboardIcon', JSON.stringify(isActiveDashboardIcon));
        localStorage.setItem('isActiveTeams', JSON.stringify(isActiveTeams));
        localStorage.setItem('isActiveTeamsIcon', JSON.stringify(isActiveTeamsIcon));
        localStorage.setItem('isActiveEmployees', JSON.stringify(isActiveEmployees));
        localStorage.setItem('isActiveEmployeesIcon', JSON.stringify(isActiveEmployeesIcon));
        localStorage.setItem('isActiveSetting', JSON.stringify(isActiveSetting));
        localStorage.setItem('isActiveSettingIcon', JSON.stringify(isActiveSettingIcon));
    }, [
        isActiveDashboard,
        isActiveDashboardIcon,
        isActiveTeams,
        isActiveTeamsIcon,
        isActiveEmployees,
        isActiveEmployeesIcon,
        isActiveSetting,
        isActiveSettingIcon
    ]);

    // Handler functions to manage all state
    const handleStateLinks = () => {
        setIsActiveDashboard(false);
        setIsActiveDashboardIcon(false);
        setIsActiveTeams(false);
        setIsActiveTeamsIcon(false);
        setIsActiveEmployees(false);
        setIsActiveEmployeesIcon(false);
        setIsActiveSetting(false);
        setIsActiveSettingIcon(false);
    };

    // Handler functions to manage navigation state
    const handleClickDashboard = useCallback(() => {
        handleStateLinks();
        setIsActiveDashboard(true);
        setIsActiveDashboardIcon(true);
        closeSidebar(); // Close the sidebar on click
    }, [closeSidebar]);

    useEffect(() => {
        const part = pathName.split('/');
        const result = part.slice(0, 2).join('/');
        if (result === "/") {
            handleClickDashboard();
        }
    }, [location]);

    const handleClickTeams = useCallback(() => {
        handleStateLinks();
        setIsActiveTeams(true);
        setIsActiveTeamsIcon(true);
        closeSidebar(); // Close the sidebar on click
    }, [closeSidebar]);

    useEffect(() => {
        const part = pathName.split('/');
        const result = part.slice(0, 2).join('/');
        if (result === "/teams") {
            handleClickTeams();
        }
    }, [location]);

    const handleClickEmployees = useCallback(() => {
        handleStateLinks();
        setIsActiveEmployees(true);
        setIsActiveEmployeesIcon(true);
        closeSidebar(); // Close the sidebar on click
    }, [closeSidebar]);

    useEffect(() => {
        const part = pathName.split('/');
        const result = part.slice(0, 2).join('/');
        if (result === "/employees") {
            handleClickEmployees();
        }
    }, [location]);

    const handleClickSetting = useCallback(() => {
        handleStateLinks();
        setIsActiveSetting(true);
        setIsActiveSettingIcon(true);
        closeSidebar(); // Close the sidebar on click
    }, [closeSidebar]);

    useEffect(() => {
        const part = pathName.split('/');
        const result = part.slice(0, 2).join('/');
        if (result === "/setting") {
            handleClickSetting();
        }
    }, [location]);

    return (
        <div className="LinksSidebar w-full flex flex-col items-center justify-start gap-y-6 h-full p-2">
            {/* Dashboard Link */}
            <Link
                to="/"
                onMouseMove={() => setIsActiveDashboardIcon(true)}
                onMouseOut={() => setIsActiveDashboardIcon(false)}
                onClick={handleClickDashboard}
                className={`${isActiveDashboard ? 'active' : ''} hover:rounded-xl pl-2 pr-1 hover:py-2 hover:bg-white hover:text-mainColor w-full flex items-center transition-all duration-300 group`}
            >
                <div className="flex items-center gap-x-2">
                    <DashboardIcon isActive={isActiveDashboardIcon || isActiveDashboard} />
                    <span className={`${isActiveDashboard ? 'text-mainColor' : 'text-white'} text-base font-TextFontRegular transition-all duration-300 group-hover:text-mainColor`}>
                        Dashboard
                    </span>
                </div>
            </Link>

            {/* Teams Link */}
            <Link
                to="/teams"
                onMouseMove={() => setIsActiveTeamsIcon(true)}
                onMouseOut={() => setIsActiveTeamsIcon(false)}
                onClick={handleClickTeams}
                className={`${isActiveTeams ? 'active' : ''} hover:rounded-xl pl-2 pr-1 hover:py-2 hover:bg-white hover:text-mainColor w-full flex items-center transition-all duration-300 group`}
            >
                <div className="flex items-center gap-x-2">
                    <TeamsIcon isActive={isActiveTeamsIcon || isActiveTeams} />
                    <span className={`${isActiveTeams ? 'text-mainColor' : 'text-white'} text-base font-TextFontRegular transition-all duration-300 group-hover:text-mainColor`}>
                        Teams
                    </span>
                </div>
            </Link>

            {/* Employees Link */}
            <Link
                to="/employees"
                onMouseMove={() => setIsActiveEmployeesIcon(true)}
                onMouseOut={() => setIsActiveEmployeesIcon(false)}
                onClick={handleClickEmployees}
                className={`${isActiveEmployees ? 'active' : ''} hover:rounded-xl pl-2 pr-1 hover:py-2 hover:bg-white hover:text-mainColor w-full flex items-center transition-all duration-300 group`}
            >
                <div className="flex items-center gap-x-2">
                    <EmployessIcon isActive={isActiveEmployeesIcon || isActiveEmployees} />
                    <span className={`${isActiveEmployees ? 'text-mainColor' : 'text-white'} text-base font-TextFontRegular transition-all duration-300 group-hover:text-mainColor`}>
                        Employees
                    </span>
                </div>
            </Link>

            {/* Settings Link */}
            <Link
                to="/settings"
                onMouseMove={() => setIsActiveSettingIcon(true)}
                onMouseOut={() => setIsActiveSettingIcon(false)}
                onClick={handleClickSetting}
                className={`${isActiveSetting ? 'active' : ''} hover:rounded-xl pl-2 pr-1 hover:py-2 hover:bg-white hover:text-mainColor w-full flex items-center transition-all duration-300 group`}
            >
                <div className="flex items-center gap-x-2">
                    <SettingIcon isActive={isActiveSettingIcon || isActiveSetting} />
                    <span className={`${isActiveSetting ? 'text-mainColor' : 'text-white'} text-base font-TextFontRegular transition-all duration-300 group-hover:text-mainColor`}>
                        Settings
                    </span>
                </div>
            </Link>
        </div>
    );
};

export default MeanSide;

