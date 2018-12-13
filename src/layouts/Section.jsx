import React from "react";
import Grid from "@material-ui/core/Grid"


const Section = ({ children, ...rest }) => (
  <section {...rest}>
    <Grid container justify="center">
      <Grid item xs={12} sm={11} md={10} xl={9}>
        { children }
      </Grid>
    </Grid>
  </section>
);

export default Section;