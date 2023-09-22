import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";

function App() {
  return (
    <div className="App">
      <Router>
        <nav className="navbar">
          <Link
            to="/createpost"
          >
            Create a Post
          </Link>
          <Link
            to="/"
          >
            Homepage
          </Link>
        </nav>

        <Routes>
          <Route exact path="/" Component={Home} />
          <Route exact path="/createpost" Component={CreatePost} />
          <Route exact path="/post/:id" Component={Post} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
