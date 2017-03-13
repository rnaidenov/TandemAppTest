import React from 'react';
import ReactDOM from 'react-dom';
import Onboarding from './Onboarding';
// import DetailsForm from './DetailsForm';
import User from './User';
import Interests from './Interests';
// import LanguagesForm from './LanguagesForm';
import './index.css';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

ReactDOM.render(
	  <User/>
  ,
  document.getElementById('root')
);
