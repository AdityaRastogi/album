import { Link, useRouteError } from "react-router-dom";
import { Constants } from "./utils/appConstants";

const Error = () => {
  const errors = useRouteError();
  return (
    <div data-testid="error-page">
      <h1 data-testid="error-page-title">{Constants.errorPage.title}</h1>
      <h2 data-testid="error-page-heading">{Constants.errorPage.heading}</h2>
      <h3 data-testid="error-page-error-text">
        {errors?.status} : {errors?.statusText}
      </h3>

      <Link data-testid="error-page-link" to={"/"}>
        {Constants.errorPage.goToHomePage}
      </Link>
    </div>
  );
};

export default Error;
