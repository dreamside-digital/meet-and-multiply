import React from "react";
import { connect } from "react-redux";
import { getApplicant, updateApplicantStatus, deleteApplicant } from "../redux/actions";
import qs from "query-string";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import Layout from "../layouts/default.js";
import ProtectedPage from "../layouts/protected-page.js";

import { FORM_QUESTIONS } from "../utils/constants"


const mapDispatchToProps = dispatch => {
  return {
    getApplicant: (id) => {
      dispatch(getApplicant(id));
    },
    deleteApplicant: (id) => {
      dispatch(deleteApplicant(id));
    },
    updateApplicantStatus: (id, status) => {
      dispatch(updateApplicantStatus(id, status));
    }
  };
};

const mapStateToProps = state => {
  return {
    applicant: state.applicants.applicant
  };
};


const ReviewPage = props => {
  const applicant = props.applicant;

  const confirmDelete = () => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      props.deleteApplicant(applicant.id);
    }
  }

  return (
    <Layout>
      <ProtectedPage>
        <main className="page">
          <section className="page-section">
            <div className="container relative">
              <h1>{`${applicant.firstname} ${applicant.lastname}`}</h1>
              <div className="row section-text">
                <div className="col-sm-12">
                  <Paper>
                    <Table>
                      <TableBody>
                        {
                          FORM_QUESTIONS.map(question => {
                            if (!question.role || question.role === applicant.role) {
                              return (
                                <TableRow key={question.key}>
                                  <TableCell style={{ width: "340px" }}>{question.label}</TableCell>
                                  <TableCell>{applicant[question.key]}</TableCell>
                                </TableRow>
                              )
                            };
                            return null;
                          })
                        }
                      </TableBody>
                    </Table>
                  </Paper>
                </div>
              </div>
              <div className="row section-text">
                <div className="col-sm-12 mt-20">
                  <Button onClick={() => props.updateApplicantStatus(applicant.id, "Accepted")}>Accept</Button>
                  <Button onClick={() => props.updateApplicantStatus(applicant.id, "Rejected")}>Reject</Button>
                  <Button onClick={() => props.updateApplicantStatus(applicant.id, "More info requested")}>Request more information</Button>
                  <Button onClick={() => props.updateApplicantStatus(applicant.id, "Reminder sent")}>Send reminder</Button>
                  <Button onClick={confirmDelete}>Delete application</Button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </ProtectedPage>
    </Layout>
  );
};

class PageContainer extends React.Component {
  componentDidMount() {
    const parsedParams = qs.parse(this.props.location.search)
    const id = parsedParams.applicant
    this.props.getApplicant(id);
  }

  render() {
    return <ReviewPage {...this.props} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageContainer);
