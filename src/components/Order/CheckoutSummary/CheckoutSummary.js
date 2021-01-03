import React from 'react';
import Burger from '../../Burger/Burger';
import './CheckoutSummary.sass';

const CheckoutSummary = props => {
    return (
        <div className='CheckoutSummary'>
            <h1 style={{textAlign: 'center'}}>We hope it tastes well!</h1>
            <div style={{width: '300px', height: 'auto', margin: 'auto'}}>
                <Burger ingredinents={props.ingredinents} />
            </div>
            <div className='media'>
                <button className='btnss cancel' onClick={props.checkoutCanceled}>Cancel</button>
                <button className='btnss continue' onClick={props.checkoutContinued}>Continue</button>
            </div>
        </div>
    )
}

export default CheckoutSummary;
