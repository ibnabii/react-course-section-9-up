import classes from "./Auth.module.css";
import { DispatchType } from "../store";
import { useDispatch } from "react-redux";
import { FormEvent } from "react";
import { authActions } from "../store/auth.ts";

const Auth = () => {
  const dispatch: DispatchType = useDispatch();
  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(authActions.login());
  }

  return (
    <main className={classes.auth}>
      <section>
        <form onSubmit={handleLogin}>
          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
          <button>Login</button>
        </form>
      </section>
    </main>
  );
};

export default Auth;
