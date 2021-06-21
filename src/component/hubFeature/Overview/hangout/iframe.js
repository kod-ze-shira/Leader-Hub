import React from 'react';

const Iframe = ({ source }) => {

    if (!source) {
        return <div>Loading...</div>;
    }

    const src = source;
    return (
        <iframe id="iframe-chat" src={src}
            className="iframeHangout"
        ></iframe>
       
      
    );
};

export default Iframe;