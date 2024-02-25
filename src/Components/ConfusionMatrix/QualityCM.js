import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ConfusionMatrix() {
    const [confusionMatrix, setConfusionMatrix] = useState(null);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/quality/confusion-matrix`)
            .then(response => {
                setConfusionMatrix(response.data);
            })
            .catch(error => {
                console.error('Error fetching confusion matrix:', error);
            });
    }, []);

    return (
        <div>
            <h2>Confusion Matrix</h2>
            {confusionMatrix && (
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Predicted Positive</th>
                            <th>Predicted Negative</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Actual Positive</td>
                            <td>{confusionMatrix.true_positives}</td>
                            <td>{confusionMatrix.false_negatives}</td>
                        </tr>
                        <tr>
                            <td>Actual Negative</td>
                            <td>{confusionMatrix.false_positives}</td>
                            <td>{confusionMatrix.true_negatives}</td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ConfusionMatrix;
