import React from 'react';
import PropTypes from 'prop-types';
import TrackName from "./TrackName";
import "./trackList.sass";

TrackList.propTypes = {
    currentTrackNumber: PropTypes.number,
    trackList: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired
};

export function TrackList({currentTrackNumber, trackList, onClick}) {
    const trackListElements = trackList.map((trackName, index) =>
        <TrackName
            key={index}
            onClick={onClick}
            track={trackName}
            id={index}
            active={currentTrackNumber !== undefined ? currentTrackNumber === index : false}
        />
    );
    return (
        <div className="track-list">
            <ul className="track-list__first-column">
                {trackListElements.slice(0, trackListElements.length/2)}
            </ul>
            <ul className="track-list__second-column">
                {trackListElements.slice(trackListElements.length/2, trackListElements.length)}
            </ul>
        </div>
    )
}