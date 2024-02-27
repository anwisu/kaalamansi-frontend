import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import axios from 'axios';

function DiseaseDataset() {
    const [shape, setShape] = useState(null);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/disease/dataset`)
            .then(response => setShape(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="flex">
        <div className="w-100">
            <Sidebar />
        </div>
        <div className="ml-6">
            <h1 className="text-2xl font-bold mb-4">Disease Dataset</h1>
            {shape ? (
                <div className="bg-white p-4 rounded shadow">
                    <p className="mb-2">Shape of dataset: ({shape[0]} rows, {shape[1]} columns)</p>
                </div>
            ) : <p className="text-gray-600">Loading...</p>}
        </div>
    </div>
    );
}


export default DiseaseDataset;