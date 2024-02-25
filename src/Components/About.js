import React from 'react'
import QualityCM from './ConfusionMatrix/QualityCM'

const About = () => {
    return (
        <div class="container mx-auto">
            <h1 className="my-5">About Quality Logistic Regression Model</h1>
            <QualityCM />  
        </div>
    )
}

export default About