import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main/Main";
import Products from "../Pages/Products/Products";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Products></Products>,
      },
    ],
  },
]);
