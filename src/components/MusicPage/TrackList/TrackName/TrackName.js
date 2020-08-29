import React from 'react';
import PropTypes from 'prop-types';
import "./trackName.sass";

TrackName.propTypes = {
    track: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    active: PropTypes.bool.isRequired,
};

export function TrackName({track, onClick, id, active}) {
    return (
        <li
            className={`track-list__track ${active ? "active" : ""}`}
            onClick={() => onClick(id)}
        >
            {track}
        </li>
    );
}