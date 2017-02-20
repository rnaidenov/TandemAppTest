import React, {Component} from 'react';
import Paper from '../node_modules/material-ui/Paper';
import MuiThemeProvider from '../node_modules/material-ui/styles/MuiThemeProvider';

class BasicContainer extends Component {

    constructor(props) {
        super(props);
    }


    render() {


        const basicWrapper = {
            height: 630,
            width: 650,
            margin: 'auto',
            marginTop: '100px',
            display: 'block',
            textAlign: 'center',
            zIndex:-1
        }

        const content = this.props.content;

        return (
          <div>
            <MuiThemeProvider>
              <Paper style={basicWrapper} zDepth={1}>
                {content}
              </Paper>
              </MuiThemeProvider>
          </div>


        );
    }
}

export default BasicContainer;
