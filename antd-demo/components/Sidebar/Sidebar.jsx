import React from 'react';
import Link from 'next/link';
import { Menu, Switch } from 'antd';
import HomeIcon from '@mui/icons-material/Home'; // Replaces HomeOutlined
import PieChartIcon from '@mui/icons-material/PieChart'; // Replaces PieChartOutlined
import DesktopMacIcon from '@mui/icons-material/DesktopMac'; // Replaces DesktopOutlined
import StorefrontIcon from '@mui/icons-material/Storefront'; // Replaces ShopOutlined
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'; // Replaces MoneyCollectOutlined
import GroupIcon from '@mui/icons-material/Group'; // Replaces TeamOutlined

const { SubMenu } = Menu;

class SidebarMenu extends React.Component {
    handleSwitchChange = (checked) => {
        this.props.togglePosition();
    };

    render() {
        const { collapsed, isSidebarRight, isDarkMode } = this.props;
        const menuStyle = {
            width: collapsed ? 80 : 200,
            background: isDarkMode ? 'linear-gradient(60deg, #29323c 0%, #485563 100%)' : 'linear-gradient(60deg, #ffffff 0%, #f0f0f0 100%)',
            borderRight: "1px solid #E0E0E0",

            overflow: 'hidden'
        };
        const switchStyle = { marginLeft: '5px', marginBottom: '2px' };
        const iconColor = isDarkMode ? '#FFF' : '#333'; 

        return (
            <Menu style={menuStyle} defaultSelectedKeys={['1']} mode="inline" theme={isDarkMode ? 'dark' : 'light'}>
                <SubMenu key="sub1" icon={<HomeIcon style={{ color: iconColor }} />} title={!collapsed && 'Dashboard'}>
                    <Menu.Item key="5" icon={<PieChartIcon style={{ color: iconColor }} />}>Option 1</Menu.Item>
                    <Menu.Item key="6" icon={<DesktopMacIcon style={{ color: iconColor }} />}>Option 2</Menu.Item>
                </SubMenu>
        
                <SubMenu key="sub2" icon={<StorefrontIcon style={{ color: iconColor }} />} title={!collapsed && 'Marketplace'}>
                    <Menu.Item key="9">
                        <Link href="/services">
                            <a>Services</a>
                        </Link>
                    </Menu.Item>
                </SubMenu>
        
                <SubMenu key="sub3" icon={<AttachMoneyIcon style={{ color: iconColor }} />} title={!collapsed && 'Finance'}>
                    <Menu.Item key="7">Option 3</Menu.Item>
                    <Menu.Item key="8">Option 4</Menu.Item>
                </SubMenu>
        
                <Menu.Item key="4" icon={<GroupIcon style={{ color: iconColor }} />}>
                    {!collapsed && 'Team'}
                </Menu.Item>
        
                {/* Additional menu items */}
            </Menu>
        );
    }
}

export default SidebarMenu;
