'use client';

import { useState } from 'react';
import { HeaderWithFilterProps } from './config/types';
import { useRouter } from 'next/navigation';
import InputWithValue from '../Input With Value/InputWithValue';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Filter from '../Filter/Filter';
import StatusGroup from '../Status Group/StatusGroup';

const HeaderWithFilter: React.FC<HeaderWithFilterProps> = ({
  name,
  link,
  btnName,
  btnValues,
  isFilter = true,
  isSearch = true,
  status,
  func,
  funcBtnValue,
  funcSecond,
  funcBtnValueSecond,
  filterOptions,
}) => {
  const [activeRoute, setActiveRoute] = useState('');
  const navigate = useRouter();

  const setQuery = (paramName: string, paramValue: string) => {
    const queryParams = new URLSearchParams(window.location.search);
    if (paramValue === '') {
      queryParams.delete(paramName);
      queryParams.delete('searchTerm');
    } else {
      queryParams.set(paramName, paramValue);
    }
    navigate.push(`?${queryParams.toString()}`);
  };

  const handleFilter = (route: string) => {
    setQuery('searchTerm', route);
    setActiveRoute(route);
  };

  const handleClear = () => {
    setActiveRoute('');
    setQuery('searchTerm', '');
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-shadeOfGray dark:text-solidWhite flex-inline">
            {name}
          </h2>
          <hr className="w-48 border-shadeOfGray dark:border-solidWhite border-b" />
        </div>
        {isSearch && (
          <div className="flex items-center gap-2">
            <div className="relative">
              <InputWithValue
                className="pr-7"
                value={activeRoute}
                onChange={(e) => setActiveRoute(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleFilter(activeRoute);
                  }
                }}
                inputName="searchTerm"
                inputPlaceholder="Search"
              />
              {activeRoute && (
                <Button
                  variant={'ghost'}
                  size={'icon'}
                  onClick={handleClear}
                  className="absolute right-0 top-0 bottom-0  border-l-2   "
                >
                  &#10005;
                </Button>
              )}
            </div>
            <div>
              <Button onClick={() => handleFilter(activeRoute)}>Search</Button>
            </div>
          </div>
        )}
        <div className="flex justify-between items-center gap-2">
          {funcBtnValueSecond && (
            <div>
              <Button variant={'default'} onClick={funcSecond}>
                {funcBtnValueSecond}
              </Button>
            </div>
          )}{' '}
          {funcBtnValue && (
            <div>
              <Button variant={'default'} onClick={func}>
                {funcBtnValue}
              </Button>
            </div>
          )}
          <div>
            {link && (
              <Link href={`${link}`}>
                <div>
                  <Button>{btnName}</Button>
                </div>
              </Link>
            )}
          </div>
          {isFilter && <Filter statusOptions={filterOptions} />}
        </div>
      </div>
      {btnValues && (
        <div className="pt-5">
          <StatusGroup status={status} btnValues={btnValues} />
        </div>
      )}
    </div>
  );
};

export default HeaderWithFilter;
