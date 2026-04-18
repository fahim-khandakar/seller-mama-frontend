import { useEffect, useState } from 'react';
import { TableStatusProps } from './config/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

const StatusGroup: React.FC<TableStatusProps> = ({
  btnValues,
  status = 'status',
}) => {
  const [activeRoute, setActiveRoute] = useState<string>('');
  const searchParams = useSearchParams();
  const navigate = useRouter();

  useEffect(() => {
    const repairStatus = searchParams.get(status);
    setActiveRoute(repairStatus || '');
  }, [searchParams, status]);

  const setQuery = (paramName: string, paramValue: string) => {
    const queryParams = new URLSearchParams(searchParams.toString());
    if (paramValue === '') {
      queryParams.delete('sort');
      queryParams.delete(status);
      queryParams.delete('status');
      queryParams.delete('branch');
      queryParams.delete('searchTerm');
      queryParams.delete('start_Date');
      queryParams.delete('end_Date');
    } else {
      queryParams.set(paramName, paramValue);
    }

    navigate.push(`?${queryParams.toString()}`);
  };

  const handleFilter = (route: string) => {
    if (status) {
      setQuery(status, route);
    }
    setActiveRoute(route);
  };

  return (
    <div>
      <div className="flex gap-2 flex-wrap">
        {btnValues?.length > 0 && (
          <Button
            variant={'ghost'}
            size={'sm'}
            className={`${activeRoute === '' ? 'bg-gray-100' : ''} !py-1`}
            onClick={() => handleFilter('')}
          >
            All
          </Button>
        )}
        {btnValues?.map((btnValue, index) => (
          <Button
            key={index}
            variant={'ghost'}
            size={'sm'}
            className={`uppercase ${
              activeRoute === `${btnValue?.value}` ? 'bg-gray-100' : ''
            } !py-1`}
            onClick={() => handleFilter(btnValue?.value ?? '')}
          >
            {btnValue?.label !== undefined && btnValue?.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default StatusGroup;
