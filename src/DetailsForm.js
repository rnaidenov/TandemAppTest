import React from 'react';
import Reflux from 'reflux';
import './DetailsForm.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from '../node_modules/material-ui/styles/MuiThemeProvider';
import FlatButton from '../node_modules/material-ui/FlatButton';
import TextField from '../node_modules/material-ui/TextField';
import NextButton from './NextButton';
import BasicContainer from './BasicContainer';
import Paper from '../node_modules/material-ui/Paper';
import Carousel from '../node_modules/nuka-carousel/index.js';
import Avatar from "../node_modules/material-ui/Avatar";
import UserInfoActions from './actions/UserInfoActions';
import UserInfoStore from './stores/UserInfoStore';


class DetailsForm extends Reflux.Component {

    constructor (props) {
      super(props);
      injectTapEventPlugin();
      this.store = UserInfoStore;
      this.state = {laina:false,stage : 'basicInfo',defaultIcon:'userDefault',selectedCharacterSrc:'',charactersState:'charAvatar',carouselState:'carouselWrap',charactersWrapState:'charactersWrap',goBtnState:'goBtn',showForm:false,newProfileEnabled:false,language:'',showCharacters:false,userInfo:{firstName:null,lastName:null,age:null},disableNextBtn:true};
      const x= this;
      function change () {
        x.setState({showCharacters:true});
      }
      setTimeout(change,700);
    }

    hello = () => {
      console.log("hi");
    }

    // Click event when selecting a character
    selectCharacter = (e) => {
        const character = e.target.name;
        let source = ``;
        if (character.includes('woman')){
          source = `./womanBig/${character}.png`;
        }
        else if (character.includes('man')) {
          source = `./manBig/${character}.png`;
        }
        this.setState({selectedCharacterSrc:source,goBtnState:'goBtn goBtn-show'});
    }


    // Confirming character selection for new profile picture
    selectCharacterDone = (e) => {
        this.setState({showForm:true});
        if(this.state.goBtnState === 'goBtn goBtn-show') {
            this.setState({goBtnState:'goBtn goBtn-show contentLeave',charactersState:'charAvatar contentLeave',defaultIcon: 'userDefault contentLeave',carouselState:'contentLeave'});
            setTimeout(this.setState({charactersWrapState:'charactersWrap-expandWidth'}),1000);
            const x = this;
            function expandHeight () {
              x.setState({charactersWrapState:'charactersWrap-expandWidth charactersWrapState-expandHeight',newProfileEnabled:true})
            }
            setTimeout(expandHeight,1000);
        }
    }


    // Events for updating the input values for the user's first and last name, and age
    getDetails = (e) => {
      const user = this.state.userInfo;
      switch (e.target.id) {
        case 'firstName':
          user.firstName = e.target.value;
          this.setState({userInfo:user});
          break;
        case 'lastName':
          user.lastName = e.target.value;
          this.setState({userInfo:user});
          break;
        case 'age':
          user.age = e.target.value;
          this.setState({userInfo:user});
          break;
        }
        if(this.isComplete()) {
          this.setState({disableNextBtn:false});
        }
     }

     // Click event for updating the user's sex
     selectSex = (e) => {
       const user = this.state.userInfo;
       user.sex = e.target.name;
       this.setState({userInfo:user});
       if(this.isComplete()) {
         this.setState({disableNextBtn:false});
       }
     }

     submitInfo = () => {
       console.log(this.state.userInfo);
     }

     // Check if all user information is provided
     isComplete = () => {
       const user = this.state.userInfo;
       let complete = true;
       for(const prop in user) {
         if(user[prop]===null) {
           complete = false;
           break;
         }
       }
      return complete;
     }



    render() {



      // Label that introduecs stage of the onnboarding process
      const label = {
        fontSize: '30px',
        position:"relative",
        paddingTop: '50px',
        color: '#545454',
        fontFamily: "'Abel', sans-serif"
      }


      // Avatars for all the male characters
      const userManWrap = ['man','man-1','man-2','man-3','man-4'].map((man,index) => {
        const source = `./manSmall/${man}.png`;
        return (
          <Avatar className = {this.state.charactersState} src = {source} name={man} onClick = {this.selectCharacter}/>
        )
      });


      // Avatars for all the female characters
      const userWomanWrap = ['woman','woman-1','woman-2','woman-3','woman-4'].map((woman,index) => {
        const source = `./womanSmall/${woman}.png`;
        return (
          <Avatar className = {this.state.charactersState} src = {source} name={woman} onClick = {this.selectCharacter}/>
        )
      });

      // Form for providing the information about the user
      const form = (
        <div>
          <div className="nameInputWrap">
            <TextField
              id='firstName'
              floatingLabelText="First name"
              className="firstNameInput"
              onBlur = {this.getDetails}
            />
            <TextField
              id='lastName'
              floatingLabelText="Last name"
              className="lastNameInput"
              onBlur = {this.getDetails}
            />
            <span className="line"/>
          </div>
          <div className="sexWrap">
            <span className="sexIconLabelWrap">
              <img src="./male.png" name = 'male' className="sexIcon" onClick = {this.selectSex}/ >
              <p className = "sexLabel" >Male</p>
            </span>
            <span>
              <img src="./female.png" name = 'female' className="sexIcon" onClick = {this.selectSex}/>
              <p className = "sexLabel" >Female</p>
            </span>
          </div>
          <div className="ageInputWrap">
            <TextField
              id='age'
              floatingLabelText="Age"
              className="ageInput"
              onBlur = {this.getDetails}
            />
          </div>
        </div>
      );

      // Left and right arrows for the carousel element
      const decorators = [{
          component: React.createClass({
            render() {
              return (
                <i className="material-icons prevArrow" onClick={this.props.previousSlide}>keyboard_arrow_left</i>
              )
            }
          }),
          position: 'TopLeft'
        },
        {
          component: React.createClass({
            render() {
              return (
                <i className="material-icons nextArrow" onClick={this.props.nextSlide}>keyboard_arrow_right</i>
              )
            }
          }),
          position: 'TopRight'
        }
      ];


      // Container for the list of characters that the user can choose for his/her profile picture
      const charactersWrap = (
        <div>

        <MuiThemeProvider
          style={{paddingTop:'5px'}}>
          <FlatButton
            backgroundColor = '#3f577c'
            hoverColor = '#496796'
            label = 'Go'
            labelStyle={{color:'white'}}
            className = {this.state.goBtnState}
            onClick = {this.selectCharacterDone}
           />
        </MuiThemeProvider>
          <MuiThemeProvider>
             <Paper
               className = {this.state.charactersWrapState}
             >
               <Carousel
                decorators={decorators}
                slideWidth={1}
                className={this.state.carouselState}
               >
                 <div>
                    {userManWrap}
                 </div>
                 <div>
                    {userWomanWrap}
                 </div>

               </Carousel>
             </Paper>
          </MuiThemeProvider>

         {this.state.newProfileEnabled && form}

        </div>
      )


      // The user's new profile picture
      const newProfile = (
        <div>
          <img src = {this.state.selectedCharacterSrc} className="newProfileImg"/>
        </div>
      )




          return (

            <div>
                <div style = {label}>Who are you?</div>
                <div className={this.state.defaultIcon}>
                  <i className="material-icons userIcon"
                     style={{
                     fontSize:'60px',
                     marginTop:'5px',
                     color: '#d3d3d3'}}
                  >
                  account_circle
                  </i>
                </div>
                {this.state.newProfileEnabled && newProfile}
                {this.state.showCharacters && charactersWrap}

                <FlatButton
                  label = "Go"
                  onClick = {() => UserInfoActions.sayHi()}
                >
                </FlatButton>
            </div>

          )
    }


}


export default DetailsForm;
