import React, { Component } from 'react';
import Hoc from '../../hoc/hoc';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/spinner/spinner';
import {connect} from 'react-redux';
import { addIngredient, removeIngredient, fetchIngredients } from '../../store/action/burgerBuilder';
import { purchaseInit } from '../../store/action/order';
import { setAuthRedirect } from '../../store/action/auth';

import './BurgerBuilder.sass';


class BurgerBuilder extends Component {
    state = {
        purchasable: false,
        purchasing: false,
    }

    componentDidMount() {
        this.props.onInitIngredients(this.props.isAuth, this.props.purchased, this.props.build);
    }

    purchaseUpdate (ingredinents) {
        const sum = Object.keys(ingredinents)
            .map(el => {
                return ingredinents[el]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        if(this.props.isAuth) {
            this.setState({purchasing: true});
            this.props.onSetPath('/checkout');
        } else {
            this.props.history.push('/authentication')
        }
    }

    purchaseCloseHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinue = () => {
        this.props.history.push('/checkout');
    }

    render() {
        const disabledBtn = {
            ...this.props.ings
        }
        for(let key in disabledBtn) {
            disabledBtn[key] = disabledBtn[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.props.error ? 
        <p style={{textAlign: 'center', fontSize: '23px'}}><span>Error:</span> Ingredients can`t be loaded</p> : (
                                                                <div className='spinnner'>
                                                                    <Spinner />
                                                                </div>
                                                            );
        if(this.props.ings) {
            burger = (
                <Hoc>
                    <Burger ingredinents={this.props.ings}  />
                    <BurgerControls 
                        ingredinentAdded={this.props.onIngredinentsAdded}
                        ingredinentRemoved={this.props.onIngredinentsRemoved}
                        disabled={disabledBtn}
                        price={Number.parseFloat(this.props.total).toFixed(2)}
                        purchasing={this.purchaseHandler}
                        purchasable={this.purchaseUpdate(this.props.ings)}
                        isAuth={this.props.isAuth}
                    />
                </Hoc>
            );
            orderSummary = <OrderSummary ingredinents={this.props.ings} price={this.props.total}/>;
        }

        return (
            <Hoc>
                <Modal show={this.state.purchasing} 
                        closedModal={this.purchaseCloseHandler} 
                        continue={this.purchaseContinue}>
                        {orderSummary}
                </Modal>
                {burger}
            </Hoc>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredinents,
        total: Number.parseFloat(state.burgerBuilder.total).toFixed(2),
        error: state.burgerBuilder.error,
        isAuth: state.auth.token,
        purchased: state.order.purchased,
        build: state.burgerBuilder.build
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredinentsAdded: (ingName) => dispatch(addIngredient(ingName)),
        onIngredinentsRemoved: (ingName) => dispatch(removeIngredient(ingName)),
        onInitIngredients: (isAuth, purchased, build) => dispatch(fetchIngredients(isAuth, purchased, build)),
        onInitPurchase: () => dispatch(purchaseInit()),
        onSetPath: (path) => dispatch(setAuthRedirect(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
