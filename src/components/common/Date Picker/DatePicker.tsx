/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

function formatDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function DatePicker({
  onChange,
  name,
  id,
  value,
  label,
  required = false,
}: {
  onChange?: any;
  name?: string;
  id?: string;
  value?: any;
  label?: string;
  required?: boolean;
}) {
  const [date, setDate] = useState<Date | undefined>(
    value ? new Date(value) : undefined,
  );
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (value) {
      const parsedDate = typeof value === "string" ? new Date(value) : value;
      if (!isNaN(parsedDate)) {
        setDate(parsedDate);
      }
    }
  }, [value]);

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);

    const formattedDate = selectedDate ? formatDate(selectedDate) : "";
    if (onChange) {
      onChange({ target: { name: name || "", value: formattedDate } });
    }
  };

  const openNativePicker = () => {
    if (inputRef.current) {
      inputRef.current.showPicker?.();
      inputRef.current.focus();
    }
  };

  return (
    <div className={label ? "space-y-2" : ""}>
      {label && <Label htmlFor={id || name}>{label}</Label>}
      {required && <span className="text-red-500">*</span>}

      <div className="relative">
        <Button
          type="button"
          variant="outline"
          onClick={openNativePicker}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? formatDate(date) : <span>Pick a date</span>}
        </Button>

        <input
          ref={inputRef}
          id={id}
          name={name}
          type="date"
          value={date ? formatDate(date) : ""}
          onChange={(event) => {
            const selectedValue = event.target.value;
            handleSelect(selectedValue ? new Date(selectedValue) : undefined);
          }}
          className="absolute inset-0 opacity-0 pointer-events-none"
          required={required}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
