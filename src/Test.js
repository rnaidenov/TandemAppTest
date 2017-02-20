import React, {Component} from 'react';
import withSubscription from './withSubscription';

class Test extends Compnent {

  constructor (props) {
    super(props);
  }

  render () {

    const x = this.props.comments;


    return (
        {x}
    );
  }
}

module.exports = withSubscription(Test);
