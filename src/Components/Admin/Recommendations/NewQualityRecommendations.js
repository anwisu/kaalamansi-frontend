import React, { useState, useEffect, Fragment } from 'react';
import Sidebar from '../Sidebar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Input, Select, Button, Textarea } from '@material-tailwind/react';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import MetaData from '../../Layout/MetaData';

const NewQualityRecommendations = () => {
    const [recommendation, setRecommendation] = useState({
        factor: '',
        value: '',
        recommendation: '',
        image: ''
    });
    const [imagePreview, setImagePreview] = useState('')
    const [valueOptions, setValueOptions] = useState([]);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setRecommendation({ ...recommendation, [e.target.name]: e.target.value });
    }

    const onChange = e => {
        if (e.target.name === 'image') {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagePreview(reader.result);
                    setRecommendation({ ...recommendation, image: reader.result });
                }
            }
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setRecommendation({ ...recommendation, [e.target.name]: e.target.value });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API}/admin/quality/recommendation/new`, recommendation);
            console.log(`Response: ${response.data}`);
            navigate('/admin/quality/recommendations/all');
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    }
    const factorOptions = {
        'soil_type': { options: ['loamy', 'clayey', 'sandy'], labels: ['Loamy', 'Clayey', 'Sandy'] },
        'watering_sched': { options: ['regular', 'irregular'], labels: ['Regular', 'Irregular'] },
        'sun_exposure': { options: ['full shade', 'partial shade', 'full sun'], labels: ['Full Shade', 'Partial Shade', 'Full Sun'] }
    };

    useEffect(() => {
        if (recommendation.factor in factorOptions) {
            setValueOptions(factorOptions[recommendation.factor].options);
        } else {
            setValueOptions([]);
        }
    }, [recommendation.factor]);

    return (
        <Fragment>
            <MetaData title={'Create Quality Recommendation'} />
            <div className="flex" style={{
                minHeight: '100vh',
                background: '#B6EBBA'
            }}>
                <div className="w-100">
                    <Sidebar />
                </div>
                <div className="flex-1 py-10">
                    <div className="ml-[21rem] mr-20">
                        <h1 className="text-2xl font-bold mb-4 text-gray-900" style={{ fontSize: "30px", color: "#4AA032", fontFamily: "League Spartan", }}>New Recommendation</h1>
                        <form onSubmit={handleSubmit} className="space-y-2">
                            <label htmlFor="factor" className="block text-sm font-medium leading-6 text-gray-900">
                                Factor
                            </label>
                            <select
                                className="peer h-full w-full rounded-[7px]  !border  !border-gray-300 border-t-transparent bg-transparent bg-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700  shadow-lg shadow-green-900/5 outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray-500 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2  focus:!border-green-900 focus:border-t-transparent focus:!border-t-green-900 focus:outline-0 focus:ring-green-900/10 disabled:border-0 disabled:bg-blue-gray-50"
                                name="factor"
                                value={recommendation.factor}
                                onChange={handleChange}
                                color="lightBlue"
                                size="regular"
                                outline={false}
                            >
                                <option value="">Select a factor</option>
                                <option value="soil_type">Soil Type</option>
                                <option value="watering_sched">Watering Schedule</option>
                                <option value="sun_exposure">Sun Exposure</option>
                                {/* Add more options as needed */}
                            </select>
                            <label htmlFor="factor" className="block text-sm font-medium leading-6 text-gray-900">
                                Value
                            </label>
                            <select
                                className="peer h-full w-full rounded-[7px]  !border  !border-gray-300 border-t-transparent bg-transparent bg-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700  shadow-lg shadow-green-900/5 outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray-500 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2  focus:!border-green-900 focus:border-t-transparent focus:!border-t-green-900 focus:outline-0 focus:ring-green-900/10 disabled:border-0 disabled:bg-blue-gray-50"
                                name="value"
                                value={recommendation.value}
                                onChange={handleChange}
                                color="lightBlue"
                                size="regular"
                                outline={false}
                            >
                                <option value="">Select a value</option>
                                {valueOptions.map((option, index) => (
                                    <option key={index} value={option}>{factorOptions[recommendation.factor].labels[index]}</option>
                                ))}
                            </select>
                            <label htmlFor="recommendation" className="block text-sm font-medium leading-6 text-gray-900">
                                Recommendation
                            </label>
                            <textarea
                                className="peer h-full w-full rounded-[7px]  !border  !border-gray-300 border-t-transparent bg-transparent bg-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700  shadow-lg shadow-green-900/5 outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray-500 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2  focus:!border-green-900 focus:border-t-transparent focus:!border-t-green-900 focus:outline-0 focus:ring-green-900/10 disabled:border-0 disabled:bg-blue-gray-50"
                                type="text"
                                name="recommendation"
                                value={recommendation.recommendation}
                                onChange={handleChange}
                                placeholder="Recommendation"
                                color="lightBlue"
                                outline={false}
                                size="regular"
                            />
                            <div className="col-span-full">
                                <label htmlFor="file-upload" className="block text-sm font-medium leading-6 text-gray-900">
                                    Choose an Image
                                </label>
                                <div className="mt-2 flex justify-center rounded-lg bg-white border border-dashed border-gray-900/25 px-6 py-10">
                                    <div className="text-center">
                                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                <span>Upload a file</span>
                                                <input
                                                    id="file-upload"
                                                    name="image"
                                                    type="file"
                                                    onChange={onChange}
                                                    className="sr-only" />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                    {imagePreview && <img src={imagePreview} alt="Preview" width='100px' />}
                                </div>
                            </div>
                            <Button
                                color="teal"
                                buttonType="filled"
                                size="regular"
                                block={false}
                                ripple="light"
                                type="submit"
                            >
                                Submit
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default NewQualityRecommendations