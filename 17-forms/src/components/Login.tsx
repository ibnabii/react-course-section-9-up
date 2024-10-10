import { ChangeEvent, FormEvent, useState } from "react";

type ValuesType = {
  email: string;
  password: string;
};
export default function Login() {
  // const [enteredEmail, setEnteredEmail] = useState<string>("");
  // const [enteredPassword, setEnteredPassword] = useState<string>("");
  const [enteredValues, setEnteredValues] = useState<ValuesType>({
    email: "",
    password: "",
  });

  // function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
  //   setEnteredEmail(event.target.value);
  // }
  //
  // function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
  //   setEnteredPassword(event.target.value);
  // }

  function handleInputChange(identifier: string, value: string) {
    setEnteredValues((prevState) => ({
      ...prevState,
      [identifier]: value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(enteredValues);
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            onChange={(event) => handleInputChange("email", event.target.value)}
            value={enteredValues.email}
          />
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={enteredValues.password}
            onChange={(event) =>
              handleInputChange("password", event.target.value)
            }
          />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
