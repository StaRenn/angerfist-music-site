import React from 'react';
import PropTypes from 'prop-types';
import "./videoBox.sass";

VideoBox.propTypes = {
    title: PropTypes.string,
    additionalClassName: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    videoId: PropTypes.string.isRequired
};

export function VideoBox({onClick, videoId, title, additionalClassName}) {
    return (
        <div onClick={() => onClick(videoId)} className={`video-box ${additionalClassName ? additionalClassName : ""}`}>
            <h3 className="video-box__title">{title}</h3>
        </div>
    );
}