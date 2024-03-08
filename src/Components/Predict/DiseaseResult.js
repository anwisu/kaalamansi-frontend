import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const DiseaseResult = () => {
  const [combinedDiseaseData, setCombinedDiseaseData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(
          `${process.env.REACT_APP_API}/predict/disease/${id}`
        );

        setCombinedDiseaseData(result.data.disease_data);
        console.log(combinedDiseaseData);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [id]);

  console.log(combinedDiseaseData);

  if (isLoading || !combinedDiseaseData || !combinedDiseaseData.disease_data) {
    return <div>Loading...</div>;
  }
  return (
    // <div>
    //     <h1>Disease Result</h1>
    //     {diseaseData && (
    //         <div>
    //             <p>Disease ID: {diseaseData._id}</p>
    //             <p>Predicted Disease: {diseaseData.predicted_disease}</p>
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
          Disease Result
        </h1>
        <div class="p-10 py-10 bg-gray-200 text-center w-90 rounded-2xl">
          <div>
          <div className="flex items-center text-center justify-center">
            {combinedDiseaseData &&
              combinedDiseaseData.disease_data &&
              combinedDiseaseData.disease_data.predicted_quality ===
              "infected" ? (
              <div>
                <div className="flex items-center text-center justify-center">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="red"
                      class="w-10 h-10 mb-3 ml-10"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                      />
                    </svg>
                  </span>
                  <p
                    class=" text-3xl mb-2  pl-2  font-bold text-center"
                    style={{
                      color: "red",
                      fontFamily: "League Spartan",
                      // textShadow: "1px 1px 1px rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    {
                      combinedDiseaseData.disease_data.predicted_disease.charAt(0).toUpperCase() +
                      combinedDiseaseData.disease_data.predicted_disease.slice(1).toLowerCase()
                    }
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      fill="none"
                      stroke="green"
                      class="w-10 h-10 mb-3"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                      />
                    </svg>
                  </span>
                  <p
                    class=" text-3xl mb-2  pl-3 font-bold text-center"
                    style={{
                      color: "green",
                      fontFamily: "League Spartan",
                      // textShadow: "1px 1px 1px rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    {
                      combinedDiseaseData.disease_data.predicted_disease.charAt(0).toUpperCase() +
                      combinedDiseaseData.disease_data.predicted_disease.slice(1).toLowerCase()
                    }
                  </p>
                </div>
              </div>
            )}
            </div>
            <p class="text-gray-600 text-sm">
              <b>Disease ID:</b> {combinedDiseaseData.disease_data._id}
            </p>
            <hr class="my-4 border-t-2 border-gray-400" />
            <div className="grid grid-cols-3 gap-4 text-left">
              <div className="col-span-1">
                <p className="text-gray-600 text-sm">
                  <b>Discoloration:</b> {combinedDiseaseData.disease_data.discoloration}
                </p>
                <p className="text-gray-600 text-sm">
                  <b>Lesions:</b> {combinedDiseaseData.disease_data.lesions}
                </p>
                <p className="text-gray-600 text-sm">
                  <b>Wilting:</b> {combinedDiseaseData.disease_data.wilting}
                </p>
                <p className="text-gray-600 text-sm">
                  <b>Leaf Spots:</b>{" "}
                  {combinedDiseaseData.disease_data.leaf_spots}
                </p>
              </div>

              <div className="col-span-1">
                <p className="text-gray-600 text-sm">
                  <b>Fertilized:</b>{" "}
                  {combinedDiseaseData.disease_data.fertilized}
                </p>
                <p className="text-gray-600 text-sm">
                  <b>Watering Schedule:</b>{" "}
                  {combinedDiseaseData.disease_data.watering_sched}
                </p>
                <p className="text-gray-600 text-sm">
                  <b>Soil Type:</b> {combinedDiseaseData.disease_data.soil_type}
                </p>
                <p className="text-gray-600 text-sm">
                  <b>Pruning:</b> {combinedDiseaseData.disease_data.pruning}
                </p>
                <p className="text-gray-600 text-sm">
                  <b>Pesticide:</b> {combinedDiseaseData.disease_data.pesticide}
                </p>
                <p className="text-gray-600 text-sm">
                  <b>Pest Presence:</b>{" "}
                  {combinedDiseaseData.disease_data.pest_presence}
                </p>

              </div>
            </div>
          </div>
        </div>

        <div class="mt-10 items-center mx-auto text-center justify-center ">
        <div class="mt-10 items-center mx-auto text-center justify-center">
          <h1
            class="text-3xl font-semibold mb-3 text-gray-700"
            style={{
              color: "#4AA032",
              fontFamily: "League Spartan",
            }}
          >
            Recommendations
          </h1>
          <div>
            {combinedDiseaseData ? (
              < div class="mx-20 my-10 flex items-center text-center justify-center">
                {combinedDiseaseData.fertilizerReco && (
                  <div class="p-10 py-10 bg-gray-100 text-center item-center rounded-2xl w-80 mr-10">
                    <>
                      <b>Fertilizer Recommendations:</b>{" "}
                      <img
                        src={combinedDiseaseData.fertilizer_image.url} 
                        alt=""
                        class="mx-auto block"
                      />
                      <br />
                    </>
                  </div>
                )}
                {combinedDiseaseData.wateringReco && (
                  <div class="p-10 py-10 bg-gray-100 text-center item-center w-80 rounded-2xl ml-10">
                    <>
                      <b>Watering Recommendations:</b>{" "}
                      <img
                        src={combinedDiseaseData.watering_image.url} 
                        alt=""
                        class="mx-auto block"
                      />
                      {combinedDiseaseData.wateringReco}
                      <br />
                    </>
                  </div>
                )}
                {combinedDiseaseData.pesticideReco && (
                  <div class="p-10 py-10 bg-gray-100 text-center item-center w-80 rounded-2xl ml-10">
                    <>
                      <b>Pesticide Recommendations:</b>{" "}
                      <img
                        src={combinedDiseaseData.pesticide_image.url} 
                        alt=""
                        class="mx-auto block"
                      />
                      {combinedDiseaseData.pesticideReco}
                      <br />
                    </>
                  </div>
                )}
                {combinedDiseaseData.pruningReco && (
                  <div class="p-10 py-10 bg-gray-100 text-center item-center w-80 rounded-2xl ml-10">
                    <>
                      <b>Pruning Recommendations:</b>{" "}
                      <img
                        src={combinedDiseaseData.pruning_image.url} 
                        alt=""
                        class="mx-auto block"
                      />
                      {combinedDiseaseData.pruningReco}
                      <br />
                    </>
                  </div>
                )}
                {combinedDiseaseData.discolorReco && (
                  <div class="p-10 py-10 bg-gray-100 text-center item-center w-80 rounded-2xl">
                    <>
                      <b>Discoloration Prevention:</b>{" "}
                      <img
                        src={combinedDiseaseData.discolor_image.url} 
                        alt=""
                        class="mx-auto block"
                      />
                      {combinedDiseaseData.discolorReco}
                      <br />
                    </>
                  </div>
                )}
                {combinedDiseaseData.lesionReco && (
                  <div class="p-10 py-10 bg-gray-100 text-center item-center w-80 rounded-2xl">
                    <>
                      <b>Lesions Prevention:</b>{" "}
                      <img
                        src={combinedDiseaseData.lesion_image.url} 
                        alt=""
                        class="mx-auto block"
                      />
                      {combinedDiseaseData.lesionReco}
                      <br />
                    </>
                  </div>
                )}
                {combinedDiseaseData.leafReco && (
                  <div class="p-10 py-10 bg-gray-100 text-center item-center w-80 rounded-2xl">
                    <>
                      <b>Leaf Spots Prevention:</b>{" "}
                      <img
                        src={combinedDiseaseData.leaf_image.url} 
                        alt=""
                        class="mx-auto block"
                      />
                      {combinedDiseaseData.lesionReco}
                      <br />
                    </>
                  </div>
                )}
                {combinedDiseaseData.wiltingReco && (
                  <div class="p-10 py-10 bg-gray-100 text-center item-center w-80 rounded-2xl">
                    <>
                      <b>Wilting Prevention:</b>{" "}
                      <img
                        src={combinedDiseaseData.wilting_image.url} 
                        alt=""
                        class="mx-auto block"
                      />
                      {combinedDiseaseData.wiltingReco}
                      <br />
                    </>
                  </div>
                )}
                {combinedDiseaseData.pestReco && (
                  <div class="p-10 py-10 bg-gray-100 text-center item-center w-80 rounded-2xl">
                    <>
                      <b>Pest Prevention:</b>{" "}
                      <img
                        src={combinedDiseaseData.pest_image.url} 
                        alt=""
                        class="mx-auto block"
                      />
                      {combinedDiseaseData.pestReco}
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
        <div class=" btn btn-success mr-10 rounded-full btns mt-10 mb-10">
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
          // onClick={() => generatePDF(targetRef, options)}
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
      </div>

        {/* {diseaseData.predicted_disease} */}
      </div>
      {/* <div class="mt-10 items-center mx-auto pl-32 ml-80">
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
          <a href="/predict/disease" class="text">
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
      </div> */}
    </div>
  );
};

export default DiseaseResult;
