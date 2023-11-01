"use client";

import qs from "query-string";

import { useRouter, useSearchParams } from "next/navigation";

import { Color } from "@/types";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/button";

interface FilterProps {
  data: string[] | Color[];
  name: string;
  valueKey: string;
}

const Filter: React.FC<FilterProps> = ({ data, name, valueKey }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedValue = searchParams.get(valueKey);

  const onClick = (id: string) => {
    const current = qs.parse(searchParams.toString());

    const query = {
      ...current,
      [valueKey]: id,
    };
    if (current[valueKey] === id) {
      query[valueKey] = null;
    }

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );

    router.push(url);
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-serif">{name}</h3>
      <hr className="my-4" />
      <div className="flex flex-wrap gap-2">
        {data.map((filter) => (
          <div
            key={typeof filter === "string" ? filter : filter.id.toString()} // Đảm bảo key luôn có kiểu string
            className="flex items-center"
          >
            <Button
              className={cn(
                "rounded-md text-sm text-gray-800 p-2 bg-white border border-gray-300",
                selectedValue ===
                  (typeof filter === "string"
                    ? filter
                    : filter.id.toString()) && "bg-black text-white"
              )}
              onClick={() =>
                onClick(
                  typeof filter === "string" ? filter : filter.id.toString()
                )
              }
            >
              {typeof filter === "string" ? filter : filter.name}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
