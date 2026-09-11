import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import BannerBoxV2 from "../BannerBoxV2";
import { fetchDataFromApi } from "../../utils/api";

const AdsBannerslider = ({ items = 3 }) => {
  const [banners, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getBanners = async () => {
      try {
        const res = await fetchDataFromApi("/api/banners");
        if (res?.error === false) {
          setBanners(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch banners:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getBanners();
  }, []);

  if (isLoading) {
    return (
      <div className="py-5 w-full flex justify-center">
        <p>Loading banners...</p>
      </div>
    );
  }

  if (banners.length === 0) {
    return null; // or a placeholder/fallback banner
  }

  return (
    <div className="py-5 w-full">
      <Swiper
        slidesPerView={items}
        spaceBetween={10}
        modules={[Navigation]}
        navigation
        className="smlBtn"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner._id}>
            <BannerBoxV2 info="left" image={banner.image} link={banner.link || "/"} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AdsBannerslider;