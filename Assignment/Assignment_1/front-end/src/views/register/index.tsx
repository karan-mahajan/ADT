import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import registerUser from './services';
import {
  Button,
  Input,
  ErrorIcon,
  ErrorMessage,
  LoadingCircle,
  Datepicker,
} from '../../components';
import { validateFormRegister } from './serviceHelper';

function Register() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobile, setMobile] = useState<number>(0);
  const [dob, setDob] = useState<Date>(new Date());
  const [userAuthenticateErrors, setUserAuthenticateErrors] = useState<string>('');
  const [loginFormErrors, setLoginFormErrors] = useState<any>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    confirmPassword: '',
    dob: ''
  });
  const [openLoading, setOpenLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  // function to validate login credentials
  const registerValidation = async (e: any) => {
    try {
      e.preventDefault();
      setOpenLoading(true);
      setLoginFormErrors({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        confirmPassword: '',
        dob: ''
      });
      const errorCheck = validateFormRegister(email, password, firstName, lastName, confirmPassword, mobile);
      if (errorCheck.email || errorCheck.password || errorCheck.firstName || errorCheck.lastName || errorCheck.confirmPassword || errorCheck.mobile) {
        setLoginFormErrors(errorCheck);
        setOpenLoading(false);
        return;
      }
      const response = await registerUser(email, password, confirmPassword, firstName, lastName, mobile, dob);
      console.log("Response ", response);
      setLoginFormErrors({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        confirmPassword: '',
        dob: ''
      });
      setOpenLoading(false);
      navigate('/');
    } catch (error: any) {
      localStorage.clear();
      setUserAuthenticateErrors("Unable to register the user");
      setOpenLoading(false);
    }
  };
  return (
    <div className="login-container">
      <h1>Register Here</h1>
      <form onSubmit={registerValidation}>
        <div className="form-field">
          <Input
            placeholder="Enter your first name here.."
            label="First Name"
            value={firstName}
            setValue={setFirstName}
            name="email"
            errors={loginFormErrors}
          />
          {loginFormErrors?.firstName && (
            <ErrorMessage text={loginFormErrors.firstName} icon={<ErrorIcon />} />
          )}
        </div>
        <div className="form-field">
          <Input
            placeholder="Enter your last name here.."
            label="Last Name"
            value={lastName}
            setValue={setLastName}
            name="email"
            errors={loginFormErrors}
          />
          {loginFormErrors?.email && (
            <ErrorMessage text={loginFormErrors.lastName} icon={<ErrorIcon />} />
          )}
        </div>
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
            type='password'
            value={password}
            setValue={setPassword}
            name="password"
            errors={loginFormErrors}
          />
          {loginFormErrors?.email && (
            <ErrorMessage text={loginFormErrors.password} icon={<ErrorIcon />} />
          )}
        </div>
        <div className="form-field">
          <Input
            placeholder="Enter your password again .."
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            setValue={setConfirmPassword}
            name="password"
            errors={loginFormErrors}
          />
          {loginFormErrors?.confirmPassword && (
            <ErrorMessage text={loginFormErrors.confirmPassword} icon={<ErrorIcon />} />
          )}
        </div>
        <div className="form-field">
          <Input
            placeholder="Enter your Mobile .."
            label="Mobile"
            type="number"
            value={mobile}
            setValue={setMobile}
            name="email"
            errors={loginFormErrors}
          />
          {loginFormErrors?.mobile && (
            <ErrorMessage text={loginFormErrors.mobile} icon={<ErrorIcon />} />
          )}
        </div>
        <div className="form-field">
          <Datepicker setStartDate={setDob} startDate={dob} />
        </div>
        {userAuthenticateErrors && (
          <ErrorMessage text={userAuthenticateErrors} icon={<ErrorIcon />} />
        )}
        <div className="forgot-password-block">
          <a href="/">
            Login
          </a>
        </div>
        <Button type="submit" value="Sign Up" variant="primary" />
      </form>
      <LoadingCircle openLoader={openLoading} className="login-loading-backdrop" />
    </div>
  );
}

export default Register;
