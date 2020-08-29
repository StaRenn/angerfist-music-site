import React, {Component} from 'react';
import PropTypes from "prop-types";
import "./player.sass";

export class Player extends Component {
    static propTypes = {
        currentTrack: PropTypes.string,
        autoplay: PropTypes.bool,
        paused: PropTypes.bool
    };

    state = {
        currentSongDuration: null,
        isSongPlaying: false
    };

    // used to convert song duration to time (250 => 4:10)
    parseIntToTime(int) {
        int = Math.ceil(int);
        return `${Math.floor(int/60)}:${int%60 >= 10 ? int%60 : "0" + (int%60).toString()}`
    }

    handleTimeChange = (ev, actionType) => {
        this.handleChangeSongState(false);
        this.timeLine.value = ev.target.value;
        this.timeLine[actionType === "mouse" ? "onmousemove" : "ontouchmove"] = (ev) => {
            this.timeLine.value = ev.target.value;
            this.current_time.innerHTML = this.parseIntToTime(ev.target.value);
        };

        this.timeLine[actionType === "mouse" ? "onmouseup" : "ontouchend"] = () => {
            this.timeLine[actionType === "mouse" ? "onmousemove" : "ontouchmove"] = null; //resetting onmousemove to prevent bugs
            this.audio.currentTime = ev.target.value;
            this.handleChangeSongState(true);
        }
    }

    handleChangeSongState = (play) => {
        if(play) {
            this.audio.play().catch(err => this.setState({isSongPlaying: "paused"}));
        }else{
            this.audio.pause();
        }
        this.setState({isSongPlaying: play})
    };

    handleVolumeChange = (ev) => {
        this.volumeLevel.value = ev.target.value;
        this.audio.volume = ev.target.value/100
        // divided by 100 cuz audio.volume accepts numbers only in range from 0 to 1
    };

    resetToDefault = () => {
        this.current_time.innerHTML = "0:00";
        this.timeLine.value = "0";
        this.audio.currentTime = 0;
        this.currentTimeInterval ? clearInterval(this.currentTimeInterval) : null
    };

    //clearing interval if song is being paused/played to prevent accumulation of intervals
    componentWillUpdate(nextProps, nextState, nextContext) {
        clearInterval(this.currentTimeInterval);
    }

    //pausing song and resetting timeLine and current time if song is being changed
    componentWillReceiveProps(nextProps, nextContext) {
        this.audio.src = "";
        this.handleChangeSongState(false);
        this.resetToDefault();
    }
    componentWillUnmount() {
        this.handleChangeSongState(false);
    }

    componentDidMount(){

        this.resetToDefault();
        const autoplay = this.props.autoplay;
        this.volumeLevel.value = "25";

        this.audio.onloadedmetadata = function() {
            this.audio.volume = this.volumeLevel.value/100;
            this.setState({currentSongDuration: this.audio.duration});
            autoplay ? this.handleChangeSongState(true) : null
        }.bind(this);

        //creating interval to update timeLine
        this.audio.onplay = () => {
            this.currentTimeInterval = setInterval(() => {
                this.current_time.innerHTML = this.parseIntToTime(this.audio.currentTime);
                this.timeLine.value = this.audio.currentTime;
            }, 10)
        };

        this.audio.onpause = () => {
            clearInterval(this.currentTimeInterval)
        };

        //changing song current time with timeLine range input
        this.timeLine.onmousedown = (ev) => this.handleTimeChange(ev, "mouse");
        this.timeLine.ontouchstart = (ev) => this.handleTimeChange(ev, "touch");

        this.audio.onended = () => {
            this.resetToDefault();
            this.handleChangeSongState(false)
        }
    }

    render() {
        const {currentTrack} = this.props;
        const {isSongPlaying, currentSongDuration} = this.state;
        return (
            <div className={"player"}>
                <audio
                    preload={"metadata"}
                    id="song"
                    src={currentTrack}
                    ref={audio => {this.audio = audio}}
                />
                <span 
                    className={`player__${isSongPlaying ? "pause" : "play"}-button ${currentSongDuration === null ? "inactive" : ""}`}
                    onClick={() => this.handleChangeSongState(!isSongPlaying)}
                />
                <div className="player__time-line">
                    <span
                        className="player__current-time"
                        ref={current_time => {this.current_time = current_time}}
                    >0:00</span>
                    <input
                        ref={timeLine => {this.timeLine = timeLine}}
                        className={`player__time-line__input ${currentSongDuration === null ? "inactive" : ""}`}
                        type="range"
                        min = "0"
                        max = {`${this.state.currentSongDuration}`}
                    />
                    <span className="player__total-time">{this.parseIntToTime(this.state.currentSongDuration)}</span>
                </div>
                <div className="player__volume">
                    <span/>
                    <input
                        ref={volumeLevel => {this.volumeLevel = volumeLevel}}
                        className="player__volume__input"
                        type="range"
                        onChange={this.handleVolumeChange}
                    />
                </div>
            </div>
        );
    }
}