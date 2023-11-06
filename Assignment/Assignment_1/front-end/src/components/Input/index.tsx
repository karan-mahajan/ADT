import React, { useState } from 'react';
import { InputProps } from '../../utils/types';
import { EyeOff, EyeOn } from '..';
import './input.scss';

function Input({ label, type, placeholder, value, setValue, name, errors }: InputProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const showHideFunction = (): void => {
    setShowPassword(!showPassword);
  };
  const renderIcon = () => {
    if (showPassword && name === 'password') {
      return <EyeOn className="show-hide-password" onClick={showHideFunction} />;
    }
    if (!showPassword && name === 'password') {
      return <EyeOff className="show-hide-password" onClick={showHideFunction} />;
    }
    return '';
  };
  return (
    <label htmlFor={label}>
      {label}
      <input
        type={!showPassword ? type : 'text'}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={errors[name] ? 'error-state' : ''}
      />
      {renderIcon()}
    </label>
  );
}

Input.defaultProps = {
  type: 'text',
};

export default Input;
