import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {

    checkoutCanceledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.push('/checkout/form-data');
    }

    render() {
        let summary = <Redirect to="/"/>
        if(this.props.ings) {
            let redir = this.props.purchased ? <Redirect to='/'/> : null;
            summary = (
                <div>
                    {redir}
                    <CheckoutSummary 
                        ingredinents={this.props.ings}
                        checkoutCanceled={this.checkoutCanceledHandler}
                        checkoutContinued={this.checkoutContinuedHandler} />
                    <Route path={this.props.match.path + '/form-data'} exact component={ContactData} />
                </div>
            );
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredinents,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);
