import React from 'react';
import './NavigationItems.sass';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) => {
    return (
        <ul className='NavigationItems'>
            <NavigationItem link='/'>Burger Builder</NavigationItem>
            {props.isAuth ? <NavigationItem link='/orders' name>Orders</NavigationItem> : null}
            {props.isAuth 
                ? <NavigationItem link='/logout'>Log out</NavigationItem>
                : <NavigationItem link='/authentication'>Authenticate</NavigationItem>}
        </ul>
    );
}

export default NavigationItems;