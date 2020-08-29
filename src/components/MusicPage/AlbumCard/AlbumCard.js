import React from 'react';
import "./albumCard.sass";
import PropTypes from 'prop-types';

AlbumCard.propTypes = {

};

export function AlbumCard({imgSrc, releaseDate, active, onClick, id}) {
    return (
        <div
            className={`album-card ${active ? "active" : ""}`}
            onClick={() => onClick(id)}
        >
            <span className="album-card__logo" style={{
                backgroundImage: `url(${imgSrc})`,
                backgroundSize: `100% 100%`
            }}/>
            <p className="album-card__date">{releaseDate}</p>
        </div>
    );
}