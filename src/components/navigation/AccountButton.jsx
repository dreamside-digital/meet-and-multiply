import React from "react";
import { push } from "gatsby";
import firebase from "../../firebase/init";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button"

import {
  userLoggedIn,
  userLoggedOut,
  deploy,
  toggleEditing,
  toggleNewOriginatorModal
} from "../../redux/actions";

import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import SettingsIcon from "@material-ui/icons/Settings";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import CreateOriginatorModal from "./CreateOriginatorModal";

const styles = {
  container: {
    position: "fixed",
    left: "10px",
    bottom: "10px",
    zIndex: "999",
  },
  iconLabel: {
    display: "flex",
    alignItems: "center"
  }
};

class AccountButton extends React.Component {
  state = {
    anchorEl: null
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('logged in!')
        const ref = firebase
          .app()
          .database()
          .ref(`users/${user.uid}`);
        ref.once("value").then(snapshot => {
          const userData = snapshot.val();
          if (userData) {
            this.props.userLoggedIn(userData);
          } else {
            const newUser = {
              uid: user.uid,
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL
            };
            ref.set(newUser);
            this.props.userLoggedIn(newUser);
          }
        });
      } else {
        this.props.userLoggedOut();
      }
    });
  }

  logout = e => {
    firebase.auth().signOut();
    this.props.userLoggedOut();
    push("/");
  };

  openMenu = e => {
    this.setState({ anchorEl: e.currentTarget });
  };

  closeMenu = e => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { props, openMenu, closeMenu, logout } = this;
    const { anchorEl } = this.state;

    if (props.isLoggedIn) {
      const accountName = props.user.displayName
        ? props.user.displayName
        : "Account";
      const toggleText = props.isEditingPage ? "Done editing" : "Start editing";
      return (
        <div style={styles.container}>
          <Button
            variant="contained"
            color="primary"
            onClick={openMenu}
            aria-owns={anchorEl ? "account-menu" : null}
            aria-haspopup="true"
          >
            <span style={styles.iconLabel}>
              <SettingsIcon style={{ marginRight: "4px" }} />
              {accountName}
              <ArrowDropDown style={{ height: "14px" }} />
            </span>
          </Button>
          <Menu
            id="account-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={closeMenu}
          >
            {props.allowEditing && (
              <MenuItem
                onClick={() => {
                  props.onToggleEditing();
                  closeMenu();
                }}
              >
                {toggleText}
              </MenuItem>
            )}

            {props.allowEditing && (
              <MenuItem
                onClick={() => {
                  props.toggleNewOriginatorModal();
                  closeMenu();
                }}
              >
                Add track
              </MenuItem>
            )}

            {props.allowEditing && (
              <MenuItem
                onClick={() => {
                  props.deploy();
                  closeMenu();
                }}
                divider
              >
                Publish changes
              </MenuItem>
            )}

            <MenuItem
              onClick={() => {
                logout();
                closeMenu();
              }}
              divider
            >
              Log out
            </MenuItem>
          </Menu>
          <CreateOriginatorModal />
        </div>
      );
    }

    return null
  }
}

const mapStateToProps = state => {
  const allowEditing = state.adminTools.user && state.adminTools.user.isEditor;

  return {
    isLoggedIn: state.adminTools.isLoggedIn,
    user: state.adminTools.user,
    isEditingPage: state.adminTools.isEditingPage,
    allowEditing: allowEditing
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userLoggedIn: user => {
      dispatch(userLoggedIn(user));
    },
    userLoggedOut: () => {
      dispatch(userLoggedOut());
    },
    onToggleEditing: () => {
      dispatch(toggleEditing());
    },
    deploy: () => {
      dispatch(deploy());
    },
    toggleNewOriginatorModal: () => {
      dispatch(toggleNewOriginatorModal());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountButton);
