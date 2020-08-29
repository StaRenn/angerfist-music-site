import React from 'react';
import PropTypes from 'prop-types';
import "./closeVideoButton.sass";

CloseVideoButton.propTypes = {
    onClick: PropTypes.func.isRequired
};

export function CloseVideoButton({onClick}) {
    return (
        <div onClick={() => onClick()} className="close-video">
            <h3 className="close-video__button">C<br/>L<br/>O<br/>S<br/>E</h3>
        </div>
    );
}
