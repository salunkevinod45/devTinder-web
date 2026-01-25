import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { appStore } from "./utils/store";
import { Provider } from "react-redux";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      Component: Body,
      children: [
        { path: "/", Component: Feed },
        { path: "/login", Component: Login },
        { path: "/profile", Component: Profile },
        { path: "/connections", Component: Connections },
        { path: "/requests", Component: Requests },
      ],
    },
  ]);
  return (
    <>
      <Provider store={appStore}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
