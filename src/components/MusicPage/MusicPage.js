import React, {Component} from 'react';
import {musicAlbums} from "../../database";
import Player from "../Player";
import CarouselSlider from "../CarouselSlider";
import "./musicPage.sass";
import AlbumCard from "./AlbumCard/";
import TrackList from "./TrackList/";

export class MusicPage extends Component {

    state = {
        activeAlbumID: 0,
        currentTrackNumber: null,
    };

    changeStateFromCarousel = (activeAlbumID) => { //function so i can set state of current class from other class
        if (this.state.activeAlbumID === activeAlbumID) return null;
        this.setState({
            activeAlbumID: activeAlbumID,
            currentTrackNumber: null
        })
    };

    handleSelectTrack = (trackId) => {
        if(this.state.currentTrackNumber === trackId) return null;
        this.setState({
            currentTrackNumber: trackId
        })
    };

    getCurrentAlbumName() {
        return Object.keys(musicAlbums)[this.state.activeAlbumID]
    }

    render() {
        const {currentTrackNumber, activeAlbumID} = this.state;
        const albumNames = Object.keys(musicAlbums);
        const activeAlbumName = this.getCurrentAlbumName();
        return (
            <div className="music-page page">
                <span className="music-page__background" style={{backgroundImage: `url(${musicAlbums[activeAlbumName].albumImagePath})`}}/>
                <Player
                    currentTrack={musicAlbums[activeAlbumName].tracksPaths[currentTrackNumber]}
                    autoplay={true}
                />
                <TrackList
                    trackList={musicAlbums[activeAlbumName].albumTracks}
                    onClick={this.handleSelectTrack}
                    currentTrackNumber={currentTrackNumber}
                />
                <CarouselSlider
                    parentClassName={"music-page"}
                    onChange={this.changeStateFromCarousel}
                    activeSlideID={activeAlbumID}
                >
                    {albumNames.map((album, index) =>
                        <AlbumCard
                            key={index}
                            id={index}
                            onClick={this.changeStateFromCarousel}
                            imgSrc={musicAlbums[album].albumImagePath}
                            releaseDate={musicAlbums[album].albumReleaseDate}
                            active={activeAlbumName === album}
                        />)}
                </CarouselSlider>
            </div>
        );
    }
}