import Book from '../../component/book/book';
import {connect} from 'react-redux';
import {setData, submit, change} from '../../action/book';
import {browserHistory} from "react-router";
import {request} from "../../utils/request";
import {code} from "../../utils/utils";
import {message} from "antd";

const mapStateToProps = state => {
    console.log(state.book);
    return {
        comments: state.book.comments,
        value: state.book.value,
        bookDetails: state.book.bookDetails,
        submitting: state.book.submitting,
    }
};

const refresh = function (id, dispatch) {
    request('/book/getDetail', 'post', {
        id
    }).then((res) => {
        if (parseInt(res.data.code) === code.LOGIN_ERROR) {
            browserHistory.push('/login');
        } else if (res.data.code === code.SUCCESS) {
            dispatch(setData(res.data.data));
        } else {
            message.error('网络错误请刷新！');
        }
    });
};

const mapDispatchToProps = dispatch => {
    return {
        handleChange: function (value) {
            dispatch(change(value))
        },
        getData: function (id) {
            request('/book/getDetail', 'post', {
                id
            }).then((res) => {
                if (parseInt(res.data.code) === code.LOGIN_ERROR) {
                    browserHistory.push('/login');
                } else if (res.data.code === code.SUCCESS) {
                    dispatch(setData(res.data.data));
                } else {
                    message.error('网络错误请刷新！');
                }
            });
        },
        handleSubmit: function (score, bookId, text)  {
            dispatch(submit());
            request('/book/comment', 'post', {
                score,
                bookId,
                text,
            }).then((res) => {
                if (parseInt(res.data.code) === code.LOGIN_ERROR) {
                    browserHistory.push('/login');
                    dispatch(submit());
                } else if (res.data.code === code.SUCCESS) {
                    dispatch(submit());
                    refresh(bookId, dispatch);
                } else {
                    message.error('网络错误请刷新！');
                    dispatch(submit());
                }
            });
        },

    }
};

const BookPage = connect(mapStateToProps, mapDispatchToProps)(Book);

export default BookPage;
