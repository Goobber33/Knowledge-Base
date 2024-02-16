import "./VerifyPage.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, OutlinedInput } from "@mui/material";
import logo from "../../assets/images/KeelWorksLogo.png";

// VerifyPage component
const VerifyPage = () => {
  const [otpCode, setOtpCode] = useState("");
  const [showError, setShowError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    let data = {
      otpCode: otpCode,
    };
  };

  const handleChangeOtpCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentOtp = event.target.value;
    setOtpCode(currentOtp);
  };

  const handleResend = () => {
    // sendCode(userEmail);
  };

  return (
    <div className="VerifyPage">
      <img src={logo} alt="KeelWorks Logo" className="KeelWorksLogo" />
      <h1>Verify email address!</h1>
      <p>
        To verify your email, we’ve sent a One Time Password (OTP) to your email
      </p>
      <form>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="OTP" className="text-secondary">
              Enter OTP
            </label>
          </div>
          <div className="form-group">
            {
              <OutlinedInput
                type="text"
                id="optCode"
                value={otpCode}
                onChange={handleChangeOtpCode}
              />
            }
          </div>
          <div className="form-group">
            <Button variant="contained" type="submit" onClick={handleSubmit}>
              Verify
            </Button>
          </div>
          <div className="form-group">
            <span className="text-secondary disclaimer">
              By creating an account, you agree to the KeelWork's&nbsp;
              <a href="/terms-of-service" className="disclaimer-link">
                Terms of Service
              </a>{" "}
              and&nbsp;
              <a href="/privacy-policy" className="disclaimer-link">
                Privacy Policy
              </a>
              .
            </span>
          </div>
          <div className="form-group resendOTP">
            <span>
              <a
                href="/resendOTP"
                className="resendOTP-text"
                onClick={handleResend}
              >
                Resend OTP
              </a>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default VerifyPage;
