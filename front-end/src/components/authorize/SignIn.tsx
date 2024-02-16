import { useState, useEffect } from 'react';
import logo from '../../assets/images/KeelWorksLogo.png';
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import Google from '../../assets/images/googleLogo1.jpg';
import Facebook from '../../assets/images/FB_Logo.png';
import Twitter from '../../assets/images/twitterLogo.png';
import "./SignIn.css";

type ValuesState = {
    email: string;
    password: string;
    showPassword: boolean;
};
const SignInPage = () => {

    const [values, setValues] = useState({
        email: '',
        password: '',
        showPassword: false
    })
    const [showError, setShowError] = useState(false);

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    const handleMouseDownPassword = (event: any) => {
        event.preventDefault();
    };

    const handleChange = (prop: keyof ValuesState) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const mockAuthenticate = () => {
        if (values.email === '' || values.password === '') {
            setShowError(true);
        } else {
            setShowError(false)
        }
    };

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        mockAuthenticate();
    }
    return (
        <div className="PasswordPage form-wrapper">
            <img src={logo} alt="Keelworks logo" className="KeelWorksLogo" />
            <h1 className="signIn-heading"> Sign In</h1>
            <form>
                <div className="form-row">
                    <div className="form-group">
                        <div className="usernameLabel-field">
                            <label htmlFor="email" className="text-secondary username-label">
                                Email Address
                            </label>
                        </div>
                        <OutlinedInput type="text" id="username" className="usernameContainer" value={values.email}
                            onChange={handleChange('email')} />
                        <div className='password-label'>
                            <label htmlFor="password" className="text-secondary password-label">
                                Password
                            </label>
                        </div>
                        <OutlinedInput
                            type={values.showPassword ? 'text' : 'password'}
                            id="password"
                            className="passwordContainer"
                            value={values.password}
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <a href="/reset-password" className="forgot-password-link">Forgot Password?</a>
                    </div>
                    {showError && (
                        <div className="form-group error-message">
                            Invalid username or password, please try entering your credentials again
                        </div>
                    )}
                    <div className='form-group signIn-button'>
                        <Button variant="contained" type="submit" onClick={handleSubmit}>
                            Sign In
                        </Button>
                    </div>
                    <div className='form-group disclaimer'>
                        <span className='text-secondary username-label'>
                            By signing in, you agree to KeelWork's&nbsp;
                            <a href="/terms-of-service" className="disclaimer-link">Terms of Service</a> and&nbsp;
                            <a href="/privacy-policy" className="disclaimer-link">Privacy Policy</a>
                        </span>
                    </div>
                    <div className="form-group new-user">
                        <span className='new-user-text'>
                            New user?&nbsp;
                            <a href="/signup" className="disclaimer-link">Create an account</a>
                        </span>
                    </div>
                </div>
                <div>
                    <div className="form-group signInMethods">
                        <span className=''>
                            Or sign in using
                        </span>
                        <div className="icon-buttons-container">
                            <IconButton>
                                <img src={Google} alt="Google Logo" />
                            </IconButton>
                            <IconButton>
                                <img src={Facebook} alt="Facebook Logo" />
                            </IconButton>
                            <IconButton>
                                <img src={Twitter} alt="Twitter Logo" />
                            </IconButton>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SignInPage;