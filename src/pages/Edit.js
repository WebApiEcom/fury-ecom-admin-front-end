import React from "react";
import { Switch, Route, Link } from "react-router-dom";

function Edit(props) {
  const { match } = props;

  return (
    <div>
      <h1>I'm Edit</h1>
      <button>
        <Link to="/dashboard/edit/new">New Item</Link>
      </button>
    </div>
  );
}

export default Edit;
