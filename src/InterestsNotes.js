import React from 'react';
import Reflux from 'reflux';
import './Interests.css';
import './InterestsNotes.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from '../node_modules/material-ui/styles/MuiThemeProvider';
import FlatButton from '../node_modules/material-ui/FlatButton';
import RaisedButton from '../node_modules/material-ui/RaisedButton';
import CustomCarousel from './CustomCarousel';
import Dialog from '../node_modules/material-ui/Dialog';
import TextField from '../node_modules/material-ui/TextField';
import {List, ListItem} from '../node_modules/material-ui/List';
import Avatar from "../node_modules/material-ui/Avatar";
import OnboardingActions from './actions/OnboardingActions';
import OnboardingStore from './stores/OnboardingStore';
import Paper from '../node_modules/material-ui/Paper';
import './Interests.css';





class Ineterests extends Reflux.Component {

  constructor (props) {
    super(props);
    this.store = OnboardingStore;
    this.state = {showNotes:false,selectedInterest:null,saveNotesBtnClass:'saveNotesBtn',howSaveNotesBtn:false,notesSavedLabel:'Save notes'};
  }


  showBtn = (e) => {
    this.setState({notesInputValue:e.target.value});
    if (e.target.value.length > 10) {
      this.setState({showSaveNotesBtn : true,notesInput: e.target.value});
    }
  }

  selectInterest = (e,hobby) => {
    const selected = this.state.selectedInterest;
    console.log(`The hobby you selected is ${hobby.label}`);
    OnboardingActions.expandNotes(hobby);
    if (selected === null) {
      updateInterest(this);
    } else if (e.target !== selected) {
      selected.className = 'singleInterest';
      updateInterest(this);
    }

    function updateInterest (self) {
      self.setState({selectedInterest:e.target}, () => {
        self.state.selectedInterest.className += ' singleInterest-selected';
      });
    }
  };

  saveNotes = () => {
    OnboardingActions.saveNotes();
    this.setState({notesSavedLabel:'Notes saved',notesSavedIcon:'done',notesSavedBtnColor:'#1f9b4e',notesInputValue:''});
    const self = this;
    setTimeout(() => {self.setState({saveNotesBtnClass : 'saveNotesBtn saveNotesBtn-saved'})},600);
    setTimeout(() => {self.setState({showSaveNotesBtn:false,saveNotesBtnClass:'saveNotesBtn',notesSavedIcon:'',notesSavedBtnColor:'',notesSavedLabel:'Save notes'})},1000);
  }

  render() {

    const label = {
      fontSize: '30px',
      position:"relative",
      paddingTop: '50px',
      color: '#545454',
      fontFamily: "'Abel', sans-serif"
    }



  // <div className="pickSelector"></div> for down there

    // Container for all the interests that the user has chosen
    const chosenInterests = this.state.userInfo.interests.map((hobby, index) => {
        const source = `./png/${hobby.icon}.png`;
        return (
          <span>
            <Avatar src={source} className="singleInterest" onClick={(e) => this.selectInterest(e,hobby)}/>
          </span>
        );
    });

    const saveNotesBtn = (
      <RaisedButton
        label = {this.state.notesSavedLabel}
        backgroundColor={this.state.notesSavedBtnColor}
        className = {this.state.saveNotesBtnClass}
        icon = {<i className="material-icons">{this.state.notesSavedIcon}</i>}
        onClick = {() => this.saveNotes()}
      />
    )


    return (
      <div className="notesWrap">
        <div style = {label}> Tell us a bit more</div>
        <i className="material-icons"
         style={{
         fontSize:'40px',
         marginTop:'5px',
         color: '#1d5e5b'}}>
        speaker_notes
        </i>

        <p id="picksLabel"> Your picks </p>

        <div className="picksWrap">
          <div id="dividerHor"></div>

            <CustomCarousel
              slideWidth = {1}
              slidesToShow = {3}
              content = {chosenInterests}
            />
          <div id="dividerHor2"></div>
        </div>
        <div className='notesFieldWrap'>
          <MuiThemeProvider>
            <Paper className="notesFieldContainer" zDepth={1}>
              <span>
                <img src='./notesColor.png' className = 'notesDisplayIcon'/>
                <p id='toAddNotesLabel'>Share something connected to <span id = 'toAddNotesInterest'>{(this.state.toAddNotes || {}).label.toLowerCase()}</span></p>
              </span>
              <TextField
                hintText = {'Add you story here'}
                value={this.state.notesInputValue}
                multiLine = {true}
                onChange = {this.showBtn}
                onBlur = {(e) => OnboardingActions.updateNotes(e)}
                rows={1}
                rowsMax = {6}
                className = 'notesInput'
              />
            </Paper>
          </MuiThemeProvider>
          {this.state.showSaveNotesBtn && saveNotesBtn}

        </div>
       </div>
    );
  }

}

export default Ineterests;
