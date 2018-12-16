import React from "react";
import { connect } from "react-redux";
import { getSubscribers } from "../redux/actions";
import { map } from "lodash";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Layout from "../layouts/default.js";
import ProtectedPage from "../layouts/protected-page.js";


const mapDispatchToProps = dispatch => {
  return {
    getSubscribers: () => {
      dispatch(getSubscribers());
    },
  };
};

const mapStateToProps = state => {
  return {
    subscribers: state.subscribers.subscribers
  };
};


const SubscribersPage = props => {
  const subscribers = props.subscribers;
  return (
    <Layout>
      <ProtectedPage>
        <main className="page">
          <section className="page-section">
            <div className="container relative">
              <div className="row section-text">
                <div className="col-sm-12">
                  <Paper>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>First name</TableCell>
                          <TableCell>Last name</TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell>Organization</TableCell>
                          <TableCell>Sector</TableCell>
                          <TableCell>Role</TableCell>
                          <TableCell>Region</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {map(subscribers, ((subscriber, key) => {
                          return (
                            <TableRow key={key}>
                              <TableCell component="th" scope="row">
                                {subscriber.firstname}
                              </TableCell>
                              <TableCell>{subscriber.lastname}</TableCell>
                              <TableCell>{subscriber.email}</TableCell>
                              <TableCell>{subscriber.orgname}</TableCell>
                              <TableCell>{subscriber.sector}</TableCell>
                              <TableCell>{subscriber.role}</TableCell>
                              <TableCell>{subscriber.region}</TableCell>
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
    this.props.getSubscribers();
  }

  render() {
    return <SubscribersPage {...this.props} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageContainer);
