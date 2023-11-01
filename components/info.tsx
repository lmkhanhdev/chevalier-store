"use client";

import React, { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { Product } from "@/types";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [count, setCount] = useState(0);

  const sizes = data.size ? data.size.split(",") : [];

  const router = useRouter();
  const cart = useCart();

  const handleSizeButtonClick = (size: string) => {
    if (selectedSizes.includes(size)) {
      // Nếu size đã được chọn, hãy loại bỏ nó khỏi danh sách selectedSizes
      setSelectedSizes((prevSelectedSizes) =>
        prevSelectedSizes.filter((s) => s !== size)
      );
    } else {
      // Nếu size chưa được chọn, hãy đặt lại danh sách selectedSizes để chỉ chứa size này
      setSelectedSizes([size]);
    }
  };

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-serif text-gray-900">{data.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl text-gray-900">
          <Currency value={data?.price} />
        </p>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-serif text-black">Size:</h3>
          <div>
            {sizes.map((size) => (
              <button
                key={size}
                className={`border-[0.5px] rounded-lg text-center text-[14px] py-[2px]
              cursor-pointer px-3 mt-4 mb-5 mr-5 ${
                selectedSizes.includes(size) ? "bg-blue-500 text-white" : ""
              }`}
                onClick={() => handleSizeButtonClick(size)}
                type="button"
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-serif text-black">Color:</h3>
          <div
            className="h-6 w-6 rounded-full border border-gray-600"
            style={{ backgroundColor: data?.color?.value }}
          />
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-serif text-black">Quantity:</h3>
          <button
            onClick={handleDecrement}
            className="px-4 text-white bg-black rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            -
          </button>
          <input
            type="number"
            value={count}
            onChange={(e) => {
              const newCount = parseInt(e.target.value, 10);
              if (!isNaN(newCount)) {
                setCount(newCount);
              }
            }}
            className="w-16 py-1 text-center border border-gray-300 rounded-lg focus:outline-none"
          />
          <button
            onClick={handleIncrement}
            className="px-4 text-white bg-black rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            +
          </button>
        </div>
        <div className="mt-3">
          <h3 className="font-medium text-md text-black">Chi Tiết:</h3>
          <p className="text-md mt-3 font-medium text-gray-600">
            {data?.description}
          </p>
        </div>
      </div>

      <div className="mt-10 flex items-center gap-x-3">
        <button
          className="flex items-center gap-x-2 bg-slate-950 text-white rounded-lg px-4 py-2
         hover:bg-blue-600 focus:bg-blue-700 focus:outline-none transition-all duration-300 ease-in-out
          transform hover:scale-105"
          onClick={() => {
            if (selectedSizes.length > 0 && count > 0) {
              const productWithSelectedSize = {
                ...data,
                selectedSize: selectedSizes[0],
                count: count,
              };
              cart.addItem(productWithSelectedSize);
              router.push("/cart");
            } else {
              toast.error(
                "Please select a size and quantity before adding to cart."
              );
            }
          }}
        >
          <span>Add To Cart</span>
          <ShoppingCart className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Info;
