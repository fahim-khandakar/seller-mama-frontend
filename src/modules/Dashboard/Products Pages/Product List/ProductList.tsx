"use client";

import CommonTable from "@/components/common/Common Table/CommonTable";
import React, { useEffect, useState } from "react";
import { tableHeader, tableLayout } from "./config/constants";
import { getFromCookie } from "@/shared/helpers/localStorage";
import { authKey } from "@/shared/config/constants";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "@/redux/features/product";
import { useSearchParams } from "next/navigation";
import { constructQuery } from "@/shared/helpers/constructQuery";
import { WarningToast } from "@/shared/helpers/warningSwal";
import Modal from "@/components/common/Modal/Modal";
import ProductAdd from "../Product Add/ProductAdd";
import ProductEdit from "../Product Edit/ProductEdit";
import { showToast } from "@/shared/helpers/showToast";

const ProductList = () => {
  const token = getFromCookie(authKey);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const limit = 10;
  const [totalItems, setTotalItems] = useState();
  const [id, setId] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const searchParams = useSearchParams();
  const query = constructQuery({
    searchParams,
    limit,
    page: currentPage,
  });

  const {
    data: productData,
    isLoading,
    isFetching,
  } = useGetProductsQuery({ token, query });
  const [deleteProduct, { isLoading: deleteLoading }] =
    useDeleteProductMutation();
  console.log("product ", productData);

  useEffect(() => {
    if (productData?.success) {
      setTotalItems(productData?.meta?.totalItems);
      setCurrentPage(productData?.meta?.currentPage);
    }
  }, [productData]);

  const handleDelete = async (id?: string) => {
    const result = await deleteProduct({ id, token });
    showToast(result);
  };

  const handleEditModal = (id: string) => {
    setId(id);
    setEditModalOpen(true);
  };

  const handleAddModal = () => {
    setAddModalOpen(true);
  };

  return (
    <div>
      <CommonTable
        title="Products List"
        loading={isLoading || deleteLoading || isFetching}
        dataLayout={tableLayout}
        headerData={tableHeader}
        itemData={productData?.data}
        deleteBtn
        deleteFn={(id) => WarningToast(handleDelete, id)}
        modalFunction={(id) => handleEditModal(id)}
        handleFunCall={handleAddModal}
        modalForEdit
        funBtnValue="Add User"
        pagination
        totalItems={totalItems}
        currentPage={currentPage}
        limit={limit}
        setCurrentPage={setCurrentPage}
        isSearch
      />

      {/* User Edit Modal */}
      <Modal
        isOpen={editModalOpen}
        description="Here you can edit product information."
        setIsOpen={setEditModalOpen}
        header="Product Edit"
      >
        <ProductEdit id={id} setIsOpen={setEditModalOpen} />
      </Modal>

      {/* User Add Modal */}
      <Modal
        isOpen={addModalOpen}
        description="Here you can add a new product."
        setIsOpen={setAddModalOpen}
        header="Product Add"
      >
        <ProductAdd setIsOpen={setAddModalOpen} />
      </Modal>
    </div>
  );
};

export default ProductList;
