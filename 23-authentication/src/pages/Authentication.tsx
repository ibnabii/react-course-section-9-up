import AuthForm from "../components/AuthForm";
import { ActionFunction, redirect } from "react-router-dom";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export const action: ActionFunction = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  if (mode !== "login" && mode !== "signup") {
    throw new Response(JSON.stringify({ message: "Unsupported mode." }), {
      status: 422,
    });
  }

  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch("http://localhost:8080/" + mode, {
    method: "POST",
    body: JSON.stringify(authData),
    headers: { "Content-Type": "application/json" },
  });

  if (response.status === 422 || response.status === 401) {
    return await response.json();
  }

  if (!response.ok) {
    throw new Response(JSON.stringify(await response.json()), {
      status: response.status,
    });
  }

  return redirect("/");
};
