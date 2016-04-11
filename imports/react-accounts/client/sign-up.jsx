
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

// SomePage component - represents the whole app
class SignUp extends Component {
  constructor(props) {
    super(props);

  }

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    var email = this.refs.email.value;
    var password = this.refs.password.value;

    //create user
    Accounts.createUser({email:email,password:password});

    // Clear form
    this.refs.email.value = "";
    this.refs.password.value = "";

  }

  render() {
    return (
      <div className="container">
          <form className="new-post" onSubmit={this.handleSubmit.bind(this)} >
            <input
              className="form-control"
              type="text"
              ref="email"
              placeholder="Type to add new posts"
            />
            <input
              className="form-control"
              type="password"
              ref="password"
              placeholder="Type to add new posts"
            />
          <button type="submit" className="btn btn-primary">Sign Up</button>
          </form>
      </div>
    );
  }
}

SignUp.propTypes = {
  currentUser: PropTypes.object,
};

export default createContainer(() => {
  Meteor.subscribe('posts');

  return {
    currentUser: Meteor.user(),
  };
}, SignUp);
