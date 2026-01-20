import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import {appStore} from "./utils/store";
import { Provider } from "react-redux";
import Feed from "./components/Feed";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      Component: Body,
      children:[
        {path:'/',Component:Feed},
        {path:"/login",Component:Login},
        {path:"/profile",Component:Profile}
      ]
    }
  ]);
  return (
    <>
      {/* <Navbar />
      <div className="mx-2 mt-2"> Hello world</div> */}
          <Provider store={appStore}>
            <RouterProvider router={router} />
          </Provider>

    </>
  );
}

export default App;
