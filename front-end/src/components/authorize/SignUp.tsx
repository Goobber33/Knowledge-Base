import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import "./SignUp.css";
import api from "../../api/axiosConfig";
import logo from "../../assets/images/KeelWorksLogo.png";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
const SignUppage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newUserData, setNewUserData] = useState(true);
  const [existingUser, setexistinguser] = useState([{}]);
  const [invalidEmail, setinvalidEmail] = useState("");
  const [invalidUsername, setinvalidUsername] = useState("usernamePresent");
  const [errorMessageUsername, setErrorMessageUsername] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState("");
  const [successAbovePasswordMessage, setSuccessAbovePasswordmessage] =
    useState("");
  const [successEightPasswordMessage, setSuccessEightPasswordMessage] =
    useState("");
  const [
    successNumSpecialPasswordMessage,
    setSuccessNumSpecialPasswordmessage,
  ] = useState("");

  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  }); //password values
  const [valuesCP, setValuesCP] = useState({
    confirmPassword: "",
    showCP: false,
  }); //re-type password values

  //Email Address validation
  function isValidEmail(email: any) {
    if (/\S+@\S+\.\S+/.test(email)) return true;
    else return false;
  }

  const handleChangeEmail = (event: any) => {
    if (!isValidEmail(event.target.value)) {
      setinvalidEmail("IncorrectEmail");
    } else {
      setinvalidEmail("CorrectEmail");
    }

    setEmail(event.target.value);
  };

  //Username validation
  function isValidUsername(usernameValue: any) {
    //to check if the username exist in existing database of not
    //	if (!existingUser.filter((e: any) => e === usernameValue)) return true;
    let username = [
      { name: "test", age: 20 },
      { name: "seattle", age: 20 },
    ];
    if (username.find((e) => usernameValue === e.name)) return false;
    else return true;
  }

  const handleChangeUsername = (event: any) => {
    if (!isValidUsername(event.target.value)) {
      setinvalidUsername("usernamePresent");
      setErrorMessageUsername("Username already taken!");
    } else {
      setinvalidUsername("newUsername");
      setErrorMessageUsername("");
    }
    if (event.target.value === "") {
      setinvalidUsername("");
      setErrorMessageUsername("");
    }
    setUsername(event.target.value);
  };

  //new user api call
  const getNewUserData = async () => {
    try {
      const response = await api.get("/api/user/new");
      console.log(response);
      setNewUserData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getNewUserData();
  }, []);

  //existing user api call
  const getExistingUserData = async () => {
    try {
      const response = await api.get("/api/user"); //api name needs tobe changed
      console.log(response);
      setexistinguser(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getExistingUserData();
  }, []);

  //eye icon implementation on password field
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };
  const handlePasswordChange = (prop: any) => (event: any) => {
    if (
      (/[0-9]+/.test(event.target.value) ||
        /[^A-Za-z0-9]+/.test(event.target.value)) &&
      event.target.value.length > 7 &&
      event.target.value.length > 0
    ) {
      setSuccessAbovePasswordmessage("Strong");
      setSuccessNumSpecialPasswordmessage("Strong");
    } else if (
      !(
        /[0-9]+/.test(event.target.value) ||
        /[^A-Za-z0-9]+/.test(event.target.value)
      ) &&
      event.target.value.length > 7 &&
      event.target.value.length > 0
    ) {
      setSuccessAbovePasswordmessage("Medium");
      setSuccessNumSpecialPasswordmessage("Medium");
    } else if (
      event.target.value.length > 0 &&
      !(
        /[0-9]+/.test(event.target.value) ||
        /[^A-Za-z0-9]+/.test(event.target.value)
      ) &&
      event.target.value.length <= 8
    ) {
      setSuccessAbovePasswordmessage("Weak");
      setSuccessNumSpecialPasswordmessage("Medium");
    } else {
      setSuccessAbovePasswordmessage("invalid");
    }

    if (event.target.value.length > 7) {
      setSuccessEightPasswordMessage("Strong");
    } else if (
      event.target.value.length <= 7 ||
      event.target.value.length > 0
    ) {
      setSuccessEightPasswordMessage("Medium");
    } else {
      setSuccessEightPasswordMessage("Weak");
    }

    setValues({
      ...values,
      [prop]: event.target.value,
    });
  };

  //eye icon implementation on re-type password field
  const handleClickShowConfirmPassword = () => {
    console.log("clicked");
    setValuesCP({
      ...valuesCP,
      showCP: !valuesCP.showCP,
    });
  };

  const handleMouseDownConfirmPassword = (event: any) => {
    event.preventDefault();
  };
  const handleConfirmPasswordChange = (prop: any) => (event: any) => {
    if (event.target.value === values.password) {
      setPasswordMismatch("");
    } else {
      setPasswordMismatch("Re-type Password and Password should match.");
    }

    setValuesCP({
      ...valuesCP,
      [prop]: event.target.value,
    });
  };

  //click on clear icon in email field and it should clear

  const clearEmail = () => {
    setEmail("");
    setinvalidEmail("");
  };
  //Click On create Account
  const clearFielsOnSubmit = () => {
    setUsername("");
    setEmail("");
    setinvalidEmail("");
    setinvalidUsername("");
    setErrorMessageUsername("");
    setSuccessAbovePasswordmessage("");
    values.password = "";
    valuesCP.confirmPassword = "";
    setSuccessEightPasswordMessage("");
    setSuccessNumSpecialPasswordmessage("");
    setPasswordMismatch("");
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    let data = {
      name: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };

    const response = await fetch("/api/user/new", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log(result);
    clearFielsOnSubmit();
  };

  return (
    <div className="PasswordPage form-wrapper">
      <img src={logo} alt="KeelWorks Logo" className="KeelWorksLogo" />
      <h1 className="headingOfPage">Create Account!</h1>
      <form>
        <div className="form-row">
          <div className="form-group ">
            <div className="usernameLabel-field">
              {" "}
              <label
                htmlFor="username"
                className="text-secondary username-label"
              >
                Username
              </label>
              {errorMessageUsername && (
                <div className="errorUsername"> {errorMessageUsername} </div>
              )}
            </div>
            <OutlinedInput
              type="text"
              id="username"
              className="usernameContainer"
              value={username}
              style={
                invalidUsername.includes("usernamePresent")
                  ? { color: "red" }
                  : invalidUsername.includes("newUsername")
                    ? { color: "green" }
                    : { color: "#212529" }
              }
              onChange={handleChangeUsername}
              endAdornment={
                invalidUsername.includes("newUsername") ? <CheckIcon /> : <></>
              }
            />
          </div>
          <div className="form-group ">
            <label htmlFor="email" className="text-secondary">
              Email Address
            </label>
            <OutlinedInput
              type="email"
              id="email"
              value={email}
              className="emailcontainer"
              style={
                invalidEmail.includes("IncorrectEmail")
                  ? { border: "2px solid red", color: "red" }
                  : invalidEmail.includes("CorrectEmail")
                    ? { border: "2px solid green", color: "green" }
                    : { color: "#212529" }
              }
              onChange={handleChangeEmail}
              endAdornment={
                invalidEmail.includes("IncorrectEmail") ? (
                  <ClearIcon onClick={clearEmail} />
                ) : invalidEmail.includes("CorrectEmail") ? (
                  <CheckIcon />
                ) : (
                  <></>
                )
              }
            />
          </div>
          <div className="form-group password-container ">
            <div className="passwordstrengthh">
              <label
                htmlFor="password"
                className="text-secondary password-label"
              >
                Password
              </label>
              <label className="passwordstrength-label">
                {successAbovePasswordMessage.includes("Strong") ? (
                  <>
                    <span>Strong</span>
                    <span
                      className="successAbovePasswordMessage"
                      style={{ color: "green" }}
                    >
                      &#8226;&#8226;&#8226;
                    </span>
                  </>
                ) : successAbovePasswordMessage.includes("Medium") ? (
                  <>
                    <span>Medium </span>
                    <span
                      className="successAbovePasswordMessage"
                      style={{ color: "green" }}
                    >
                      &#8226;
                    </span>{" "}
                    <span
                      className="errorEightBelowMessage"
                      style={{ color: "red" }}
                    >
                      &#8226;&#8226;
                    </span>
                  </>
                ) : successAbovePasswordMessage.includes("Weak") ? (
                  <>
                    <span>Weak </span>
                    <span
                      className="errorEightBelowMessage"
                      style={{ color: "red" }}
                    >
                      &#8226;&#8226;&#8226;
                    </span>
                  </>
                ) : (
                  <></>
                )}
              </label>
            </div>
            <div className="password-container">
              <OutlinedInput
                type={values.showPassword ? "text" : "password"}
                onChange={handlePasswordChange("password")}
                value={values.password}
                id="password"
                className="passwordContainer"
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
            </div>
          </div>
          <div className="passwordCharacterText text-secondary">
            {successEightPasswordMessage.includes("Strong") ? (
              <span
                className="successEighBelowtMessage"
                style={{ color: "green", fontWeight: 800 }}
              >
                &#8226;
              </span>
            ) : successEightPasswordMessage.includes("Medium") ? (
              <span
                className="errorEightBelowMessage"
                style={{ color: "red", fontWeight: 800 }}
              >
                &#8226;
              </span>
            ) : (
              <></>
            )}
            Password must have 8 characters
          </div>
          <div className="passwordDisclaimerText text-secondary">
            {successNumSpecialPasswordMessage.includes("Strong") ? (
              <span
                className="successNumSpecialBelowMessage"
                style={{ color: "green", fontWeight: 800 }}
              >
                &#8226;
              </span>
            ) : successNumSpecialPasswordMessage.includes("Medium") ? (
              <span
                className="errorNumSpecialBelowMessage"
                style={{ color: "red", fontWeight: 800 }}
              >
                &#8226;
              </span>
            ) : (
              <></>
            )}
            Number or special character
          </div>{" "}
          <div className="form-group confirmPassword-container ">
            <div className="confirmpasswordstrength">
              <label
                htmlFor="confirmPassword"
                className="text-secondary confirmPassword-label"
              >
                Re-type Password
              </label>
            </div>
            <div className="confirmPassword-container confirmPassword-input">
              <OutlinedInput
                type={valuesCP.showCP ? "text" : "confirmPassword"}
                onChange={handleConfirmPasswordChange("confirmPassword")}
                className="confirmPasswordContainer"
                value={valuesCP.confirmPassword}
                id="confirmPassword"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownConfirmPassword}
                    >
                      {valuesCP.showCP ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {passwordMismatch && (
                <div
                  className="errorPasswordMismatch"
                  style={{ color: "red", fontSize: "14px" }}
                >
                  {" "}
                  {passwordMismatch}
                </div>
              )}
            </div>
          </div>
          <div className="form-group" onClick={handleSubmit}>
            <Button variant="contained" type="submit">
              Create account
            </Button>
          </div>

        </div>
      </form>
    </div>
  );
};

export default SignUppage;
