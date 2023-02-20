import React from 'react';
import style from './InputWithLabel.module.css';
import PropTypes from 'prop-types';

const InputWithLabel = ({ 
    givenValue,
    givenId,
    givenName,
    handleChange,
    refTitleBox,
    isThisrequired,
    children 
}) => {
    
    return (
        <>
            <label htmlFor={givenName} className={style.labels}>{children}</label>
            <input 
                ref={refTitleBox}
                id={givenId} 
                type="text" 
                name={givenName} 
                value={givenValue} 
                onChange={handleChange} 
                required={isThisrequired}
                placeholder="type here..."
                className={style.inputs}
            /> 
        </>
    )
}

InputWithLabel.propTypes = {
    givenValue: PropTypes.string,
    givenId: PropTypes.string,
    givenName: PropTypes.string,
    handleChange: PropTypes.func,
    refTitleBox: PropTypes.object,
    children: PropTypes.string
  }

export default InputWithLabel;
