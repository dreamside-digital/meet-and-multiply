import React from "react";
import { graphql } from "gatsby";
import { connect } from "react-redux";
import { updatePage, loadPageData } from "../redux/actions";

import Button from "@material-ui/core/Button";

import Layout from "../layouts/default.js";
import PlainText from "../components/editables/PlainText";
import BackgroundImage from "../components/editables/BackgroundImage";

const mapDispatchToProps = dispatch => {
  return {
    onUpdatePageData: (page, id, data) => {
      dispatch(updatePage(page, id, data));
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

const Question = ({ faq, index, onSave, onDelete, isEditingPage }) => {
  if (isEditingPage) {
    return(
      <>
        <PlainText
          content={faq["question"]}
          onSave={onSave(index, "question")}
        />
        <PlainText
          content={faq["answer"]}
          onSave={onSave(index, "answer")}
        />
        <Button onClick={onDelete(index)}>Delete</Button>
      </>
    )
  }

  return (
    <>
      <dt>
        <a href="">
          <PlainText
            content={faq["question"]}
            onSave={onSave(index, "question")}
          />
        </a>
      </dt>
      <dd>
        <PlainText content={faq["answer"]} onSave={onSave(index, "answer")} />
      </dd>
    </>
  );
};

class FrequentlyAskedQuestions extends React.Component {
  componentDidMount() {
    const initialPageData = {
      ...this.props.data.pages,
      content: JSON.parse(this.props.data.pages.content)
    };

    this.props.onLoadPageData(initialPageData);
  }

  saveHandler = id => content => {
    this.props.onUpdatePageData("faqs", id, content);
  };

  addFaq = () => {
    const faqArray = [...this.props.pageData.content.questions];
    const emptyFaq = {
      question: { text: "Question" },
      answer: { text: "Answer" }
    };
    faqArray.push(emptyFaq);

    this.props.onUpdatePageData("faqs", "questions", faqArray);
  };

  editFaq = (index, field) => content => {
    const faqArray = [...this.props.pageData.content.questions];
    const updatedFaq = {
      ...faqArray[index],
      [field]: content
    };

    faqArray[index] = updatedFaq;

    this.props.onUpdatePageData("faqs", "questions", faqArray);
  };

  deleteFaq = index => () => {
    const faqArray = [...this.props.pageData.content.questions];
    faqArray.splice(index, 1);

    this.props.onUpdatePageData("faqs", "questions", faqArray);
  };

  render() {
    const content = this.props.pageData ? this.props.pageData.content : {};
    const questions = content.questions || [];

    return (
      <Layout>
        <main className="page">
          <BackgroundImage content={content["header-bg"]} onSave={this.saveHandler("header-bg")} className="page-section bg-dark-alfa-30">
              <div className="relative container align-left">
                <div className="row">
                  <div className="col-md-8">
                    <h1 className="section-heading mb-10 mb-xs-0">
                      <PlainText
                        content={content["faqs-title"]}
                        onSave={this.saveHandler("faqs-title")}
                      />
                    </h1>
                    <div className="hs-line-4 uppercase">
                      <PlainText
                        content={content["faqs-subtitle"]}
                        onSave={this.saveHandler("faqs-subtitle")}
                      />
                    </div>
                  </div>
                </div>
              </div>
          </BackgroundImage>

          <section className="page-section">
            <div className="container relative">
              <div className="row section-text">
                <div className="col-md-8 col-md-offset-2">
                  <dl className="accordion">
                    {questions.map((question, index) => (
                      <Question
                        key={index}
                        faq={question}
                        index={index}
                        onSave={this.editFaq}
                        onDelete={this.deleteFaq}
                        isEditingPage={this.props.isEditingPage}
                      />
                    ))}
                  </dl>

                  {this.props.isEditingPage && (
                    <Button
                      color="default"
                      variant="contained"
                      onClick={this.addFaq}
                    >
                      Add question
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </section>
        </main>
      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  FrequentlyAskedQuestions
);

export const query = graphql`
  query {
    pages(id: { eq: "faqs" }) {
      id
      title
      slug
      content
    }
  }
`;
