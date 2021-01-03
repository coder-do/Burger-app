import React, { Component } from 'react';
import Spinner from '../../../components/UI/spinner/spinner';
import Input from '../../../components/UI/FormInputs/FormInputs';
import { connect } from 'react-redux';
import { purchaseBurger } from '../../../store/action/order';
import './ContactData.sass';

class ContactData extends Component {
    state = {
        formData: {
            name: {
                elemType: 'input',
                elemConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 3,
                },
                valid: false,
                touched: false
            },
            street: {
                elemType: 'input',
                elemConfig: {
                    type: 'text',
                    placeholder: 'Your street'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 3,
                },
                valid: false,
                touched: false
            },
            country: {
                elemType: 'input',
                elemConfig: {
                    type: 'text',
                    placeholder: 'Your country'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 3,
                },
                valid: false,
                touched: false
            },
            email: {
                elemType: 'input',
                elemConfig: {
                    type: 'email',
                    placeholder: 'Your Mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elemType: 'select',
                elemConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                ]
                },
                validation: {},
                valid: true,
                value: 'Fastest',
            },
        }
    };

    clicked = (e) => {
        e.preventDefault();
        const data = {};
        for (let id in this.state.formData) {
            data[id] = this.state.formData[id].value;
        }
        const price = Number.parseFloat(this.props.total).toFixed(2) + ' $';
        delete this.props.ings['price'];
        const order = {
            price: price,
            ingredinents: {
                ...this.props.ings
            },
            customer: data,
            userId: this.props.userId
        }
        this.props.onClickHandler(order, this.props.token);
    }

    inputChanged = (e, inputId) => {
        const updatedForm = {...this.state.formData};
        const updatedEl = {
            ...updatedForm[inputId]
        };
        updatedEl.value = e.target.value;
        updatedEl.valid = this.chechValidity(updatedEl.value, updatedEl.validation);
        updatedEl.touched = true;
        updatedForm[inputId] = updatedEl;
        this.setState({formData: updatedForm});
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
            isValid = !(value.length >= rules.minLength)
        }
        if (rules.maxLength) {
            isValid = !(value.length <= rules.maxLength)
        }
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }
        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;
    }

    render() {
        const arr = [];
        for(let key in this.state.formData) {
            arr.push({
                id: key,
                config: this.state.formData[key]
            })
        }
        let form = (
            <form onSubmit={this.clicked}>
                {arr.map(it => (
                    <Input key={it.id} typee={it.config.elemType} elemType={it.config.elemType} 
                        elemConfig={it.config.elemConfig} value={it.config.value}
                        invalid={!it.config.valid} shouldValidate={it.config.validation}
                        touched={it.config.touched}
                        changed={(e) => this.inputChanged(e, it.id)} />
                ))}
                <div>
                    <button className='btnss continuee'>ORDER</button>
                </div>
            </form>
        );
        if(this.props.loading) {
            return (
                <div className='ContactData'>
                    <Spinner />
                </div>
            )
        }
        return (
            <div className='ContactData'>
                <h3>Enter your contact data:</h3>
                {form}
            </div>
        )
    } 
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredinents,
        total: Number.parseFloat(state.burgerBuilder.total).toFixed(2),
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onClickHandler: (data, token) => dispatch(purchaseBurger(data, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);
