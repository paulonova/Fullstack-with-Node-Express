import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from './pages/CreatePost'

function App() {
  return (
    <div className="App mt-5">
      <Router>
        <Link
          className=" text-blue-500 hover:underline block hover:text-gray-900"
          to="/createpost"
        >
          Create a Post
        </Link>
        <Link
          className=" text-blue-500 hover:underline block hover:text-gray-900"
          to="/"
        >
          Homepage
        </Link>
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route exact path="/createpost" Component={CreatePost} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
