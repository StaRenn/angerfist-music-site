import React, {Component} from 'react';
import {tourdates} from "../../database";
import "./tourDatesPage.sass";
import TourCard from "./TourCard/";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';


export class TourDatesPage extends Component {
    render() {
        const centeredSlide = Math.floor(tourdates.length / 2)
        const breakpoints = {
            1600: {slidesPerView: 3.5},
            1400: {slidesPerView: 3},
            600: {slidesPerView: 2.5},
            400: {slidesPerView: 1.75},
            0: {slidesPerView: 1}
        }
        return (
            <div className="page-tourdates page">
                <Swiper
                    spaceBetween={50}
                    initialSlide={centeredSlide}
                    slideToClickedSlide={true}
                    preventClicks={true}
                    slidesPerView={3.5}
                    centeredSlides={true}
                    breakpoints={breakpoints}
                >
                    {tourdates.map((tourdate, index) =>
                        <SwiperSlide key={index}>
                            <TourCard
                                key={index}
                                tourdate={tourdate}
                            />
                        </SwiperSlide>
                        )}
                </Swiper>
            </div>
        );
    }
}