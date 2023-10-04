import React from "react";

function Logout({ logout }) {
  return (
    <button
      onClick={logout}
      className="btn ml-3 hover:bg-white hover:text-black"
    >
      Logout
    </button>
  );
}

export default Logout;
