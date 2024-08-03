import React from 'react';

const StartButton = ({ onClick, loading }) => (
    <button onClick={onClick} disabled={loading}>
        {loading ? 'Processing...' : 'Start'}
    </button>
);

export default StartButton;