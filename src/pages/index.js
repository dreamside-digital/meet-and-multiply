import React from "react";
import { graphql, Link } from "gatsby";
import { connect } from "react-redux";
import {
  updatePage,
  loadPageData,
} from "../redux/actions";

import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"

import Layout from "../layouts/default.js";
import Section from "../layouts/Section";
import Title from "../components/editables/Title";
import Paragraph from "../components/editables/Paragraph";
import Image from "../components/editables/Image";
import PlainText from "../components/editables/PlainText";
import Action from "../components/editables/Action";
import EditableButton from "../components/editables/Button";



const PAGE_ID = "home"

const mapDispatchToProps = dispatch => {
  return {
    onUpdatePageData: (page, id, data) => {
      dispatch(updatePage(page, id, data));
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

class HomePage extends React.Component {
  componentDidMount() {
    const initialPageData = {
      ...this.props.data.pages,
      content: JSON.parse(this.props.data.pages.content)
    };

    this.props.onLoadPageData(initialPageData);
  }

  saveHandler = id => content => {
    this.props.onUpdatePageData(PAGE_ID, id, content);
  };

  render() {
    const content = this.props.pageData ? this.props.pageData.content : {};
    const title = this.props.pageData ? this.props.pageData.title : "";

    return (
      <Layout>
        <main className="page" id="top">

          <section className="home-section bg-dark-alfa-50 parallax-2 fixed-height-small"  id="home">
              <div className="js-height-parent container">

                  <div className="home-content container">
                      <div className="home-text">

                          <h1 className="hs-line-2 mt-0 mb-40 mb-xs-20">
                              <PlainText content={content["landing-title"]} />
                          </h1>

                          <h2 className="hs-line-11 mb-20 mb-xs-10">
                              <PlainText content={content["landing-subtitle"]} />
                          </h2>

                          <h3 className="hs-line-4 mb-20 mb-xs-10">
                            <strong>
                              <PlainText content={content["landing-date-location"]} />
                            </strong>
                          </h3>

                          <div className="local-scroll">
                              <a href="#overview" className="btn btn-mod btn-large btn-w hidden-xs">Learn more</a>
                              <span className="hidden-xs">&nbsp;</span>
                              <a href="#apply" className="btn btn-mod btn-large btn-color" target="_blank">Subscribe</a>
                          </div>

                      </div>
                  </div>

              </div>
          </section>


          <section className="split-section bg-gray" id="overview">
              <div className="clearfix relative">

                  <div className="split-section-headings left">
                      <div className="ssh-table">
                          <div className="ssh-cell page-section bg-scroll intro-section" data-background="adopters.jpg"></div>
                      </div>
                  </div>

                  <div className="split-section-content right small-section bg-gray-lighter">

                      <div className="split-section-wrapper">

                          <h1 className="section-title"><PlainText content={content["overview-title"]} /></h1>

                          <h2 className="section-heading uppercase strong"><PlainText content={content["overview-subtitle"]} /></h2>

                          <div className="section-text mb-60">
                            <Paragraph content={content["overview-description"]} />
                          </div>

                          <div className="row alt-features-grid">

                              <div className="col-sm-4 wow fadeInRight" data-wow-delay="0.1s">
                                  <div className="alt-features-item align-center">
                                      <div className="alt-features-icon color">
                                          <a href="#originators"></a><span className="icon-lightbulb"></span>
                                      </div>
                                      <h3 className="alt-features-title"><a href="#originators">The Originators</a></h3>
                                  </div>
                              </div>

                              <div className="col-sm-4 wow fadeInRight" data-wow-delay="0.2s">
                                  <div className="alt-features-item align-center">
                                      <div className="alt-features-icon color">
                                          <a href="#call-to-action"><span className="icon-genius"></span></a>
                                      </div>
                                      <h3 className="alt-features-title"><a href="#call-to-action">Be an Adopter</a></h3>
                                  </div>
                              </div>

                              <div className="col-sm-4 wow fadeInRight" data-wow-delay="0.3s">
                                  <div className="alt-features-item align-center">
                                      <div className="alt-features-icon color">
                                          <a href="#event"><span className="icon-calendar"></span></a>
                                      </div>
                                      <h3 className="alt-features-title"><a href="#contact">About the Event</a></h3>
                                  </div>
                              </div>

                          </div>

                      </div>

                  </div>

              </div>
          </section>


          <section className="page-section" id="originators">
              <div className="container relative">


                  <div className="row">
                      <div className="col-md-8 col-md-offset-2 align-center">

                          <h1 className="section-title mb-10">
                              <PlainText content={content["originators-title"]} />
                          </h1>
                          <h2 className="section-heading">
                              <PlainText content={content["originators-subtitle"]} />
                          </h2>

                          <div className="section-line mb-50 mb-xs-30"></div>

                          <div className="section-text mb-80 mb-xs-50">
                            <Paragraph content={content["originators-description"]} />
                          </div>

                      </div>
                  </div>


                  <div className="row multi-columns-row">

                      <div className="col-sm-6 col-md-3 col-lg-3 mb-md-30 wow fadeInUp">
                          <div className="team-item">

                              <div className="team-item-image" data-url="originators/jain-irrigation-s-l">

                                  <img src="jain/jain.jpg" alt="Jain Irrigation" />

                                  <div className="team-item-detail">

                                      <h4 className="team-item-h">Jain Irrigation</h4>

                                      <p>
                                          <strong> Dr. Dilip N. Kulkarni</strong><br />President, Agri-Food Division</p><p><em>From micro-irrigation systems to an integrated farming system</em>
                                      </p>

                                      <div className="team-social-links">
                                          <a href="originators/jain-irrigation-s-l" target="_blank"><i className="fa fa-plus-circle"></i></a>
                                      </div>

                                  </div>
                              </div>

                              <div className="team-item-descr">

                                  <div className="team-item-name">
                                      <a href="/originators/jain-irrigation-s-l">Jain Irrigation</a>
                                  </div>

                                  <div className="team-item-role">
                                      Jain Irrigations Systems (JISL) provides smallholder farmers with an integrated farming system with a focus on micro-irrigation systems (MIS). They help farmers to achieve annual yield increases between 60%–130%, and income increases between $500-$6,000 per farm.
                                  </div>

                              </div>

                          </div>
                      </div>

                      <div className="col-sm-6 col-md-3 col-lg-3 mb-md-30 wow fadeInUp" data-wow-delay="0.1s">
                          <div className="team-item">
                              <div className="team-item-image" data-url="originators/ekutir">

                                  <img src="ekutir/ekutir-photo.jpg" alt="eKutir" />

                                  <div className="team-item-detail">

                                      <h4 className="team-item-h">eKutir</h4>

                                      <p>
                                          <strong> KC Mishra</strong><br />Founder of eKutir</p><p><em>Using ICT to link smallholder farmers to markets and service providers</em>

                                      </p>

                                      <div className="team-social-links">
                                          <a href="originators/ekutir" target="_blank"><i className="fa fa-plus-circle"></i></a>
                                      </div>

                                  </div>
                              </div>
                              <div className="team-item-descr">

                                  <div className="team-item-name">
                                      <a href="originators/ekutir">eKutir</a>
                                  </div>

                                  <div className="team-item-role">
                                      Currently eKutir reaches around 70,000 marginalized farmers with major impacts on income, nutrition and sanitation of farmers. Farmers earn at least 200 USD per month by working with eKutir to increase yields and reduce costs.
                                  </div>

                              </div>

                          </div>
                      </div>

                      <div className="col-sm-6 col-md-3 col-lg-3 mb-sm-30 wow fadeInUp" data-wow-delay="0.2s">
                          <div className="team-item">

                              <div className="team-item-image" data-url="originators/ross-clinics">

                                  <a href="/originators/ross-clinics">
                                      <img src="ross/rossclinics.jpg" alt="Ross Clinics" />
                                  </a>

                                  <div className="team-item-detail">

                                      <h4 className="team-item-h">Ross Clinics</h4>

                                      <p><strong> Dr. Devashish Saini</strong><br />Founder of Ross Clinics</p><p><em>Reviving the family physician model for all socio-economic levels in India</em></p>

                                      <div className="team-social-links">
                                          <a href="originators/ross-clinics" target="_blank"><i className="fa fa-plus-circle"></i></a>
                                      </div>

                                  </div>
                              </div>

                              <div className="team-item-descr">

                                  <div className="team-item-name">
                                      <a href="originators/ross-clinics">Ross Clinics</a>
                                  </div>

                                  <div className="team-item-role">
                                      Ross Clinics is bringing back the family physician model to India. The small clinics provide primary care to families at all levels of the socio-economic spectrum. 90% of their clients are low or middle income.
                                  </div>

                              </div>

                          </div>
                      </div>

                      <div className="col-sm-6 col-md-3 col-lg-3 mb-sm-30 wow fadeInUp" data-wow-delay="0.3s">
                          <div className="team-item">

                              <div className="team-item-image" data-url="originators/narayana-health">

                                  <a >
                                      <img src="narayana/narayana-sm.png" alt="Narayana Health" />
                                  </a>

                                  <div className="team-item-detail">

                                      <h4 className="team-item-h">Narayana Health</h4>

                                      <p><strong> Dr. Devi Shetty</strong><br />Founder of Narayana Health</p><p><em>Bringing low-cost, high-quality specialty care to the masses</em></p>

                                      <div className="team-social-links">
                                          <a href="originators/narayana-health" target="_blank"><i className="fa fa-plus-circle"></i></a>
                                      </div>

                                  </div>
                              </div>

                              <div className="team-item-descr">

                                  <div className="team-item-name">
                                      <a href="originators/narayana-health" target="_blank">Narayana Health</a>
                                  </div>

                                  <div className="team-item-role">
                                      Narayana Health is a multi-specialty hospital chain in India, headquartered in Bangalore. The company’s mission is to provide affordable high-quality specialty care for all.
                                  </div>

                              </div>

                          </div>
                      </div>


                  </div>

              </div>
          </section>


          <section className="page-section bg-dark-alfa-90 bg-scroll call-to-action" id="call-to-action">
              <div className="container relative">

                  <div className="row">
                      <div className="col-md-8 col-md-offset-2 align-center">

                          <h1 className="section-title large">
                            <PlainText content={content["adopters-title"]} />
                          </h1>

                          <h2 className="section-heading uppercase strong">
                            <PlainText content={content["adopters-subtitle"]} />
                          </h2>

                          <div className="section-text white mb-50 mb-xs-30">
                            <Paragraph content={content["adopters-description"]} />
                          </div>

                          <div className="local-scroll">
                              <a href="#originators" className="btn btn-mod btn-w btn-large">Learn more</a>
                              <span className="hidden-xs">&nbsp;</span>
                              <a href="#apply" className="btn btn-mod btn-large btn-color" target="_blank">Subscribe</a>
                          </div>

                      </div>
                  </div>

              </div>
          </section>

          <section className="page-section" id="partners">
              <div className="container relative">

                  <div className="row">
                      <div className="col-md-8 col-md-offset-2 align-center">

                          <h1 className="section-title mb-10">
                            <PlainText content={content["partners-title"]} />
                          </h1>

                          <h2 className="section-heading">
                            <PlainText content={content["partners-subtitle"]} />
                          </h2>

                          <div className="section-line mb-50 mb-xs-30"></div>

                          <div className="section-text mb-80 mb-xs-50">
                            <Paragraph content={content["partners-description"]} />
                          </div>

                      </div>
                  </div>


                  <div className="row multi-columns-row service-grid">

                      <div className="col-sm-6 col-md-4 col-lg-4">
                          <div className="service-item">
                              <div className="service-icon logos">
                                  <img src="logos/endeva.png" alt="Endeva" />
                              </div>
                              <h3 className="service-title">Endeva</h3>
                              Experts in accelerating inclusive business innovations.
                          </div>
                      </div>

                      <div className="col-sm-6 col-md-4 col-lg-4">
                          <div className="service-item">
                              <div className="service-icon logos">
                                  <img src="logos/idb.png" alt="IDB" />
                              </div>
                              <h3 className="service-title">IDB</h3>
                              The IDB is the main source of multilateral financing in Latin America. It provides solutions to development challenges and support in the key areas of the region.
                          </div>
                      </div>

                      <div className="col-sm-6 col-md-4 col-lg-4">
                          <div className="service-item">
                              <div className="service-icon logos">
                                  <img src="logos/iban.png" alt="IBAN" />
                              </div>
                              <h3 className="service-title">IBAN</h3>
                              The Inclusive Business Action Network creates a vibrant and dynamic global pivotal point for the global inclusive business community.
                          </div>
                      </div>

                      <div className="col-sm-6 col-md-4 col-lg-4">
                          <div className="service-item">
                              <div className="service-icon logos">
                                  <img src="logos/bopinc.png" alt="BoP Innovation Center" />
                              </div>
                              <h3 className="service-title">BoP Innovation Center</h3>
                              The BoP Innovation Center facilitates sustainable inclusive business in low-income markets.
                          </div>
                      </div>

                      <div className="col-sm-6 col-md-4 col-lg-4">
                          <div className="service-item">
                              <div className="service-icon logos">
                                  <img src="logos/snv_logo.png" alt="SNV" />
                              </div>
                              <h3 className="service-title">SNV</h3>
                              SNV Netherlands Development Organisation is a non-profit, international development organisation, established in the Netherlands in 1965.
                          </div>
                      </div>

                      <div className="col-sm-6 col-md-4 col-lg-4">
                          <div className="service-item">
                              <div className="service-icon logos">
                                  <img src="logos/adb.png" alt="ADB" />
                              </div>
                              <h3 className="service-title">ADB</h3>
                              Since its founding in 1966, ADB has been driven by an inspiration and dedication to improving people’s lives in Asia and the Pacific.
                          </div>
                      </div>

                      <div className="col-sm-6 col-md-4 col-lg-4">
                          <div className="service-item">
                              <div className="service-icon logos">
                                  <img src="logos/connovo.png" alt="Connovo" />
                              </div>
                              <h3 className="service-title">Connovo</h3>
                              Connovo is a social business builder. We scale the impact of successful social businesses through a unique replication process.
                          </div>
                      </div>


                      <div className="col-sm-6 col-md-4 col-lg-4">
                          <div className="service-item">
                              <div className="service-icon logos">
                                  <img src="logos/r4d.jpg" alt="R4D" />
                              </div>
                              <h3 className="service-title">Results for Development</h3>
                              Results for Development Institute (R4D) is a non-profit organization whose mission is to unlock solutions to tough development challenges that prevent people in low- and middle-income countries from realizing their full potential.
                          </div>
                      </div>

                      <div className="col-sm-6 col-md-4 col-lg-4">
                          <div className="service-item">
                              <div className="service-icon logos">
                                  <img src="logos/minka.png" alt="Minka Dev" />
                              </div>
                              <h3 className="service-title">Minka Dev</h3>
                              Marketplace of business opportunities with high social environmental impact.
                          </div>
                      </div>

                  </div>



                  <div className="section-bot-image wow fadeInUp">
                      <img src="promo-5.png" alt="" />
                  </div>

              </div>
          </section>


          <section className="page-section" id="news">
              <div className="container relative">

                  <div className="align-left">

                      <h1 className="section-title mb-10">
                        <PlainText content={content["news-title"]} />
                      </h1>
                      <h2 className="section-heading">
                        <PlainText content={content["news-subtitle"]} />
                      </h2>

                      <div className="clearfix">
                        <div className="section-line left mt-0 mb-80 mb-xs-40"></div>
                      </div>

                  </div>


                  <div className="row multi-columns-row">

                      <div className="col-sm-6 col-md-4 col-lg-4 mb-md-50 wow fadeIn" data-wow-delay="0.1s" data-wow-duration="2s">
                        <div className="post-prev-img post-prev-border">
                          <Image content={content["news-item-1-image"]} />
                        </div>

                        <div className="post-prev-title">
                          <Action content={content["news-item-1-title"]} />
                        </div>

                        <div className="post-prev-info">
                          <Action content={content["news-item-1-author"]} />
                        </div>

                        <div className="post-prev-text">
                          <Paragraph content={content["news-item-1-description"]} />
                        </div>

                        <div className="post-prev-more">
                          <Action content={content["news-item-1-link"]} />
                        </div>
                      </div>

                      <div className="col-sm-6 col-md-4 col-lg-4 mb-md-50 wow fadeIn" data-wow-delay="0.1s" data-wow-duration="2s">
                        <div className="post-prev-img post-prev-border">
                          <Image content={content["news-item-2-image"]} />
                        </div>

                        <div className="post-prev-title">
                          <Action content={content["news-item-2-title"]} />
                        </div>

                        <div className="post-prev-info">
                          <Action content={content["news-item-2-author"]} />
                        </div>

                        <div className="post-prev-text">
                          <Paragraph content={content["news-item-2-description"]} />
                        </div>

                        <div className="post-prev-more">
                          <Action content={content["news-item-2-link"]} />
                        </div>
                      </div>

                      <div className="col-sm-6 col-md-4 col-lg-4 mb-md-50 wow fadeIn" data-wow-delay="0.1s" data-wow-duration="2s">
                        <div className="post-prev-img post-prev-border">
                          <Image content={content["news-item-3-image"]} />
                        </div>

                        <div className="post-prev-title">
                          <Action content={content["news-item-3-title"]} />
                        </div>

                        <div className="post-prev-info">
                          <Action content={content["news-item-3-author"]} />
                        </div>

                        <div className="post-prev-text">
                          <Paragraph content={content["news-item-3-description"]} />
                        </div>

                        <div className="post-prev-more">
                          <Action content={content["news-item-3-link"]} />
                        </div>
                      </div>

                  </div>

              </div>
          </section>

          <section className="small-section bg-color-alfa-90 bg-scroll call-to-action" data-background="full-width-images/section-bg-4.jpg" id="contact-us">
              <div className="container relative">

                  <div className="row">
                      <div className="col-md-8 col-md-offset-2 align-center">

                          <h1 className="section-title large">
                            <PlainText content={content["contact-title"]} />
                          </h1>

                          <h2 className="section-heading uppercase strong">
                            <PlainText content={content["contact-subtitle"]} />
                          </h2>

                          <div className="local-scroll">
                              <a href="/faqs" className="btn btn-mod btn-border-w btn-large">FAQ</a>
                              <a href="mailto:t.pasipanodya@endeva.org" className="btn btn-mod btn-border-w btn-large">Contact us</a>
                          </div>

                      </div>
                  </div>

              </div>
          </section>

          <section className="page-section" id="contact">
              <div className="container relative">

                  <div className="row mb-80 mb-xs-50">
                      <div className="col-md-8 col-md-offset-2 align-center">

                          <h1 className="section-title mb-10">
                              Event information
                          </h1>
                          <h2 className="section-heading">
                              Meet & Multiply
                          </h2>

                          <div className="section-line mb-50 mb-xs-30"></div>

                          <div className="section-text">
                              Meet & Multiply is a side event taking place at the <a href="http://www.forobase2015.com/" target="_blank">IDB's Base Forum</a> in Mexico City. The Meet and Multiply event is by invitation only. Adopters should apply to attend and relevant ecosystem partners should contact us directly. The Base Forum is open to all participants. Please visit the website to attend the main Forum.
                          </div>

                      </div>
                  </div>


                  <div className="row multi-columns-row alt-features-grid-1">

                      <div className="col-sm-6 col-md-4 col-lg-4">
                          <div className="alt-features-item-1 align-center">
                              <div className="alt-features-icon-1">
                                  <i className="fa fa-calendar-o"></i>
                              </div>
                              <h3 className="alt-features-title-1">Programme</h3>
                              <div className="alt-features-descr-1 email-link">
                                  <a href="programme-final-web.pdf" target="_blank">See the full programme</a>
                              </div>
                          </div>
                      </div>

                      <div className="col-sm-6 col-md-4 col-lg-4">
                          <div className="alt-features-item-1 align-center">
                              <div className="alt-features-icon-1">
                                  <i className="fa fa-file-pdf-o"></i>
                              </div>
                              <h3 className="alt-features-title-1">Agenda</h3>
                              <div className="alt-features-descr-1 email-link">
                                  <a href="agenda-final-web.pdf" target="_blank">Open the PDF</a>
                              </div>
                          </div>
                      </div>

                      <div className="col-sm-6 col-md-4 col-lg-4">
                          <div className="alt-features-item-1 align-center">
                              <div className="alt-features-icon-1">
                                  <i className="fa fa-envelope"></i>
                              </div>
                              <h3 className="alt-features-title-1">Contact</h3>
                              <div className="alt-features-descr-1 email-link">
                                  <a href="mailto:t.pasipanodya@endeva.org">t.pasipanodya@endeva.org</a>
                              </div>
                          </div>
                      </div>

                  </div>



              </div>
          </section>

          <section className="page-section" id="apply">
              <div className="container relative">

                  <div className="row">
                      <div className="col-md-8 col-md-offset-2 align-center">

                          <h1 className="section-title large">Interested in participating?</h1>
                          <h2 className="section-heading mb-40">Subscribe</h2>
                          <div className="section-text"><p>The pilot event was a success and we plan to do more events and follow-up activities. If you are interested in being kept up-to-date on Meet & Multiply please fill in the form below. </p><br /></div>

                      </div>
                  </div>

              </div>
          </section>

        </main>
      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

export const query = graphql`
  query {
    pages(id: {eq: "home"}) {
      id
      title
      slug
      content
    }
  }
`;


