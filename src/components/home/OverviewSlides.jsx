import React from "react";
import Grid from "@material-ui/core/Grid";
import Slider from "react-slick";
import { map } from 'lodash';

import Image from "../editables/Image";
import Title from "../editables/Title";
import Paragraph from "../editables/Paragraph";

const OverviewSlides = ({ slides, onSave }) => {
  const onSavePassthrough = (index, fieldId) => content => {
    const newSlides = [...slides]
    newSlides[index][fieldId] = content
    onSave(newSlides)
  }

  const collection = slides || [];

  return (
    <Slider>
      {map(collection, (slide, i) => {
        return (
          <div className="slide" key={`overview-slide-${i}`}>
            <Grid container>
              <Grid item xs={12} md={6} className="vert-center horiz-center">
                <div className="image oversize">
                  <Image
                    content={slide["image"]}
                    onSave={onSavePassthrough(i, "image")}
                  />
                </div>
              </Grid>
              <Grid item xs={12} md={6} className="vert-center">
                <div className="text horiz-spacing vert-spacing-lg">
                  <Title
                    level="h2"
                    content={slide["heading"]}
                    onSave={onSavePassthrough(i, "heading")}
                  />
                  <Paragraph
                    content={slide["description"]}
                    onSave={onSavePassthrough(i, "description")}
                  />
                </div>
              </Grid>
            </Grid>
          </div>
        );
      })}
    </Slider>
  );
};

export default OverviewSlides;
