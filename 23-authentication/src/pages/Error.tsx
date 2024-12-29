import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

import PageContent from "../components/PageContent";

type MyError = {
  status: number;
  data: string;
};

function ErrorPage() {
  const error = useRouteError() as MyError;

  let title = "An error occurred!";
  let message = "Something went wrong!";

  let errorData = null;
  try {
    // Attempt to parse error.data as JSON
    errorData = error.data ? JSON.parse(error.data) : null;
    if (errorData.message) {
      message = errorData.message;
    }

    if (errorData.title) {
      title = errorData.title;
    }
  } catch (e) {
    // If parsing fails, log the error and set errorData to null
    errorData = null;
  }

  if (error.status === 404) {
    title = "Not found!";
    message = "Could not find resource or page.";
  }

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}

export default ErrorPage;
