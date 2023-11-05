import Navbar from "./comonents/navbar/navbar";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./pages/home/home";
import Footer from "./comonents/footer/footer.js";
import Ttoimg from "./pages/texttoimg/ttoimg";
import  Login  from "./login/login";
import Prebuilt from "./comonents/prebuilt/prebuilt";
import { Img } from "./comonents/prebuilt/gigcard/gigcard";
import Register from "./pages/registration/registration";
import Imgc from "./pages/imgchanges/imgc";
import Forgotpass from "./pages/forgotpassword/forgotpass";
import Profile from "./pages/profile/profile";
import EditProfile from "./pages/editprofile/editprofile";
import Saved from "./pages/saved/saved";
function App() {
  const Layout = () => {
    return (
      <div className="app">
        <Navbar />
        <Outlet />
        <Footer/>
      </div>
    );
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/texttoimg",
          element: <Ttoimg />,
        },
        {
          path: "/prebuilt",
          element: <Prebuilt />,
        },
        {
          path: "/image",
          element: <Img />,
        },
        {
          path: "/imgchnage",
          element: <Imgc />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/editprofile",
          element: <EditProfile />,
        },
        {
          path: "/saved",
          element: <Saved />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/recovery",
      element: <Forgotpass />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
