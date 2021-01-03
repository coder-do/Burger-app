import React from 'react';
import './Sidedrawer.sass';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Hoc from '../../../hoc/hoc';
import Backdrop from '../../UI/Backdrop/Backdrop';

const Sidedrawer = props => {
    let classes = ['SideDrawer', 'Close'];

    if(props.open) {
        classes = ['SideDrawer', 'Open']
    }
    return (
        <Hoc>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={classes.join(' ')} >
                <span className='closed' onClick={props.closed}>&times;</span>
                <Logo height='11%'/>
                <nav>
                    <div onClick={props.closed}>
                        <NavigationItems isAuth={props.isAuth} />
                    </div>
                </nav>
            </div>
        </Hoc>
    );
}

export default Sidedrawer;