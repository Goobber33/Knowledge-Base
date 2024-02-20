import React, { useState } from "react";
import { Button, IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import "./SignIn.css";
import api from "../../api/axiosConfig";
import logo from "../../assets/images/KeelWorksLogo.png";
import Google from "../../assets/images/googleLogo1.jpg";
import Facebook from "../../assets/images/FB_Logo.png";
import Twitter from "../../assets/images/twitterLogo.png";

const SignInPage: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [invalidEmail, setInvalidEmail] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);

    const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setter(event.target.value);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setInvalidEmail(!/\S+@\S+\.\S+/.test(email));

        if (!/\S+@\S+\.\S+/.test(email) || password.trim().length === 0) {
            setShowError(true); // Show error if validation fails
            return; // Prevent submission if there's a validation error
        }

        setShowError(false); // Reset error state on valid submission

        try {
            const response = await api.post("/users/login", {
                email,
                password,
            });
            console.log(response.data);
            // Handle success (e.g., navigate to the dashboard or show a success message)
        } catch (error) {
            console.error("Error occurred during sign in:", error);
            setShowError(true); // Display error message on failure
        }
    };

    return (
        <div className="PasswordPage form-wrapper">
            <img src={logo} alt="KeelWorks Logo" className="KeelWorksLogo" />
            <h1 className="signIn-heading">Sign In</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email" className="text-secondary">Email Address</label>
                    <OutlinedInput
                        id="email"
                        type="email"
                        value={email}
                        onChange={handleChange(setEmail)}
                        className={`form-input ${invalidEmail ? 'invalid' : ''}`}
                        endAdornment={
                            invalidEmail ? <ClearIcon onClick={() => setEmail("")} /> : <CheckIcon />}
                    />
                    {invalidEmail && <p className="error-message">Invalid email address</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="password" className="text-secondary">Password</label>
                    <OutlinedInput
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={handleChange(setPassword)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={toggleShowPassword}
                                    onMouseDown={(e) => e.preventDefault()}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <a href="/reset-password" className="forgot-password-link">Forgot Password?</a>
                </div>

                {showError && <p className="error-message">Invalid email or password</p>}

                <div className="form-group">
                    <Button variant="contained" type="submit">
                        Sign In
                    </Button>
                </div>
                <div className="form-group disclaimer">
                    <span className="text-secondary">
                        By signing in, you agree to KeelWork's <a href="/terms-of-service" className="disclaimer-link">Terms of Service</a> and <a href="/privacy-policy" className="disclaimer-link">Privacy Policy</a>.
                    </span>
                </div>
                <div className="form-group new-user">
                    <span className="new-user-text">
                        New user? <a href="/signup" className="disclaimer-link">Create an account</a>.
                    </span>
                </div>
                <div className="form-group signInMethods">
                    <span>Or sign in using</span>
                    <div className="icon-buttons-container">
                        <IconButton><img src={Google} alt="Google Logo" /></IconButton>
                        <IconButton><img src={Facebook} alt="Facebook Logo" /></IconButton>
                        <IconButton><img src={Twitter} alt="Twitter Logo" /></IconButton>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SignInPage;
