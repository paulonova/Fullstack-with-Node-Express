import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./components/Login";
import Registration from "./components/Registration";
import { AuthContext } from "./helpers/AuthContext";

function App() {
  const [authState, setAuthState] = useState(false);
  return (
    <div className="App">
      <AuthContext.Provider value={{authState, setAuthState}}>
        <Router>
          <nav className="navbar">
            <Link to="/"> Home Page</Link>
            <Link to="/createpost"> Create A Post</Link>
            {!authState && (
              <>
                <Link to="/login"> Login</Link>
                <Link to="/registration"> Registration</Link>
              </>
            )}
          </nav>

          <Routes>
            <Route exact path="/" Component={Home} />
            <Route exact path="/createpost" Component={CreatePost} />
            <Route exact path="/post/:id" Component={Post} />
            <Route exact path="/login" Component={Login} />
            <Route exact path="/registration" Component={Registration} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
