
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ReactQuill from 'react-quill';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Posts } from '/imports/api/posts.js';

// EditPost component - represents the whole app
class EditPost extends Component {
  constructor(props) {
    super(props);

    this.state={
      title:"",
      description:"",
      content:""
    };
  }

  updateTitle (){
    this.setState({
      title: ReactDOM.findDOMNode(this.refs.titleInput).value
    });
  }
  updateDescription (){
    this.setState({
      description: ReactDOM.findDOMNode(this.refs.descriptionInput).value
    });
  }
  updateContent (content){
    this.setState({
      content
    });
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.post.title){
      this.setState({
        title: nextProps.post.title,
        description: nextProps.post.description,
        content: nextProps.post.content
      });
    }
  }


  handleSubmit(event) {
    event.preventDefault();

    Meteor.call('posts.update', this.props.post._id, this.state);
  }


  render() {
    return (
      <div className="container">

          { this.props.currentUser && this.props.post.title ?
            <div>

              <form className="new-post" onSubmit={this.handleSubmit.bind(this)} >
                <input
                  value={this.state.title}
                  onChange = {this.updateTitle.bind(this)}
                  className="form-control"
                  type="text"
                  ref="titleInput"
                  placeholder="Title"
                />
                <input
                  value={this.state.description}
                  onChange = {this.updateDescription.bind(this)}
                  className="form-control"
                  type="text"
                  ref="descriptionInput"
                  placeholder="Description"
                />
                <ReactQuill
                  theme="snow"
                  value={this.state.content}
                  onChange = {this.updateContent.bind(this)}
                  />

                <button type="submit" className="btn btn-primary">Save</button>
              </form>
              <h1>{this.props.post.title}</h1>
              <h4>{this.props.post.description}</h4>
              <div dangerouslySetInnerHTML={{__html:this.props.post.content}}></div>
            </div> : ''
          }
      </div>
    );
  }
}

EditPost.propTypes = {
  post: PropTypes.object,
  currentUser: PropTypes.object,
};

export default createContainer(({params}) => {
  const { postId } = params;
  Meteor.subscribe('posts');

  return {
    post: Posts.findOne(postId),
    currentUser: Meteor.user(),
  };
}, EditPost);
