import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'
import { Posts } from '/imports/api/posts.js';
import testPosts from './test-helper-data/test-posts.js'

if(process.env.ADD_TEST_DATA){
  const EMAIL = "test@test.com";
  const PASSWORD = "123456";
  //add test user
  Accounts.createUser({email:EMAIL,password:PASSWORD});
  //log test user in
  let user = Meteor.users.findOne();
  //inster Posts
  testPosts.forEach((post)=>{
    let title = post.title;
    let description = post.description;
    let content = post.content;
    Posts.insert({
      title,
      description,
      content,
      createdAt: new Date(),
      owner: user._id,
      username: user.username,
    });
  });
}
