import React, {Component} from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from '../node_modules/material-ui/styles/MuiThemeProvider';
import NextButton from './NextButton';
import BackButton from './BackButton';
import BasicContainer from './BasicContainer';
import DetailsForm from './DetailsForm';
import LanguagesForm from './LanguagesForm';
class Onboarding extends Component {

  constructor(props) {
    super(props);
    this.state = {stage:0};
  }


  render () {

    const laina = (
      <DetailsForm/>
    );

    return (
      <div>
        <BasicContainer content ={laina}/>
      </div>
    );

  }


}

export default Onboarding;
