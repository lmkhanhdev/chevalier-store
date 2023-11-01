"use client";

import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import useCart from "@/hooks/use-cart";
import Button from "@/components/ui/button";
import Container from "@/components/ui/container";
import Loading from "@/components/ui/loading";

import Summary from "../cart/components/summary";

const CheckoutPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    district: "",
    city: "",
    phoneNumber: "",
    email: "",
    orderNote: "",
  });

  const router = useRouter();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true
    try {
      await sendDataToAPI();
    } finally {
      setIsLoading(false); // Set loading state to false when done
    }
  };

  const sendDataToAPI = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        {
          productIds: items.map((item) => item.id),
          userInfo: formData,
        }
      );
      removeAll();
      router.push("/cart");
      toast.success("Order successfully");
    } catch (error) {
      toast.error("Order failed");
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-serif text-black">
            Payment Information
          </h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit}>
                <div className="mt-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-base font-medium text-gray-900"
                      >
                        Tên *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-base font-medium text-gray-900"
                      >
                        Họ *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="address"
                      className="block text-base font-medium text-gray-900"
                    >
                      Địa chỉ *
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="district"
                      className="block text-base font-medium text-gray-900"
                    >
                      Quận huyện *
                    </label>
                    <input
                      type="text"
                      id="district"
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      required
                      className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-base font-medium text-gray-900"
                    >
                      Tỉnh thành *
                    </label>
                    <input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="block text-base font-medium text-gray-900"
                    >
                      Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                      className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-base font-medium text-gray-900"
                    >
                      Địa chỉ email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="orderNote"
                      className="block text-base font-medium text-gray-900"
                    >
                      Ghi chú đơn hàng (tuỳ chọn)
                    </label>
                    <textarea
                      id="orderNote"
                      name="orderNote"
                      value={formData.orderNote}
                      onChange={handleChange}
                      rows={4}
                      className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                  </div>
                </div>
                <Button type="submit" className="mt-6">
                  Proceed to Payment
                </Button>
              </form>
            </div>
            <div className="lg:col-span-5">
              <Summary />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CheckoutPage;
