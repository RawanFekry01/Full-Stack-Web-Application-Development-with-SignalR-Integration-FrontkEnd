import React from 'react';
import OrbitProgress from 'react-loading-indicators/OrbitProgress';

const ProgressIndicator = ({ progress }) => (
    <div>
        <OrbitProgress
            type="circle"
            percent={progress}
            color="#001c2f"
            size="medium"
            text={`${progress}%`}
            textColor="#000"
        />
    </div>
);

export default ProgressIndicator;