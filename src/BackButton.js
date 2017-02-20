import React, {Component} from 'react';
import FlatButton from '../node_modules/material-ui/FlatButton';
import MuiThemeProvider from '../node_modules/material-ui/styles/MuiThemeProvider';


class BackButton extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const btnLabel = {
            color: 'white'
        }

        return (
          <MuiThemeProvider>
            <FlatButton backgroundColor = '#595d63'
            hoverColor = '#727984'
            label = 'Back'
            labelStyle = {
                btnLabel
            }
            style={{marginRight:'10px'}}
            onClick = {this.props.onClick}
            disabled = {
                this.props.disabled
            }
            />
          </MuiThemeProvider>
        );
    }

}

export default BackButton;
