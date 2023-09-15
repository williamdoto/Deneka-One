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
        const { collapsed, isSidebarRight } = this.props;
        const menuStyle = { width: collapsed ? 80 : 200 };
        const switchStyle = { marginLeft: '5px', marginBottom: '2px' };

        return (
            <Menu style={menuStyle} defaultSelectedKeys={['1']} mode="vertical">
                <Menu.Item key="1" icon={<HomeOutlined />} >
                    {!collapsed && 'Dashboard'}
                </Menu.Item>
                <Menu.Item key="2" icon={<ShopOutlined />} >
                    {!collapsed && 'Marketplace'}
                </Menu.Item>
                <Menu.Item key="3" icon={<MoneyCollectOutlined />} >
                    {!collapsed && 'Finance'}
                </Menu.Item>
                <Menu.Item key="4" icon={<TeamOutlined />} >
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
