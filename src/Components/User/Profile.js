import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../../utils/helpers";
import { TbUserEdit } from "react-icons/tb";
import UserQualityPredictions from "./UserQualityPredictions";
import UserDiseasePredictions from "./UserDiseasePredictions";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { Square3Stack3DIcon } from "@heroicons/react/24/solid";
import { GiKiwiFruit } from "react-icons/gi";
import { FaDisease } from "react-icons/fa6";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [activeTab, setActiveTab] = useState("tab1");

  const getProfile = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    };

    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/me`,
        config
      );
      setUser(data.user);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      // Handle error here
      setLoading(true);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleTab1 = () => {
    setActiveTab("tab1");
  };
  const handleTab2 = () => {
    setActiveTab("tab2");
  };

  return (
    <Fragment>
      {loading ? (
        <p>Loading user profile...</p>
      ) : (
        <Fragment>
          <div class="h-full bg-gray-200 p-8">
            <div className="container mx-auto">
              <div class="bg-white rounded-lg shadow-xl pb-8">
                <div class="w-full h-[250px]">
                  <img
                    src="./images/cover-photo1.png"
                    class="w-full h-full rounded-tl-lg rounded-tr-lg"
                  />
                </div>
                <div class="flex flex-col items-center -mt-20">
                  <img
                    src={user.avatar.url} alt={user.name}
                    class="w-40 border-4 border-white rounded-full"
                  />
                  <div class="flex items-center space-x-2 mt-2">
                    <p class="text-3xl  text-green-700">{user.name}</p>
                  </div>
                  <p class=" capitalize text-gray-700">{user.role}</p>

                </div>
                <div class="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
                  <div class="flex items-center space-x-4 mt-2">
                    {/* <button class="flex items-center bg-green-600 hover:bg-green-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
                                            </svg>
                                            <span>Connect</span>
                                        </button> */}
                    <a href="/me/update" class="button-link">
                      <button
                        class="flex items-center bg-green-600 hover:bg-green-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100"
                      >
                        <TbUserEdit />
                        <span>Update Profile</span>
                      </button>
                    </a>
                  </div>
                </div>
              </div>

              <div class="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
                <div class="w-full flex flex-col 2xl:w-1/3">
                  <div class="flex-1 bg-white rounded-lg shadow-xl p-8">
                    <h4 class="text-xl text-gray-900 font-bold">
                      Personal Info
                    </h4>
                    <ul class="mt-2 text-gray-700">
                      <li class="flex border-y py-2">
                        <span class="font-bold w-24">Full name:</span>
                        <span class="text-gray-700">{user.name}</span>
                      </li>
                      <li class="flex border-b py-2">
                        <span class="font-bold w-24">Email:</span>
                        <span class="text-gray-700">{user.email}</span>
                      </li>
                      <li class="flex border-b py-2">
                        <span class="font-bold w-24">Joined On:</span>
                        <span class="text-gray-700">{String(user.created_at).substring(0, 16)}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="flex flex-col w-full 2xl:w-2/3">
                  <div class="flex-1 bg-white rounded-lg shadow-xl p-8">
                    <h4 class="text-xl text-gray-900 font-bold">About</h4>
                    <p class="mt-2 text-gray-700">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Nesciunt voluptates obcaecati numquam error et ut fugiat
                      asperiores. Sunt nulla ad incidunt laboriosam, laudantium
                      est unde natus cum numquam, neque facere. Lorem ipsum
                      dolor sit amet consectetur adipisicing elit. Ut, magni
                      odio magnam commodi sunt ipsum eum! Voluptas eveniet
                      aperiam at maxime, iste id dicta autem odio laudantium
                      eligendi commodi distinctio!
                    </p>
                  </div>
                </div>
              </div>

              <div class="bg-white rounded-lg shadow-xl pb-8">
                <div class="p-10 items-center">
                  <Tabs value={activeTab}>
                    <TabsHeader>
                      <Tab
                        value="tab1"
                        onClick={handleTab1}
                        className={`${activeTab === "tab1" ? "active" : ""} transition-all duration-300 ease-in-out`}
                      >
                        <div className="flex items-center gap-2">
                          <GiKiwiFruit className="w-5 h-5" />
                          Quality Predictions
                        </div>
                      </Tab>
                      <Tab
                        value="tab2"
                        onClick={handleTab2}
                        className={`${activeTab === "tab2" ? "active" : ""} transition-all duration-300 ease-in-out`}
                      >
                        <div className="flex items-center gap-2">
                          <FaDisease className="w-5 h-5" />
                          Disease Predictions
                        </div>
                      </Tab>
                    </TabsHeader>
                    <TabsBody>
                      <TabPanel value="tab1">
                        <UserQualityPredictions />
                      </TabPanel>
                      <TabPanel value="tab2">
                        <UserDiseasePredictions />
                      </TabPanel>
                    </TabsBody>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
