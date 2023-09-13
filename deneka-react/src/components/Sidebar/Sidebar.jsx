import React from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import './Sidebar.css';

import { ShopOutlined, HomeOutlined, MoneyCollectOutlined, TeamOutlined } from '@ant-design/icons';

class Sidebar extends React.Component {

    render() {
        const { collapsed } = this.props;

        return (
            <Container fluid className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
                
                <Row className="sidebar-item">
                    <Col xs={3}>
                    <HomeOutlined style={{ fontSize: '22px' }}/>
                    </Col>
                    {!collapsed && <Col xs={9} className="title">Dashboard</Col>}
                </Row>
                <Row className="sidebar-item">
                    <Col xs={3}>
                    <ShopOutlined style={{ fontSize: '22px' }}/>
                    </Col>
                    {!collapsed && <Col xs={9} className="title">Marketplace</Col>}
                </Row>
                <Row className="sidebar-item">
                    <Col xs={3}>
                    <MoneyCollectOutlined style={{ fontSize: '22px' }}/>
                    </Col>
                    {!collapsed && <Col xs={9} className="title">Finance</Col>}
                </Row>
                <Row className="sidebar-item">
                    <Col xs={3}>
                    <TeamOutlined style={{ fontSize: '22px' }}/>
                    </Col>
                    {!collapsed && <Col xs={9} className="title">Team</Col>}
                </Row>

                
            </Container>
        );
    }
}

export default Sidebar;
