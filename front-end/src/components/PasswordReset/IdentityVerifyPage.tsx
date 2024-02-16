import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import "./IdentityVerifyPage.css";
import logo from "../../assets/images/KeelWorksLogo.png";

// Mock function to simulate sending the code, replace with actual API call
const sendCode = async (email: string) => {
  try {
    const response = await fetch(
      `http://localhost:8080/knowledgebase/api/v1/email/generateOTP/${email}`
    );
    if (!response.ok) {
      throw new Error("Failed to send code.");
    }
    console.log("Code sent!");
  } catch (error) {
    console.error("Error sending code:", error);
  }
};

// Mock function to simulate verifying the code, replace with actual API call
const verifyCode = async (email: string, code: string) => {
  try {
    const response = await fetch(
      `http://localhost:8080/knowledgebase/api/v1/email/verifyOTP/${email}/${code}`
    );
    if (!response.ok) {
      throw new Error("Verification failed.");
    }
    const data = await response.json();
    return data.isVerified;
  } catch (error) {
    console.error("Error verifying code:", error);
    return false;
  }
};

const IdentityVerifyPage = () => {
  const [code, setCode] = useState(Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(60);
  const [message, setMessage] = useState("");
  const [isCodeValid, setIsCodeValid] = useState(true);
  const location = useLocation();
  const userEmail = location.state?.email || "";

  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));

  const navigate = useNavigate();

  const handleChange = (index: number, value: string) => {
    const newCode = [...code];
    if (value.length === 1 && /^[0-9]$/.test(value)) {
      newCode[index] = value;
      setCode(newCode);

      if (index < 5 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (value === "") {
      newCode[index] = value;
      setCode(newCode);

      if (index > 0 && inputRefs.current[index - 1]) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !code[index]) {
      if (index > 0 && inputRefs.current[index - 1]) {
        inputRefs.current[index - 1]?.focus();
      }
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleVerify = async () => {
    const fullCode = code.join("");
    const isVerified = await verifyCode(userEmail, fullCode);
    if (isVerified) {
      setMessage("Code verified!");
      navigate("/newPassword", { state: { email: userEmail } });
      setIsCodeValid(true);
    } else {
      setMessage("Invalid code. Please try again.");
      setIsCodeValid(false);
    }
  };

  const handleResend = () => {
    sendCode(userEmail);
    setTimeLeft(60);
    setMessage("Code resent!");
  };

  return (
    <div className="VerifyPage">
      <img src={logo} alt="KeelWorks Logo" className="KeelWorksLogo" />
      <h1>Verify your identity</h1>
      <p>Enter the code we just sent to your email:</p>
      <div className="form-group">
      <div className={`code-inputs ${!isCodeValid ? "code-inputs-invalid" : ""}`}>
  {code.map((digit, index) => (
    <input
      key={index}
      ref={(el) => (inputRefs.current[index] = el)}
      type="text"
      maxLength={1}
      value={digit}
      onChange={(e) => handleChange(index, e.target.value)}
      onKeyDown={(e) => handleKeyDown(index, e)}
    />
  ))}
</div>
      </div>

      <div className="form-group">
        <Button variant="contained" onClick={handleVerify}>
          Verify
        </Button>
      </div>

      <div className="form-group resend-section">
        {timeLeft > 0 ? (
          <p>
            Resend code in <span className="red-text">{timeLeft}s</span>
          </p>
        ) : (
          <Button variant="contained" onClick={handleResend}>
            Resend code
          </Button>
        )}
      </div>
      <div className={`message ${isCodeValid ? "" : "red-text"}`}>{message}</div>
    </div>
  );
};

export default IdentityVerifyPage;
