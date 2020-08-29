import React, {Component} from 'react';
import {tracklist} from "../../database";
import Player from "../Player";
import "./homePage.sass";
import SideBar from "./SideBar/";
import ChangeTrackBox from "./ChangeTrackBox/";

export class HomePage extends Component {

    state = {
        currentTrackNumber: 0,
    };

    handleTrackChange = (changeType) => {
        if(changeType === "next") {
            this.setState({
                currentTrackNumber: (this.state.currentTrackNumber + 1) % tracklist.length
            })
        } else {
            this.setState({
                currentTrackNumber: (tracklist.length + this.state.currentTrackNumber - 1) % tracklist.length
            })
        }
    }

    render() {
        const trackNumber = this.state.currentTrackNumber;
        return (
            <div className="home-page page">
                <span className="bg-logo"/>
                <span className="angerfist-photo"/>
                <SideBar />
                <div className={"home-page__player-container"}>
                    <Player currentTrack={tracklist[trackNumber][2]}/>
                </div>
                <ChangeTrackBox pictureSrc={tracklist[trackNumber][3]} onClick={this.handleTrackChange} />
            </div>
        );
    }
}