"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/custom/custom-input";
import {
  getCategoriesAndSites,
  getProducts,
  insertProduct,
  updateProduct,
} from "@/firebaseConfig/firebase";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sites } from "./index";
import { toast } from "sonner";
import useEditModal from "@/hooks/modals/useEditProductModal";

const initialFromData = {
  name: "",
  description: "",
  image_url: "",
  link: "",
  price: "",
  discount: null,
  total_items: null,
  total_sold: null,
};
const DownloadJson = ({ type, currentProduct, setProducts }) => {
  const { isOpen, onOpen, onClose } = useEditModal();
  const [categories, setCategories] = useState(null);
  const [formData, setFormData] = useState(initialFromData);
  const [deal_of_the_day, setDealOfTheDay] = useState(false);

  const [site, setSite] = useState("amazon");
  const [category, setCategory] = useState("Electronics");
  const [jsonData, setJsonData] = useState([]);

  const handleFormFieldChange = (e) => {
    let { name, value, type } = e.target;
    if (type === "number") value = parseInt(value, 10);
    setFormData({ ...formData, [name]: value });
  };

  const clearForm = () => {
    setFormData(initialFromData);
    setDealOfTheDay(false);
    setSite("amazon");
    setCategory("Electronics");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === "edit") {
      updateProduct({
        Category: category,
        Products: [
          {
            ...formData,
            deal_of_the_day,
            site,
            id: currentProduct.id,
          },
        ],
      }).then((res) => {
        toast.success("Product Updated Successfully");
        getProducts().then((res) => {
          setProducts(res);
          onClose();
          clearForm();
        });
      });
      return;
    }
    insertProduct({
      Category: category,
      Products: [
        {
          ...formData,
          deal_of_the_day,
          site,
          id: Date.now() + Date.now() * Math.random() * 10000 + "",
        },
      ],
    }).then((res) => {
      toast.success("Product Added Successfully");
      clearForm();
    });
  };

  const downloadJson = () => {
    // Convert the JSON data to a string
    const dataStr = JSON.stringify(jsonData);
    // Create a Blob object with the JSON string
    const blob = new Blob([dataStr], { type: "application/json" });
    // Create a link element, use it to download the Blob
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "data.json";
    document.body.appendChild(link);
    link.click();
    // Clean up by revoking the Object URL and removing the link
    URL.revokeObjectURL(url);
    link.remove();
    setJsonData([]);
  };

  useEffect(() => {
    if (type === "edit") {
      console.log("edit", currentProduct);
      setFormData(currentProduct);
      setDealOfTheDay(currentProduct.deal_of_the_day);
      setSite(currentProduct.site);
      setCategory(currentProduct.category.name);
    }
  }, [currentProduct, type]);
  useEffect(() => {
    getCategoriesAndSites().then((res) => {
      setCategories(res.categories);
    });
  }, []);
  return (
    <div className="w-[100%] flex gap-6 mx-auto">
      <form
        style={{ width: type === "edit" ? "95%" : "70%" }}
        onSubmit={handleSubmit}
        className="py-6 w-[70%] flex gap-6 px-6  mx-auto"
      >
        <div className="w-[50%] flex flex-col gap-2">
          <CustomInput
            value={formData.name}
            required
            name="name"
            onChange={handleFormFieldChange}
            className={"w-full"}
            label={"Name"}
            placeholder="Product Name"
          />
          <CustomInput
            value={formData.description}
            required
            name="description"
            onChange={handleFormFieldChange}
            className={"w-full"}
            label={"Description"}
            placeholder="Description"
          />
          <CustomInput
            value={formData.image_url}
            required
            name="image_url"
            onChange={handleFormFieldChange}
            className={"w-full"}
            label={"Image Url"}
            placeholder="Image Url"
          />
          <CustomInput
            required
            value={formData.link}
            name="link"
            onChange={handleFormFieldChange}
            className={"w-full"}
            label={"Link"}
            placeholder="Link"
          />
          <CustomInput
            value={formData.price}
            required
            type="number"
            name="price"
            onChange={handleFormFieldChange}
            className={"w-full"}
            label={"Orignal Price"}
            placeholder="Original Price Without Discount"
          />
          <CustomInput
            value={formData.discount}
            required
            type="number"
            name="discount"
            onChange={handleFormFieldChange}
            className={"w-full"}
            label={"Discount"}
            placeholder="Discount (In Percentage)"
          />
        </div>
        <div className="flex w-[50%] flex-col gap-2">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-gray-600">
              Deal of the day
            </p>
            <Select
              required
              onValueChange={(value) =>
                setDealOfTheDay(value === "Yes" ? true : false)
              }
              value={deal_of_the_day === true ? "Yes" : "No"}
            >
              <SelectTrigger>
                <SelectValue placeholder="Deal Of The Day" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"Yes"}>Yes</SelectItem>
                <SelectItem value={"No"}>No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <CustomInput
            value={formData.total_items}
            required
            name="total_items"
            onChange={handleFormFieldChange}
            label={"Total Items"}
            type="number"
            placeholder="Total Items"
          />
          <CustomInput
            value={formData.total_sold}
            required
            name="total_sold"
            onChange={handleFormFieldChange}
            label={"Total Items Sold"}
            type="number"
            placeholder="Total Items Sold"
          />
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-gray-600">Site</p>
            <Select
              required
              onValueChange={(value) => setSite(value.toLowerCase())}
              value={site}
            >
              <SelectTrigger>
                <SelectValue placeholder="Product Site" />
              </SelectTrigger>
              <SelectContent>
                {sites?.map((site) => {
                  return (
                    <SelectItem value={site.name.toLowerCase()} key={site}>
                      {site.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-gray-600">Category</p>
            <Select
              required
              value={currentProduct?.category?.name || category}
              onValueChange={(value) => setCategory(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Product Category" />
              </SelectTrigger>
              <SelectContent>
                {categories?.map((site) => {
                  return (
                    <SelectItem value={site} key={site}>
                      {site}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          <Button className="mt-6" type="submit">
            Add
          </Button>
          {jsonData.length > 0 && (
            <Button onClick={downloadJson}>
              Download (
              {jsonData.reduce(
                (count, item) => count + item.Products.length,
                0
              )}
              )
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default DownloadJson;
