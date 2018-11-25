import React from 'react';

const Button = ({onClick, text, disabled}) => {
  return (
    <button type="button" onClick={onClick} disabled={disabled}>{text}</button>
  );
};

export default Button;
