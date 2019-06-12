import {Layout, Menu, Icon} from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import './framework.css';

const {Header, Content, Sider} = Layout;

const Framework = ({collapsed, onToggle, onClick, children}) => (
    <Layout style={{ minHeight: '100vh' }}>
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={onToggle}
        >
            <div className="logo"/>
            <div className="systemName">
                <span style={{color: "white", fontSize:18,}}>图书搜索系统</span>
            </div>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={onClick}>
                <Menu.Item key="1">
                    <Icon type="pie-chart"/>
                    <span>搜索</span>
                </Menu.Item>
                <Menu.Item key="2">
                    <Icon type="logout" />
                    <span>退出</span>
                </Menu.Item>
            </Menu>
        </Sider>
        <Layout>
            <Header style={{ background: '#fff', padding: 0, textAlign:"center", fontSize:24, fontWeight:"bold"}}>图书搜索系统</Header>
            <Content style={{ margin: '16px 16px' }}>
                {children}
            </Content>
        </Layout>
    </Layout>
);

Framework.propTypes = {
    onToggle: PropTypes.func.isRequired,
    collapsed: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Framework;
