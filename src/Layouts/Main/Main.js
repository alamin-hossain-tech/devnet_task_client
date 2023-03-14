import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { BsBagPlus, BsBox } from "react-icons/bs";

const Main = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row">
        <div className="nav md:w-72 md:h-screen border-r">
          <Link to="/">
            <h1 className="text-center justify-center text-xl font-semibold border-b flex items-center  h-20 text-blue-600">
              DevNest Task
            </h1>
          </Link>

          <div className="pt-12">
            <ul className="flex flex-col justify-center gap-1 md:gap-5  text-lg font-semibold">
              <li>
                <NavLink to="/" className="flex gap-2 items-center px-8 py-2">
                  <BsBox className="inline"></BsBox>Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/add-products"
                  className="flex gap-2 items-center px-8 py-2"
                >
                  <BsBagPlus></BsBagPlus>Add Products
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full">
          <div className=" pr-4 md:px-32 d-none md:flex justify-end gap-4 items-center h-20  border-b-2"></div>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Main;
