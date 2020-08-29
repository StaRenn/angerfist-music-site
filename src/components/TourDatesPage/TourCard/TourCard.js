import React from 'react';
import PropTypes from 'prop-types';
import "./tourCard.sass";

TourCard.proptypes = {
    tourdate: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired
}


export function TourCard({tourdate, active, onClick, id}) {
    return (
        <div onClick={() => onClick(id)} className={`page-tourdates__wheel__slide ${active ? "active" : ""}`}>
            <h3 className="page-tourdates__wheel__slide__date">{tourdate.date}</h3>
            <h2 className="page-tourdates__wheel__slide__name">{tourdate.clubname}</h2>
            <p className="page-tourdates__wheel__slide__location">{tourdate.location}</p>
        </div>
    );
}
