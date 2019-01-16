import React from "react";
import { connect } from "react-redux";

const PageLoader = props => {
  if (props.isPageLoading) {
    return (
      <div className="page-loader">
        <div className="loader"></div>
      </div>
    )
  }

  return null;
}

const mapStateToProps = state => {
  return {
    isPageLoading: state.navigation.isPageLoading
  };
};

export default connect(mapStateToProps, null)(PageLoader)