import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class CarouselSlider extends Component {

    constructor(props) {
        super(props);
        this.sliderOffsetLeft = 0;
        this.state = {
            activeSlideID: this.props.activeSlideID || 0
        };
    }

    static propTypes = {
        parentClassName: PropTypes.string.isRequired,
        onChange: PropTypes.func,
        activeSlideID: PropTypes.number
    };

    handleDrag = (ev, actionType) => {
        let lastPageXPosition = ev.pageX || ev.touches[0].pageX;
        //comparing previous mouse position with a current one
        //accumulating it in offset and assigning it for slider.style.left
        window[actionType === "mouse" ? "onmousemove" : "ontouchmove"] = function (ev) {

            this.sliderDiv.style.pointerEvents = "none"; //to prevent hover and onclick effect while sliding

            this.sliderOffsetLeft += Math.round((ev.clientX || ev.touches[0].clientX) - lastPageXPosition)*1.5; //*1.5 for speed increasing

            if(this.sliderOffsetLeft > this.offsetWidth + this.slideWidth/3){
                this.sliderOffsetLeft = this.offsetWidth + this.slideWidth/3; //limiting slider offset
            }
            if(this.sliderOffsetLeft < -this.offsetWidth - this.slideWidth/3){
                this.sliderOffsetLeft = -this.offsetWidth - this.slideWidth/3;  //limiting slider offset
            }

            this.sliderDiv.style.left = this.sliderOffsetLeft + "px"; //applying offset to the slider
            lastPageXPosition = ev.pageX || ev.touches[0].pageX; //receiving new mouse/touch position to compare with

        }.bind(this); //binding to component

        window[actionType === "mouse" ? "onmouseup" : "ontouchend"] = function () {
            window[actionType === "mouse" ? "onmousemove" : "ontouchmove"] = null;
            this.sliderDiv.style.pointerEvents = "auto"; //enabling pointerevents so onclick will work
            this.sliderOffsetLeft = this.getOffset(); //rounding received offset
            this.sliderDiv.style.left = this.sliderOffsetLeft + "px"; //applying offset
            const newActiveSlideId = this.getSlideId();
            this.setActiveSlide(newActiveSlideId)();
        }.bind(this) //binding to component
    }

    setActiveSlide = (id) => () => {
        const {onChange} = this.props;
        onChange ? onChange(id) : null;
        this.setState({activeSlideID: id})
    };

    getSizeData() {
        this.totalWidth = this.sliderDiv.offsetWidth;
        this.slideWidth = this.totalWidth / this.props.children.length;
        this.offsetWidth = (this.totalWidth - this.slideWidth) / 2;
        this.sliderOffsetLeft = this.offsetWidth - this.state.activeSlideID*this.slideWidth;
        this.sliderDiv.style.left = this.sliderOffsetLeft + "px";
    }

    getOffset() {
        return Math.round(this.sliderOffsetLeft / this.slideWidth) * this.slideWidth
    }

    getSlideId() {
        return Math.round((-this.sliderOffsetLeft + this.offsetWidth)/this.slideWidth)
    }

    componentWillUnmount() {
        this.sliderDiv.onmousedown = null;
        window.onmousemove = null;
        window.onmouseup = null;
        window.onresize = null;
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({activeSlideId: nextProps.activeSlideID})
        this.sliderOffsetLeft = this.offsetWidth - nextProps.activeSlideID * this.slideWidth;
        this.sliderDiv.style.left = this.sliderOffsetLeft + "px";
    }

    componentDidMount() {
        this.getSizeData();
        window.onresize = function() {
            if(this.totalWidth !== this.sliderDiv.offsetWidth){
                setTimeout(() => this.getSizeData(), 250) //carousel transition time
            }
        }.bind(this);
        this.sliderDiv.onmousedown = ev => this.handleDrag(ev, "mouse");
        this.sliderDiv.ontouchstart = ev => this.handleDrag(ev, "touch");
    }

    render() {
        const {parentClassName} = this.props;
        return (
            <div
                className={`${parentClassName}__wheel`}
                ref={sliderDiv => this.sliderDiv = sliderDiv}
            >
                {this.props.children}
            </div>
        );
    }
}