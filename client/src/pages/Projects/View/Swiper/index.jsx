import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "./styles.css";

// import required modules
import { EffectCoverflow, Pagination, Autoplay } from "swiper";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  wrapper: {
    // backgroundImage: (props) => {
    //   return `url("${props.currentImage}")`;
    // },
    backgroundPosition: "center",
    backgroundSize: "cover",
    boxShadow: "rgb(0 0 0 / 42%) 0px 0px 0px 2000px inset",
    backgroundRepeat: "no-repeat",
    maxWidth: "50vw",
  },
});

export default function App({ images = [] }) {
  const [currentImage, setCurrentImage] = useState(0);
  const classes = useStyles({ currentImage: images[currentImage] });
  return (
    <div
      className={classes.wrapper}
      style={{
        background: `url("${images[currentImage].replace("\n    ", "")}")`,
        // backgroundPosition: "center",
        // backgroundSize: "cover",
        // boxShadow: "rgb(0 0 0 / 42%) 0px 0px 0px 2000px inset",
        // backgroundRepeat: "no-repeat",
        // maxWidth: "50vw",
      }}
    >
      <Swiper
        modules={[EffectCoverflow, Pagination, Autoplay]}
        onTransitionEnd={function () {
          setCurrentImage(this.realIndex);
        }}
        style={{
          // background: "transparent",
          backdropFilter: "blur(12px)",
          height: "100%",
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 300,
          modifier: 1,
          slideShadows: true,
        }}
        // pagination={true}
        className="mySwiper"
      >
        {images.map((image) => (
          <SwiperSlide>
            <img alt={`${image}`} src={`${image}`} />
          </SwiperSlide>
        ))}
        {/* <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
        </SwiperSlide> */}
        {/* <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
        </SwiperSlide> */}
      </Swiper>
    </div>
  );
}