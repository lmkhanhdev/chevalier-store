"use client";

import React, { useState } from "react";
import { Billboard as BillboardType } from "@/types";
import { Navigation, Pagination } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface BillboardProps {
  data: BillboardType[];
}

const Billboard: React.FC<BillboardProps> = ({ data }) => {
  return (
    <Swiper
      pagination={{
        dynamicBullets: true,
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
    >
      {data.map((item) => (
        <SwiperSlide key={item.id}>
          <div
            className="rounded-xl relative aspect-square md:aspect-[2/1] overflow-hidden bg-cover"
            style={{ backgroundImage: `url(${item.imageUrl})` }}
          ></div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Billboard;
