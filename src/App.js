import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header/header";
import Login from "./components/Login/main";
import Post from "./components/posts/post";
import CreatePost from "./components/posts/createPost";
require("dotenv").config();

function App() {
  return (
    <Router>
      <div>
        <Header />

        <Route exact path="/" component={Post} />
        <Route path="/createPost" component={CreatePost} />
        <Route path="/login" component={Login} />
      </div>
    </Router>
  );
}

export default App;
