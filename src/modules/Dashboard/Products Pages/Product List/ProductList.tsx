import { CommonTable } from "@/components/common/Common Table/CommonTable";
import React from "react";

const ProductList = () => {
  // Sample data
  const data = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      photo:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&q=80",
      status: "active",
      designation: "hello",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      photo:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&q=80",
      status: "inactive",
      designation: "hello",
    },
  ];

  return (
    <div>
      <div>
        <CommonTable
          topBtnLink="/dashboard/products/product-add"
          topBtnValue="Add Product"
          data={data}
        />
      </div>
    </div>
  );
};

export default ProductList;
