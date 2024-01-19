import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Switch } from 'antd';
import { ShopOutlined, HomeOutlined, MoneyCollectOutlined, TeamOutlined, PieChartOutlined, DesktopOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { toggleSidebarPosition } from '../../redux/slices/uiSlice';

const { SubMenu } = Menu;

class SidebarMenu extends React.Component {
    handleSwitchChange = () => {
        // Dispatch Redux action
        this.props.toggleSidebarPosition();
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
                <SubMenu key="sub1" icon={<HomeOutlined style={{ color: iconColor }} />} title={!collapsed && 'Dashboard'}>
                    <Menu.Item key="5" icon={<PieChartOutlined style={{ color: iconColor }} />}>Option 1</Menu.Item>
                    <Menu.Item key="6" icon={<DesktopOutlined style={{ color: iconColor }} />}>Option 2</Menu.Item>
                </SubMenu>

                <SubMenu key="sub2" icon={<ShopOutlined style={{ color: iconColor }} />} title={!collapsed && 'Marketplace'}>
                    <Menu.Item key="9">
                        <Link to="/services">Services</Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" icon={<MoneyCollectOutlined style={{ color: iconColor }} />} title={!collapsed && 'Finance'}>
                    <Menu.Item key="7">Option 3</Menu.Item>
                    <Menu.Item key="8">Option 4</Menu.Item>
                </SubMenu>
                <Menu.Item key="4" icon={<TeamOutlined style={{ color: iconColor }} />}>
                    {!collapsed && 'Team'}
                </Menu.Item>
                {!collapsed && (
                    <Menu.Item key="togglePosition">
                        {'Sidebar Alignment'}
                        <Switch
                            size="small"
                            style={switchStyle}
                            checked={isSidebarRight}
                            onChange={this.handleSwitchChange}
                        />
                    </Menu.Item>
                )}
            </Menu>
        );
    }
}

const mapStateToProps = (state) => ({
    collapsed: state.ui.collapsed,
    isSidebarRight: state.ui.isSidebarRight,
    isDarkMode: state.ui.isDarkMode,
});

const mapDispatchToProps = {
    toggleSidebarPosition,
};

export default connect(mapStateToProps, mapDispatchToProps)(SidebarMenu);
