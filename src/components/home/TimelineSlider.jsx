import React from 'react';
import Slider from 'react-slick'
import Grid from "@material-ui/core/Grid"
import { map } from 'lodash';

import Image from "../editables/Image";
import Title from "../editables/Title";
import Paragraph from "../editables/Paragraph";

export default class TimelineSlider extends React.Component {
  state = {
    slideIndex: 0
  }

  goToSlide = slideIndex => {
    this.slider.slickGoTo(slideIndex)
    this.setState({ slideIndex })
  }


  render() {
    const settings = {
      dots: true,
      infinite: true,
      arrows: false,
      swipe: true,
    }

    const onSavePassthrough = (index, fieldId) => content => {
      const newSlides = [...this.props.slides]
      newSlides[index][fieldId] = content
      this.props.onSave(newSlides)
    }

    const slides = this.props.slides || [];

    return(
      <div className="tour-stops-container">
        <Slider {...settings} infinite={false} ref={slider => (this.slider = slider)}>
          {
            map(slides, (slide, i) => {
              return(
                <div className="slide" key={`timeline-slide-${i}`}>
                  <Grid container justify="center">
                    <Grid item xs={12} md={8}>
                      <div className="content-container">
                        { slide["image"] &&
                          <div className="image">
                            <Image content={ slide["image"] } onSave={ onSavePassthrough(i, "image") } />
                          </div>
                        }
                        <Title content={ slide["heading"] } onSave={ onSavePassthrough(i, "heading") } />
                        <Paragraph content={ slide["description"] } onSave={ onSavePassthrough(i, "description") } />
                      </div>
                    </Grid>
                  </Grid>
                </div>
              )
            })
          }
        </Slider>
      </div>
    )
  }
}