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
import { Link, useLoaderData, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const product = useLoaderData();
  const id = product._id;
  const router = useNavigate();
  const imghostkey = "d97d482501a67311603442b3ef683399";
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm();

  const handleEditProduct = (data) => {
    setLoading(true);
    const image = data.productImage[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imghostkey}`;
    if (image) {
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
            fetch(`http://localhost:5000/edit/${id}`, {
              method: "PUT",
              headers: { "content-type": "application/json" },
              body: JSON.stringify(product),
            })
              .then((res) => res.json())
              .then((result) => {
                toast.success("Product Updated Successfully");
                setLoading(false);
                setTimeout(() => router("/"), 1500);
              });
          } else {
            toast.error("Provide a Valid image file");
            setLoading(false);
          }
        });
    } else {
      const product = {
        name: data.productName,
        category: data.productCategory,
        seller: data.productSeller,
        price: data.productPrice,
        stock: data.productStock,
        ratings: data.productRating,
      };
      fetch(`http://localhost:5000/edit/${id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(product),
      })
        .then((res) => res.json())
        .then((result) => {
          toast.success("Product Updated Successfully");
          setLoading(false);
          setTimeout(() => router("/"), 1500);
        });
    }
  };
  return (
    <div className="bg-gray-200 h-[91.4vh]">
      <div className="px-6 container mx-auto pt-5">
        <h2 className="text-4xl font-semibold pb-2">Editing {product.name}</h2>
        <Breadcrumb aria-label="Default breadcrumb example">
          <Breadcrumb.Item icon={() => <BsHouseDoor className="mr-1" />}>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Edit</Breadcrumb.Item>
        </Breadcrumb>
        <div className="pt-5">
          {" "}
          <img src={product.img} className="w-48 shadow my-3 rounded" alt="" />
          <form
            onSubmit={handleSubmit(handleEditProduct)}
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
                  defaultValue={product.name}
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
                  defaultValue={product.category}
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
                  defaultValue={product.seller}
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
                  defaultValue={product.price}
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
                  defaultValue={product.ratings}
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
                  defaultValue={product.stock}
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
                {...register("productImage")}
              />
            </div>
            <div className="py-3">{loading && <Spinner></Spinner>}</div>
            <div className="flex gap-3">
              <Button className="w-32 mt-3" type="submit">
                Edit
              </Button>
              <Link to="/">
                <Button color="failure" className="w-32 mt-3" type="submit">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
          <Toaster />
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
