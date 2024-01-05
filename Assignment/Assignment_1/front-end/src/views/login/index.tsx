import React, { useState } from 'react';
import './login.scss';
import { useNavigate } from 'react-router-dom';
import authenticateUserCredentials from './services';
import {
  Button,
  Input,
  ErrorIcon,
  ErrorMessage,
  LoadingCircle,
} from '../../components';
import { errorMessage } from '../../utils/constants';
import { validateForm } from './serviceHelper';
import { FormErrors } from '../../utils/types';

function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userAuthenticateErrors, setUserAuthenticateErrors] = useState<string>('');
  const [loginFormErrors, setLoginFormErrors] = useState<FormErrors>({
    email: '',
    password: '',
  });
  const [openLoading, setOpenLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  // function to validate login credentials
  const loginValidation = async (e: any) => {
    try {
      e.preventDefault();
      setOpenLoading(true);
      setLoginFormErrors({
        email: '',
        password: '',
      });
      const errorCheck = validateForm(email, password);
      if (errorCheck.email || errorCheck.password) {
        setLoginFormErrors(errorCheck);
        setOpenLoading(false);
        return;
      }
      const response = await authenticateUserCredentials(email, password);
      localStorage.setItem('token', response);
      setLoginFormErrors({
        email: '',
        password: '',
      });
      setOpenLoading(false);
      localStorage.setItem('user', email);
      navigate('/article');
    } catch (error) {
      localStorage.clear();
      setUserAuthenticateErrors(errorMessage.UNAUTHORIZED_ERROR_MESSAGE);
      setOpenLoading(false);
    }
  };
  return (
    <div className="login-container">
      <h1>Login Here</h1>
      <form onSubmit={loginValidation}>
        <div className="form-field">
          <Input
            placeholder="Enter your email here.."
            label="Email Address"
            value={email}
            setValue={setEmail}
            name="email"
            errors={loginFormErrors}
          />
          {loginFormErrors?.email && (
            <ErrorMessage text={loginFormErrors.email} icon={<ErrorIcon />} />
          )}
        </div>
        <div className="form-field">
          <Input
            placeholder="Enter your password here.."
            label="Password"
            type="password"
            value={password}
            setValue={setPassword}
            name="password"
            errors={loginFormErrors}
          />
          {loginFormErrors?.password && (
            <ErrorMessage text={loginFormErrors.password} icon={<ErrorIcon />} />
          )}
        </div>
        {userAuthenticateErrors && (
          <ErrorMessage text={userAuthenticateErrors} icon={<ErrorIcon />} />
        )}
        <div className="forgot-password-block">
          <a href="/register">
            Register
          </a>
        </div>
        <Button type="submit" value="Sign In" variant="primary" />
      </form>
      <LoadingCircle openLoader={openLoading} className="login-loading-backdrop" />
    </div>
  );
}

export default Login;
