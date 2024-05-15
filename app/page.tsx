"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "@/firebaseConfig/firebase";
import DeleteConfirmationModal from "@/components/modals/delete-confirmation-modal";
import useDeleteConfirmationModal from "@/hooks/modals/useDeleteConfirmationModal";
import EditModal from "@/components/modals/edit-modal";
import useEditModal from "@/hooks/modals/useEditProductModal";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { UserButton } from "@clerk/nextjs";
export default function Dashboard() {
  const { isOpen, onOpen, onClose } = useDeleteConfirmationModal();
  const {
    isOpen: editModalIsOpen,
    onOpen: editModalOnOpen,
    onClose: editModalOnClose,
  } = useEditModal();
  const [currentProduct, setCurrentProduct] = useState(null);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
    });
  }, []);

  return (
    <div className="overflow-x-auto w-[90%] mx-auto py-5">
      <div className="flex justify-between items-center gap-4 mb-4">
        <h1 className="py-4 text-2xl font-semibold text-gray-700">
          Offers4Deals Dashboard
        </h1>
        <div className="flex gap-2 items-center">
          <Link href={"/dashboard"}>
            <Button variant={"ghost"}>Add Products</Button>
          </Link>
          <UserButton />
        </div>
      </div>
      {products.length > 0 && (
        <table className="w-full table-auto border-collapse text-left">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">
                Name
              </th>
              <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">
                Category
              </th>

              <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">
                Price
              </th>
              <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">
                Discount
              </th>
              <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {products.map((product: any, ind) => (
              <tr key={ind}>
                <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">
                  {product.name}
                </td>
                <td>{product.category.name}</td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-400">
                  {product.price}
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-400">
                  {product.discount}
                </td>
                <td className="px-4 py-3 flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                  <Button
                    onClick={() => {
                      setCurrentProduct(product);
                      editModalOnOpen();
                    }}
                    size="icon"
                    variant="ghost"
                  >
                    <Icon icon="bxs:edit" className="w-6 h-6" />
                  </Button>
                  <Button
                    onClick={() => {
                      setCurrentProduct(product);
                      onOpen();
                    }}
                    size="icon"
                    variant="ghost"
                  >
                    <TrashIcon className="h-5 w-5" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {currentProduct && (
        <DeleteConfirmationModal
          product={currentProduct}
          handleSubmit={() =>
            deleteProduct(currentProduct).then(async () => {
              const res = await getProducts();
              setProducts(res);
              onClose();
              setCurrentProduct(null);
            })
          }
        />
      )}
      {currentProduct && (
        <EditModal
          setProducts={setProducts}
          currentProduct={currentProduct}
          type="edit"
        />
      )}
    </div>
  );
}

function DeleteIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" />
      <line x1="18" x2="12" y1="9" y2="15" />
      <line x1="12" x2="18" y1="9" y2="15" />
    </svg>
  );
}

function TrashIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
