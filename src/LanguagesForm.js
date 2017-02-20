import React, {Component} from 'react';
import './LanguagesForm.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from '../node_modules/material-ui/styles/MuiThemeProvider';
import FlatButton from '../node_modules/material-ui/FlatButton';
import TextField from '../node_modules/material-ui/TextField';
import AutoComplete from '../node_modules/material-ui/AutoComplete';
import Paper from '../node_modules/material-ui/Paper';
import DropDownMenu from '../node_modules/material-ui/DropDownMenu';
import MenuItem from '../node_modules/material-ui/MenuItem';


class LanguagesForm extends Component {

  constructor (props) {
    super(props);
    injectTapEventPlugin();
    this.state = {greetUser:true,askLanguages:false,inputContainer:"inputContainer",bubbleState:'speechBubbleGreeting',bubbleSrc:'./speechBubbleGreeting.png',inputFieldState:'inputCountryField',okBtn:"okBtn",langLevel:0,languagesList:[],showInstruction:false,enableInputField:false};
  }


  // Event listener to show button if input is provided
  showOkBtn = (e) => {
    if(!this.state.askLanguages) {
      this.setState({okBtn:'okBtn okBtn-show'});
    }
  };

  // Event, which prompts the user to
  // add the languages he/she is familiar with
  askLanguages = () => {

    const x = this;
    function changeState () {
      x.setState({inputContainer:'inputContainer inputContainer-expanded',bubbleSrc:'./speechBubbleLanguages.png',bubbleState:'speechBubbleLanguages',askLanguages:true,okBtn:'okBtn',enableInputField:true});
    }

    this.setState({bubbleState:'speechBubbleGreeting bubbleLeave',inputFieldState:'inputCountryField inputFieldExit',greetUser:false},() => {
        setTimeout(changeState,1000);
    });
  }

  // Handle change in language level
  changeLangLevel = (event, index, value) => this.setState({langLevel:value});

  // Handle change in input text field
  updateLanguage = (e) => {
    this.setState({currLang:e.target.value});
  }

  // Add a language the user is familiar with the list
  addLanguage = () => {
      const stateLangList = this.state.languagesList;
      const newLang = this.state.currLang;


      if(!stateLangList.includes(newLang) && newLang!=null) {
        if(stateLangList.length===0) {
          this.setState({askLanguages:false,showInstruction:true});
        }
        stateLangList.push(newLang);
        this.setState({languagesList:stateLangList});
      }

      const x = this;
      console.log(stateLangList);
      if(stateLangList.length===1 &&  !this.state.showInstruction) {

        function changeState () {
          x.setState({bubbleSrc:'./speechBubbleGreeting.png',bubbleState:'speechBubbleInstruction'});
        }

        this.setState({bubbleState:'speechBubbleLanguages bubbleLeave'},() => {
            setTimeout(changeState,1000);
        });
      }

    }

  render () {

    // Label that introduecs stage of the onnboarding process
    const label = {
      fontSize: '30px',
      position:"relative",
      paddingTop: '50px',
      color: '#545454',
      fontFamily: "'Abel', sans-serif"
    }

    // Greeting message to be put inside speech bubble
    const greeting = (
      <div className = "labelWrap">
          <p id = "greeting"><span id="hiLabel">Hi.</span> <br/> What&#39;s your mother language?</p>
      </div>
    )

    // Input text field that prompts
    // user to enter his/her mother language
    const motherLanguage = (
      <TextField
        hintText = "E.g Italian"
        hintStyle = {{marginLeft:'20px',fontSize:'20px'}}
        className = {this.state.inputFieldState}
        inputStyle={{fontSize:'35px',fontFamily: "'Questrial', sans-serif"}}
        underlineShow = {false}
        onBlur = {this.showOkBtn}
      />
    )

    // Container for adding the familiar languages
    // with the corresponding competency level
    const familiarLanguages = (
      <div className="familiarLanguagesWrap">
        <TextField
          hintText="Language"
          className="inputFamLangField"
          onBlur = {this.updateLanguage}
        />


        <span >
          <DropDownMenu
          className = "levelSelector"
          value = {this.state.langLevel}
          onChange={this.changeLangLevel}>
            <MenuItem value = {0} primaryText="Level" />
            <MenuItem value = {1} primaryText="C2" />
            <MenuItem value = {2} primaryText="C1" />
            <MenuItem value = {3} primaryText="B2" />
            <MenuItem value = {4} primaryText="B1" />
            <MenuItem value = {5} primaryText="A2" />
            <MenuItem value = {6} primaryText="A1" />
          </DropDownMenu>
        </span>

        <FlatButton
          backgroundColor = '#00796B'
          hoverColor = '#009688'
          label = 'Add'
          labelStyle={{color:'white'}}
          className='addLangBtn'
          onClick = {this.addLanguage}
        />
      </div>
    )

    // Message prompting the user to add other languages
    // he/she is familiar with
    const askLanguage = (
      <div className = "labelWrap">
          <p id = "languagesQuery">What other languages are you familiar with?</p>
      </div>
    )


    // Message which instructs user to add more languages or
    // continue with the onboarding process
    const instruction = (
      <div className = "labelWrap">
          <p id = "instruction"><span id="languageLabel">{this.state.languagesList[0]}!</span> <br/>That&#39;s great. <br/>
          Add more languages <br/> or click <span id = "nextLabel">Next</span> to continue. </p>
      </div>
    )


    return (
      <div>
        <div style = {label}>Let&#39;s connect!</div>
        <div>
        <i className="material-icons smileyIcon"
        >sentiment_very_satisfied</i>

        </div>

        <div>
          <span><img className = {this.state.bubbleState} src={this.state.bubbleSrc}/></span>
        </div>
        {this.state.greetUser && greeting}
        {this.state.askLanguages && askLanguage}
        {this.state.showInstruction && instruction}

        <MuiThemeProvider>
          <div className = 'inputWrap '>

          <FlatButton
            backgroundColor = '#3f577c'
            hoverColor = '#496796'
            label = 'OK'
            labelStyle={{color:'white'}}
            className={this.state.okBtn}
            onClick = {this.askLanguages}
           />

            <Paper className = {this.state.inputContainer}>
              {this.state.greetUser && motherLanguage}
              {this.state.enableInputField && familiarLanguages}
            </Paper>


           </div>
        </MuiThemeProvider>

      </div>
    );
  }

}

export default LanguagesForm;
