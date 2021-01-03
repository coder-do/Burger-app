import React from 'react';
import './Order.sass';

const order = props => {
    const ingredients = [];
    for(let ingrName in props.ingredients) {
        ingredients.push({
            name: ingrName,
            amount: props.ingredients[ingrName]
        })
    }

    const ingrOutput = ingredients.map(it => (
        <span key={it.name}
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '5px 4px',
                border: '1px solid #ccc',
                padding: '5px'
            }}>{it.name} ({it.amount})</span>
    ))
    return (
        <div className='Order'>
            <p><span className='orders'>Ingredients:</span> {ingrOutput}</p>
            <p>Total Price:  <strong>{props.price}</strong></p>
        </div>
    )
}

export default order