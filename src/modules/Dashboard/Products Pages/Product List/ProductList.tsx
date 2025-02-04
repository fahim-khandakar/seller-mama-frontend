import CommonTable from "@/components/common/Common Table/CommonTable";
import React from "react";
import { tableHeader, tableLayout } from "./config/constants";

const ProductList = () => {
  // Sample data
  const data = [
    {
      _id: 1,
      name: "John Doe",
      email: "john@example.com",
      photo:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&q=80",
      status: "active",
      designation: "hello",
    },
    {
      _id: 2,
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
      <CommonTable
        dataLayout={tableLayout}
        headerData={tableHeader}
        itemData={data}
      />
    </div>
  );
};

export default ProductList;
