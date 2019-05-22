import React from 'react';
import {Table, Button, Input} from 'antd';
import PropTypes from 'prop-types';
import {Link} from 'react-router'
import './search.css';

class Search extends React.Component{
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'id',
                dataIndex: 'id',
                key: 'id',
                render: (id) => (<Link onlyActiveOnIndex={true} to={`/admin/book/${id}`}>{id}</Link>)
            },
            {
                title: 'isbn',
                dataIndex: 'isbn',
                key: 'isbn',
            },
            {
                title: 'title',
                dataIndex: 'title',
                key: 'title'
            },
            {
                title: 'author',
                dataIndex: 'author',
                key: 'author',
            },
            {
                title:'year',
                dataIndex: 'year',
                key: 'year',
            }
        ];
    }

    render() {
        const {table, onChange, searchBooks, pageNumberChange, isbn, title, author} = this.props;
        return (
            <div>
                <div className="example-input">
                    <Input placeholder="isbn" value={isbn} onChange={e => onChange({key:'isbn', value: e.target.value})}/>
                    <Input placeholder="title" value={title} onChange={e => onChange({key:'title', value: e.target.value})}/>
                    <Input placeholder="author" value={author} onChange={e => onChange({key:'author', value: e.target.value})}/>
                    <Button onClick={() => {searchBooks(isbn, title, author)}} type="primary" style={{marginBottom: 5}}>搜索</Button>
                </div>
                <Table columns={this.columns} dataSource={table.data} pagination={{
                    defaultCurrent: 1,
                    current: this.props.table.currentPage,
                    pageSize: 10,
                    total: this.props.table.total,
                    onChange:  (page, pageSize) => {
                        pageNumberChange(page, pageSize, isbn, title, author);
                    }}} />
            </div>
        )
    }
}

Search.propTypes = {
    table: PropTypes.shape({
        data: PropTypes.array.isRequired,
        currentPage: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired,
    }).isRequired,
    isbn: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    searchBooks: PropTypes.func.isRequired,
    pageNumberChange: PropTypes.func.isRequired,
};

export default Search;
