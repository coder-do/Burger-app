import React from 'react';
import './Toolbar.sass';
import NavigationItems from '../NavigationItems/NavigationItems';

import Logo from '../../Logo/Logo';
import Drawtoggle from '../Sidedrawer/Drawtoggle/Drawtoggle';

const Toolbar = props => {
    return (
        <header className='toolbar'>
            <Drawtoggle clicked={props.drawerClicked}/>
            <Logo height='80%'/>

            <nav className='desctop'>
                <NavigationItems isAuth={props.isAuth} />
            </nav>
        </header>
    )
}

export default Toolbar;