import React, {Component} from 'react';
import {tourdates} from "../../database";
import CarouselSlider from "../CarouselSlider";
import "./tourDatesPage.sass";
import TourCard from "./TourCard/";


export class TourDatesPage extends Component {

    state = {
        centeredSlide: 5
    };

    setActiveSlide = (slideId) => {
        this.setState({
            centeredSlide: slideId
        })
    };

    render() {
        return (
            <div className="page-tourdates page">
                <CarouselSlider
                    parentClassName={"page-tourdates"}
                    activeSlideID={this.state.centeredSlide}
                    onChange={this.setActiveSlide}
                >
                    {tourdates.map((tourdate, index) =>
                        <TourCard
                            key={index}
                            tourdate={tourdate}
                            active={index === this.state.centeredSlide}
                            id={index}
                            onClick={this.setActiveSlide}
                        />)}
                </CarouselSlider>
            </div>
        );
    }
}