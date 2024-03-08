import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getToken } from "../../utils/helpers";
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import {
    TrashIcon
} from '@heroicons/react/24/solid';

const ITEMS_PER_PAGE = 5;

const UserDiseasePredictions = () => {
    const [mePredictions, setMePredictions] = useState([]);
    const [open, setOpen] = useState(0);
    const [active, setActive] = useState(1);

    const fetchPredictions = async () => {
        try {
            const token = getToken();
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            };
            const response = await axios.get(
                `${process.env.REACT_APP_API}/me/disease/predictions/all`,
                config
            );
            setMePredictions(response.data.user_predictions);
        } catch (error) {
            console.error("Error fetching disease predictions:", error);
        }
    };

    useEffect(() => {
        fetchPredictions();
    }, []);

    const deleteDiseasePredicts = async (id) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${getToken()}`
                },
            };
            await axios.delete(`${process.env.REACT_APP_API}/me/disease/predictions/${id}`, config);
            // Refresh the disease list after deletion
            fetchPredictions();
        } catch (error) {
            console.error("Error deleting disease data:", error);
        }
    };

    const handleDelete = (id) => {
        deleteDiseasePredicts(id)
    }

    console.log(mePredictions);

    const getItemProps = (index) => ({
        variant: active === index ? "filled" : "text",
        color: "gray",
        onClick: () => setActive(index),
        className: "rounded-full",
    });

    const next = () => {
        if (active === Math.ceil(mePredictions.length / ITEMS_PER_PAGE)) return;
        setActive(active + 1);
    };

    const prev = () => {
        if (active === 1) return;
        setActive(active - 1);
    };

    // Calculate the items to show based on the current active page
    const startIndex = (active - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const itemsToShow = mePredictions.slice(startIndex, endIndex);

    const handleOpen = (value) => setOpen(open === value ? 0 : value);
    return (
        <div className="flex">
            <div className="flex-1 py-10">
                <div>
                    {/* <ThemeProvider theme={muiTheme()}>
                        {mePredictions.length > 0 && (
                            <MUIDataTable
                                title={"Predicted disease"}
                                data={mePredictions}
                                columns={columns}
                                options={options}
                            />
                        )}
                    </ThemeProvider> */}
                    {itemsToShow.length > 0 ? (
                        itemsToShow.map((prediction, index) => (
                            <Fragment>
                                <Accordion key={index} open={open === index + 1} className="mb-2 rounded-lg border border-blue-gray-100 px-4">
                                    <AccordionHeader
                                        onClick={() => handleOpen(index + 1)}
                                        className={`border-b-0 transition-colors ${open === index + 1 ? "text-green-500 hover:!text-green-700" : ""}`}
                                    >
                                        <div className="flex justify-between w-full">
                                            <div>
                                                {prediction.disease_data.predicted_disease.charAt(0).toUpperCase() + prediction.disease_data.predicted_disease.slice(1).toLowerCase()}{" "}
                                            </div>
                                            <div>
                                                Predicted On: {String(prediction.created_at).substring(0, 16)}
                                            </div>
                                            <div>
                                                <button
                                                    onClick={() => handleDelete(prediction._id)}
                                                    className="bg-red-500 text-white p-2 rounded hover:bg-red-700"
                                                >
                                                    <TrashIcon className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </div>
                                        {/* {index + 1} */}
                                    </AccordionHeader>
                                    <AccordionBody className="pt-0 text-base font-normal">
                                        <div className="flex">
                                            <div className="flex-1">
                                                <h2>Visual Symptoms</h2>
                                                Size: {prediction.disease_data.discoloration} <br />
                                                Firmness: {prediction.disease_data.lesions} <br />
                                                Shape: {prediction.disease_data.wilting}<br />
                                                Skin Color: {prediction.disease_data.leaf_spots}<br />
                                            </div>
                                            <div className="flex-1">
                                                <h2>Cultivation Practices</h2>
                                                Fertilized: {prediction.disease_data.fertilized} <br />
                                                Watering Schedule: {prediction.disease_data.watering_sched} <br />
                                                Pruning: {prediction.disease_data.pruning} <br />
                                                Pesticide Used: {prediction.disease_data.pesticide_used} <br />
                                                Pest Presence: {prediction.disease_data.pest_presence} <br />
                                            </div>
                                        </div>
                                        <br />
                                        <hr />
                                        <br />
                                        <h2>Recommendations</h2>
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            {prediction.fertilizerReco && (
                                                <div style={{ margin: '20px' }}>
                                                    <div>Fertilizer Recommendations: <br />{prediction.fertilizerReco}</div>
                                                    {prediction.fertilizer_image && (
                                                        <img
                                                            src={prediction.fertilizer_image.url}
                                                            alt=""
                                                        />
                                                    )}
                                                </div>
                                            )}
                                            {prediction.wateringReco && (
                                                <div style={{ margin: '20px' }}>
                                                    <div>Watering Recommendation: <br />{prediction.wateringReco}</div>
                                                    {prediction.watering_image && (
                                                        <img
                                                            src={prediction.watering_image.url}
                                                            alt=""
                                                        />
                                                    )}
                                                </div>
                                            )}
                                            {prediction.pesticideReco && (
                                                <div style={{ margin: '20px' }}>
                                                    <div>Pesticide Recommendation: <br />{prediction.pesticideReco}</div>
                                                    {prediction.pesticide_image && (
                                                        <img
                                                            src={prediction.pesticide_image.url}
                                                            alt=""
                                                        />
                                                    )}
                                                </div>
                                            )}
                                            {prediction.pruningReco && (
                                                <div style={{ margin: '20px' }}>
                                                    <div>Pruning Recommendation: <br />{prediction.pesticideReco}</div>
                                                    {prediction.pruning_image && (
                                                        <img
                                                            src={prediction.pruning_image.url}
                                                            alt=""
                                                        />
                                                    )}
                                                </div>
                                            )}
                                            {prediction.discolorReco && (
                                                <div style={{ margin: '20px' }}>
                                                    <div>Discoloration Prevention: <br />{prediction.discolorReco}</div>
                                                    {prediction.discolor_image && (
                                                        <img
                                                            src={prediction.discolor_image.url}
                                                            alt=""
                                                        />
                                                    )}
                                                </div>
                                            )}
                                            {prediction.lesionReco && (
                                                <div style={{ margin: '20px' }}>
                                                    <div>Lesions Prevention: <br />{prediction.lesionReco}</div>
                                                    {prediction.lesion_image && (
                                                        <img
                                                            src={prediction.lesion_image.url}
                                                            alt=""
                                                        />
                                                    )}
                                                </div>
                                            )}
                                            {prediction.leafReco && (
                                                <div style={{ margin: '20px' }}>
                                                    <div>Leaf Spots Prevention: <br />{prediction.leafReco}</div>
                                                    {prediction.leaf_image && (
                                                        <img
                                                            src={prediction.leaf_image.url}
                                                            alt=""
                                                        />
                                                    )}
                                                </div>
                                            )}
                                            {prediction.wiltingReco && (
                                                <div style={{ margin: '20px' }}>
                                                    <div>Wilting Prevention: <br />{prediction.wiltingReco}</div>
                                                    {prediction.wilting_image && (
                                                        <img
                                                            src={prediction.wilting_image.url}
                                                            alt=""
                                                        />
                                                    )}
                                                </div>
                                            )}
                                            {prediction.pestReco && (
                                                <div style={{ margin: '20px' }}>
                                                    <div>Pest Prevention: <br />{prediction.pestReco}</div>
                                                    {prediction.pest_image && (
                                                        <img
                                                            src={prediction.pest_image.url}
                                                            alt=""
                                                        />
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </AccordionBody>
                                </Accordion>
                            </Fragment>
                        ))
                    ) : (
                        <div>No data available</div>
                    )}
                </div>
                <div className="flex items-center gap-4 justify-center mt-4">
                    <Button
                        variant="text"
                        className="flex items-center gap-2 rounded-full"
                        onClick={prev}
                        disabled={active === 1}
                    >
                        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
                    </Button>
                    <div className="flex items-center gap-2">
                        {Array.from({ length: Math.ceil(mePredictions.length / ITEMS_PER_PAGE) }, (_, i) => (
                            <IconButton {...getItemProps(i + 1)}>{i + 1}</IconButton>
                        ))}
                    </div>
                    <Button
                        variant="text"
                        className="flex items-center gap-2 rounded-full"
                        onClick={next}
                        disabled={active === Math.ceil(mePredictions.length / ITEMS_PER_PAGE)}
                    >
                        Next
                        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default UserDiseasePredictions