import React from 'react';
import { ErrorMessageProps } from '../../utils/types';

function ErrorMessage({ text, icon }: ErrorMessageProps) {
  return (
    <p className="error-msg">
      {icon}
      {text}
    </p>
  );
}

ErrorMessage.defaultProps = {
  text: 'Somethings went wrong!!',
};

export default ErrorMessage;
