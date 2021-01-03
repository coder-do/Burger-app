import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { BrowserRouter as Router, Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import { authCheckState } from './store/action/auth';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const lazyCheckout = asyncComponent(() => {
    return import('./containers/Checkout/Checkout');
});
const lazyOrder = asyncComponent(() => {
    return import('./containers/Orders/Orders');
});
const lazyAuth = asyncComponent(() => {
    return import('./containers/Auth/Auth');
});

class App extends Component {
    componentDidMount() {
        this.props.onAutoSignUp();
    }
    render() {
        let routes = (
                <Switch>
                    <Route path='/authentication' component={lazyAuth} />
                    <Route path='/' exact component={BurgerBuilder} />
                    <Redirect to='/'/>
                </Switch>
        );
        if(this.props.isAuth) {
            routes = (
                <Switch>
                    <Route path='/checkout' component={lazyCheckout} />
                    <Route path='/orders' component={lazyOrder} />
                    <Route path='/authentication' component={lazyAuth} />
                    <Route path='/logout' component={Logout} />
                    <Route path='/' exact component={BurgerBuilder} />
                    <Redirect to='/'/>
                </Switch>
            )
        }
        return (
            <Router>
                <Layout>
                    {routes}
                </Layout>
            </Router>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAutoSignUp: () => dispatch(authCheckState())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
