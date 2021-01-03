import React from 'react';
import './BurgerControl.sass';

const BurgerControl = (props) => {
    return (
        <div className='BurgerControl'>
            <div className='Label'> {props.label} </div>
            <button disabled={props.disabled} className='Less' onClick={props.removed}>Less</button>
            <button className='More' onClick={props.added}>More</button>
        </div>
    )
}

export default BurgerControl;