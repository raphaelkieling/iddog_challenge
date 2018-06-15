import React from 'react';
import { Link } from 'react-router-dom';

const styleContainer = {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
};

const styleCactus = {
    height: "300px"
};

const styleDescription = {
    "fontSize": "25px",
    "color": "#828282"
};

const NotFound = () => (
    <div style={styleContainer} className="animated fadeIn">
        <img src={require('../images/cactus.png')} style={styleCactus} alt="Cactus 404 not found"/>
        <span style={styleDescription}>Sorry, nothing to see here.</span>
        <Link to="/signup">
            Back to login
        </Link>
    </div>
);

export default NotFound;
