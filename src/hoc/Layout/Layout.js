import React, { Component } from 'react';
import Hoc from '../hoc';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/Sidedrawer/Sidedrawer';
import { connect } from 'react-redux';

import './Layout.sass';

class Layout extends Component {
    state = {
        showDrawer: false,
    }

    showDrawerHandler = () => {
        this.setState({showDrawer: false})
    }

    drawerClicked = () => {
        this.setState((prevState) => {
            return {showDrawer: !prevState.showDrawer}
        });
    }

    render() {
        return (
            <Hoc>
                <Toolbar
                    isAuth={this.props.isAuth} 
                    drawerClicked={this.drawerClicked}/>
                <SideDrawer isAuth={this.props.isAuth} open={this.state.showDrawer} closed={this.showDrawerHandler}/>
                <main className='layout'>
                    {this.props.children}
                </main>
            </Hoc>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token
    }
}

export default connect(mapStateToProps)(Layout);


