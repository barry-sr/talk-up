import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Navbar = styled.nav`
  display: flex;
  background-color: #205081;
  height: 3em;
  justify-content: center
  align-items: center
`;

const Ul = styled.ul`
  list-style-type: none;
  white-space: nowrap;
  margin: 0;
  padding: 0;
`;

const Li = styled.li`
  display: inline;
  white-space: nowrap;
`;

const Links = ({ className, ...props }) => {
  return (
    <Link className={className} to={props.to}>
      {props.label}
    </Link>
  );
};

const StyledLink = styled(Links)`
  padding: 14px 16px;
  color: #ffffff;
  text-decoration: none;
  font-family: Arial, sans-serif;
  font-size: medium;
  font-weight: bold;
  white-space: nowrap;
  letter-spacing: 1px;
  :hover {
    background-color: #111;
  }
`;

const StyleDiv = styled.div`
  padding-left: 15%;
`;

const Header = () => {
  return (
    <Navbar>
      <div>
        <Ul>
          <Li>
            <StyledLink to="/" label="Talk" />
          </Li>
        </Ul>
      </div>
      <StyleDiv>
        <Ul>
          <Li>
            <StyledLink to="/createPost" label="Create post" />
          </Li>
          <Li>
            <StyledLink to="/login" label="Login" />
          </Li>
        </Ul>
      </StyleDiv>
    </Navbar>
  );
};

export default Header;
