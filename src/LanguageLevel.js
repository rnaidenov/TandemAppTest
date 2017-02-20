import React, {Component} from 'react';
import DropDownMenu from '../node_modules/material-ui/DropDownMenu';
import MenuItem from '../node_modules/material-ui/MenuItem';
import './DetailsForm.css';

class Languagevalue extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: 1};
    this.language = props.newLanguage;
  }


  handleChange = (event, index, value) => this.setState({value});

    render () {

      return (
        <div className = "levelSelector">
          <i className="im im-graduation-hat studyBubble"></i>
          <p className="newLanguage languageLabel" >{this.language}</p>
          <DropDownMenu className= "levels" value={this.state.value} onChange={this.handleChange}>
            <MenuItem value = {1} primaryText="C2" />
            <MenuItem value = {2} primaryText="C1" />
            <MenuItem value = {3} primaryText="B2" />
            <MenuItem value = {4} primaryText="B1" />
            <MenuItem value = {5} primaryText="A2" />
            <MenuItem value = {6} primaryText="A1" />
          </DropDownMenu>
        </div>

      )
    }

  }

  export default Languagevalue;
