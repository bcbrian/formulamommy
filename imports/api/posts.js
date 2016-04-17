import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Posts = new Mongo.Collection('posts');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish posts that are public or belong to the current user
  Meteor.publish('posts', function postsPublication() {
    return Posts.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}

Meteor.methods({
  'posts.insert'(title) {
    check(title, String);

    // Make sure the user is logged in before inserting a post
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Posts.insert({
      title,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
  },
  'posts.remove'(postId) {
    check(postId, String);

    const post = Posts.findOne(postId);
    if (post.private && post.owner !== Meteor.userId()) {
      // If the post is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Posts.remove(postId);
  },
  'posts.update'(postId, post) {
    check(postId, String);
    check(post, Object);
    const {title, description, content} = post;

    // const post = Posts.findOne(postId);
    // if (post.private && post.owner !== Meteor.userId()) {
    //   // If the post is private, make sure only the owner can check it off
    //   throw new Meteor.Error('not-authorized');
    // }

    Posts.update(postId, { $set: {title, description, content} });
  },
  'posts.setPrivate'(postId, setToPrivate) {
    check(postId, String);
    check(setToPrivate, Boolean);

    const post = Posts.findOne(postId);

    // Make sure only the post owner can make a post private
    if (post.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Posts.update(postId, { $set: { private: setToPrivate } });
  },
});
