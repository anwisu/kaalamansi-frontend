import React, { useEffect, useState } from 'react'
import axios from 'axios';
import QualityCM from './ConfusionMatrix/QualityCM'
import DiseaseCM from './ConfusionMatrix/DiseaseCM'
import QualityROC from './ROC/QualityROC.js'
import DiseaseROC from './ROC/DiseaseROC.js';

const About = () => {
    const [quality_metrics, setQualityMetrics] = useState(null);
    const [disease_metrics, setDiseaseMetrics] = useState(null);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/quality/classification-report`)
            .then(response => {
                setQualityMetrics(response.data);
            });

        axios.get(`${process.env.REACT_APP_API}/disease/classification-report`)
            .then(response => {
                setDiseaseMetrics(response.data);
            });
    }, []);

    if (!quality_metrics || !disease_metrics) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto">
            <h1 className="my-5">About Logistic Regression Model</h1>
            <h2>Quality Classification Report</h2>
            <div>Precision: {quality_metrics.report['weighted avg']['precision']}</div>
            <div>Recall: {quality_metrics.report['weighted avg']['recall']}</div>
            <div>F1-score: {quality_metrics.report['weighted avg']['f1-score']}</div>
            <div>Accuracy: {quality_metrics.accuracy} / {(quality_metrics.accuracy * 100).toFixed(0)}%</div>
            <QualityCM />  
            <QualityROC />
            <hr />
            <br />
            <h2>Disease Classification Report</h2>
            <div>Precision: {disease_metrics.report['weighted avg']['precision']}</div>
            <div>Recall: {disease_metrics.report['weighted avg']['recall']}</div>
            <div>F1-score: {disease_metrics.report['weighted avg']['f1-score']}</div>
            <div>Accuracy: {disease_metrics.accuracy} / {(disease_metrics.accuracy * 100)}%</div>
            <DiseaseCM />
            <DiseaseROC />
            
        </div>
    )
}

export default About
