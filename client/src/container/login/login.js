import Login from '../../component/login/login';
import {connect} from 'react-redux';
import {login, change, loginFail} from '../../action/login';
import {request} from "../../utils/request";
import {code, sha256} from "../../utils/utils";
import {browserHistory} from "react-router";
import {message} from "antd";

const mapStateToProps = state => {
    return {
        nickname: state.login.nickname,
        password: state.login.password,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onClick: (nickname, password, type) => {
            if (type === 1) {
                request('/user/login', 'post', {
                    nickname,
                    password: sha256(password)
                }).then((res) => {
                    if (res.data.code === code.SUCCESS) {
                        browserHistory.push('/admin/search');
                        localStorage.setItem('username', nickname);
                        dispatch(login())
                    } else {
                        message.error('密码或账号错误');
                        dispatch(loginFail())
                    }
                });
            } else {
                request('/user/signup', 'post', {
                    nickname,
                    password: sha256(password)
                }).then((res) => {
                    if (res.data.code === code.SUCCESS) {
                        message.info('注册成功')
                    } else {
                        message.error('密码或账号错误');
                    }
                });
            }
        },
        onChange: (operate) => {
            dispatch(change(operate));
        }
    }
};

const LoginPage = connect(mapStateToProps,mapDispatchToProps)(Login);

export default LoginPage;
