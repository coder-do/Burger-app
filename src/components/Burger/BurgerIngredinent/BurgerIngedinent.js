import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './BurgerIngredinent.sass';

export default class BurgerIngedinent extends Component {
    render() {
        let ingredinent = null;

        switch(this.props.type) {
            case('BreadBottom'):
                ingredinent = <div className='BreadBottom'></div>; break;
            case('BreadTop'):
                ingredinent = (
                    <div className='BreadTop'>
                        <div className='Seeds1'></div>
                        <div className='Seeds2'></div>
                    </div>
                ); break;
            case('Meat'):
                ingredinent = <div className='Meat'></div>; break;
            case('Cheese'):
                ingredinent = <div className='Cheese'></div>; break;
            case('Salad'):
                ingredinent = <div className='Salad'></div>; break;
            case('Bacon'):
                ingredinent = <div className='Bacon'></div>; break;
            default:
                ingredinent = null;
        }
        return ingredinent;
    }
}

BurgerIngedinent.propTypes = {
    type: PropTypes.string.isRequired
};
