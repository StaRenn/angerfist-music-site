import React, {Component} from 'react';
import {musicAlbums} from "../../database";
import Player from "../Player";
import "./musicPage.sass";
import AlbumCard from "./AlbumCard/";
import TrackList from "./TrackList/";
import {Swiper, SwiperSlide} from "swiper/react";

export class MusicPage extends Component {

    state = {
        activeAlbumID: 0,
        currentTrackNumber: null,
    };

    changeAlbum = (activeAlbumID) => { //function so i can set state of current class from other class
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
        const breakpoints = {
            1600: {slidesPerView: 4},
            1400: {slidesPerView: 3.5},
            850: {slidesPerView: 3},
            500: {slidesPerView: 2.5},
            350: {slidesPerView: 1.75},
            0: {slidesPerView: 1.35}
        }
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
                <Swiper
                    initialSlide={activeAlbumID}
                    slideToClickedSlide={true}
                    preventClicks={true}
                    slidesPerView={4}
                    centeredSlides={true}
                    onSlideChange={({activeIndex}) => this.changeAlbum(activeIndex)}
                    breakpoints={breakpoints}
                >
                    {albumNames.map((album, index) =>
                        <SwiperSlide key={index}>
                                <AlbumCard
                                    key={index}
                                    id={index}
                                    onClick={this.changeAlbum}
                                    imgSrc={musicAlbums[album].albumImagePath}
                                    releaseDate={musicAlbums[album].albumReleaseDate}
                                    active={activeAlbumName === album}
                                />
                        </SwiperSlide>
                    )}
                </Swiper>
            </div>
        );
    }
}