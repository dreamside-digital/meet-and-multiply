import React from "react";
import { graphql } from "gatsby";
import { connect } from "react-redux";
import {
  saveOriginatorContent,
  saveOriginatorData,
  loadPageData
} from "../redux/actions";

import Layout from "../layouts/default.js";
import Paragraph from "../components/editables/Paragraph";
import Image from "../components/editables/Image";
import PlainText from "../components/editables/PlainText";
import CustomLink from "../components/editables/CustomLink";
import CustomButton from "../components/editables/CustomButton";
import BackgroundImage from "../components/editables/BackgroundImage";

const mapDispatchToProps = dispatch => {
  return {
    onUpdateOriginatorContent: (track, id, data) => {
      dispatch(saveOriginatorContent(track, id, data));
    },
    onUpdateOriginatorData: (track, id, data) => {
      dispatch(saveOriginatorData(track, id, data));
    },
    onLoadPageData: data => {
      dispatch(loadPageData(data));
    }
  };
};

const mapStateToProps = state => {
  return {
    pageData: state.page.data,
    isEditingPage: state.adminTools.isEditingPage
  };
};

class OriginatorTemplate extends React.Component {
  componentDidMount() {
    const initialPageData = {
      ...this.props.data.originators,
      content: JSON.parse(this.props.data.originators.content)
    };

    this.props.onLoadPageData(initialPageData);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data.originators.id !== this.props.data.originators.id) {
      const initialPageData = {
        ...this.props.data.originators,
        content: JSON.parse(this.props.data.originators.content)
      };

      this.props.onLoadPageData(initialPageData);
    }
  }

  onSave = fieldId => content => {
    const { id } = this.props.data.originators;
    console.log(`Saving ${fieldId}`);
    console.log(content);
    this.props.onUpdateOriginatorContent(id, fieldId, content);
  };

  onSaveTitle = content => {
    const { id } = this.props.data.originators;
    this.props.onUpdateOriginatorData(id, "title", content.text);
  };

  render() {
    const title = this.props.pageData ? this.props.pageData.title : "";
    const content = this.props.pageData ? this.props.pageData.content : {};

    return (
      <Layout>
        <main className="page">
          <BackgroundImage content={content["header-bg"]} onSave={this.onSave("header-bg")} className="small-section bg-dark-alfa-30">
            <div className="relative container align-left">
              <div className="row">
                <div className="col-md-8">
                  <h1 className="section-heading mb-10 mb-xs-0">
                    <PlainText
                      content={{ text: title }}
                      onSave={this.onSaveTitle}
                    />
                  </h1>
                  <div className="hs-line-4 uppercase">
                    <PlainText
                      content={content["header-subtitle"]}
                      onSave={this.onSave("header-subtitle")}
                    />
                  </div>
                </div>

                <div className="col-md-4 mt-30">
                  <div className="mod-breadcrumbs align-right">
                    <CustomLink
                      content={content["header-website"]}
                      onSave={this.onSave("header-website")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </BackgroundImage>

          <section className="page-section" id="about">
            <div className="container relative">
              <div className="section-text mb-60 mb-sm-40">
                <div className="row">
                  <div className="col-md-4 col-sm-6 mb-sm-50 mb-xs-30">
                    <Paragraph
                      content={content["about-p1"]}
                      onSave={this.onSave("about-p1")}
                    />
                  </div>

                  <div className="col-md-4 col-sm-6 mb-sm-50 mb-xs-30">
                    <Paragraph
                      content={content["about-p2"]}
                      onSave={this.onSave("about-p2")}
                    />
                  </div>

                  <div className="col-md-4 col-sm-12 mb-sm-50 mb-xs-30">
                    <div className="originator-info-item">
                      <div className="originator-info-point">
                        <span className="color">
                          <PlainText
                            content={content["location-label"]}
                            onSave={this.onSave("location-label")}
                          />
                        </span>
                        <PlainText
                          content={content["location-value"]}
                          onSave={this.onSave("location-value")}
                        />
                      </div>
                    </div>

                    <div className="originator-info-item">
                      <div className="originator-info-point">
                        <span className="color">
                          <PlainText
                            content={content["sector-label"]}
                            onSave={this.onSave("sector-label")}
                          />
                        </span>
                        <PlainText
                          content={content["sector-value"]}
                          onSave={this.onSave("sector-value")}
                        />
                      </div>
                    </div>

                    <div className="originator-info-item">
                      <div className="originator-info-point">
                        <span className="color">
                          <PlainText
                            content={content["adopter-profile-label"]}
                            onSave={this.onSave("adopter-profile-label")}
                          />
                        </span>
                        <PlainText
                          content={content["adopter-profile-value"]}
                          onSave={this.onSave("adopter-profile-value")}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="count-wrapper">
                <div className="row">
                  <div className="col-xs-6 col-sm-3">
                    <div className="count-number color">
                      <PlainText
                        content={content["founded-date"]}
                        onSave={this.onSave("founded-date")}
                      />
                    </div>
                    <div className="count-descr">
                      <i className="fa fa-lightbulb-o" />
                      <span className="count-title">Founded</span>
                    </div>
                  </div>

                  <div className="col-xs-6 col-sm-3">
                    <div className="count-number color">
                      <PlainText
                        content={content["employees-count"]}
                        onSave={this.onSave("employees-count")}
                      />
                    </div>
                    <div className="count-descr">
                      <i className="fa fa-child" />
                      <span className="count-title">Employees</span>
                    </div>
                  </div>

                  <div className="col-xs-6 col-sm-3">
                    <div className="count-number color">
                      <PlainText
                        content={content["annual-turnover"]}
                        onSave={this.onSave("annual-turnover")}
                      />
                    </div>
                    <div className="count-descr">
                      <i className="fa fa-usd" />
                      <span className="count-title">Annual turnover (USD)</span>
                    </div>
                  </div>

                  <div className="col-xs-6 col-sm-3">
                    <div className="count-number color">
                      <PlainText
                        content={content["profit-margin"]}
                        onSave={this.onSave("profit-margin")}
                      />
                    </div>
                    <div className="count-descr">
                      <i className="fa fa-line-chart" />
                      <span className="count-title">Profit margin</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="page-section bg-gray-lighter">
            <div className="container relative">
              <div className="row">
                <div className="col-md-8 col-md-offset-2 align-center">
                  <h1 className="section-title mb-10">
                    <PlainText
                      content={content["business-model-title"]}
                      onSave={this.onSave("business-model-title")}
                    />
                  </h1>
                  <h2 className="section-heading">
                    <PlainText
                      content={content["business-model-subtitle"]}
                      onSave={this.onSave("business-model-subtitle")}
                    />
                  </h2>

                  <div className="section-line mb-50 mb-xs-30" />

                  <div className="section-text mb-80 mb-xs-50">
                    <Paragraph
                      content={content["business-model-description"]}
                      onSave={this.onSave("business-model-description")}
                    />
                  </div>
                </div>
              </div>

              <div />

              <div className="row multi-columns-row alt-features-grid">
                <div className="col-sm-6 col-md-4 col-lg-4">
                  <div className="alt-features-item">
                    <div className="align-center">
                      <div className="alt-features-icon color">
                        <span className="icon-key" />
                      </div>
                      <h3 className="alt-features-title">
                        Key Partners, Activities and Resources
                      </h3>
                    </div>
                    <div className="alt-features-descr">
                      <Paragraph
                        content={content["partners-activites-resources"]}
                        onSave={this.onSave("partners-activites-resources")}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-sm-6 col-md-4 col-lg-4">
                  <div className="alt-features-item">
                    <div className="align-center">
                      <div className="alt-features-icon color">
                        <span className="icon-piechart" />
                      </div>
                      <h3 className="alt-features-title">
                        Customer Relationships, Channels and Segments
                      </h3>
                    </div>
                    <div className="alt-features-descr">
                      <Paragraph
                        content={content["customer-relationships"]}
                        onSave={this.onSave("customer-relationships")}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-sm-6 col-md-4 col-lg-4">
                  <div className="alt-features-item">
                    <div className="align-center">
                      <div className="alt-features-icon color">
                        <span className="icon-pricetags" />
                      </div>
                      <h3 className="alt-features-title">Cost structure</h3>
                    </div>
                    <div className="alt-features-descr">
                      <Paragraph
                        content={content["cost-structure"]}
                        onSave={this.onSave("cost-structure")}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-sm-6 col-md-4 col-lg-4">
                  <div className="alt-features-item">
                    <div className="align-center">
                      <div className="alt-features-icon color">
                        <span className="icon-wallet" />
                      </div>
                      <h3 className="alt-features-title">
                        Revenue streams
                      </h3>
                    </div>
                    <div className="alt-features-descr">
                      <Paragraph
                        content={content["revenue-streams"]}
                        onSave={this.onSave("revenue-streams")}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-sm-6 col-md-4 col-lg-4">
                  <div className="alt-features-item">
                    <div className="align-center">
                      <div className="alt-features-icon color">
                        <span className="icon-happy" />
                      </div>
                      <h3 className="alt-features-title">Customer base</h3>
                    </div>
                    <div className="alt-features-descr">
                      <Paragraph
                        content={content["customer-base"]}
                        onSave={this.onSave("customer-base")}
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          <section
            className="page-section bg-dark bg-dark-alfa-90 fullwidth-slider ekutir"
          >
            <div>
              <div className="container relative">
                <div className="row">
                  <div className="col-md-8 col-md-offset-2">
                    <div className="align-center">
                      <div className="section-icon">
                        <span className="icon-linegraph" />
                      </div>

                      <h2 className="section-title uppercase strong">
                        <PlainText
                          content={content["impact1-title"]}
                          onSave={this.onSave("impact1-title")}
                        />
                      </h2>
                    </div>

                    <blockquote className="testimonial white">
                      <Paragraph
                        content={content["impact1-description"]}
                        onSave={this.onSave("impact1-description")}
                      />
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="container relative">
                <div className="row">
                  <div className="col-md-8 col-md-offset-2">
                    <div className="align-center">
                      <div className="section-icon">
                        <span className="icon-linegraph" />
                      </div>

                      <h2 className="section-title uppercase strong">
                        <PlainText
                          content={content["impact2-title"]}
                          onSave={this.onSave("impact2-title")}
                        />
                      </h2>
                    </div>

                    <blockquote className="testimonial white">
                      <Paragraph
                        content={content["impact2-description"]}
                        onSave={this.onSave("impact2-description")}
                      />
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="container relative">
                <div className="row">
                  <div className="col-md-8 col-md-offset-2">
                    <div className="align-center">
                      <div className="section-icon">
                        <span className="icon-linegraph" />
                      </div>

                      <h2 className="section-title uppercase strong">
                        <PlainText
                          content={content["impact3-title"]}
                          onSave={this.onSave("impact3-title")}
                        />
                      </h2>
                    </div>

                    <blockquote className="testimonial white">
                      <Paragraph
                        content={content["impact3-description"]}
                        onSave={this.onSave("impact3-description")}
                      />
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="split-section bg-gray">
            <div className="clearfix relative">
              <div className="split-section-headings left">
                <div className="ssh-table">
                  <Image
                    styles={{ container: { height: "inherit" }, image: { height: "inherit", objectFit: "cover"} }}
                    content={content["opportunity-image"]}
                    onSave={this.onSave("opportunity-image")}
                  />
                </div>
              </div>

              <div className="split-section-content right small-section bg-gray-lighter">
                <div className="split-section-wrapper">
                  <h1 className="section-title">
                    <PlainText
                      content={content["opportunity-title"]}
                      onSave={this.onSave("opportunity-title")}
                    />
                  </h1>

                  <h2 className="section-heading uppercase strong">
                    <PlainText
                      content={content["opportunity-subtitle"]}
                      onSave={this.onSave("opportunity-subtitle")}
                    />
                  </h2>

                  <div className="section-text mb-60">
                    <Paragraph
                      content={content["opportunity-description"]}
                      onSave={this.onSave("opportunity-description")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="page-section">
            <div className="container relative">
              <div className="row">
                <div className="col-md-8 col-md-offset-2 align-center">
                  <h1 className="section-title mb-10">
                    <PlainText
                      content={content["adopter-title"]}
                      onSave={this.onSave("adopter-title")}
                    />
                  </h1>
                  <h2 className="section-heading mb-60 mb-xs-40">
                    <PlainText
                      content={content["adopter-subtitle"]}
                      onSave={this.onSave("adopter-subtitle")}
                    />
                  </h2>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-10 col-sm-offset-1">
                  <div className="align-center mb-40 mb-xxs-30">
                    <ul className="nav nav-tabs tpl-minimal-tabs animate">
                      <li className="active" data-tab="#tab-one">
                        <CustomLink
                          content={content["replication-tab1-title"]}
                          onSave={this.onSave("replication-tab1-title")}
                        />
                      </li>

                      <li data-tab="#tab-two">
                        <CustomLink
                          content={content["replication-tab2-title"]}
                          onSave={this.onSave("replication-tab2-title")}
                        />
                      </li>

                      <li data-tab="#tab-three">
                        <CustomLink
                          content={content["replication-tab3-title"]}
                          onSave={this.onSave("replication-tab3-title")}
                        />
                      </li>
                    </ul>
                  </div>

                  <div className="tab-content tpl-minimal-tabs-cont section-text align-center">
                    <div className="tab-pane fade in active" id="tab-one">
                      <Paragraph
                        content={content["replication-tab1-description"]}
                        onSave={this.onSave("replication-tab1-description")}
                      />
                    </div>

                    <div className="tab-pane fade" id="tab-two">
                      <Paragraph
                        content={content["replication-tab2-description"]}
                        onSave={this.onSave("replication-tab2-description")}
                      />
                    </div>

                    <div className="tab-pane fade" id="tab-three">
                      <Paragraph
                        content={content["replication-tab3-description"]}
                        onSave={this.onSave("replication-tab3-description")}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="page-section bg-gray-lighter">
            <div className="container relative">
              <div className="row alt-features-grid">
                <div className="col-sm-3">
                  <div className="alt-features-item">
                    <div className="alt-features-descr">
                      <h4 className="mt-0">
                        <PlainText
                          content={content["documentation-title"]}
                          onSave={this.onSave("documentation-title")}
                        />
                      </h4>
                      <Paragraph
                        content={content["documentation-description"]}
                        onSave={this.onSave("documentation-description")}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-sm-3">
                  <div className="alt-features-item align-center">
                    <div className="alt-features-icon color">
                      <span className="icon-download" />
                    </div>
                    <h3 className="alt-features-title">
                      <CustomLink
                        content={content["documentation-profile"]}
                        onSave={this.onSave("documentation-profile")}
                      />
                    </h3>
                  </div>
                </div>

                <div className="col-sm-3">
                  <div className="alt-features-item align-center">
                    <div className="alt-features-icon color">
                      <span className=" icon-document" />
                    </div>
                    <h3 className="alt-features-title">
                      <CustomLink
                        content={content["documentation-research1"]}
                        onSave={this.onSave("documentation-research1")}
                      />
                    </h3>
                  </div>
                </div>

                <div className="col-sm-3">
                  <div className="alt-features-item align-center">
                    <div className="alt-features-icon color">
                      <span className=" icon-document" />
                    </div>
                    <h3 className="alt-features-title">
                      <CustomLink
                        content={content["documentation-research2"]}
                        onSave={this.onSave("documentation-research2")}
                      />
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="small-section bg-color-alfa-90 bg-scroll call-to-action">
            <div className="container relative">
              <div className="row">
                <div className="col-md-8 col-md-offset-2 align-center">
                  <h1 className="section-title large">
                    <PlainText
                      content={content["cta-title"]}
                      onSave={this.onSave("cta-title")}
                    />
                  </h1>

                  <h2 className="section-heading uppercase strong">
                    <PlainText
                      content={content["cta-subtitle"]}
                      onSave={this.onSave("cta-subtitle")}
                    />
                  </h2>

                  <div className="local-scroll">
                    <CustomButton
                      content={content["cta-button"]}
                      onSave={this.onSave("cta-button")}
                      className="btn btn-mod btn-border-w btn-large"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OriginatorTemplate);

export const query = graphql`
  query($id: String!) {
    originators(id: { eq: $id }) {
      id
      content
      title
      navigation {
        order
        displayTitle
      }
    }
  }
`;
