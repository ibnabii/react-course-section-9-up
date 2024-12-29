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

  const errorData = JSON.parse(error.data);

  if (error.status === 404) {
    title = "Not found!";
    message = "Could not find resource or page.";
  }

  if (errorData.message) {
    message = errorData.message;
  }

  if (errorData.title) {
    title = errorData.title;
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
