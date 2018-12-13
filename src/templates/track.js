import React from "react";
import { graphql } from "gatsby";
import { connect } from "react-redux";
import {
  saveTrackContent,
  saveTrackData,
  loadPageData,
} from "../redux/actions";

import Grid from "@material-ui/core/Grid"

import Layout from "../layouts/default.js";
import Section from "../layouts/Section";
import Title from "../components/editables/Title";
import Paragraph from "../components/editables/Paragraph";
import Image from "../components/editables/Image";

import tourImage from "../assets/images/tour-detailed.png"
import factoryImage from "../assets/images/factory-detailed.png"

import IntroSlides from "../components/track/IntroSlides"
import TourStops from "../components/track/TourStops"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const mapDispatchToProps = dispatch => {
  return {
    onUpdateTrackContent: (track, id, data) => {
      dispatch(saveTrackContent(track, id, data));
    },
    onUpdateTrackData: (track, id, data) => {
      dispatch(saveTrackData(track, id, data));
    },
    onLoadPageData: data => {
      dispatch(loadPageData(data));
    },
  };
};

const mapStateToProps = state => {
  return {
    pageData: state.page.data,
    isEditingPage: state.adminTools.isEditingPage,
  };
};

class TrackTemplate extends React.Component {
  componentDidMount() {
    const initialPageData = {
      ...this.props.data.tracks,
      content: JSON.parse(this.props.data.tracks.content)
    };

    this.props.onLoadPageData(initialPageData);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data.tracks.id !== this.props.data.tracks.id) {
      const initialPageData = {
        ...this.props.data.tracks,
        content: JSON.parse(this.props.data.tracks.content)
      };

      this.props.onLoadPageData(initialPageData);
    }
  }

  onSave = fieldId => content => {
    const { id } = this.props.data.tracks;
    console.log(`Saving ${fieldId}`)
    console.log(content)
    this.props.onUpdateTrackContent(id, fieldId, content);
  };

  onSaveTitle = content => {
    const { id } = this.props.data.tracks;
    this.props.onUpdateTrackData(id, "title", content.text)
  }

  render() {
    const title = this.props.pageData ? this.props.pageData.title : "";
    const content = this.props.pageData ? this.props.pageData.content : {};
    const tourStops = content["tour-stops"] || [];
    const introSlides = content["intro-slides"] || [];

    return (
      <Layout>
        <main>
          <Section id="track-landing">
            <div className="outer-container">
              <Grid container>
                <Grid item xs={12} md={6}>
                  <div className="horiz-spacing vert-spacing">
                    <Title level="h3" content={ { text: title } } onSave={this.onSaveTitle} />
                    <div className="big-question">
                      <Title level="h2" content={ content["topic"] } onSave={this.onSave('topic')} />
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} md={6}>
                  <div className="track-icon image-container vert-spacing">
                    <Image content={ content["icon"] } onSave={this.onSave('icon')} />
                    { this.props.isEditingPage && <Image content={ content["icon-small"] } onSave={this.onSave('icon-small')} /> }
                  </div>
                </Grid>
              </Grid>
            </div>
          </Section>

          <Section id="track-description" className="background-container dark">
            <div className="outer-container">
              <div className="slider-nav"></div>
              <IntroSlides slides={introSlides} onSave={this.onSave("intro-slides")} />
            </div>
          </Section>

          {
            (content["track-lead-name"] || this.props.isEditingPage) &&
            <Section id="track-lead" className="background-container">
              <div className="track-lead">
                  <Grid container>
                    <Grid item xs={12} md={6}>
                      <div className="image-container">
                        <Image content={content["track-lead-image"]} className="pure-img" onSave={this.onSave("track-lead-image")} />
                      </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <div className="text vert-spacing horiz-spacing">
                        <h3>Track lead</h3>
                        <Paragraph content={content["track-lead-name"]} onSave={this.onSave("track-lead-name")} />
                        <div className="quote">
                          <Paragraph content={content["track-lead-quote"]} onSave={this.onSave("track-lead-quote")} />
                        </div>
                      </div>
                    </Grid>
                  </Grid>
              </div>
            </Section>
          }

          <Section id="tour-factory">

            <Grid container>
              <Grid item xs={12}>
                <div id="tour">
                  <section className="intro">
                    <header className="text-center">
                      <Title level="h2" content={ content["tour-title"] } onSave={this.onSave('tour-title')} />
                      <div className="headline vert-spacing">
                        <Paragraph content={ content["tour-subtitle"] } onSave={this.onSave('tour-subtitle')} />
                      </div>
                    </header>

                    <div className="outer-container">
                      <Grid container>
                        <Grid item xs={12} md={6}>
                          <div className="vert-center horiz-center">
                            <div className="image oversize">
                              <img src={tourImage} alt="ii2030" className="pure-img" />
                            </div>
                          </div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <div className="vert-center slide-container">
                            <div className="slide text horiz-spacing vert-spacing">
                              <Paragraph content={ content["tour-description"] } onSave={this.onSave('tour-description')} />
                            </div>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  </section>

                  <section id="tour-stops">
                    <header className="text-center">
                      <Title level="headline" content={ content["tour-stops-title"] } onSave={this.onSave('tour-stops-title')} />
                      <div className="headline vert-spacing">
                        <Paragraph content={ content["tour-stops-subtitle"] } onSave={this.onSave('tour-stops-subtitle')} />
                      </div>
                    </header>

                    <TourStops slides={tourStops} onSave={this.onSave("tour-stops")} />
                  </section>

                </div>

              </Grid>

              <Grid item xs={12}>
                <div id="factory">
                  <section className="intro">
                    <header className="text-center">
                      <Title level="h2" content={ content["factory-title"] } onSave={this.onSave('factory-title')} />
                      <div className="headline vert-spacing">
                        <Paragraph content={ content["factory-subtitle"] } onSave={this.onSave('factory-subtitle')} />
                      </div>
                    </header>

                    <div className="outer-container">
                      <Grid container>
                        <Grid item xs={12} md={6}>
                          <div className="vert-center horiz-center">
                            <div className="image oversize">
                              <img src={factoryImage} alt="ii2030" className="pure-img" />
                            </div>
                          </div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <div className="vert-center slide-container">
                            <div className="slide text horiz-spacing vert-spacing">
                              <Paragraph content={ content["factory-description"] } onSave={this.onSave('factory-description')} />
                            </div>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  </section>

                  <section id="factory-outputs">
                    <header className="text-center">
                      <Title level="headline" content={ content["factory-outputs-title"] } onSave={this.onSave('factory-outputs-title')} />
                    </header>
                    <div className="text horiz-spacing">
                      <Paragraph content={ content["factory-outputs-description"] } onSave={this.onSave('factory-outputs-description')} />
                    </div>
                  </section>
                </div>
              </Grid>
            </Grid>

          </Section>
        </main>
      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackTemplate);


// export const query = graphql`
//   query($id: String!) {
//     tracks(id: { eq: $id }) {
//       id
//       content
//       title
//       slug
//       template
//       page_type
//       navigation {
//         order
//         displayTitle
//       }
//     }
//   }
// `;

