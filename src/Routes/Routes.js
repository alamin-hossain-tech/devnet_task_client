import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main/Main";
import EditProduct from "../Pages/EditProduct/EditProduct";
import Products from "../Pages/Products/Products";
import ViewProduct from "../Pages/ViewProduct/ViewProduct";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Products></Products>,
      },
      {
        path: "product/view/:id",
        element: <ViewProduct></ViewProduct>,
        loader: ({ params }) =>
          fetch(`https://devnest-task-server.vercel.app/product/${params.id}`),
      },
      {
        path: "/edit/:id",
        element: <EditProduct></EditProduct>,
      },
    ],
  },
]);
