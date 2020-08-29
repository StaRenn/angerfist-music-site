import React from 'react';
import PropTypes from 'prop-types';
import "./tourCard.sass";

TourCard.proptypes = {
    tourdate: PropTypes.string.isRequired,
}


export function TourCard({tourdate}) {
    return (
        <div className={`page-tourdates__wheel__slide`}>
            <h3 className="page-tourdates__wheel__slide__date">{tourdate.date}</h3>
            <h2 className="page-tourdates__wheel__slide__name">{tourdate.clubname}</h2>
            <p className="page-tourdates__wheel__slide__location">{tourdate.location}</p>
        </div>
    );
}
