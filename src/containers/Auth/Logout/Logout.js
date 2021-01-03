import React, { Component } from 'react';
import { logOut } from '../../../store/action/auth';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Logout extends Component {
    componentDidMount() {
        this.props.onLogout();
    }

    render() {
        return <Redirect to='/'/>
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(logOut())
    }
}

export default connect(null, mapDispatchToProps)(Logout);