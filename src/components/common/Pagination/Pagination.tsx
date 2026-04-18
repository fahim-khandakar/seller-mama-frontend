'use client';

import React, { useEffect, useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage?: number;
  totalItems?: number;
  limit?: number;
  setCurrentPage?: Dispatch<SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage = 1,
  totalItems = 0,
  limit = 10,
  setCurrentPage,
}) => {
  const [inputValue, setInputValue] = useState<string | number>(currentPage);
  const numberOfPages = Math.ceil(totalItems / limit) || 0;

  useEffect(() => {
    if (currentPage > numberOfPages) {
      setCurrentPage?.(1);
    }
  }, [currentPage, numberOfPages, setCurrentPage]);

  useEffect(() => {
    setInputValue(currentPage);
  }, [currentPage]);

  if (totalItems <= 0) {
    return null;
  }

  const handleItemsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? '' : parseInt(e.target.value, 10);
    setInputValue(value);

    if (
      setCurrentPage &&
      typeof value === 'number' &&
      value <= numberOfPages &&
      value >= 1
    ) {
      setCurrentPage(value);
    }
  };

  const handleBlur = () => {
    if (inputValue === '') {
      setInputValue(currentPage);
    } else if (typeof inputValue === 'number') {
      if (inputValue < 1) {
        setInputValue(1);
        setCurrentPage?.(1);
      } else if (inputValue > numberOfPages) {
        setInputValue(numberOfPages);
        setCurrentPage?.(numberOfPages);
      }
    }
  };

  const handlePrevPage = () => {
    if (setCurrentPage && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (setCurrentPage && currentPage < numberOfPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (numberOfPages <= 5) {
      for (let i = 1; i <= numberOfPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(numberOfPages);
      } else if (currentPage > numberOfPages - 3) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = numberOfPages - 3; i <= numberOfPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(numberOfPages);
      }
    }

    return pageNumbers.map((page, index) =>
      typeof page === 'number' ? (
        <Button
          size={'sm'}
          disabled={currentPage === page}
          className={`${
            currentPage === page
              ? ''
              : 'bg-black text-gray-300 hover:bg-gray-500'
          } !px-2 text-[10px] h-7`}
          onClick={() => setCurrentPage?.(page)}
          key={index}
        >
          {page}
        </Button>
      ) : (
        <Button
          className="!px-2 text-[10px]  h-7"
          // size={"sm"}
          key={index}
          disabled
        >
          {page}
        </Button>
      ),
    );
  };

  return (
    <div className="flex justify-between w-full">
      <p className="mt-2">
        <span className="font-bold  ">Total: {totalItems}</span>
      </p>

      <div className=" flex flex-wrap gap-2 text-xs">
        <Button
          className="cursor-pointer !px-2 text-[10px]  h-7"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          <ChevronLeft />
        </Button>
        {renderPageNumbers()}
        <Button
          className="cursor-pointer !px-2 text-[10px]  h-7"
          onClick={handleNextPage}
          disabled={currentPage === numberOfPages}
        >
          <ChevronRight />
        </Button>
        <Input
          value={inputValue}
          onChange={handleItemsPerPage}
          onBlur={handleBlur}
          name="changePage"
          className="w-14 h-7 p-2 border rounded-md text-center ml-4 "
          min="1"
          max={numberOfPages}
        />
      </div>
    </div>
  );
};

export default Pagination;
