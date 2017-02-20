var testWithSubscription = React.createClass({
  getInitialState: function() {
    return {
      comments: DataSource.getComments()
    };
  },

  componentDidMount: function() {
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
    // We pass the current state as props to CommentList.
    return <CommentList comments={this.state.comments} />;
  }
});

module.exports = testWithSubscription;
