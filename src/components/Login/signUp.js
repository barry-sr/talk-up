import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: ${props => props.direction || "column"};
  justify-content: ${props => props.justifyContent};
  align-items: ${props => props.alignItems || "center"};
  background-color: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 1px;
  opacity: 0.99;
  margin-top: ${props => props.marginTop || "20px"};
  width: 350px;
  height: ${props => props.height || "330px"};
  outline: outline-width outline-style outline-color|initial|inherit;

  @media (max-width: 600px) {
    border: #e6e6e6;
    border-radius: 0px;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 270px;
`;

const Input = ({ className, ...props }) => {
  return (
    <input
      className={className}
      type={props.type}
      name={props.name}
      placeholder={props.placeholder}
      required
      value={props.value}
      onChange={props.onChange}
    />
  );
};

const Header = styled.h1`
  text-decoration: none;
  font-family: Arial, sans-serif, normal;
  font-size: 200%;
`;

const StyledInput = styled(Input)`
  margin-top: 12px;
  padding: 10px;
  border: 1px solid #e6e6e6;
  border-radius: 1px;
  height: 20px;
`;

const Button = styled.input`
  margin-top: 12px;
  background-color: #3897f0};
  border: 1px solid #3897f0};
  border-radius: 4px;
  color: #fff;
  position: relative;
  height: 30px;
  font-weight: bold;
`;

const LinkComponent = ({ className, ...props }) => {
  return (
    <Link className={className} to={props.to}>
      {props.label}
    </Link>
  );
};

const StyledLink = styled(LinkComponent)`
  text-decoration: none;
  color: #3897f0;
  font-family: Arial, sans-serif;
  font-size: 13px;
  font-weight: bold;
`;

const AlertMessage = styled.div`
  display; flex;
  padding: 20px;
  white-space: nowrap;
  background-color: #4caf50;
  opacity: 1;
  color: white;
  border-radius: 5px;
  transition: opacity 0.6s;
  margin-top: 15px;
`;

const SignUp = () => {
  const initialForm = {
    username: "",
    email: "",
    password: ""
  };

  const [formData, setFormData] = useState(initialForm);
  const [hasError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    usernameError: "errors",
    emailError: "",
    passwordError: ""
  });
  const [showsuccessMessage, setshowsuccessMessage] = useState(false);

  const validateData = () => {
    var usernameRegex = /^[a-zA-Z0-9]+$/;
    let emailRegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

    if (formData.username.length < 3 || formData.username.length > 6) {
      setError(true);
      setErrorMessage(prevstate => {
        return (
          { ...prevstate },
          {
            usernameError: "Username should be 3 to 6 characters long"
          }
        );
      });
      return false;
    }
    if (!usernameRegex.test(formData.username)) {
      setError(true);
      setErrorMessage(prevstate => {
        return (
          { ...prevstate },
          {
            usernameError: "Invalid UserName"
          }
        );
      });
      return false;
    }
    if (!emailRegExp.test(formData.email)) {
      setError(true);
      setErrorMessage(prevstate => {
        return (
          { ...prevstate },
          {
            emailError: "Email is Invalid"
          }
        );
      });
      return false;
    }
    if (!passRegex.test(formData.password)) {
      setError(true);
      setErrorMessage(prevstate => {
        return (
          { ...prevstate },
          {
            passwordError:
              "Password should contain 1 digit, 1 lower case, at least one upper case & 8 characters long"
          }
        );
      });
      return false;
    }
    setError(false);
    return true;
  };

  const handleChange = e => {
    const value = e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = e => {
    if (validateData()) {
      e.preventDefault();
      setshowsuccessMessage(true);
      //send data to api
      //response success, display success message and reset form.
      setFormData(initialForm);
    } else {
      e.preventDefault();
      console.log("error");
      console.log(errorMessage.usernameError);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {showsuccessMessage && (
        <AlertMessage>
          <strong>Success!</strong> You've successfuly sign up!
        </AlertMessage>
      )}
      <Container>
        <Header>Talk</Header>
        <StyledForm onSubmit={handleSubmit}>
          <StyledInput
            type="text"
            name="username"
            placeholder="Enter Username"
            value={formData.username}
            onChange={handleChange}
          />
          <StyledInput
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
          />
          <StyledInput
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button type="submit" value="Sign up" />
        </StyledForm>
        {hasError && (
          <span
            style={{
              marginTop: "8px",
              color: "red"
            }}
          >
            {errorMessage.usernameError}
            {errorMessage.emailError}
            {errorMessage.passwordError}
          </span>
        )}
      </Container>
      <Container
        direction="row"
        justifyContent="center"
        alignItems="center"
        height="50px"
      >
        <p>
          Have an account?
          <StyledLink to="/login" label=" Log in" />
        </p>
      </Container>
    </div>
  );
};

export default SignUp;
