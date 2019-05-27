import React from 'react';
import {Table, Button, Input} from 'antd';
import PropTypes from 'prop-types';

class Book extends React.Component {
    constructor(props){
        super(props)
    }

    componentWillMount() {
        this.props.getData(this.props.params.id);
    }

    render() {
        return ();
    }
}
