import React, { Component } from 'react';
import Input from '../../components/UI/FormInputs/FormInputs';
import { auth } from '../../store/action/auth';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/spinner/spinner';
import { Redirect } from 'react-router-dom';
import { setAuthRedirect } from '../../store/action/auth';
import './Auth.sass';


class Auth extends Component {
    state = {
        controls: {
            email: {
                elemType: 'input',
                elemConfig: {
                    type: 'email',
                    placeholder: 'Your e-mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elemType: 'input',
                elemConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignUp: true
    }

    componentDidMount() {
        if(!this.props.build && this.props.path !== '/') {
            this.props.onSetRedirectPath();
        }
    }

    switchAuthHandler = () => {
        document.querySelector('.errorMsg').innerHTML = '';
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp,
                controls: {
                    email: {
                        elemType: 'input',
                        elemConfig: {
                            type: 'email',
                            placeholder: 'Your e-mail'
                        },
                        value: '',
                        validation: {
                            required: true,
                            isEmail: true
                        },
                        valid: false,
                        touched: false
                    },
                    password: {
                        elemType: 'input',
                        elemConfig: {
                            type: 'password',
                            placeholder: 'Password'
                        },
                        value: '',
                        validation: {
                            required: true,
                            minLength: 6
                        },
                        valid: false,
                        touched: false
                    }
                }
            }
        });
    }

    chechValidity(value, rules) {
        let isValid = true;
        
        if (!rules) {
            return true;
        }
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength
        }
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;
    }

    inputChanged = (e, inputId) => {
        const updatedForm = {...this.state.controls};
        const updatedEl = {
            ...updatedForm[inputId]
        };
        updatedEl.value = e.target.value;
        updatedEl.valid = this.chechValidity(updatedEl.value, updatedEl.validation);
        updatedEl.touched = true;
        updatedForm[inputId] = updatedEl;
        this.setState({controls: updatedForm});
    }

    submitHandler = (e) => {
        e.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    render() {
        const arr = [];
        for(let key in this.state.controls) {
            arr.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        let form = (arr.map(it => (
                        <Input key={it.id} typee={it.config.elemType} elemType={it.config.elemType} 
                            elemConfig={it.config.elemConfig} value={it.config.value}
                            invalid={!it.config.valid} shouldValidate={it.config.validation}
                            touched={it.config.touched}
                            changed={(e) => this.inputChanged(e, it.id)} />
                    )));
        if(this.props.loading) {
            form = <Spinner />
        };
        let errorMsg = <p className='errorMsg'></p>;

        if(this.props.error) {
            errorMsg = (
                <p className='errorMsg' style={{color: 'red'}}>{this.props.error.message}</p>
            );
        };
        
        let auth = null;
        if(this.props.isAuth) {
            auth = <Redirect to={this.props.path}/>
        }

        return (
            <div className='Auth'>
                {auth}
                <form onSubmit={this.submitHandler}>
                    <div style={{textAlign: 'center', fontWeight: 'bold', fontSize: '1.38em'}}>Authorization</div>
                    {errorMsg}
                    {form}
                <button className='success'>Sign {this.state.isSignUp ? 'up' : 'in'}</button>
                </form>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <p style={{textAlign: 'center'}}>{!this.state.isSignUp ? 'Don\'t have an account?' : 'Have an account?'} </p>
                    <button className='danger' onClick={this.switchAuthHandler}>Sign{this.state.isSignUp ? ' in' : ' up'}</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token,
        build: state.burgerBuilder.build,
        path: state.auth.path
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, method) => dispatch(auth(email, password, method)),
        onSetRedirectPath: () => dispatch(setAuthRedirect('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);