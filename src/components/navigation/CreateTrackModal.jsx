import React from "react";
import slugify from "slugify";

import { connect } from "react-redux";
import { toggleNewTrackModal, createTrack } from "../../redux/actions";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import defaultContentJSON from "../../fixtures/trackContent.json";

const mapStateToProps = state => {
  return {
    showNewTrackModal: state.adminTools.showNewTrackModal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleNewTrackModal: () => {
      dispatch(toggleNewTrackModal());
    },
    createTrack: trackData => {
      dispatch(createTrack(trackData));
    }
  };
};

class CreateTrackModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: {
        title: "",
        tech: "",
        order: 0,
        year: 2017,
      }
    };
    this.updatePage = (field, value) => {
      this._updatePage(field, value);
    };
    this.onSubmit = () => {
      this._onSubmit();
    };
  }

  _updatePage(field, value) {
    this.setState({
      page: {
        ...this.state.page,
        [field]: value
      }
    });
  }

  _onSubmit() {
    const slugifiedTitle = slugify(this.state.page.tech, {
      lower: true,
      remove: /[$*_+~.,()'"!\-:@%^&?=]/g
    })
    const trackData = {
      title: this.state.page.title,
      tech: this.state.page.tech,
      slug: `/tracks/${slugifiedTitle}`,
      year: this.state.page.year,
      page_type: "track",
      template: "track.js",
      navigation: {
        order: parseInt(this.state.page.order),
        displayTitle: this.state.page.tech,
      },
      content: defaultContentJSON
    };
    this.props.createTrack(trackData);
  }

  render() {
    const open = Boolean(this.props.showNewTrackModal);

    return (
      <Dialog open={open} aria-labelledby="create-page-dialogue">
        <DialogTitle id="create-page-dialogue">Add new track</DialogTitle>

        <DialogContent>
          <FormControl fullWidth margin="normal">
            <TextField
              className="form-control"
              type="text"
              label={"Track title"}
              value={this.state.page.title}
              onChange={e => this.updatePage("title", e.target.value)}
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <TextField
              className="form-control"
              type="text"
              label={"Track technology"}
              value={this.state.page.tech}
              onChange={e => this.updatePage("tech", e.target.value)}
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <TextField
              className="form-control"
              type="number"
              label={"Menu order"}
              value={this.state.page.order}
              onChange={e => this.updatePage("order", e.target.value)}
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <Select
              value={this.state.page.year}
              onChange={e => this.updatePage("year", e.target.value)}
              input={<Input name="year" id="year" />}
              name="year"
            >
              <MenuItem value={2017}>2017</MenuItem>
              <MenuItem value={2019}>2019</MenuItem>
            </Select>
          </FormControl>

        </DialogContent>

        <DialogActions>
          <Button color="default" onClick={this.props.toggleNewTrackModal}>
            Close
          </Button>
          <Button color="primary" onClick={this.onSubmit}>
            Create Track
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTrackModal);
