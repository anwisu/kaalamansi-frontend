import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
} from "@material-tailwind/react";
import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
    TableCellsIcon,
    DocumentMagnifyingGlassIcon,
    UserGroupIcon,
    PresentationChartLineIcon,
    CheckCircleIcon,
    ClockIcon
} from "@heroicons/react/24/solid";
import { FaDisease } from "react-icons/fa6";
import { getToken } from "../../../utils/helpers";

const Total = () => {
    const [data, setData] = useState({ quality: 0, disease: 0, user: 0 });
    const countIds = (data) => {
        return data ? data.length : 0;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                    },
                };
                const qualityResponse = await axios.get(
                    `${process.env.REACT_APP_API}/admin/quality/all`
                );
                const diseaseResponse = await axios.get(
                    `${process.env.REACT_APP_API}/admin/disease/all`
                );
                const userResponse = await axios.get(
                    `${process.env.REACT_APP_API}/admin/users`, config
                );

                console.log("Quality Response:", qualityResponse.data);
                console.log("Disease Response:", diseaseResponse.data);
                console.log("User Response:", userResponse.data);

                const qualityCount = countIds(qualityResponse.data?.quality_data);
                const diseaseCount = countIds(diseaseResponse.data?.disease_data);
                const userCount = countIds(userResponse.data?.users);
                const lastUserDocument = userResponse.data.users[userResponse.data.users.length - 1];
                const userLastUpdated = new Date(lastUserDocument?.created_at);
                const lastQualityDocument = qualityResponse.data.quality_data[qualityResponse.data.quality_data.length - 1];
                const qualityLastUpdated = new Date(lastQualityDocument?.created_at);
                const lastDiseaseDocument = diseaseResponse.data.disease_data[diseaseResponse.data.disease_data.length - 1];
                const diseaseLastUpdated = new Date(lastDiseaseDocument?.created_at);

                console.log("Quality Response:", qualityCount);
                console.log("Disease Response:", diseaseCount);

                setData({
                    quality: qualityCount,
                    disease: diseaseCount,
                    user: userCount,
                    userLastUpdated: new Date(userLastUpdated),
                    diseaseLastUpdated: new Date(diseaseLastUpdated),
                    qualityLastUpdated: new Date(qualityLastUpdated),
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="mb-8 grid gap-y-10 gap-x-42  md:grid-cols-2 xl:grid-cols-3 place-items-center">
            <Card className="w-[23rem] border border-blue-gray-100 shadow-sm ">
                <CardHeader
                    variant="gradient"
                    color='green'
                    floated={false}
                    shadow={false}
                    className="absolute grid h-12 w-12 place-items-center mt-4"
                >
                    <DocumentMagnifyingGlassIcon className="w-6 h-6 text-white" />
                </CardHeader>
                <CardBody className="p-4 text-right">
                    <Typography variant="small" className="block font-normal text-blue-gray-600">
                        Total Quality Predicts
                    </Typography>
                    <Typography variant="h1" color="blue-gray">
                        {data.quality}
                    </Typography>
                </CardBody>
                <CardFooter className="block border-t border-blue-gray-50 p-4">
                    <Typography
                        variant="small"
                        className="flex items-center font-normal text-blue-gray-600"
                    >
                        <ClockIcon strokeWidth={2} className="h-4 w-4 mr-2 text-blue-gray-400" />
                        Last updated: {data.qualityLastUpdated?.toLocaleString()}
                    </Typography>
                </CardFooter>

            </Card>
            <Card className="w-[23rem] border border-blue-gray-100 shadow-sm ">
                <CardHeader
                    variant="gradient"
                    color='green'
                    floated={false}
                    shadow={false}
                    className="absolute grid h-12 w-12 place-items-center mt-4"
                >
                    <UserGroupIcon className="w-6 h-6 text-white" />
                </CardHeader>
                <CardBody className="p-4 text-right">
                    <Typography variant="small" className="block font-normal text-blue-gray-600">
                        Total Users
                    </Typography>
                    <Typography variant="h1" color="blue-gray">
                        {data.user}
                    </Typography>
                </CardBody>
                <CardFooter className="block border-t border-blue-gray-50 p-4">
                    <Typography
                        variant="small"
                        className="flex items-center font-normal text-blue-gray-600"
                    >
                        <ClockIcon strokeWidth={2} className="h-4 w-4 mr-2 text-blue-gray-400" />
                        Last updated: {data.userLastUpdated?.toLocaleString()}
                    </Typography>
                </CardFooter>

            </Card>
            <Card className="w-[23rem] border border-blue-gray-100 shadow-sm ">
                <CardHeader
                    variant="gradient"
                    color='green'
                    floated={false}
                    shadow={false}
                    className="absolute grid h-12 w-12 place-items-center mt-4"
                >
                    <FaDisease className="w-6 h-6 text-white" />
                </CardHeader>
                <CardBody className="p-4 text-right">
                    <Typography variant="small" className="block font-normal text-blue-gray-600">
                        Total Disease Predicts
                    </Typography>
                    <Typography variant="h1" color="blue-gray">
                        {data.disease}
                    </Typography>
                </CardBody>
                <CardFooter className="block border-t border-blue-gray-50 p-4">
                    <Typography
                        variant="small"
                        className="flex items-center font-normal text-blue-gray-600"
                    >
                        <ClockIcon strokeWidth={2} className="h-4 w-4 mr-2 text-blue-gray-400" />
                        Last updated: {data.diseaseLastUpdated?.toLocaleString()}
                    </Typography>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Total