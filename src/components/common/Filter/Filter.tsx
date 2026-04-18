/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { DatePicker } from '@/components/common/Date Picker/DatePicker';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { SlidersHorizontal } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface FilterProps {
  statusOptions?: { label: string; value: string }[];
}

const Filter: React.FC<FilterProps> = ({
  statusOptions = [{ label: 'Empty', value: 'Empty' }],
}) => {
  const navigate = useRouter();
  const location = usePathname();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [status, setStatus] = useState<string | undefined>();

  // Load existing URL params
  useEffect(() => {
    const s = searchParams.get('startDate');
    const e = searchParams.get('endDate');
    const st = searchParams.get('status');

    setStartDate(s || null);
    setEndDate(e || null);
    setStatus(st || undefined);
  }, [searchParams]);

  const handleApply = () => {
    const params = new URLSearchParams();

    if (startDate) params.set('startDate', startDate);
    if (endDate) params.set('endDate', endDate);
    if (status) params.set('status', status);

    navigate.push(`${location}?${params.toString()}`);
    setOpen(false);
  };

  const handleClear = () => {
    setStartDate(null);
    setEndDate(null);
    setStatus(undefined);
    navigate.push(location);
    setOpen(false);
  };
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-black text-white hover:bg-gray-800 transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filter</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-[360px] rounded-2xl shadow-md border bg-background p-4"
      >
        <DropdownMenuLabel className="text-lg font-semibold pb-2">
          Filter Options
        </DropdownMenuLabel>
        <Separator className="mb-4" />

        <div className="space-y-5 max-h-[65vh] overflow-y-auto scrollbar-thin">
          <div className="flex  gap-5">
            {/* Start Date */}
            <div className="space-y-2">
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={(date: any) => setStartDate(date.target.value)}
              />
            </div>

            {/* End Date */}
            <div className="space-y-2">
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={(date: any) => setEndDate(date.target.value)}
              />
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status" className="text-sm font-semibold">
              Status
            </Label>
            <select
              id="status"
              value={status ?? ""}
              onChange={(event) =>
                setStatus(event.target.value || undefined)
              }
              className="w-full rounded-xl border bg-white px-3 py-2 text-sm font-bold focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Select status</option>
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="flex justify-between gap-3">
          <Button
            variant="destructive"
            className="w-full"
            onClick={handleClear}
          >
            Clear
          </Button>
          <Button
            disabled={!startDate || !endDate}
            className="w-full bg-black text-white hover:bg-gray-800"
            onClick={handleApply}
          >
            Apply
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Filter;
