import React from 'react';
import { Menu, Switch, Dropdown,   } from 'antd';
import {
    ShopOutlined,
    HomeOutlined,
    MoneyCollectOutlined,
    TeamOutlined
} from '@ant-design/icons';

import type { MenuProps } from 'antd';

class SidebarMenu extends React.Component {
    handleSwitchChange = (checked) => {
        this.props.togglePosition();
    };


    getItem(label, key, icon, children, type) {
        return {
          key,
          icon,
          children,
          label,
          type,
        };
      }

render() {
    const { collapsed, isSidebarRight } = this.props;
    const menuStyle = { width: collapsed ? 80 : 200 };
    const switchStyle = { marginLeft: '5px', marginBottom: '2px' };

    
    return (
        <Menu style={menuStyle} defaultSelectedKeys={['1']} mode="vertical">
            {/* getItem('Dashboard' 'sub1', <HomeOutlined />, [
                getItem('Item 1', 'g1', null, [getItem('Option 1', '1'), getItem('Option 2', '2')], 'group'),
    getItem('Item 2', 'g2', null, [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group'),
            ])  */}

            <Menu.Item key="1" icon={<HomeOutlined />} children = {[
                <Menu.Item key ="5">Option 1</Menu.Item>,
                <Menu.Item key ="6">Option 1</Menu.Item>,
            ]}>
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
