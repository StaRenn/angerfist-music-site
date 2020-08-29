import React from 'react';
import "./sideBar.sass";

export function SideBar() {
    return (
        <div className="home-page__sidebar">
            <div className="home-page__sidebar__socials">
                <a className="social__link" href="#">Instagram</a>
                <a className="social__link" href="#">Youtube</a>
                <a className="social__link" href="#">Twitter</a>
                <a className="social__link" href="#">Facebook</a>
            </div>
        </div>
    );
}