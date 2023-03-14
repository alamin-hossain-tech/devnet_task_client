import { Breadcrumb, Card } from "flowbite-react";
import React from "react";
import { BsHouseDoor } from "react-icons/bs";
import { Link, useLoaderData } from "react-router-dom";

const ViewProduct = () => {
  const product = useLoaderData();
  console.log(product);
  return (
    <div className="bg-gray-200 h-[91.4vh]">
      <div className="px-6 container mx-auto pt-5">
        <h2 className="text-4xl font-semibold pb-2">Viewing {product.name}</h2>
        <Breadcrumb aria-label="Default breadcrumb example">
          <Breadcrumb.Item icon={() => <BsHouseDoor className="mr-1" />}>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{product.name}</Breadcrumb.Item>
        </Breadcrumb>
        <div className="pt-5 detail_product">
          <Card imgSrc={product.img} className="mx-auto">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {product.name}
            </h5>
            <div className="font-semibold">
              <p>Category: {product.category}</p>
              <p>Seller: {product.seller}</p>
              <p>Qunatity: {product.stock}</p>
              <p>Rating: {product.ratings}</p>
              <p>Price: {product.price}$</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
