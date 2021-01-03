import React from 'react';
import BurgerControl from './BurgerControl/BurgerControl';

import './BurgerControls.sass';


const controls = [
    { label: 'Salad', type: 'Salad' },
    { label: 'Meat', type: 'Meat' },
    { label: 'Bacon', type: 'Bacon' },
    { label: 'Cheese', type: 'Cheese' }
];

const BurgerControls = (props) => {
    return (
        <div className='BurgerControls'>
            <p>Current price: <strong>{ props.price <= 0 ? 0 : props.price}  $</strong></p>
            {
                controls.map(ctrl => {
                    return <BurgerControl 
                        key={ctrl.label} 
                        label={ctrl.label} 
                        added={() => props.ingredinentAdded(ctrl.type)}
                        removed={() => props.ingredinentRemoved(ctrl.type)}
                        disabled={props.disabled[ctrl.type]}
                        />
                })
            }
            <button 
                className='OrderButton' 
                disabled={!props.purchasable}
                onClick={props.purchasing}>{props.isAuth ? 'Order now' : 'Sign up to order'}</button>
        </div>
    )
}

export default BurgerControls;