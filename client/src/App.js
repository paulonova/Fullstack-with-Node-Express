import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./components/Login";
import Registration from "./components/Registration";
import { AuthContext } from "./helpers/AuthContext";
import axios from "axios";
import Logout from "./components/Logout";
import ErrorPage from "./pages/ErrorPage";
import ProfilePage from "./pages/ProfilePage";

function App() {

  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  }); // Check if you are logged in or not

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL_COMMENTS}/auth/auth`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false }); // Have all state object but change only one, the status
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Callback function
  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      username: "",
      id: 0,
      status: false,
    });
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <nav className="navbar flex justify-between items-center">
            <div>
              {!authState.status ? (
                <>
                  <Link to="/login"> Login</Link>
                  <Link to="/registration"> Registration</Link>
                </>
              ) : (
                <>
                  <Link to="/"> Home Page</Link>
                  <Link to="/createpost"> Create A Post</Link>
                  <Logout logout={logout} />
                </>
              )}
            </div>

            <a href="/profile/1"><h1 className="text-white mx-5">{authState.username}</h1></a>
          </nav>

          <Routes>
            <Route exact path="/" Component={Home} />
            <Route exact path="/createpost" Component={CreatePost} />
            <Route exact path="/post/:id" Component={Post} />
            <Route exact path="/login" Component={Login} />
            <Route exact path="/registration" Component={Registration} />
            <Route exact path="/profile/:id" Component={ProfilePage} />
            <Route path="*" Component={ErrorPage} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
