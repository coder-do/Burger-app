import React, { Component } from 'react';
import axios from '../../axios';
import Order from '../../components/Order/Order';
import { fetchOrders } from '../../store/action/order';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/spinner/spinner';
import Modal from '../../components/UI/Modal/Modal';
import Hoc from '../../hoc/hoc';
import './Orders.sass';
//import withError from '../../hoc/withError/withError';

class Orders extends Component {

    state = {
        error: this.props.error
    }

    componentDidMount() {
        this.req = axios.interceptors.request.use(res => {
            this.setState({error: null});
            return res;
        })
        this.res = axios.interceptors.response.use(req1 => req1, error => {
            this.setState({error: error.message});
        });
        this.props.onFetchOrder(this.props.token, this.props.userId);
    }

    componentWillUnmount() {
        axios.interceptors.request.eject(this.req);
        axios.interceptors.response.eject(this.res);
        this.setState = () => {
            return;
        };
    }

    closeHandler = () => {
        this.setState({error: null});
    }

    render() {
        let orders = <div className='orderSpinner'><Spinner /></div>;
        if(this.props.error) {
            orders = (
                <Hoc>
                    <Modal show={this.state.error}
                        closedModal={this.closeHandler}
                        continue={this.closeHandler}>
                            <span className='errorTxt' style={{marginBottom: '20px', display: 'block'}}>{this.state.error}</span>
                    </Modal>
                    <p style={{textAlign: 'center', fontSize: '20px'}}>You aren't authenticated</p>
                </Hoc>
            )
        }
        else {
            orders = (
                <div>
                    {this.props.orders.map(it => (
                        <Order key={it.id} ingredients={it.ingredinents} price={it.price} />
                    ))}
                </div>
            )
        }
        return orders;
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        error: state.order.error,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrder: (token, userId) => dispatch(fetchOrders(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders, axios);