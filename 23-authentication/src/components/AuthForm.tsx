import {
  Form,
  Link,
  useActionData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";

import classes from "./AuthForm.module.css";

type ActionData = {
  message: string; // A main message summarizing the error
  errors: {
    email?: string; // Specific error for email (optional)
    password?: string; // Specific error for password (optional)
    [key: string]: string | undefined; // Catch-all for additional fields
  };
};

function AuthForm() {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";

  const actionData = useActionData<ActionData>();

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? "Log in" : "Create a new user"}</h1>
        {actionData && actionData.errors && (
          <ul>
            {Object.values(actionData.errors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        {actionData && actionData.message && <p>{actionData.message}</p>}
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
            {isLogin ? "Create new user" : "Login"}
          </Link>
          <button disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Save"}
          </button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
