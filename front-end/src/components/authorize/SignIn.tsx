import React, { useState } from "react";
import { Button, IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import "./SignIn.css";
import api from "../../api/axiosConfig";
import logo from "../../assets/images/KeelWorksLogo.png";

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
                  aria-label="toggle password visibility"
                  onClick={toggleShowPassword}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </div>

        {showError && <p className="error-message">Invalid email or password</p>}

        <div className="form-group">
          <Button variant="contained" type="submit">
            Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
