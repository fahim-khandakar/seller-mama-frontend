import { useRouter } from "next/navigation";
import { useState } from "react";
import { Link, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TopOfPageProps {
  pageName?: string;
  isSearch?: boolean;
  btnValue?: string;
  handleFunCall?: () => void;
  funBtnValue?: string;
  link?: string;
}

const TopOfPage: React.FC<TopOfPageProps> = ({
  pageName,
  isSearch,
  btnValue,
  handleFunCall,
  funBtnValue,
  link,
}) => {
  const [activeRoute, setActiveRoute] = useState<string>("");
  const navigate = useRouter();

  const setQuery = (paramName: string, paramValue: string) => {
    const queryParams = new URLSearchParams(window.location.search);
    if (paramValue === "") {
      queryParams.delete(paramName);
      queryParams.delete("search_query");
    } else {
      queryParams.set(paramName, paramValue);
    }
    navigate.push(`?${queryParams.toString()}`);
  };

  const handleFilter = (route: string) => {
    setQuery("search_query", route);
    setActiveRoute(route);
  };

  return (
    <div className="flex justify-between items-center px-5 ">
      {pageName && <h1 className="text-xl font-semibold">{pageName}</h1>}

      {isSearch && (
        <div className="pr-3 mb-4">
          <div className="flex gap-2">
            <div className="relative">
              <Input
                id="products-search"
                value={activeRoute}
                onChange={(e) => setActiveRoute(e.target.value)}
                placeholder="Search for products"
              />
              {activeRoute && (
                <Button
                  variant={"link"}
                  onClick={() => {
                    setActiveRoute("");
                    setQuery("search_query", "");
                  }}
                  className="!absolute right-0 top-0 bottom-0 !text-black border-l-2  !pl-2"
                >
                  <X />
                </Button>
              )}
            </div>

            <div className="indicator">
              <Button
                variant={"default"}
                onClick={() => handleFilter(activeRoute)}
                className="join-item"
              >
                <Search /> Search
              </Button>
            </div>
          </div>
        </div>
      )}

      <div>
        {link && (
          <Link href={link}>
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
