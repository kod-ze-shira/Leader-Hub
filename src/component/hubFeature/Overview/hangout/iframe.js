import React, { useEffect, useState } from 'react';

const Iframe = ({ source }) => {

    if (!source) {
        return <div>Loading...</div>;
    }
    

    const src = source;
    return (
        <iframe id="iframe-chat" src={src}
            className="iframeHangout"
            scrolling="no"
        ></iframe>


    );
};

export default Iframe;