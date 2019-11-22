import React, { useEffect, useState } from "react";
import styled from "styled-components";

const axios = require("axios");
const api = require("../../api");

console.log(api);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content; center;
  align-items: center;
`;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  border: 1px solid;
  border-radius: 1px;
  margin-top: 50px;
  width: 500px;
  outline: outline-width outline-style outline-color|initial|inherit;
`;

const convertDate = date => {
  let d = new Date();
  console.log(d.toDateString);
};

const Post = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(api + "posts")
      .then(response => {
        setPosts(posts => posts.concat(response.data));
        console.log(response.data);
      })
      .catch(error => {
        console.log(error.response.status);
        console.log("Auth error", error.response.data);
      });
  }, []);
  return (
    <Container>
      {posts.map(post => (
        <PostContainer key={post._id}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "rgba(0,0,0,.03)"
            }}
          >
            <div>{post.username}</div>
            <div>{post.date}</div>
          </div>
          <div dangerouslySetInnerHTML={{ __html: post.post }} />
        </PostContainer>
      ))}
    </Container>
  );
};

export default Post;
