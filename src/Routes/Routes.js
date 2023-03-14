import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main/Main";
import AddProducts from "../Pages/AddProducts/AddProducts";
import EditProduct from "../Pages/EditProduct/EditProduct";
import Error from "../Pages/Error/Error";
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
        path: "/add-products",
        element: <AddProducts></AddProducts>,
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
        loader: ({ params }) =>
          fetch(`https://devnest-task-server.vercel.app/product/${params.id}`),
      },
    ],
  },
  {
    path: "*",
    element: <Error></Error>,
  },
]);
