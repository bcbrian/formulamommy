import React from 'react';
import {mount} from 'react-mounter';
import Layout from '../../core/client/layout/layout.jsx';
import ManagePosts from '../client/manage-posts.jsx';
import EditPost from '../client/edit-post.jsx';

FlowRouter.route('/manage-posts', {
  action() {
    mount(Layout, {
      content: <ManagePosts />,
    isAtManagePosts: true
    });
  }
});

FlowRouter.route('/manage-posts/:postId', {
  action(params) {
    const { postId } = params;
    mount(Layout, {
      content: <EditPost params={{postId}}/>,
      isAtManagePosts: true
    });
  }
});
