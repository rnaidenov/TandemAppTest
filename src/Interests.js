import React, {Component} from 'react';
import './Interests.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from '../node_modules/material-ui/styles/MuiThemeProvider';
import FlatButton from '../node_modules/material-ui/FlatButton';
import BasicContainer from './BasicContainer';
import Dialog from '../node_modules/material-ui/Dialog';
import TextField from '../node_modules/material-ui/TextField';
import {List, ListItem} from '../node_modules/material-ui/List';
import Avatar from "../node_modules/material-ui/Avatar";
import NextButton from './NextButton';
import BackButton from './BackButton.js';




class Ineterests extends Component {

  constructor (props) {
    super(props);
    const iconsWithLabels = [
          {
            icon:"airplane",
            label: "Travelling",
            state:'unselected',
            desc:''
          },
          {
            icon:"kitchen",
            label: "Cooking",
            state:'unselected',
            desc:''
          },
          {
            icon:"photo-camera",
            label: "Photography",
            state:'unselected',
            desc:''
          },
          {
            icon:"poker",
            label: "Gambling",
            state:'unselected',
            desc:''
          },
          {
            icon:"books",
            label: "Reading",
            state:'unselected',
            desc:''
          },
          {
            icon:"diamond",
            label: "Fashion",
            state:'unselected',
            desc:''
          },
          {
            icon:"gamepad",
            label: "Video Games",
            state:'unselected',
            desc:''
          },
          {
            icon:"music-player",
            label: "Music",
            state:'unselected',
            desc:''
          },
          {
            icon:"ping-pong",
            label: "Sports",
            state:'unselected',
            desc:''
          },
          {
            icon:"popcorn",
            label: "Movies",
            state:'unselected',
            desc:''
          },
          {
            icon:"televisions",
            label: "TV Series",
            state:'unselected',
            desc:''
          },
          {
            icon:"voice-recorder",
            label:"Singing",
            state:'unselected',
            desc:''
          }
        ]
    this.state = {interests:iconsWithLabels,chosenInterests:[],showNotes:false,expandNotes:false};
  }

  // Select interest and add it to the list of user's interests
  selectInterest = (hobby) => {
    const interestsState = this.state.chosenInterests;
    if (hobby.state === 'unselected') {
        hobby.state='selected';
        interestsState.push(hobby);
        this.setState({chosenInterests:interestsState});

    } else {
        hobby.state='unselected';
        const idx = interestsState.indexOf(hobby);
        interestsState.splice(idx,1);
        this.setState({chosenInterests:interestsState});
    }

  }

  // If more than 3 interests have been selected
  // go to the next section of the onboarding process
  goToNotes = () => {
    if(this.state.chosenInterests.length >= 3) {
      this.setState({showNotes:true});
      console.log(this.state.showNotes);
    }
  }

  // Return to the interests section
  goBack = () => {
    if(this.state.showNotes) {
      this.setState({showNotes:false});
    }
  }


  expandNotes = (index) => {
     const interest = this.state.chosenInterests[index].label;
     this.setState({toAddNotes:interest})
  }

  render() {

    const label = {
      fontSize: '30px',
      position:"relative",
      paddingTop: '50px',
      color: '#545454',
      fontFamily: "'Abel', sans-serif"
    }



    // Container for all the available interests
    const hobbies = this.state.interests.map((hobby, index) => {
        const source = `./png/${hobby.icon}.png`;
        let classSelector = 'selector';
        if (hobby.isClicked) {
          classSelector='selector-click';
        }
        return (
            <div key={index} className = "iconsWrap" onTouchTap={this.openDescModal}>
                 <img className="interestsIcons"  src={source}/>
                 <p className="hobbyLabel">{hobby.label}</p>
                 <div className = {hobby.state} onClick = {() => this.selectInterest(hobby)}></div>
            </div>
        );
    });

  // <div className="pickSelector"></div> for down there

    // Container for all the interests that the user has chosen
    const chosenInterests = this.state.chosenInterests.map((hobby, index) => {
        const source = `./png/${hobby.icon}.png`;
        console.log("laina");
        return (
          <span onClick={() => this.expandNotes(index)}>
            <Avatar src={source} className="singleInterest" name = {hobby.label}/>
          </span>
        );
    });

    // Notes section of the process
    const notes = (

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
            {chosenInterests}
          <div id="dividerHor2"></div>
        </div>


        <div className = "toAddNotesLabel">
          {this.state.toAddNotes}
        </div>

       </div>

    )

    const interests = (
      <div>
        <div style = {label} >What do you love?</div>
        <i className="material-icons"
           style={{
           fontSize:'40px',
           marginTop:'5px',
           color: '#7c3131'}}>
          favorite
        </i>
        <p className="promptLabel">Pick at least 3 topics that are of interest to you</p>
        <div>
          {hobbies}
        </div>
      </div>

    )


    let content = null;

    if(!this.state.showNotes) {
      content = interests;
    }else {
      content = notes;
    }

    return (
      <div>
         <MuiThemeProvider>

            <BasicContainer content={content}/>

        </MuiThemeProvider>
        <div style={{textAlign: 'center', position:'relative',width: '100%'}}>
          <BackButton onClick = {this.goBack} />
          <NextButton onClick = {this.goToNotes}/>
        </div>

      </div>
    )
  }

}

export default Ineterests;
