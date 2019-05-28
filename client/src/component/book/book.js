import React from 'react';
import { Descriptions, Comment, List, Form, Input, Button, Rate } from 'antd';
import PropTypes from 'prop-types';
import './book.css'

const DescriptionsItem = Descriptions.Item;
const TextArea = Input.TextArea;

const CommentList = ({ comments }) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={props => <Comment {...props} />}
    />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <div>
        <Form.Item>
            <TextArea rows={3} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Add Comment
            </Button>
        </Form.Item>
    </div>
);

class Book extends React.Component {
    componentDidMount() {
        this.props.getData(this.props.params.id);
    }

    render() {
        const {comments, value, bookDetails, submitting, handleChange, handleSubmit} = this.props;
        return (
            <div>
                <Descriptions title="书籍详细信息">
                    <DescriptionsItem label="isbn">{bookDetails.isbn}</DescriptionsItem>
                    <DescriptionsItem label="author">{bookDetails.author}</DescriptionsItem>
                    <DescriptionsItem label="title">{bookDetails.title}</DescriptionsItem>
                    <DescriptionsItem label="year">{bookDetails.year}</DescriptionsItem>
                    <DescriptionsItem label="goodReads">{bookDetails.goodReads}</DescriptionsItem>
                </Descriptions>
                <Comment className="editor" author={localStorage.getItem('username')} content={
                    <Editor
                        onChange={e => handleChange(e.target.value)}
                        onSubmit={() => handleSubmit(5, this.props.params.id, value)}
                        submitting={submitting}
                        value={value}
                    />
                }/>
                {comments.length > 0 && <CommentList comments={comments} />}
            </div>
        );
    }
}

Book.protoType = {
    comments: PropTypes.shape({
        author: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        datetime: PropTypes.string.isRequired,
    }).isRequired,
    value: PropTypes.string.isRequired,
    bookDetails: PropTypes.shape({
        id: PropTypes.number.isRequired,
        isbn: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        year: PropTypes.string.isRequired,
        goodReads: PropTypes.number.isRequired,
    }).isRequired,
    submitting: PropTypes.bool.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    getData: PropTypes.func.isRequired,
};

export default Book;
