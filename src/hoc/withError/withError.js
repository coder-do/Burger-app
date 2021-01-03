import React, { Component } from 'react';

import Hoc from '../hoc';
import Modal from '../../components/UI/Modal/Modal';
import './withError.sass';

const withError = (WrappedComponent, axios) => {

    return class extends Component {
        state = {
            error: {}
        }
        componentWillMount() {
            this.req = axios.interceptors.request.use(res => {
                this.setState({error: null});
                return res;
            });
            this.res = axios.interceptors.response.use(req1 => req1, error => {
                this.setState({error: error});
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.req);
            axios.interceptors.response.eject(this.res);
            this.setState = () => {
                return;
            };
        }

        errorClose = () => {
            this.setState({error: null});
        }

        render() {
            return (
                <Hoc>
                    <Modal 
                        show={this.state.error}
                        closedModal={this.errorClose}
                        continue={this.errorClose}>
                        <span className='error' style={{display: 'block', marginBottom: '20px'}}>{this.state.error ? this.state.error.message : null}</span>
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Hoc>
            )
        }
    }
}

export default withError;