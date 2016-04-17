import React from 'react';
import {mount} from 'react-mounter';
import Layout from '/imports/core/client/layout/layout.jsx';
import ViewPost from '../client/post.jsx';

FlowRouter.route("/view-post/:postId/:name", {
  action(params) {
    const { postId } = params;
    mount(Layout, {
        content: (<ViewPost params={{postId}}/>),
        isAtHome: true
    });
  }
});
