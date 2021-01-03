import React from 'react';
import './Logo.sass';

import logo from '../../assets/img/burger-logo.png';

const Logo = (props) => {
    return (
        <div className='logo' style = {{height: props.height}}>
            <img src={logo} alt='burger'/>
        </div>
    )
}

export default Logo;