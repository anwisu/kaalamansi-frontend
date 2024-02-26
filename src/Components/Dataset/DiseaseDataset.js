import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DiseaseDataset() {
    const [shape, setShape] = useState(null);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/disease/dataset`)
            .then(response => setShape(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            {shape ? (
                <div>
                    <p>Shape of dataset: {shape[0]}, {shape[1]}</p>
                    {/* <p>Number of Rows: {shape[0]}</p>
                    <p>Number of Columns: {shape[1]}</p> */}
                </div>
            ) : 'Loading...'}
        </div>
    );
}


export default DiseaseDataset;