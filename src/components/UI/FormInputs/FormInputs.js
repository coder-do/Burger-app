import React from 'react';
import './FormInputs.sass';

const FormInputs = props => {
    let inputEl = null;
    const classes = ['InputElement'];
    if(props.invalid && props.shouldValidate && props.touched) {
        classes.push('Invalid');
    }

    switch(props.typee) {
        case ('input'):
            inputEl = <input required className={classes.join(' ')} onChange={props.changed} {...props.elemConfig} value={props.value}/>;
            break;
        case ('textarea'):
            inputEl = <textarea className={classes.join(' ')} onChange={props.changed} {...props.elemConfig} value={props.value}/>;
            break;
        case ('select'):
            inputEl = (<select 
                            className={classes.join(' ')}
                            value={props.value} onChange={props.changed}>
                            {props.elemConfig.options.map(item => (
                                <option key={item.value} value={item.value}>
                                    {item.displayValue}
                                </option>
                            ))}
                        </select>);
            break;
        default:
            inputEl = <input onChange={props.changed} className={classes.join(' ')} {...props.elemConfig} value={props.value}/>;
            break;
    }

    return (
        <div className='Input'>
            <label className='Label'>{props.label}</label>
            {inputEl}
        </div>
    )
}

export default FormInputs;