import { Link, useRouteError } from "react-router-dom";

const Error = () => {
  const errors = useRouteError();
  return (
    <div className="m-16 mx-auto text-center">
      <h1 className="text-4xl text-red-500 font-bold">OOPS!!! wrong page</h1>
      <h2 className="text-2xl text-red-400 font-regular">
        Something went wrong
      </h2>
      <h3 className="text-2xl text-red-400 font-regular">
        {errors?.status} : {errors?.statusText}
      </h3>

      <Link className="text-4xl  text-green-400 font-bold" to={"/"}>
        Click her to go to HOME PAGE
      </Link>
    </div>
  );
};

export default Error;