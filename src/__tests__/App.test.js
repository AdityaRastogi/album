/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/prefer-screen-queries */

import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";
import { render } from "@testing-library/react";
import { createBrowserRouter } from 'react-router-dom'; 
import appStore from "../utils/appStore"
import App from "../App";
import Dashboard from '../Dashboard';
import List from '../List';
import Error from '../Error';

describe("App", () => {
      // Mock router instance
  const mockedRouter = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
      errorElement: <Error />,
    },
    {
      path: "/list",
      element: <List />,
      errorElement: <Error />,
    },
  ]);
  test("should load", async () => {
    const app = async () =>
      await act(async () =>
        render(
          <Provider store={appStore}>
            <App />
          </Provider>,
        ),
      );

    const { getByTestId } = await app();

    const applayout = getByTestId("app");
    expect(applayout).toBeDefined();
  });
  
});