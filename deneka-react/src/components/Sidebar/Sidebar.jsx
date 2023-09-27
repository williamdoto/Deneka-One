import React from 'react';
import { Menu, Switch } from 'antd';
import {
    ShopOutlined,
    HomeOutlined,
    MoneyCollectOutlined,
    TeamOutlined
} from '@ant-design/icons';

class SidebarMenu extends React.Component {
    handleSwitchChange = (checked) => {
        this.props.togglePosition();
    };

    render() {
        const { collapsed, isSidebarRight, isDarkMode } = this.props;
        const menuStyle = { 
            width: collapsed ? 80 : 200,
            backgroundColor: isDarkMode ? '#141414' : '#FFFFFF' // Conditional styling
        };
        const switchStyle = { marginLeft: '5px', marginBottom: '2px' };
        const iconColor = isDarkMode ? '#FFF' : '#333'; // Icon color based on theme

        return (
            <Menu style={menuStyle} defaultSelectedKeys={['1']} mode="vertical">
                <Menu.Item key="1" icon={<HomeOutlined style={{ color: iconColor }} />}>
                    {!collapsed && 'Dashboard'}
                </Menu.Item>
                <Menu.Item key="2" icon={<ShopOutlined style={{ color: iconColor }} />}>
                    {!collapsed && 'Marketplace'}
                </Menu.Item>
                <Menu.Item key="3" icon={<MoneyCollectOutlined style={{ color: iconColor }} />}>
                    {!collapsed && 'Finance'}
                </Menu.Item>
                <Menu.Item key="4" icon={<TeamOutlined style={{ color: iconColor }} />}>
                    {!collapsed && 'Team'}
                </Menu.Item>
                <Menu.Item key="togglePosition">
                    {!collapsed && 'Sidebar Alignment  '}
                    {!collapsed && (
                        <Switch
                            size="small"
                            style={switchStyle}
                            checked={isSidebarRight}
                            onChange={this.handleSwitchChange}
                        />
                    )}
                </Menu.Item>
            </Menu>
        );
    }
}

export default SidebarMenu;
