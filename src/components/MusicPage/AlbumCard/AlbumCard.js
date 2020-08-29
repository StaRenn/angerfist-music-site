import React from 'react';
import "./albumCard.sass";
import PropTypes from 'prop-types';

AlbumCard.propTypes = {

};

export function AlbumCard({imgSrc, releaseDate, active, onClick, id}) {
    return (
        <div
            className={`music-page__wheel__slide ${active ? "active" : ""}`}
            onClick={() => onClick(id)}
        >
            <span className="music-page__wheel__slide__logo" style={{
                backgroundImage: `url(${imgSrc})`,
                backgroundSize: `100% 100%`
            }}/>
            <p className="music-page__wheel__slide__date">{releaseDate}</p>
        </div>
    );
}