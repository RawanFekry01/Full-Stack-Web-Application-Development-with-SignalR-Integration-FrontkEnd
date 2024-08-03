import React from 'react';

const DataDisplay = ({ data }) => (
    <div className="data-box">
        <h2>Final Data</h2>
        <div>
            <p>{JSON.stringify(data)}</p>
        </div>
    </div>
);
export default DataDisplay;