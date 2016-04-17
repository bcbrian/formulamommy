
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Posts } from '/imports/api/posts.js';

// SomePage component - represents the whole app
class SomePage extends Component {
  constructor(props) {
    super(props);

  }

  handleSubmit(event) {
    event.preventDefault();

    // Find the title field via the React ref
    const title = ReactDOM.findDOMNode(this.refs.titleInput).value.trim();

    Meteor.call('posts.insert', title);

    // Clear form
    ReactDOM.findDOMNode(this.refs.titleInput).value = '';
  }

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  renderPosts() {
    let filteredPosts = this.props.posts;

    return filteredPosts.map((post) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = post.owner === currentUserId;

      return (
        <div key={post._id}>
          <a href={"/manage-posts/"+post._id}>{post.title}</a>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="container">
          { this.props.currentUser ?
            <form className="new-post" onSubmit={this.handleSubmit.bind(this)} >
              <input
                className="form-control"
                type="text"
                ref="titleInput"
                placeholder="Type to add new posts"
              />
            </form> : ''
          }
        <ul>
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

SomePage.propTypes = {
  posts: PropTypes.array.isRequired,
  incompleteCount: PropTypes.number.isRequired,
  currentUser: PropTypes.object,
};

export default createContainer(() => {
  Meteor.subscribe('posts');

  return {
    posts: Posts.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Posts.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user(),
  };
}, SomePage);
