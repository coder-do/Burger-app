import React from 'react';
import './Drawtoggle.sass';


const Drawtoggle = props => (
    <div onClick={props.clicked} style={{cursor: 'pointer'}} className='DrawerToggle'>
        <div></div>
        <div></div>
        <div></div>    
    </div>
);

export default Drawtoggle;
