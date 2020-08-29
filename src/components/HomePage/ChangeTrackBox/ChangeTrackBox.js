import React from 'react';
import PropTypes from 'prop-types';
import ControlsChangeTrack from "./ControlsChangeTrack";
import ChangeTrackBoxInnerPicture from "./ChangeTrackBoxInnerPicture";
import "./changeTrackBox.sass";

ChangeTrackBox.propTypes = {
    onClick: PropTypes.func.isRequired,
    pictureSrc: PropTypes.string.isRequired
};

export function ChangeTrackBox({onClick, pictureSrc}) {
    return (
        <div className="change-track-box__wrapper">
            <div className="change-track-box__container">
                <div className="change-track-box__container__controls">
                    <ControlsChangeTrack onClick={onClick} changeType={"next"} />
                    <ControlsChangeTrack onClick={onClick} changeType={"prev"} />
                </div>
                <ChangeTrackBoxInnerPicture pictureSrc={pictureSrc} />
            </div>
        </div>
    );
}