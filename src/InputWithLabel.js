import React from 'react';
import './InputWithLabel.css';

const InputWithLabel = ({ 
    givenValue,
    givenId,
    givenName,
    handleChange,
    // focusOnChange,
    children 
}) => {
    

    return (
        <div className='form__styling'>
            <label htmlFor={givenName} className="label__for__input">{children}</label>
            <input 
                // ref={inputRefTitle}
                id={givenId} 
                type="text" 
                name={givenName} 
                value={givenValue} 
                onChange={handleChange} 
                required={true}
                placeholder="type here..."
            /> 
        </div>
    )
}

export default InputWithLabel;
