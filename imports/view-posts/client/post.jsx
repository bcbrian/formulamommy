import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Posts } from '/imports/api/posts.js';

export class ViewPost extends Component {
    render(){
        return(
            <div className="container">
              <h1>{this.props.post.title}</h1>
              <h4>{this.props.post.description}</h4>
              <div dangerouslySetInnerHTML={{__html:this.props.post.content}}></div>
            </div>
        );
    }
}


ViewPost.propTypes = {
  post: PropTypes.object,
};

export default createContainer(({params}) => {
  const { postId } = params;
  Meteor.subscribe('posts');

  return {
    post: Posts.findOne(postId),
  };
}, ViewPost);
