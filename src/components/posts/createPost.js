import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const axios = require("axios");
const api = require("../../api");

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CustomEditor = styled(ReactQuill)`
  display: flex;
  flex-direction: column;
  margin-top: 60px;
  width: 500px;
  height: 250px;
  @media (max-width: 600px) {
    width: 300px;
  }
`;

const Button = styled.button`
  margin-top: 12px;
  background-color: #3897f0};
  border: 1px solid #3897f0};
  border-radius: 4px;
  color: #fff;
  position: relative;
  height: 30px;
  width: 200px;
  font-weight: bold;
  opacity: ${props => (props.disabled ? "0.3" : "")};
`;

const AlertMessage = styled.div`
  background-color: ${props => (props.error ? "#e83e2c" : "#28a745")};
  padding: 0.75rem 1.25rem;
  text-align: left;
  line-height: 1.5;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  color: white;
  border-radius: 5px;
  transition: opacity 0.6s;
  margin-top: 50px;
`;

const CreatePost = () => {
  const [post, setPost] = useState("");
  const [isDisableButton, setIsDisableButton] = useState(true);
  const [showsuccessMessage, setShowsuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let token = localStorage.getItem("jwt");
    if (token) {
      axios
        .get(api + "auth", {
          headers: {
            Authorization: token
          }
        })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error.response.status);
          if (error.response.status === 401) {
            window.location.replace("/login");
          }
          console.log("Auth error", error.response.data);
        });
    } else {
      window.location.replace("/login");
    }
  }, []);

  const handleChange = (content, delta, source, editor) => {
    if (editor.getLength() !== 1) {
      setPost(content);
      setIsDisableButton(false);
    } else {
      setPost("");
      setIsDisableButton(true);
    }
  };

  const handleSubmit = () => {
    // Send data to the api
    let token = localStorage.getItem("jwt");
    if (token) {
      axios
        .post(
          api + "posts",
          {
            post
          },
          {
            headers: {
              Authorization: token
            }
          }
        )
        .then(response => {
          setPost("");
          setShowsuccessMessage(true);
        })
        .catch(error => {
          let errorMessage = error.response.data;
          console.log("Login API error", errorMessage);
          setErrorMessage(errorMessage);
        });
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {showsuccessMessage && (
        <AlertMessage>
          <strong>Success!</strong> Post has been successfully saved!
        </AlertMessage>
      )}
      {errorMessage !== "" && (
        <AlertMessage error>
          <strong>Failure!</strong> Unable to successfully save post due to
          <strong> {errorMessage}</strong>!
        </AlertMessage>
      )}
      <Container>
        <CustomEditor value={post} onChange={handleChange} />
        {isDisableButton ? (
          <Button disabled>Submit</Button>
        ) : (
          <Button onClick={handleSubmit}>Submit</Button>
        )}
      </Container>
    </div>
  );
};
export default CreatePost;
