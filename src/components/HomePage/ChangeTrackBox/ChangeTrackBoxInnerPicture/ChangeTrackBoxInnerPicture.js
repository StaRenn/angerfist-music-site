import React from 'react';
import PropTypes from 'prop-types';
import "./changeTrackBoxInnerPicture.sass";

ChangeTrackBoxInnerPicture.propTypes = {
    pictureSrc: PropTypes.string.isRequired
};

export function ChangeTrackBoxInnerPicture({pictureSrc}) {
    return (
        <span className="change-track-box__container__picture" style={
            {
                backgroundImage: `url(${pictureSrc})`,
                backgroundSize: `100% 100%`
            }
        }/>
    );
}