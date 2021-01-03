import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavigationItem.sass';


const NavigationItem = (props) => {
    return (
        <li className='NavigationItem'>
            {props.name ? <NavLink to={props.link} style={{textAlign: 'center'}}>{props.children}</NavLink> : 
            <NavLink exact to={props.link}>{props.children}</NavLink>}
        </li>
    );
}

export default NavigationItem;