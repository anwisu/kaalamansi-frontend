import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import generatePDF, { Resolution, Margin, usePDF } from "react-to-pdf";

const QualityResult = () => {
  const [combinedQualityData, setCombinedQualityData] = useState(null);
  const { id } = useParams();
  const { toPDF, targetRef } = usePDF({
    method: "save",
    filename: "Quality_Result.pdf",
  });

  const options = {
    method: "open",
    resolution: Resolution.HIGH,
    page: {
      margin: Margin.LARGE,
      format: "A4",
      orientation: "landscape",
    },
    // scale: 1000, // Set to make it wide like the width of the letter in landscape
    // x: "100%", // Center the content horizontally
    // y: 5, // Center the content vertically
    canvas: {
      mimeType: "image/png",
      qualityRatio: 1,
    },
    overrides: {
      pdf: {
        compress: false,
      },

      canvas: {
        useCORS: true,
      },
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(
          `${process.env.REACT_APP_API}/predict/quality/${id}`
        );
        // console.log(result.data); // Log the fetched data

        setCombinedQualityData(result.data.reco_data);
        console.log(combinedQualityData);
        // Fetch additional data from the quality collection
        // const qualityResult = await axios(
        //   `${process.env.REACT_APP_API}/admin/quality/${result.data.quality_id}`
        // );
        // // console.log(qualityResult.data); // Log the fetched quality data

        // setCombinedQualityData((prevData) => ({
        //   ...prevData,
        //   qualityData: qualityResult.data,
        // }));
        console.log(combinedQualityData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  if (!combinedQualityData || !combinedQualityData.quality_data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div
        ref={targetRef}
        class="mt-8 mx-30 items-center text-center justify-between mx-auto w-1/2"
      >
        <h1
          class="text-3xl font-semibold mb-3 text-gray-700"
          style={{
            color: "#4AA032",
            fontFamily: "League Spartan",
          }}
        >
          Quality Result
        </h1>
        <div class="p-10 py-10 bg-gray-200 text-center w-90 rounded-2xl">
          <div>
            <div className="flex items-center text-center justify-center">
              {combinedQualityData &&
              combinedQualityData.quality_data &&
              combinedQualityData.quality_data.predicted_quality === "low" ? (
                <div className="flex items-center text-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="red"
                    class="w-10 h-10 mb-3"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                    />
                  </svg>
                  <span>
                    <p
                      class="text-red-500 text-3xl mb-2  pl-3 font-bold text-center capitalize"
                      style={{
                        fontFamily: "League Spartan",
                        textShadow: "1px 1px 1px rgba(0, 0, 0, 0.5)",
                      }}
                    >
                      {combinedQualityData.quality_data.predicted_quality
                        .charAt(0)
                        .toUpperCase() +
                        combinedQualityData.quality_data.predicted_quality
                          .slice(1)
                          .toLowerCase()}{" "}
                      Quality
                    </p>
                  </span>
                </div>
              ) : (
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="green"
                    class="w-10 h-10 mb-3"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                    />
                  </svg>
                  <span>
                    <p
                      class="text-green-500 text-3xl mb-2  pl-3 font-bold text-center capitalize"
                      style={{
                        fontFamily: "League Spartan",
                        textShadow: "1px 1px 1px rgba(0, 0, 0, 0.5)",
                      }}
                    >
                      {combinedQualityData.quality_data.predicted_quality
                        .charAt(0)
                        .toUpperCase() +
                        combinedQualityData.quality_data.predicted_quality
                          .slice(1)
                          .toLowerCase()}{" "}
                      Quality
                    </p>
                  </span>
                </div>
              )}
            </div>

            <p class="text-gray-600 text-sm">
              <b>Quality ID:</b> {combinedQualityData.quality_data._id}
            </p>
            <hr class="my-4 border-t-2 border-gray-400" />

            <div className="grid grid-cols-3 gap-4 text-left">
              <div className="col-span-1">
                <p className="text-gray-600 text-sm">
                  <b>Size:</b> {combinedQualityData.quality_data.size}
                </p>
                <p className="text-gray-600 text-sm">
                  <b>Shape:</b> {combinedQualityData.quality_data.shape}
                </p>
                <p className="text-gray-600 text-sm">
                  <b>Firmness:</b> {combinedQualityData.quality_data.firmness}
                </p>
                <p className="text-gray-600 text-sm">
                  <b>Skin Color:</b>{" "}
                  {combinedQualityData.quality_data.skin_color}
                </p>
                <p className="text-gray-600 text-sm">
                  <b>Blemishes:</b> {combinedQualityData.quality_data.blemishes}
                </p>
              </div>

              <div className="col-span-1">
                <p className="text-gray-600 text-sm">
                  <b>Soil Type:</b> {combinedQualityData.quality_data.soil_type}
                </p>
                <p className="text-gray-600 text-sm">
                  <b>Sun Exposure:</b>{" "}
                  {combinedQualityData.quality_data.sun_exposure}
                </p>
                <p className="text-gray-600 text-sm">
                  <b>Location:</b> {combinedQualityData.quality_data.location}
                </p>
                <p className="text-gray-600 text-sm">
                  <b>Fertilized:</b>{" "}
                  {combinedQualityData.quality_data.fertilized}
                </p>
                <p className="text-gray-600 text-sm">
                  <b>Watering Schedule:</b>{" "}
                  {combinedQualityData.quality_data.watering_sched}
                </p>
              </div>

              <div className="col-span-1">
                <p className="text-gray-600 text-sm">
                  <b>Pruning:</b> {combinedQualityData.quality_data.pruning}
                </p>
                <p className="text-gray-600 text-sm">
                  <b>Pest Presence:</b>{" "}
                  {combinedQualityData.quality_data.pest_presence}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-10 items-center mx-auto text-center justify-center ">
        <div class=" btn btn-success mr-10 rounded-full btns">
          <span class="icons">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-6 h-6"
            >
              <path
                fill-rule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
          <a href="/predict/quality" class="text">
            PREDICT AGAIN
          </a>
        </div>
        <button
          onClick={() => generatePDF(targetRef, options)}
          className="btn btn-success px-12 rounded-full btns"
        >
          <span className="icons">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <span className="text">Save</span>
        </button>
        <div class="mt-20 items-center mx-auto text-center justify-center">
          <h1
            class="text-3xl font-semibold mb-3 text-gray-700"
            style={{
              color: "#4AA032",
              fontFamily: "League Spartan",
            }}
          >
            Recommendation
          </h1>
          <div>
            {combinedQualityData ? (
              < div class="mx-20 my-10 flex items-center text-center justify-center">
                {combinedQualityData.soil_recommendation && (
                  <div class="p-10 py-10 bg-gray-100 text-center item-center rounded-2xl w-80 mr-10">
                    <>
                      <b>Soil Recommendations:</b>{" "}
                      {combinedQualityData.soil_recommendation}
                      <br />
                    </>
                  </div>
                )}
                {combinedQualityData.sun_recommendation && (
                  <div class="p-10 py-10 bg-gray-100 text-center item-center w-80 rounded-2xl">
                    <>
                      <b>Sun Recommendations:</b>{" "}
                      {combinedQualityData.sun_recommendation}
                      <br />
                    </>
                  </div>
                )}
                {combinedQualityData.watering_recommendation && (
                  <div class="p-10 py-10 bg-gray-100 text-center item-center w-80 rounded-2xl ml-10">
                    <>
                      <b>Watering Recommendations:</b>{" "}
                      {combinedQualityData.watering_recommendation}
                      <br />
                    </>
                  </div>
                )}
              </div>
            ) : (
              <div class="p-10 py-10 bg-gray-200 text-center w-90 rounded-2xl">
                No Recommendations
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QualityResult;
