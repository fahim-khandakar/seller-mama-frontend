/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from "next/navigation";
import { useState } from "react";
import PageTitle from "../Page Title/PageTitle";
import { Button } from "@/components/ui/button";
import { Cross, Link } from "lucide-react";

const TopOfPage = ({
  pageName,
  link,
  isSearch,
  btnValue,
  handleFunCall,
  funBtnValue,
}: {
  pageName?: string;
  isSearch?: boolean;
  btnValue?: string;
  handleFunCall?: any;
  funBtnValue?: string;
  link?: string;
}) => {
  const [activeRoute, setActiveRoute] = useState("");
  const navigate = useRouter();

  const setQuery = (paramName: string, paramValue: string) => {
    const queryParams = new URLSearchParams(window.location.search);
    if (paramValue === "") {
      queryParams.delete(paramName);
      queryParams.delete("searchTerm");
    } else {
      queryParams.set(paramName, paramValue);
    }
    navigate.push(`?${queryParams.toString()}`);
  };

  const handleFilter = (route: string) => {
    setQuery("searchTerm", route);
    setActiveRoute(route);
  };

  return (
    <div className="flex justify-between items-center px-5">
      {pageName && <PageTitle title={pageName} />}

      {isSearch && (
        <div>
          <div className="sm:pr-3 mb-4 sm:mb-0">
            <div className="join mt-1">
              <div>
                <div className="relative">
                  <input
                    id="products-search"
                    value={activeRoute}
                    onChange={(e) => setActiveRoute(e.target.value)}
                    className="input input-bordered join-item focus:outline-none"
                    placeholder="Search for products"
                  />
                  {activeRoute && (
                    <Button
                      onClick={() => {
                        setActiveRoute("");
                        setQuery("searchTerm", "");
                      }}
                      className="!absolute right-2 top-0 bottom-0 !text-black border-l-2 !my-2  !pl-2"
                    >
                      <Cross />
                    </Button>
                  )}
                </div>
              </div>

              <div className="indicator">
                <button
                  onClick={() => handleFilter(activeRoute)}
                  className="btn join-item bg-base-300"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div>
        {link && (
          <Link to={link}>
            <Button>{btnValue}</Button>
          </Link>
        )}
        {handleFunCall && (
          <Button onClick={handleFunCall}>{funBtnValue}</Button>
        )}
      </div>
    </div>
  );
};

export default TopOfPage;
