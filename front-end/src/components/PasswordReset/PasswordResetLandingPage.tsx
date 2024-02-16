import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, OutlinedInput } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import "./PasswordResetLandingPage.css";
import logo from "../../assets/images/KeelWorksLogo.png";

// PasswordResetPage component
const PasswordResetLandingPage = () => {
  const [email, setEmail] = useState("");
  const [isEmailValid, setEmailValid] = useState<boolean | null>(null);
  const [showError, setShowError] = useState(false);

  const navigate = useNavigate();

  // Email Address validation
  function isValidEmail(email: any) {
    if (/\S+@\S+\.\S+/.test(email)) return true;
    else return false;
  }

  // Keelworks Email Address validation
  function isValidKeelworksEmail(email: any) {
    if (/^[a-zA-Z0-9._%+-]+@keelworks\.org$/.test(String(email))) return true;
    else return false;
  }

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentEmail = event.target.value;
    setEmail(currentEmail);
    setEmailValid(isValidEmail(currentEmail));
    // setEmailValid(isValidEmail(isValidKeelworksEmail));
  };

  const clearEmail = () => {
    setEmail("");
    setEmailValid(null);
    setShowError(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    let data = {
      email: email,
    };

    // Call API: Currently no check email api
    const response = await fetch("/api/v1/user/check-email", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (isEmailValid) {
      console.log("Email exists in the database.");
      clearEmail();
      navigate("/IdentityVerify", { state: { email } });
    } else {
      console.log("Email does not exist in the database.");
      setShowError(true);
    }
  };

  return (
    <div className="ResetPage">
      <img src={logo} alt="KeelWorks Logo" className="KeelWorksLogo" />
      <h1>Forgot password?</h1>
      <p>
        To reset your password, please enter your email address you may have
        used with KeelWorks
      </p>
      <form>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email" className="text-secondary">
              Email address
            </label>
          </div>
          <div className="form-group">
            <OutlinedInput
              type="email"
              id="email"
              className={`form-control ${
                isEmailValid === false ? "invalid-input" : ""
              }`}
              value={email}
              onChange={handleChangeEmail}
              endAdornment={
                isEmailValid === false ? (
                  <ClearIcon className="invalid-icon" onClick={clearEmail} />
                ) : isEmailValid === true ? (
                  <CheckIcon className="valid-icon" />
                ) : null
              }
            />
          </div>
          <div className="form-group">
            <Button variant="contained" type="submit" onClick={handleSubmit}>
              Next
            </Button>
          </div>
          <div className="form-group">
            {showError && (
              <p className="red-text error-message">
                Email does not exist. Please check your entry and try again.
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default PasswordResetLandingPage;
