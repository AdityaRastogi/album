import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import "./App.scss";
import Dashboard from "./Dashboard";
import List from "./List";
import Error from "./Error";
import appStore from "./utils/appStore";

function App() {
  return (
    <Provider store={appStore}>
      <div data-testid="app">
        <RouterProvider router={appRouter} />
      </div>
    </Provider>
  );
}

//Routing config
const appRouter = createBrowserRouter([
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

export default App;
