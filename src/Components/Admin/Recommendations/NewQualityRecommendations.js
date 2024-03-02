import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const NewQualityRecommendations = () => {
    const [recommendation, setRecommendation] = useState({
        factor: '',
        value: '',
        recommendation: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setRecommendation({ ...recommendation, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API}/admin/quality/recommendation/new`, recommendation, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(`Response: ${response.data}`);
            navigate('/admin/quality/recommendations/all');
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    }

    return (
        <div className="flex">
            <div className="w-100">
                <Sidebar />
            </div>
            <div className="flex-1 py-10">
                <div className="ml-[21rem] mr-6">
                    <h1>New Recommendation</h1>
                    <form onSubmit={handleSubmit}>
                        Factor:
                        <select name="factor" onChange={handleChange}>
                            <option value="">Select a factor</option>
                            <option value="soil_type">Soil Type</option>
                            <option value="watering_sched">Watering Schedule</option>
                            <option value="sun_exposure">Sun Exposure</option>
                            {/* Add more options as needed */}
                        </select>
                        <label>
                            Value:
                            <input type="text" name="value" onChange={handleChange} />
                        </label>
                        <label>
                            Recommendation:
                            <input type="text" name="recommendation" onChange={handleChange} />
                        </label>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewQualityRecommendations