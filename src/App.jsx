import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Body from "./Body";
import Login from "./Login";
import Profile from "./Profile";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      Component: Body,
      children:[
        {path:"/login",Component:Login},
        {path:"/profile",Component:Profile}
      ]
    }
  ]);
  return (
    <>
      {/* <Navbar />
      <div className="mx-2 mt-2"> Hello world</div> */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
