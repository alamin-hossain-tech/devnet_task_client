import { Breadcrumb, Button, Modal, Spinner, Table } from "flowbite-react";
import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { BsHouseDoor, BsPlus } from "react-icons/bs";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

const Products = () => {
  const [page, setPage] = useState(0);

  const [deleteId, setDeleteId] = useState(null);

  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const { data, refetch, isLoading } = useQuery({
    queryKey: [page],
    queryFn: () =>
      fetch(
        `https://devnest-task-server.vercel.app/products?page=${page}`
      ).then((res) => res.json()),
  });

  const handleDelete = (id) => {
    fetch(`https://devnest-task-server.vercel.app/delete/${id}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged === true) {
          setOpenConfirmModal(false);
          toast.success("Deleted Succesfully");
          refetch();
        }
      });
  };

  const pages = Math.ceil(data?.count / 5);

  if (isLoading) {
    return (
      <div className=" text-center bg-white h-64 flex items-center justify-center">
        <Spinner aria-label="Center-aligned spinner example" />
      </div>
    );
  }

  return (
    <div className="bg-gray-200 h-[91.4vh]">
      <div className="px-6 container mx-auto pt-5">
        <h2 className="text-4xl font-semibold pb-2">Product List</h2>
        <Breadcrumb aria-label="Default breadcrumb example">
          <Breadcrumb.Item icon={() => <BsHouseDoor className="mr-1" />}>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Products</Breadcrumb.Item>
        </Breadcrumb>
        <div className="flex gap-3 md:gap-0 items-center justify-between pt-8">
          <Link to="/add-products">
            <Button>
              <BsPlus></BsPlus>Add Product
            </Button>
          </Link>
        </div>
        <div className="pt-8">
          {isLoading ? (
            <div className=" text-center bg-white h-64 flex items-center justify-center">
              <Spinner aria-label="Center-aligned spinner example" />
            </div>
          ) : (
            <Table>
              <Table.Head>
                <Table.HeadCell>Product name</Table.HeadCell>
                <Table.HeadCell>Color</Table.HeadCell>
                <Table.HeadCell>Category</Table.HeadCell>
                <Table.HeadCell>Price</Table.HeadCell>
                <Table.HeadCell>
                  <span className="sr-only">View</span>
                </Table.HeadCell>
                <Table.HeadCell>
                  <span className="sr-only">Edit</span>
                </Table.HeadCell>
                <Table.HeadCell>
                  <span className="sr-only">Delete</span>
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {!isLoading &&
                  data?.products?.map((product) => (
                    <Table.Row
                      key={product._id}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white flex gap-1 items-center">
                        <img src={product.img} alt="" className="w-16" />
                        {product.name}
                      </Table.Cell>
                      <Table.Cell>{product.stock}</Table.Cell>
                      <Table.Cell>{product.category}</Table.Cell>
                      <Table.Cell>{product.price + "$"}</Table.Cell>
                      <Table.Cell>
                        <Link
                          to={`/product/view/${product._id}`}
                          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                        >
                          View
                        </Link>
                      </Table.Cell>
                      <Table.Cell>
                        <Link
                          to={`/edit/${product._id}`}
                          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                        >
                          Edit
                        </Link>
                      </Table.Cell>
                      <Table.Cell>
                        <Link
                          onClick={() => {
                            setOpenConfirmModal(true);
                            setDeleteId(product._id);
                          }}
                          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                        >
                          Delete
                        </Link>
                        <Modal
                          show={openConfirmModal}
                          size="md"
                          popup={true}
                          onClose={() => setOpenConfirmModal(false)}
                        >
                          <Modal.Header />
                          <Modal.Body>
                            <div className="text-center">
                              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                Are you sure you want to delete this product?
                              </h3>
                              <div className="flex justify-center gap-4">
                                <Button
                                  color="failure"
                                  onClick={() => handleDelete(deleteId)}
                                >
                                  Yes, I'm sure
                                </Button>
                                <Button
                                  color="gray"
                                  onClick={() => setOpenConfirmModal(false)}
                                >
                                  No, cancel
                                </Button>
                              </div>
                            </div>
                          </Modal.Body>
                        </Modal>
                      </Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table>
          )}
          {data.products.length === 0 && (
            <div className="bg-white dark:border-gray-700 dark:bg-gray-800 text-center py-3 my-2 rounded-lg shadow-lg">
              <h2 className="font-semibold text-xl">Sorry! No Prodcut Found</h2>
            </div>
          )}
        </div>

        <div className="text-center pt-5">
          <nav aria-label="Page navigation example">
            <ul className="inline-flex flex-wrap md:flex-nowrap items-center -space-x-px">
              <li>
                <Link
                  onClick={() => page > 0 && setPage(page - 1)}
                  className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </Link>
              </li>
              {!isLoading &&
                [...Array(pages || 0).keys()].map((number, i) => (
                  <li key={i}>
                    <Link
                      onClick={() => setPage(number)}
                      className={`${
                        page === number && "selected"
                      } px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                    >
                      {number + 1}
                    </Link>
                  </li>
                ))}

              <li>
                <Link
                  onClick={() => page < pages - 1 && setPage(page + 1)}
                  className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Next</span>
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </Link>
              </li>
            </ul>
          </nav>
          <Toaster />
        </div>
      </div>
    </div>
  );
};

export default Products;
