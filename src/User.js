import React from 'react';
import Reflux from 'reflux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from '../node_modules/material-ui/styles/MuiThemeProvider';
import Paper from '../node_modules/material-ui/Paper';
import SelectField from '../node_modules/material-ui/SelectField';
import Avatar from '../node_modules/material-ui/Avatar';
import MenuItem  from '../node_modules/material-ui/MenuItem';
import FlatButton  from '../node_modules/material-ui/FlatButton';
import TextField  from '../node_modules/material-ui/TextField';
import Chip  from '../node_modules/material-ui/Chip';
import LanguageLevel from './LanguageLevel';
import CustomCarousel from './CustomCarousel';
import MeStore from './stores/MeStore';
import MeActions from './actions/MeActions';

import './User.css';

class User extends Reflux.Component {

  constructor(props) {
    super(props);
    this.store = MeStore;
    this.famLangArr = [{name:'English',level:'A2'},{name:'Spanish',level:'B1'},{name:'Bulgarian',level:'C2'},{name:'Russian',level:'B2'}];
    this.state = {selectorBg:'bg-info',famLanguage:'English',interestsSelectorHeader:'selectorHeader',carouselIndex:0,updatedValue:'I love travelling because I am coool like that ;))).',updatingValue:'I love travelling because I am coool like that ;))).',newValue:''};
  }

  changeSelector = (idx) => {
    switch (idx) {
      case 0:
        console.log(idx);
        this.setState({selectorBg:'bg-info'})
        break;
      case 1:
        console.log(idx);;
        this.setState({selectorBg:'bg-languages'})
        break;
      case 2:

        console.log(idx);
        this.setState({selectorBg:'bg-interests'})
        break;
      default:
        console.log(idx);
        this.setState({selectorBg:'bg-info'})
        break;
    }
  };

  selectFamLang = (event,index,value) => {
    this.setState({famLanguage:value});
  }

  addNotes = (hobby,index) => {
    this.setState({addNotes:hobby,visibilityHeader:'hiddenHeader',carouselIndex:index}, () => {console.log(this.state.addNotes.name)});
  }

  closeNotes = () => {
    this.setState({addNotes:null,visibilityHeader:'visibleHeader'});
  }

  updateTextField = (e) => {
    this.setState({updatingValue:e.target.value});
  }

  handleMouseEnter = () => {
    if (this.state.selectorBg === 'bg-info' || this.state.selectorBg === 'bg-languages') {
      this.setState({showEdit:true});
    }
  }

  handleMouseLeave = () => {
    if (this.state.selectorBg === 'bg-info' || this.state.selectorBg === 'bg-languages') {
      this.setState({showEdit:false});
    }
  }


  enableEdit = () => {
    if (this.state.enableEdit) {
      this.setState({enableEdit:false});
    }
    else {
      this.setState({enableEdit:true});
    }
  }

  save = () => {
    this.setState({updatedValue:this.state.updatingValue});
    console.log(this.state.updatedValue);
  }

  discard = () => {
    console.log(`${this.state.updatedValue}`);
    this.setState({updatingValue:this.state.updatedValue});
  }

  render () {


    const selectors = ['info','chatting','heart'].map((selector, index) => {
      const source = `userProfile/${selector}.png`;
      return (
        <img key={index} src = {source} className='selector' onClick = {() => this.changeSelector(index)}/>
      );
    });



    const infoSelector = (
      <div className = 'genericSelectorWrap'>
        <h1 className = 'selectorHeader'>Information</h1>
        {this.state.showEdit && <p className = 'editPromptLabel'>Edit</p>}
        <div  className='nameWrap'>
          <p className = 'propLabel' id = 'nameLabel'>Name</p>
          <p className = 'dataLabel' id = 'nameData'>{this.state.userInfo.firstName} {this.state.userInfo.lastName}</p>
        </div>
        <div className='ageWrap'>
          <p className = 'propLabel' id = 'ageLabel' >Age</p>
          <p className = 'dataLabel' id = 'ageData'>{this.state.userInfo.age}</p>
        </div>
      </div>
    );

    const familiarLanguages = this.state.userInfo.familiarLanguages.map((lang,index) => {
      return (
        <MenuItem
          value = {lang.name}
          key={index}
          primaryText={lang.name}
        />
      )
    });

    const languageLevels = () => {

      for (var lang of this.state.userInfo.familiarLanguages) {
        if (this.state.famLanguage===lang.name) {

          return (
            <LanguageLevel
              value={lang.level}
              className = 'famLangLevel'
            />
          )
        }
      }
    }


    const languagesSelector = (
      <div className = 'genericSelectorWrap' >
        <h1 className = 'selectorHeader'>Languages</h1>
        {this.state.showEdit && <p className = 'editPromptLabel' onClick = {this.enableEdit}>Edit</p>}
        <div className = 'motherLanguageWrap' >
          <p className = 'propLabel' id ='motherLangLabel'>Mother language</p>
          {
            this.state.enableEdit ? <div id = 'motherLanguageEdit'><TextField className = 'dataLabel motherLangInputEdit' value = {this.state.updatingMotherLang || this.state.userInfo.motherLanguage} onChange = {(e) => MeActions.updateMotherLanguage(e)}/></div> : <p className = 'dataLabel' id = 'motherLangDataLabel'>{this.state.userInfo.motherLanguage}</p>
          }
        </div>
        <div className = 'famLangWrapper'>
          <p className = 'propLabel' id = 'famLangLabel'>Familiar languages</p>
          <div>
            <p className = 'langLevelLabels' id = 'langLabel'>Language</p>
            <p className = 'langLevelLabels' id = 'levelLabel'>Level</p>
          </div>
          <div className = 'famLangListWrap'>
            <SelectField
              value = {this.state.famLanguage}
              onChange = {this.selectFamLang}
              className = 'famLangList'
              labelStyle = {{fontFamily: '"Dosis", sans-serif',
                fontSize: '25px',float:'left'}}
            >
              {familiarLanguages}
            </SelectField>
            {languageLevels()}
          </div>
        </div>

      </div>
    )

    const notes = (
      <div className = 'genericSelectorWrap'>
        <div>
          <Paper
            className='interestNotesWrap'>
          <img src = {`./png/${(this.state.addNotes || {}).icon}.png`} className = 'notesInterestIcon'/>
          <div>
            <p className = 'interestLabel notesInterestLabel'>{(this.state.addNotes || {}).name}</p>
          </div>
          <span><img className = 'chosenInterestNotes' src='./notes-selected.png'/></span>
          </Paper>
          <span onClick = {this.closeNotes}> <img src='./notesBubble.png' id='notesBubbleIcon'/></span>

          <TextField
            hintText={`Share something about ${(this.state.addNotes || {}).name}`}
            value = {this.state.updatingValue}
            onChange = {this.updateTextField}
            multiLine = {true}
            rowsMax = {5}
            className = 'notesInputFieldUserProfile'
          />
          <FlatButton onClick = {this.save}>Save</FlatButton>
          <FlatButton onClick = {this.discard}>Disard</FlatButton>
        </div>
      </div>
    )

    const decorators = [{
        component: React.createClass({
          render() {
            return (
              <i className="material-icons" id = 'prevArrow' onClick={this.props.previousSlide}>&#xE314;</i>
            )
          }
        }),
        position: 'CenterLeft'
      },
      {
        component: React.createClass({
          render() {
            return (
              <i className="material-icons" id = 'nextArrow' onClick={this.props.nextSlide}>keyboard_arrow_right</i>
            )
          }
        }),
        position: 'CenterRight'
      }
    ];



    const interests = [{icon:'airplane',name:'Travelling'},{icon:'books',name:'Reading'},{icon:'diamond',name:'Fashion'},{icon:'gamepad',name:'Video Games'}].map((hobby,index) => {
        const source = `./png/${hobby.icon}.png`;
        return (
          <Paper className = 'interestCardWrap'>
            <Paper className = 'cardHeaderWrap'>
              <img src = {source} className = 'interestCardIcon'/>
            </Paper>

            <span className = 'circleNotesWrap' onClick = {() => this.addNotes(hobby,index)}><img src = 'notes.png' className = 'circleNotesIcon'/></span>

            <Paper className = 'cardFooterWrap'>
              <p className = 'cardLabel'>{hobby.name}</p>
            </Paper>

          </Paper>
        )
    });

    const interestsSelector = (
      <div className = 'genericSelectorWrap'>
        <h1 className = 'selectorHeader' id = {this.state.visibilityHeader}>Interests</h1>
        <div className = 'notesField'>
          {this.state.addNotes != null && notes}
        </div>
        <div className = 'genericSelectorWrap'>
          {this.state.addNotes == null &&
            <CustomCarousel
            slideIndex = {this.state.carouselIndex}
            slidesToShow = {1}
            decorators = {decorators}
            className = 'userInterestsCarouselWrap'
            content={interests}
          />}
        </div>
      </div>
    )

    return (
      <div className = "userProfileWrap">
        <img src='./boss.png' className='profileImg'/>
        <MuiThemeProvider>
          <Paper className="userInfoWrap" zDepth={1}>
            <div className = "selectorsWrap" >
              <MuiThemeProvider>
                <Paper className="selectorsContainer" zDepth={1} >
                  {selectors}
                </Paper>
              </MuiThemeProvider>
            </div>
            <div className="selectorDataWrap" onMouseEnter = {this.handleMouseEnter} onMouseLeave = {this.handleMouseLeave}>
              <span className='backgroundSelector' id={this.state.selectorBg}/>
              <MuiThemeProvider>
                <Paper className="selectorDataContainer" >
                  {this.state.selectorBg === 'bg-info' && infoSelector}
                  {this.state.selectorBg === 'bg-languages' && languagesSelector}
                  {this.state.selectorBg === 'bg-interests' && interestsSelector}
                </Paper>
              </MuiThemeProvider>
            </div>
          </Paper>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default User;
