import React from 'react';
import './OrderSummary.sass'

const OrderSummary = props => {
    const order = Object.keys(props.ingredinents)
        .map((it, i) => {
            return (
                <li key={i}><span style={{textTransform: 'capitalize'}}>{it}</span> : {props.ingredinents[it]}</li>
            )
        })
    return (
        <div className='overlay'>
            <h3>Your order</h3>
            <p>Burger with folowing ingredinents</p>
            <ul>
                {order}
            </ul>
            <p><strong>Total Price: {props.price} $</strong></p>
            <p>Continue to checkout?</p>
        </div>
    )
}

export default OrderSummary;