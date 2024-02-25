import React from "react";
import { useLocation } from "react-router-dom";

const QualityResult = () => {
  const location = useLocation();
  const qualityData = location.state && location.state.qualityData;

  return (
    // <div>
    //     <h1>Quality Result</h1>
    //     {qualityData && (
    //         <div>
    //             <p>Quality ID: {qualityData._id}</p>
    //             <p>Predicted Quality: {qualityData.predicted_quality}</p>
    //         </div>
    //     )}
    // </div>
    <div>
      <div class="mt-8 mx-30 w-80 items-center text-center justify-between mx-auto">
        <h1
          class="text-3xl font-semibold mb-3 text-gray-700"
          style={{
            color: "#4AA032",
            fontFamily: "League Spartan",
          }}
        >
          Quality Result
        </h1>
        <div class="card1 p-10 py-10 bg-gray-200  text-center">
          {qualityData && qualityData.predicted_quality === "low" ? (
            <div>
              <div className="flex items-center">
                <span>
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
                </span>
                <p
                  class="text-red-500 text-3xl mb-2  pl-3 font-bold text-center"
                  style={{
                    fontFamily: "League Spartan",
                    textShadow: "1px 1px 1px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  Low Quality
                </p>
              </div>

              <p class="text-gray-600 text-sm">
                <b>Quality ID:</b> xxxxxxxxxx {qualityData._id}
              </p>
            </div>
          ) : (
            <div>
              <div className="flex items-center">
                <span>
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
                </span>
                <p
                  class="text-green-500 text-3xl mb-2  pl-3 font-bold text-center"
                  style={{
                    color: "#4AA032",
                    fontFamily: "League Spartan",
                    textShadow: "1px 1px 1px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  High Quality
                </p>
              </div>

              <p class="text-gray-600 text-sm">
                <b>Quality ID:</b> xxxxxxxxxx {qualityData._id}
              </p>
            </div>
          )}
        </div>
      </div>
      <div class="mt-10 items-center mx-auto pl-32 ml-80">
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
        <div class="btn btn-success px-12 rounded-full btns">
          <span class="icons ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-6 h-6"
            >
              <path
                fill-rule="evenodd"
                d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
          <a href="#" class="text">
            SAVE
          </a>
        </div>
      </div>
    </div>
  );
};

export default QualityResult;
