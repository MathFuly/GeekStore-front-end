import React from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { ThemeRepositoryImpl } from "../../domain/repositories/Theme/ThemeRepositoryImpl";
import { ThemeUseCase } from "../../domain/usecases/ThemeUseCase";
import { Load } from "../common/Load";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { Scrollbar, A11y, Autoplay } from "swiper";

import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

export const Slide = () => {
  const themeRepository = new ThemeRepositoryImpl();
  const themeUseCase = new ThemeUseCase(themeRepository);

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const { data, isLoading, error } = useQuery("slides", () =>
    themeUseCase.getThemesByCode(`${currentMonth}-${currentYear}`)
  );

  if (isLoading) {
    return (
      <div>
        <Load />
      </div>
    );
  }

  if (error) {
    toast.error("Houve um erro, tente novamente mais tarde");
    return <></>;
  }

  return (
    <Swiper
      modules={[Scrollbar, A11y, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: true,
      }}
    >
      {data?.map((b) => (
        <SwiperSlide key={b.id} className="w-full">
          <Link to={`products/categories/${b.id}`}>
            <img src={b.slidebanner} alt="" className="h-fit"/>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
