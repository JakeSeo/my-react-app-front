import React, { useEffect, useState, useContext } from "react";
import { useImmer } from "use-immer";
import Axios from "axios";
import DispatchContext from "../DispatchContext";
import FlashMessages from "./FlashMessages";

function HeaderLoggedOut(props) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const appDispatch = useContext(DispatchContext);
  const [state, setState] = useImmer({
    usernameIsBlank: false,
    passwordIsBlank: false
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (username && password) {
        const response = await Axios.post("/login", { username, password });
        if (response.data) {
          appDispatch({ type: "login", data: response.data });
          appDispatch({ type: "flashMessage", value: "You have successfully logged in.", color: "green" });
        } else {
          console.log("Incorrect username / password.");
          appDispatch({ type: "flashMessage", value: "Invalid username / password.", color: "red" });
        }
      } else {
        setState(draft => {
          if (username) {
            draft.usernameIsBlank = false;
          } else {
            draft.usernameIsBlank = true;
          }
          if (password) {
            draft.passwordIsBlank = false;
          } else {
            draft.passwordIsBlank = true;
          }
        });
      }
    } catch (e) {
      console.log("There was a problem.");
      console.log(e);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-0 pt-2 pt-md-0">
      <div className="row align-items-center">
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <input
            onChange={e => {
              setUsername(e.target.value);
              setState(draft => {
                draft.usernameIsBlank = false;
              });
            }}
            name="username"
            className={"form-control form-control-sm input-dark " + (state.usernameIsBlank ? "is-invalid" : "")}
            type="text"
            placeholder="Username"
            autoComplete="off"
          />
        </div>
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <input
            onChange={e => {
              setPassword(e.target.value);
              setState(draft => {
                draft.passwordIsBlank = false;
              });
            }}
            name="password"
            className={"form-control form-control-sm input-dark " + (state.passwordIsBlank ? "is-invalid" : "")}
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="col-md-auto">
          <button className="btn btn-success btn-sm">Sign In</button>
        </div>
      </div>
    </form>
  );
}

export default HeaderLoggedOut;
