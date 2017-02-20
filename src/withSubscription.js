// This function takes a component...
function withSubscription(WrappedComponent) {
  // ...and returns another component...
  return React.createClass({
    getInitialState: function() {
      return {
        comments: DataSource.getComments()
      };
    },

    componentDidMount: function() {
      // ... that takes care of the subscription...
      DataSource.addChangeListener(this.handleChange);
    },

    componentWillUnmount: function() {
      DataSource.removeChangeListener(this.handleChange);
    },

    handleChange: function() {
      this.setState({
        comments: DataSource.getComments()
      });
    },

    render: function() {
      // ... and renders the wrapped component with the fresh data!
      return <WrappedComponent comments={this.state.comments} />;
    }
  });
}
