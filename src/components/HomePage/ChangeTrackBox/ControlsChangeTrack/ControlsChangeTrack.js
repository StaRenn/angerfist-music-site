import React from 'react';
import PropTypes from 'prop-types';
import "./controlsChangeTrack.sass";

ControlsChangeTrack.propTypes = {
    onClick: PropTypes.func.isRequired,
    changeType: PropTypes.string.isRequired
};

export function ControlsChangeTrack({onClick, changeType}) {
    return (
        <div className={`change-track-box__container__controls__${changeType}`}
             onClick={() => onClick(changeType)}>
            <p className={`change-track-box__container__controls__${changeType}__text`}>{changeType} song</p>
            <span className={`change-track-box__container__controls__${changeType}__arrow`}/>
        </div>
    );
}
