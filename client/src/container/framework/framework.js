import Framework from '../../component/framework/framework';
import {connect} from 'react-redux';
import {toggle} from '../../action/framework';
import {browserHistory} from "react-router";

const mapStateToProps = state => {
    return {
        collapsed: state.framework.collapsed,
    }

};

const mapDispatchToProps = dispatch => {
    return {
        onToggle: () => {
            dispatch(toggle());
        },
        onClick: (o) => {
            browserHistory.push('/framework/search');
        }
    }
};

const FrameworkPage = connect(mapStateToProps, mapDispatchToProps)(Framework);

export default FrameworkPage;
