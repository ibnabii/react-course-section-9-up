import { FormEvent, useState } from "react";

type ValuesType = {
  email: string;
  password: string;
};

type BlurType = {
  email: boolean;
  password: boolean;
};
export default function Login() {
  // const [enteredEmail, setEnteredEmail] = useState<string>("");
  // const [enteredPassword, setEnteredPassword] = useState<string>("");
  const [enteredValues, setEnteredValues] = useState<ValuesType>({
    email: "",
    password: "",
  });

  const [didEdit, setDidEdit] = useState<BlurType>({
    email: false,
    password: false,
  });

  const emailIsInvalid = didEdit.email && !enteredValues.email.includes("@");

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

    //   to remove the error when user is typing
    setDidEdit((prevState) => ({
      ...prevState,
      [identifier]: false,
    }));
  }

  function handleInputBlur(identifier: string) {
    setDidEdit((prevState) => ({
      ...prevState,
      [identifier]: true,
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
            onBlur={() => handleInputBlur("email")}
          />
          <div className="control-error">
            {emailIsInvalid && <p>Please enter a valid email address</p>}
          </div>
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
            onBlur={() => handleInputBlur("password")}
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
