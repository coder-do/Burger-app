import React, { Component } from 'react';
import './Modal.sass';

import Hoc from '../../../hoc/hoc';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }
    
    render() {
        return (
            <Hoc>
                <Backdrop show={this.props.show} clicked={this.props.closedModal}/>
                <div className='Modal' style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'
                }}>
                    <span className='close' onClick={this.props.closedModal}>&times;</span>
                    {this.props.children}
                    <div className='btns'>
                        <button className='btn cancel' onClick={this.props.closedModal}>Cancel</button>
                        <button className='btn continue' onClick={this.props.continue}>Continue</button>
                    </div>
                </div>
            </Hoc>
        )
    }
}

export default Modal;