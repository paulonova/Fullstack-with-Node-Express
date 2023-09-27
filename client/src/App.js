import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./components/Login";
import Registration from "./components/Registration";

function App() {
  return (
    <div className="App">
      <Router>
        <nav className="navbar">
          <Link to="/"> Home Page</Link>
          <Link to="/createpost"> Create A Post</Link>
          <Link to="/login"> Login</Link>
          <Link to="/registration"> Registration</Link>
        </nav>

        <Routes>
          <Route exact path="/" Component={Home} />
          <Route exact path="/createpost" Component={CreatePost} />
          <Route exact path="/post/:id" Component={Post} />
          <Route exact path="/login" Component={Login} />
          <Route exact path="/registration" Component={Registration} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
