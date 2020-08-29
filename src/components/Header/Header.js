import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CustomNavigationLink from "./CustomNavigationLink";
import "./header.sass";

export class Header extends Component {
    static propTypes = {
        activePage: PropTypes.string.isRequired
    };

    render() {
        const {activePage} = this.props;
        return (
            <header className={"header"}>
                <span className="header__logo"/>
                <div className="header__nav">
                    <CustomNavigationLink text={"Home"} id={"home"} active={activePage === "home"} />
                    <CustomNavigationLink text={"Tour Dates"} id={"tourdates"} active={activePage === "tourdates"} />
                    <CustomNavigationLink text={"Videos"} id={"video"} active={activePage === "video"} />
                    <CustomNavigationLink text={"Music"} id={"music"} active={activePage === "music"} />
                </div>
            </header>
        );
    }
}