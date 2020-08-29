import React from 'react';
import {NavLink} from "react-router-dom";
import "./customNavigationLink.sass";

export function CustomNavigationLink({active, id, text}) {
    return (
        <div className={`header__nav__link  ${active ? "active" : "hidden"}`}>
            <NavLink
                className={`header__nav__link__text`}
                id={id}
                to={`/${id}`}
            >{text}</NavLink>
            <span className={`header__nav__link__span ${active ? "active" : "hidden"}`}>{text}</span>
        </div>
    );
}