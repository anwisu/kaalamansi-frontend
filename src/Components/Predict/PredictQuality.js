import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PredictQuality = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const jsonData = {};
        formData.forEach((value, key) => {
            jsonData[key] = value;
        });

        try {
            const response = await axios.post(`${process.env.REACT_APP_API}/predict/quality`, jsonData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data && response.data.inserted_data) {
                navigate('/result', { state: { qualityData: response.data.inserted_data } });
            } else {
                setError('Prediction failed. Please try again.');
            }
        } catch (error) {
            console.error('Prediction request failed:', error);
            setError('Prediction failed. Please try again.');
        }
    };

    return (
        <Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1
                            className="text-3xl font-bold text-center mt-5 mb-5 w-screen p-3"
                            style={{
                                color: "#58B741",
                                fontFamily: "League Spartan",
                                textShadow: "1px 1px 1px rgba(0, 0, 0, 0.5)",
                            }}>Kalamansi Quality Prediction</h1>
                        <div className="pl-56 pb-10">
                            <form class="px-7 grid justify-center items-center" onSubmit={handleSubmit}>
                                {/* Input fields for features */}
                                <div class="grid gap-6" id="form" >
                                    <div class="w-full flex gap-3">
                                        <label className="form-control w-full max-w-m" for="size">
                                            <div className="label">
                                                <span className="label-text">Size: </span>
                                            </div>
                                            <select className="select select-bordered" id="size" name="size">
                                                <option disabled selected>Select size</option>
                                                <option value="small">Small</option>
                                                <option value="medium">Medium</option>
                                                <option value="big">Big</option>
                                            </select>
                                        </label>
                                        <label className="form-control w-full max-w-m" for="firmness">
                                            <div className="label">
                                                <span className="label-text">Firmness: </span>
                                            </div>
                                            <select className="select select-bordered" id="firmness" name="firmness">
                                                <option disabled selected>Select size</option>
                                                <option value="flabby">Flabby</option>
                                                <option value="firm">Firm</option>
                                            </select>
                                        </label>
                                        <label className="form-control w-full max-w-m" for="shape">
                                            <div className="label">
                                                <span className="label-text">Firmness: </span>
                                            </div>
                                            <select className="select select-bordered" id="shape" name="shape">
                                                <option disabled selected>Select size</option>
                                                <option value="oblong">Oblong</option>
                                                <option value="spherical">Spherical</option>
                                            </select>
                                        </label>
                                    </div>
                                </div>
                                <div class="grid gap-6" id="form">
                                    <div class="w-full flex gap-3">
                                        <label className="form-control w-full max-w-xs" for="skin_color">
                                            <div className="label">
                                                <span className="label-text">Fruit Color: </span>
                                            </div>
                                            <select className="select select-bordered" id="skin_color" name="skin_color">
                                                <option disabled selected>Select size</option>
                                                <option value="dull yellow">Dull yellow</option>
                                                <option value="bright green">Bright green</option>
                                                <option value="mixed">Mixed</option>
                                            </select>
                                        </label>
                                        <label className="form-control w-full max-w-xs" for="blemishes">
                                            <div className="label">
                                                <span className="label-text">Blemishes: </span>
                                            </div>
                                            <select className="select select-bordered" id="blemishes" name="blemishes">
                                                <option disabled selected>Select size</option>
                                                <option value="present">Present</option>
                                                <option value="not present">Not present</option>
                                            </select>
                                        </label>
                                        <label className="form-control w-full max-w-xs" for="soil_type">
                                            <div className="label">
                                                <span className="label-text">Soil Type: </span>
                                            </div>
                                            <select className="select select-bordered" id="soil_type" name="soil_type">
                                                <option disabled selected>Select soil type</option>
                                                <option value="loamy">Loamy</option>
                                                <option value="clayey">Clayey</option>
                                                <option value="sandy">Sandy</option>
                                            </select>
                                        </label>
                                    </div>
                                </div>
                                <div class="grid gap-6" id="form">
                                    <div class="w-full flex gap-3">
                                        <label className="form-control w-full max-w-xs" for="sun_exposure">
                                            <div className="label">
                                                <span className="label-text">Sun Exposure: </span>
                                            </div>
                                            <select className="select select-bordered" id="sun_exposure" name="sun_exposure">
                                                <option disabled selected>Select soil type</option>
                                                <option value="full shade">Full shade</option>
                                                <option value="partial shade">Partial shade</option>
                                                <option value="full sun">Full sun</option>
                                            </select>
                                        </label>
                                        <label className="form-control w-full max-w-xs" for="location">
                                            <div className="label">
                                                <span className="label-text">Location: </span>
                                            </div>
                                            <select className="select select-bordered" id="location" name="location">
                                                <option disabled selected>Select soil type</option>
                                                <option value="patio">Patio</option>
                                                <option value="balcony">Balcony</option>
                                                <option value="rooftop">Rooftop</option>
                                            </select>
                                        </label>
                                        <label className="form-control w-full max-w-xs" for="fertilized">
                                            <div className="label">
                                                <span className="label-text">Fertilizer: </span>
                                            </div>
                                            <select className="select select-bordered" id="fertilized" name="fertilized">
                                                <option disabled selected>Select soil type</option>
                                                <option value="not fertilized">Not Fertilized</option>
                                                <option value="fertilized">Fertilized</option>
                                            </select>
                                        </label>
                                    </div>
                                </div>
                                <div class="grid gap-6" id="form">
                                    <div class="w-full flex gap-3">
                                        <label className="form-control w-full max-w-xs" for="watering_sched">
                                            <div className="label">
                                                <span className="label-text">Watering Schedule: </span>
                                            </div>
                                            <select className="select select-bordered" id="watering_sched" name="watering_sched">
                                                <option disabled selected>Select soil type</option>
                                                <option value="regular">Regular</option>
                                                <option value="irregular">Irregular</option>
                                            </select>
                                        </label>
                                        <label className="form-control w-full max-w-xs" for="pruning">
                                            <div className="label">
                                                <span className="label-text">Pruning: </span>
                                            </div>
                                            <select className="select select-bordered" id="pruning" name="pruning">
                                                <option disabled selected>Select soil type</option>
                                                <option value="regular">Regular</option>
                                                <option value="not regular">Irregular</option>
                                            </select>
                                        </label>
                                        <label className="form-control w-full max-w-xs" for="pest_presence">
                                            <div className="label">
                                                <span className="label-text">Pest Presence: </span>
                                            </div>
                                            <select className="select select-bordered" id="pest_presence" name="pest_presence">
                                                <option disabled selected>Select soil type</option>
                                                <option value="yes">Present</option>
                                                <option value="no">Not present</option>
                                            </select>
                                        </label>
                                    </div>
                                </div>
                                <button class="outline-none glass shadow-xl w-20 items-center p-3 mx-auto bg-[#ffffff42] hover:border-[#035ec5] hover:border-solid hover:border-[1px] hover:text-[#035ec5] font-bold"
                                    type="submit">Predict</button>
                            </form>
                            {error && <p>{error}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default PredictQuality;