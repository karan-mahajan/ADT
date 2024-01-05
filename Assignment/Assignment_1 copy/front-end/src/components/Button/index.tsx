import React from 'react';
import { ButtonProps } from '../../utils/types';
import './button.scss';

function Button({
  value,
  type,
  variant,
  customClass,
  buttonClicked,
  beforeIcon,
  afterIcon,
}: ButtonProps) {
  let buttonType = '';
  if (variant === 'primary') {
    buttonType = 'btn-primary';
  } else if (variant === 'secondary') {
    buttonType = 'btn-secondary';
  }
  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      className={`btn ${buttonType} ${customClass}`}
      onClick={buttonClicked}
    >
      {beforeIcon}
      <span>{value}</span>
      {afterIcon}
    </button>
  );
}

Button.defaultProps = {
  type: 'button',
  customClass: '',
};

export default Button;
