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
  height: ${props => props.height || "250px"};
  outline: outline-width outline-style outline-color|initial|inherit;

  @media (max-width: 600px) {
    border: #e6e6e6;
    border-radius: 0px;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 250px;
`;

const Input = ({ className, ...props }) => {
  return (
    <input
      className={className}
      name={props.name}
      type={props.type}
      placeholder={props.placeholder}
      required
      value={props.value}
      onChange={props.onChange}
      onKeyPress={props.onKeyPress}
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

const Button = styled.button`
  margin-top: 12px;
  background-color: #3897f0};
  border: 1px solid #3897f0};
  border-radius: 4px;
  color: #fff;
  position: relative;
  height: 30px;
  font-weight: bold;
  opacity: ${props => (props.disabled ? "0.3" : "")};
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

const Login = () => {
  const [isDisableButton, setIsDisableButton] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = event => {
    event.target.name === "username"
      ? setUsername(event.target.value)
      : setPassword(event.target.value);
    console.log(username);

    if (username !== "" && password !== "") {
      setIsDisableButton(false);
    } else {
      setIsDisableButton(true);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Container>
        <Header>Talk</Header>
        <StyledForm>
          <StyledInput
            name="username"
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={handleChange}
            onKeyPress={handleChange}
          />
          <StyledInput
            name="password"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={handleChange}
            onKeyPress={handleChange}
          />
          {isDisableButton ? (
            <Button disabled>Log In</Button>
          ) : (
            <Button>Log In</Button>
          )}
        </StyledForm>
      </Container>
      <Container
        direction="row"
        justifyContent="center"
        alignItems="center"
        height="50px"
      >
        <p>
          Don't have an account?
          <StyledLink to="/signUp" label=" Sign up" />
        </p>
      </Container>
    </div>
  );
};

export default Login;
