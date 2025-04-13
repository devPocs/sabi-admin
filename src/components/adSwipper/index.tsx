import React, { useEffect, useState, useRef } from "react";
import { Box, Heading, Image, Text } from "@chakra-ui/react";

import SwiperCore from "swiper"; // Scrollbar,

import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";

import { Swiper, SwiperSlide } from "swiper/react";
import bg from "@assets/bg1.png";

SwiperCore.use([Navigation, Pagination, A11y, Autoplay]);

const AdsSwipper = () => {
  const products: string[] = [bg, bg];
  // const products: string[] = [bg, bg];

  const ListSlides = () => {
    return products.map((index, items) => (
      <SwiperSlide
        style={{
          width: "100%",
          alignItems: "center",
          textAlign: "left",
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          position: "relative",
        }}
        key={index}
      >
        <Image
          style={{
            height: "99%",
            position: "absolute",
            borderRadius: "7px",
            zIndex: 1,
            objectFit: "cover",
          }}
          w="100%"
          alt="man"
          src={bg}
        />
        <Box
          width="483px"
          height="217px"
          borderRadius="8px"
          padding="24px"
          gap="8px"
          w={["80%"]}
          h={["217px"]}
          bg="brand.100"
          zIndex={2}
          bottom={8}
          position={"absolute"}
        >
          <Heading
            fontWeight="700" /* Bold */
            fontSize="16px"
            lineHeight="25.2px"
            textStyle="boldText"
          >
            DECEMBER MEGA SALES
          </Heading>
          <Text
            fontWeight="600"
            fontSize={["12px", "16px"]}
            lineHeight="22.4px"
            textStyle="normal"
            color={"gray.300"}
          >
            Lorem ipsum dolor sit amet consectetur. At fringilla consectetur
            tellus est elementum iaculis enim. Nisi urna aliquet non risus. A
            eget platea accumsan eget. Enim viverra ac aliquam neque feugiat
            nisl elementum. Sollicitudin a tellus sit mattis parturient. Nullam
            et massa feugiat morbi neque egestas.
          </Text>
        </Box>
      </SwiperSlide>
    ));
  };

  return (
    <Box>
      {products.length ? (
        <Swiper
          autoplay={{
            delay: 10000,
            disableOnInteraction: false,
          }}
          loop={true}
          spaceBetween={1}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{
            clickable: true,
            renderBullet: (index, className) =>
              `<span class="${className}" 
                style="background-color: ${
                  className.includes("swiper-pagination-bullet-active")
                    ? "white"
                    : "#00B69B"
                }; 
                width: 12px; height: 12px; border-radius: 50%; margin: 4px;">
              </span>`,
          }}
          // scrollbar={{ draggable: true }}
          onSwiper={(swiper) => {}}
          onSlideChange={() => {}}
          style={{ height: "100%" }}
        >
          {ListSlides()}
        </Swiper>
      ) : (
        <div></div>
      )}
    </Box>
  );
};

export default AdsSwipper;
