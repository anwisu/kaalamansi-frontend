import React, { useState, useEffect } from 'react';
import { MDBDataTable } from 'mdbreact';
import axios from 'axios';

const DiseaseList = () => {
    const [allDiseasePredicts, setAllDiseasePredicts] = useState([]);

    const diseaseList = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                }
            };
            const response = await axios.get(`${process.env.REACT_APP_API}/disease/all`, config);
            setAllDiseasePredicts(response.data.disease_data);
        } catch (error) {
            console.error('Error fetching disease data:', error);
        }
    };
    
    useEffect(() => {
        diseaseList()
    }, [])

    const columns = [
        { label: 'Leaf Spots', field: 'leaf_spots', sort: 'asc' },
        { label: 'Wilting', field: 'wilting', sort: 'asc' },
        { label: 'Discoloration', field: 'discoloration', sort: 'asc' },
        { label: 'Lesions', field: 'lesions', sort: 'asc' },
        { label: 'Fertilized', field: 'fertilized', sort: 'asc' },
        { label: 'Watering Schedule', field: 'watering_sched', sort: 'asc' },
        { label: 'Pruning', field: 'pruning', sort: 'asc' },
        { label: 'Pesticide', field: 'pesticide_use', sort: 'asc' },
        { label: 'Pest Presence', field: 'pest_presence', sort: 'asc' },
        { label: 'Prediction', field: 'predicted_disease', sort: 'asc' }
    ];

    const data = {
        columns,
        rows: allDiseasePredicts
    };

    return (
        <div className='container-fluid'>
            <h1 className="my-5">All Disease Predictions</h1>
            <MDBDataTable
                data={data}
                paging={true}
                searching={true}
                className="px-3"
                bordered
                striped
                hover
            />
        </div>
    );
};

export default DiseaseList;
