import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Posts } from '/imports/api/posts.js';

export class Home extends Component {
    render(){
        return(
            <div className="container">
            <h1 className="text-xs-center">A Mommy's Blog About Her Family</h1>
            <hr/>
              <div className="card-columns hidden-sm-down">
                {this.props.posts.map((post) => {


                  return (

                    <div className="card card-block">
                      <h4 className="card-title">{post.title}</h4>
                      <p className="card-text">{post.description}</p>
                      <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                    </div>

                  );
                })}
              </div>
              <div className="hidden-md-up">
                {this.props.posts.map((post) => {


                  return (

                    <div className="card card-block">
                      <h4 className="card-title">{post.title}</h4>
                      <p className="card-text">{post.description}</p>
                      <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                    </div>

                  );
                })}
              </div>
            </div>
        );
    }
}
Home.propTypes = {
  posts: PropTypes.array.isRequired
};

export default createContainer(() => {
  Meteor.subscribe('posts');

  return {
    posts: Posts.find({}, { sort: { createdAt: -1 } }).fetch()
  };
}, Home);
