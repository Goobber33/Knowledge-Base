import React, { useState } from "react";
import { Button, IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import "./SignUp.css";
import api from "../../api/axiosConfig";
import logo from "../../assets/images/KeelWorksLogo.png";

const SignUppage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [passwordMismatch, setPasswordMismatch] = useState<boolean>(false);
  const [invalidEmail, setInvalidEmail] = useState<boolean>(false);
  const [invalidUsername, setInvalidUsername] = useState<boolean>(false);

  const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setter(event.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setPasswordMismatch(password !== confirmPassword);
    setInvalidEmail(!/\S+@\S+\.\S+/.test(email));
    setInvalidUsername(username.trim().length === 0);

    if (password !== confirmPassword || !/\S+@\S+\.\S+/.test(email) || username.trim().length === 0) {
      return; // Basic front-end validation
    }

    try {
      const response = await api.post("/users/register", {
        username,
        email,
        password,
      });
      console.log(response.data);
      // Handle success (e.g., navigate to login page or show success message)
      clearFields(); // Clear the fields after successful submission
    } catch (error) {
      console.error("Error occurred during registration:", error);
      // Handle error (e.g., display error message to user)
    }
  };

  const clearFields = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    setShowConfirmPassword(false);
    setPasswordMismatch(false);
    setInvalidEmail(false);
    setInvalidUsername(false);
  };

  return (
    <div className="PasswordPage form-wrapper">
      <img src={logo} alt="KeelWorks Logo" className="KeelWorksLogo" />
      <h1 className="headingOfPage">Create Account!</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username" className="text-secondary">Username</label>
          <OutlinedInput
            id="username"
            type="text"
            value={username}
            onChange={handleChange(setUsername)}
            className={`form-input ${invalidUsername ? 'invalid' : ''}`}
            endAdornment={
              invalidUsername ? <ClearIcon onClick={() => setUsername("")} /> : <CheckIcon />}
          />
          {invalidUsername && <p className="error-message">Username is required</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email" className="text-secondary">Email Address</label>
          <OutlinedInput
            id="email"
            type="email"
            value={email}
            onChange={handleChange(setEmail)}
            className={`form-input ${invalidEmail ? 'invalid' : ''}`}
            endAdornment={invalidEmail ? <ClearIcon onClick={() => setEmail("")} /> : <CheckIcon />}
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
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword" className="text-secondary">Confirm Password</label>
          <OutlinedInput
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={handleChange(setConfirmPassword)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={toggleShowConfirmPassword}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {passwordMismatch && <p className="error-message">Passwords do not match</p>}
        </div>

        <div className="form-group">
          <Button variant="contained" type="submit">
            Create Account
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUppage;
