import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import styled from "styled-components";
import Login from "./login";
import SignUp from "./signUp";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Main = () => {
  return (
    <Router>
      <Container>
        <Route path="/login" component={Login}/>
        <Route path="/signUp" component={SignUp} />
      </Container>
    </Router>
  );
};

export default Main;
