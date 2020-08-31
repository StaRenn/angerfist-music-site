import React, {Component} from 'react';
import {videoIds} from "../../database";
import "./videoPage.sass";
import CloseVideoButton from "./CloseVideoButton/";
import {VideoBox} from "./VideoBox/VideoBox";

export class VideoPage extends Component {

    state = {
        activeVideo: null,
        isOpen: false
    };

    handleOpenVideoClick = (videoId) => {
        this.setState({
            activeVideo: videoId,
            isOpen: true
        })
    };

    handleCloseVideoClick = () => {
        this.setState({
            activeVideo: null,
            isOpen: false
        })
    }

    getIframe() {
        const {isOpen, activeVideo} = this.state;
        if(!isOpen) return null;
        return (
            <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&enablejsapi=1`}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen={true}
            />
        )
    }

    componentWillUnmount() {
        this.handleCloseVideoClick()
    }

    render() {
        const {isOpen} = this.state;
        return (
            <div className="video-page page">
                <div className="youtube-video-container">
                    {this.getIframe()}
                </div>
                <div className={`video-left-col ${isOpen ? "opened" : ""}`}>
                    <VideoBox
                        onClick={this.handleOpenVideoClick}
                        videoId={videoIds[0]}
                        additionalClassName={"defqon-2018"}
                        title={"ANGERFIST AT DEFQON.1 2018"}
                    />
                    <VideoBox
                        onClick={this.handleOpenVideoClick}
                        videoId={videoIds[1]}
                        additionalClassName={"moh-2019"}
                        title={"ANGERFIST AT MASTERS OF HARDCORE 2019"}
                    />
                </div>
                <div className={`video-right-col ${isOpen ? "opened" : ""}`}>
                    <CloseVideoButton onClick={this.handleCloseVideoClick} />
                    <VideoBox
                        onClick={this.handleOpenVideoClick}
                        videoId={videoIds[2]}
                        additionalClassName={"qlimax-2016"}
                        title={"ANGERFIST AT QLIMAX 2016"}
                    />
                    <VideoBox
                        onClick={this.handleOpenVideoClick}
                        videoId={videoIds[3]}
                        additionalClassName={"tomorrowland-2017"}
                        title={"ANGERFIST AT TOMORROWLAND 2017"}
                    />
                </div>
            </div>
        );
    }
}
