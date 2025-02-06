"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  limit: number;
  setCurrentPage: (currentPage: number) => void;
}

const PaginationPage: React.FC<PaginationProps> = ({
  currentPage = 1,
  totalItems = 0,
  limit = 10,
  setCurrentPage,
}) => {
  const [inputValue, setInputValue] = useState<number | "">("");
  const numberOfPages = Math.ceil(totalItems / limit) || 0;

  useEffect(() => {
    if (currentPage > numberOfPages) {
      setCurrentPage(1);
    }
  }, [currentPage, numberOfPages, setCurrentPage]);

  useEffect(() => {
    setInputValue(currentPage);
  }, [currentPage]);

  if (totalItems <= 0) return null;

  const handleItemsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? "" : parseInt(e.target.value, 10);
    setInputValue(value);

    if (typeof value === "number" && value >= 1 && value <= numberOfPages) {
      setCurrentPage(value);
    }
  };

  const handleBlur = () => {
    if (inputValue === "") {
      setInputValue(currentPage);
    } else if (typeof inputValue === "number") {
      if (inputValue < 1) {
        setInputValue(1);
        setCurrentPage(1);
      } else if (inputValue > numberOfPages) {
        setInputValue(numberOfPages);
        setCurrentPage(numberOfPages);
      }
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < numberOfPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers: (number | "...")[] = [];

    if (numberOfPages <= 5) {
      for (let i = 1; i <= numberOfPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pageNumbers.push(i);
        pageNumbers.push("...");
        pageNumbers.push(numberOfPages);
      } else if (currentPage > numberOfPages - 3) {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = numberOfPages - 3; i <= numberOfPages; i++)
          pageNumbers.push(i);
      } else {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++)
          pageNumbers.push(i);
        pageNumbers.push("...");
        pageNumbers.push(numberOfPages);
      }
    }

    return pageNumbers.map((page, index) =>
      typeof page === "number" ? (
        <Button
          key={index}
          onClick={() => setCurrentPage(page)}
          variant={currentPage === page ? "default" : "outline"}
          className="px-3"
        >
          {page}
        </Button>
      ) : (
        <Button key={index} disabled variant="ghost" className="px-3">
          {page}
        </Button>
      )
    );
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-5 p-2 w-full">
      <p className="text-gray-700">
        Total: <span className="font-semibold">{totalItems}</span>
      </p>

      <div className="flex items-center gap-2">
        <Button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          variant="default"
        >
          Prev
        </Button>
        {renderPageNumbers()}
        <Button
          onClick={handleNextPage}
          disabled={currentPage === numberOfPages}
          variant="default"
        >
          Next
        </Button>
        <Input
          type="number"
          value={inputValue}
          onChange={handleItemsPerPage}
          onBlur={handleBlur}
          className="w-16 text-center"
          min="1"
          max={numberOfPages}
        />
      </div>
    </div>
  );
};

export default PaginationPage;
