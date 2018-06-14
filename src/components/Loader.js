import React from 'react';

const Loader = () => (
    <div style={{
        display: 'flex',
        justifyContent: 'center'
    }}>
        <div className="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
);

export default Loader;
