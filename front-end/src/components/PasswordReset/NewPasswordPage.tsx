import React, { useState } from "react";
import {
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./NewPasswordPage.css";
import logo from "../../assets/images/KeelWorksLogo.png";
import { useLocation } from "react-router-dom";

const NewPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isInputFocused, setInputFocused] = useState(false);

  const getPasswordStrength = (password: string) => {
    const hasEightCharacters = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return [hasEightCharacters, hasNumber, hasSpecialChar].filter(Boolean)
      .length;
  };

  const handlePasswordChange = (e: any) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(getPasswordStrength(newPassword));
  };

  const location = useLocation();
  const userEmail = location.state?.email || "";

  const handleInputFocus = () => setInputFocused(true);

  const clearOnSubmit = () => {
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Handle submission, sending the new password to backend
    let data = {
      email: userEmail,
      newPassword: password,
    };

    const response = await fetch("/api/v1/user/reset-password", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    console.log(result);

    clearOnSubmit();
  };

  return (
    <div className="NewPasswordPage">
      <img src={logo} alt="KeelWorks Logo" className="KeelWorksLogo" />
      <h1>Create a new password</h1>
      <form>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="password" className="text-secondary">
              Enter password
              <span className={`password-strength ${passwordStrength}`}>
                {passwordStrength > 0 && (
                  <>
                    {["none", "weak", "medium", "strong"][passwordStrength]}
                    {/* Add dot indicators */}
                    {[...Array(3)].map((_, index) => (
                      <span
                        key={index}
                        className={`dot ${
                          index < passwordStrength ? "green" : "red"
                        }`}
                      />
                    ))}
                  </>
                )}
              </span>
            </label>
            <div className="form-group">
              <OutlinedInput
                type={showPassword ? "text" : "password"}
                id="password"
                size="small"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
                onFocus={handleInputFocus}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </div>
            <div
              className={`password-rules ${
                isInputFocused ? "focused" : ""
              } text-secondary`}
            >
              <p className={password.length >= 8 ? "satisfied" : ""}>
                • Password must have 8 characters
              </p>
              <p
                className={
                  /\d/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password)
                    ? "satisfied"
                    : ""
                }
              >
                • Number and special character
              </p>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password" className="text-secondary">
              Confirm password
            </label>
            <div className="form-group">
              <OutlinedInput
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                className="form-control"
                onChange={(e) => setConfirmPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </div>
          </div>

          <div className="form-group">
            <Button variant="contained" type="submit" onClick={handleSubmit}>
              Sign in with new password
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewPasswordPage;
