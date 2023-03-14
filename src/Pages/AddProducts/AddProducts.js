import {
  Breadcrumb,
  Button,
  FileInput,
  Label,
  Spinner,
  TextInput,
} from "flowbite-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { BsHouseDoor } from "react-icons/bs";
import { Link } from "react-router-dom";

const AddProducts = () => {
  const imghostkey = "d97d482501a67311603442b3ef683399";
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  const handleAddProduct = (data) => {
    setLoading(true);
    console.log(data);
    const image = data.productImage[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imghostkey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        if (imageData.success) {
          const product = {
            name: data.productName,
            img: imageData.data.url,
            category: data.productCategory,
            seller: data.productSeller,
            price: data.productPrice,
            stock: data.productStock,
            ratings: data.productRating,
          };
          fetch("https://devnest-task-server.vercel.app/products", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(product),
          })
            .then((res) => res.json())
            .then((result) => {
              toast.success("Product Added Successfully");
              reset();
              setLoading(false);
            });
        } else {
          toast.error("Provide a Valid image file");
          setLoading(false);
        }
      });
  };

  return (
    <div className="bg-gray-200 h-[91.4vh]">
      <div className="px-6 container mx-auto pt-5">
        <h2 className="text-4xl font-semibold pb-2">Add Product</h2>
        <Breadcrumb aria-label="Default breadcrumb example">
          <Breadcrumb.Item icon={() => <BsHouseDoor className="mr-1" />}>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Add Products</Breadcrumb.Item>
        </Breadcrumb>
        <div className="pt-5">
          <form
            onSubmit={handleSubmit(handleAddProduct)}
            className="flex flex-col gap-4"
          >
            <div className="flex gap-2">
              <div className="w-2/3">
                <div className="mb-2 block">
                  <Label htmlFor="ProductName" value="Product Name" />
                </div>
                <TextInput
                  id="productName"
                  type="text"
                  placeholder="Product Name"
                  required={true}
                  {...register("productName")}
                />
              </div>
              <div className="flex-1">
                <div className="mb-2 block">
                  <Label htmlFor="Category" value="Product Category" />
                </div>
                <TextInput
                  id="Category"
                  type="text"
                  placeholder="Category"
                  required={true}
                  {...register("productCategory")}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <div className="mb-2 block">
                  <Label htmlFor="Seller" value="Seller" />
                </div>
                <TextInput
                  id="Seller"
                  type="text"
                  placeholder="Seller"
                  required={true}
                  {...register("productSeller")}
                />
              </div>
              <div className="flex-1">
                <div className="mb-2 block">
                  <Label htmlFor="Price" value="Price" />
                </div>
                <TextInput
                  id="Price"
                  type="number"
                  placeholder="Price"
                  required={true}
                  {...register("productPrice")}
                />
              </div>
              <div className="flex-1">
                <div className="mb-2 block">
                  <Label htmlFor="rating" value="Rating" />
                </div>
                <TextInput
                  id="rating"
                  type="number"
                  placeholder="Rating"
                  required={true}
                  step={0.1}
                  {...register("productRating")}
                />
              </div>
              <div className="flex-1">
                <div className="mb-2 block">
                  <Label htmlFor="Stock" value="Stock" />
                </div>
                <TextInput
                  id="Stock"
                  type="number"
                  placeholder="Stock"
                  required={true}
                  {...register("productStock")}
                />
              </div>
            </div>
            <div id="fileUpload">
              <div className="mb-2 block">
                <Label htmlFor="file" value="Product Image" />
              </div>
              <FileInput
                id="file"
                helperText="Dimension should be less than 400px"
                required={true}
                {...register("productImage")}
              />
            </div>
            <div className="py-3">{loading && <Spinner></Spinner>}</div>
            <Button className="mr-auto w-32 mt-3" type="submit">
              Add
            </Button>
          </form>
          <Toaster />
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
