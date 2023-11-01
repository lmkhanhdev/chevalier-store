"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";

import Image from "next/image";

const Summary = () => {
  const searchParams = useSearchParams();
  const cart = useCart();
  const router = useRouter();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const hideCheckoutButton = searchParams.get("hideCheckoutButton");

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed.");
      removeAll();
    }

    if (searchParams.get("canceled")) {
      toast.error("Something went wrong.");
    }
  }, [searchParams, removeAll]);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);

  const onCheckout = () => {
    if (items.length > 0) {
      router.push(`/checkout?hideCheckoutButton=true`); // Chuyển hướng đến trang Checkout nếu có đơn hàng
    } else {
      toast.error("Your cart is empty."); // Hiển thị thông báo nếu giỏ hàng trống
    }
  };

  console.log(items);

  return (
    <div
      className="mt-16 rounded-lg bg-gray-100 px-4
        py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
    >
      <h2 className="text-2xl font-serif text-gray-900 pb-2">Order Summary</h2>
      <div
        className="lg:col-span-7 border-t
        border-gray-200 pt-2"
      >
        {cart.items.length === 0 && (
          <p className="text-neutral-500">No items added to cart</p>
        )}
        <ul>
          {cart.items.map((item) => (
            <li key={item.id} className="flex py-3 border-b">
              <div
                className="relative h-24 w-24 rounded-sm overflow-hidden
         sm:h-35 sm:w-35"
              >
                <Image
                  fill
                  src={item.images[0].url}
                  alt=""
                  className="object-cover object-center"
                />
              </div>
              <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                  <div className="flex justify-between">
                    <p className="text-lg font-serif text-black">{item.name}</p>
                  </div>
                  <div className="mt-1 flex text-sm">
                    <p className="text-gray-500">{item.color.name}</p>
                    <p className="text-gray-500 ml-4 border-l border-gray-200 pl-4">
                      {item.selectedSize}
                    </p>
                  </div>
                  <Currency value={item.price} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6 space-y-4">
        <div
          className="flex items-center justify-between border-t
        border-gray-200 pt-4"
        >
          <div className="text-base font-serif text-gray-900">Order total</div>
          <Currency value={totalPrice} />
        </div>
      </div>
      {hideCheckoutButton ? null : (
        <Button
          disabled={items.length === 0}
          onClick={onCheckout}
          className="w-full mt-6"
        >
          Checkout
        </Button>
      )}
    </div>
  );
};

export default Summary;
