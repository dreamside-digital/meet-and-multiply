import React from "react";
import slugify from "slugify";

import { connect } from "react-redux";
import { toggleNewOriginatorModal, createOriginator } from "../../redux/actions";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

import defaultContentJSON from "../../fixtures/originatorContent.json";

const mapStateToProps = state => {
  return {
    showNewOriginatorModal: state.adminTools.showNewOriginatorModal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleNewOriginatorModal: () => {
      dispatch(toggleNewOriginatorModal());
    },
    createOriginator: originatorData => {
      dispatch(createOriginator(originatorData));
    }
  };
};

class CreateOriginatorModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: {
        title: "",
        tech: "",
        order: 0,
        year: 2019,
        representative_name: "",
        representative_position: "",
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
    const slugifiedTitle = slugify(this.state.page.title, {
      lower: true,
      remove: /[$*_+~.,()'"!\-:@%^&?=]/g
    })
    const originatorData = {
      title: this.state.page.title,
      slug: `/originators/${slugifiedTitle}`,
      year: this.state.page.year,
      representative_name: this.state.page["representative_name"],
      representative_position: this.state.page["representative_position"],
      page_type: "originator",
      template: "originator.js",
      navigation: {
        order: parseInt(this.state.page.order),
        displayTitle: this.state.page.title,
      },
      content: defaultContentJSON
    };
    this.props.createOriginator(originatorData);
  }

  render() {
    const open = Boolean(this.props.showNewOriginatorModal);

    return (
      <Dialog open={open} aria-labelledby="create-page-dialogue">
        <DialogTitle id="create-page-dialogue">
          Add Originator
        </DialogTitle>

        <DialogContent>
          <FormControl fullWidth margin="normal">
            <TextField
              className="form-control"
              type="text"
              label={"Originator name"}
              value={this.state.page.title}
              onChange={e => this.updatePage("title", e.target.value)}
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <TextField
              className="form-control"
              type="text"
              label={"Who will be representing the originator?"}
              value={this.state.page["representative_name"]}
              onChange={e => this.updatePage("representative_name", e.target.value)}
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <TextField
              className="form-control"
              type="text"
              label={"What is the representative's position at the company?"}
              value={this.state.page["representative_position"]}
              onChange={e => this.updatePage("representative_position", e.target.value)}
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
            <InputLabel htmlFor="year">Year</InputLabel>
            <Select
              value={this.state.page.year}
              onChange={e => this.updatePage("year", e.target.value)}
              input={<Input name="year" id="year" />}
              name="year"
            >
              <MenuItem value={2015}>2015</MenuItem>
              <MenuItem value={2019}>2019</MenuItem>
            </Select>
          </FormControl>

        </DialogContent>

        <DialogActions>
          <Button color="default" onClick={this.props.toggleNewOriginatorModal}>
            Close
          </Button>
          <Button color="primary" onClick={this.onSubmit}>
            Create Originator
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateOriginatorModal);
