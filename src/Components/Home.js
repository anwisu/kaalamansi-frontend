import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "./Layout/MetaData";
import "../App.css";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  AOS.init();
  AOS.refresh();

  return (
    <Fragment>
      <MetaData title={'Home'} />
      <div className="container">
        <div className="row">
          <div className="hero flex justify-between items-center w-screen px-40 pt-20">
            <div className=" flex justify-between items-center py-20">
              <div
                className="column"
                style={{ paddingLeft: "1%" }}
                data-aos="fade-right"
                data-aos-duration="3000"
              >
                <img
                  src="./images/calamansi_header.png"
                  className="animate-shake animate-thrice animate-delay-[2000ms] animate-ease-in max-w-sm rounded-lg"
                />
              </div>
              <div
                className="column"
                style={{ paddingLeft: "10%" }}
                data-aos="fade-up"
                data-aos-duration="2000"
              >
                <h1
                  className="text-8xl font-bold flex items-center justify-end"
                  style={{
                    color: "#58B741",
                    fontFamily: "League Spartan",
                    textShadow: "2px 2px 2px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <span>Kaalaman</span>
                  <img
                    src={process.env.PUBLIC_URL + "/images/citrus.png"}
                    className="h-5 w-5 mt-6 mx-2"
                    alt="Kaalamansi Logo"
                  />
                  <span>si</span>
                </h1>

                <p
                  className="text-justify text-xl pl-10 "
                  style={{ color: "#58B741" }}
                >
                  <span className="ml-16">
                    Kaalaman.si is a web-based system for home gardeners who
                    grow kalamansi. It uses predictive analysis, quality
                    assessment, disease assessment, and user-friendly interfaces
                    to help users optimize their urban farming.
                  </span>{" "}
                  It is accessible from any device and aims to make kalamansi
                  cultivation easy and enjoyable. The system uses a logistic
                  regression model to predict the quality and disease status of
                  kalamansi fruits based on various factors such as size, color,
                  shape, and blemish.
                </p>
                {/* <button className="btn btn-primary btn-green"></button> */}
                <Link
                  to="/about"
                  style={{ textDecoration: "none" }}
                  className="btn btn-green flex items-center "
                  data-aos="flip-left"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
          <div className="hero w-screen px-20">
            <div className="hero-content flex-col lg:flex-row-reverse items-left p-20 aos-init aos-animate">
              <div className="animate-fade-up animate-delay-[2500ms] animate-ease-in-out animate-fill-both">
                <img
                  src="./images/predict2.png"
                  className="column max-w-xs rounded-lg "
                />
              </div>
              <div className="text-left pt-6 animate-fade-down animate-delay-[2500ms] animate-ease-in-out animate-fill-both">
                <h1
                  className="text-6xl font-bold"
                  style={{
                    color: "#58B741",
                    fontFamily: "League Spartan",
                    textShadow: "2px 2px 2px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  Predict its quality and diseases
                </h1>
                <p
                  className="pt-6 text-xl pr-32"
                  style={{
                    color: "#58B741",
                  }}
                >
                  Empower your urban farming journey with Kaalaman.si, your
                  trusted companion in home gardening. Our innovative platform
                  utilizes cutting-edge predictive analysis to assess the
                  quality and detect potential diseases in your kalamansi
                  plants. Unleash the full potential of your garden as
                  Kaalaman.si provides valuable insights and recommendations,
                  making it easier than ever for home gardeners to achieve
                  optimal growth and ensure the health of their precious
                  kalamansi trees. Cultivate with confidence, backed by science
                  and technology.
                </p>
                {/* <button className="btn btn-primary btn-green">Predict Now</button> */}
                <Link
                  to="/predict/quality"
                  style={{ textDecoration: "none" }}
                  className="btn btn-green flex items-center"
                >
                  Predict Now
                </Link>
              </div>
            </div>
          </div>

          <h1
            className="text-3xl font-bold text-center mt-5 mb-5 w-screen p-3"
            style={{
              color: "#58B741",
              fontFamily: "League Spartan",
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
            }}
          >
            Kalamansi Gallery
          </h1>
          <div className="hero flex justify-between items-center w-screen pb-20">
            <div class="container mx-auto px-5 lg:px-32">
              <div class="-m-1 flex flex-wrap md:-m-2">
                <div class="flex w-1/2 flex-wrap">
                  <div class="w-1/2 p-1 md:p-2">
                    <img
                      alt="gallery"
                      class="block h-full w-full rounded-lg object-cover object-center"
                      src="./images/plant 1.jpg"
                    />
                  </div>
                  <div class="w-1/2 p-1 md:p-2">
                    <img
                      alt="gallery"
                      class="block h-full w-full rounded-lg object-cover object-center"
                      src="./images/plant 2.jpg"
                    />
                  </div>
                  <div class="w-full p-1 md:p-2">
                    <img
                      alt="gallery"
                      class="block h-full w-full rounded-lg object-cover object-center"
                      src="./images/plant 3.jpg"
                    />
                  </div>
                </div>
                <div class="flex w-1/2 flex-wrap">
                  <div class="w-full p-1 md:p-2">
                    <img
                      alt="gallery"
                      class="block h-full w-full rounded-lg object-cover object-center"
                      src="./images/plant 4.jpg"
                    />
                  </div>
                  <div class="w-1/2 p-1 md:p-2">
                    <img
                      alt="gallery"
                      class="block h-full w-full rounded-lg object-cover object-center"
                      src="./images/plant 5.jpg"
                    />
                  </div>
                  <div class="w-1/2 p-1 md:p-2">
                    <img
                      alt="gallery"
                      class="block h-full w-full rounded-lg object-cover object-center"
                      src="./images/plant 6.jpg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
