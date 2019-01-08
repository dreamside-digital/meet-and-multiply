import React from "react";
import { connect } from "react-redux";
import { getApplicants } from "../redux/actions";
import { map } from "lodash";
import { Link } from "gatsby";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Layout from "../layouts/default.js";
import ProtectedPage from "../layouts/protected-page.js";

const styles = {
  paper: {
    overflowX: 'auto',
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getApplicants: () => {
      dispatch(getApplicants());
    },
  };
};

const mapStateToProps = state => {
  return {
    applicants: state.applicants.applicants
  };
};


const ApplicantsPage = props => {
  const applicants = props.applicants;
  return (
    <Layout>
      <ProtectedPage>
        <main className="page">
          <section className="page-section">
            <div className="container relative">
              <div className="row section-text">
                <div className="col-sm-12">
                  <Paper style={styles.paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>First name</TableCell>
                          <TableCell>Last name</TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell>Organization</TableCell>
                          <TableCell>Job title</TableCell>
                          <TableCell>Role</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Review</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {map(applicants, ((applicant, key) => {
                          return (
                            <TableRow key={key}>
                              <TableCell component="th" scope="row">
                                {applicant.firstname}
                              </TableCell>
                              <TableCell>{applicant.lastname}</TableCell>
                              <TableCell>{applicant.email}</TableCell>
                              <TableCell>{applicant.company}</TableCell>
                              <TableCell>{applicant.position}</TableCell>
                              <TableCell>{applicant.role}</TableCell>
                              <TableCell>{applicant.status}</TableCell>
                              <TableCell>
                                <Link to={`/review?applicant=${applicant.id}`}><span className="btn btn-mod btn-color btn-circle">Review</span></Link>
                              </TableCell>
                            </TableRow>
                          );
                        }))}
                      </TableBody>
                    </Table>
                  </Paper>
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
    this.props.getApplicants();
  }

  render() {
    return <ApplicantsPage {...this.props} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageContainer);
