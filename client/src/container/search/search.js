import {browserHistory} from "react-router";
import {connect} from 'react-redux';
import Search from '../../component/search/search';
import {change, tableUpdate} from "../../action/search";
import {message} from "antd";
import {request} from "../../utils/request";
import {code} from "../../utils/utils";

const mapStateToProps = state => {
    return {
        table: state.search.table,
        isbn: state.search.isbn,
        title: state.search.title,
        author: state.search.author,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onChange: (operate) => {
            dispatch(change(operate));
        },
        searchBooks: (isbn, title, author) => {
            request('/book/search', 'post', {
                page: 1,
                isbn,
                title,
                author
            }).then((res) => {
                if (parseInt(res.data.code) === code.LOGIN_ERROR) {
                    browserHistory.push('/login');
                } else if (res.data.code === code.SUCCESS) {
                    dispatch(tableUpdate(res.data.data, 1));
                } else {
                    message.error('网络错误请刷新！');
                }
            }).catch(() => {
                message.error('未知错误');
            })
        },
        pageNumberChange: (page, pageSize, isbn, title, author) => {
            request('/book/search', 'post', {
                page,
                isbn,
                title,
                author
            }).then((res) => {
                if (parseInt(res.data.code) === code.LOGIN_ERROR) {
                    browserHistory.push('/login');
                } else if (res.data.code === code.SUCCESS) {
                    dispatch(tableUpdate(res.data.data, page));
                } else {
                    message.error('网络错误请刷新！');
                }
            }).catch(() => {
                message.error('未知错误');
            })
        }
    }
};

const SearchPage = connect(mapStateToProps, mapDispatchToProps)(Search);

export default SearchPage;
