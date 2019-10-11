import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // background-color: #fff;
  // border: 1px solid #e6e6e6;
  // border-radius: 1px;
  // opacity: 0.99;
  // margin-top: 20px;
  // width: 350px;
  // height: 250px;
  // outline: outline-width outline-style outline-color|initial|inherit;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  @media (max-width: 600px) {
    width: 300px;
  }
`;

const Button = styled.input`
  margin-top: 12px;
  background-color: #3897f0};
  border: 1px solid #3897f0};
  border-radius: 4px;
  color: #fff;
  position: relative;
  height: 30px;
  width: 100px;
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

const CreatePost = () => {
  const [post, setpost] = useState("");

  const handleChange = event => {
    let post = event.target.value;
    setpost(post);
    console.log(post);
  };

  const handleSubmit = ()=> {
    console.log(post)
    alert("onSubmit", post);
  }

  return (
    <Container>
      {
        <AlertMessage>
          <strong>Success!</strong> Post has been Successfuly saved
        </AlertMessage>
      }
      <Form onSubmit={handleSubmit}>
        <textarea
          rows="10"
          cols="70"
          placeholder="Write your post here..."
          required
          value={post}
          onChange={handleChange}
        />
        <Button type="submit" value="Submit" />
      </Form>
    </Container>
  );
};
export default CreatePost;
