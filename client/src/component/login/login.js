import React from 'react';
import PropTypes from 'prop-types';
import {Input, Button, Icon} from 'antd';
import './login.css';

const Login = ({nickname, password, onClick, onChange}) => (
    <div className="loginForm">
        <div className="center">
            图书搜索系统
        </div>
        <div className="black"/>
        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} value={nickname} onChange={e => onChange({key:'nickname', value: e.target.value})} placeholder="账号" />
        <div className="black"/>
        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} value={password} onChange={e => onChange({key:'password', value: e.target.value})} type="password" placeholder="密码"/>
        <div className="black"/>
        <Button type="primary" block onClick={() => {onClick(nickname, password, 1)}}>
                    登录
        </Button>
        <div className="black"/>
        <Button type="primary" block onClick={() => {onClick(nickname, password, 0)}}>
            注册
        </Button>
    </div>
);

Login.propTypes = {
    onClick: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    nickname: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
};

export default Login;
