import React from 'react';
import {mount} from 'react-mounter';
import Layout from '../../core/client/layout/layout.jsx';
import SignIn from '../client/sign-in.jsx';
import SignUp from '../client/sign-up.jsx';

FlowRouter.route('/sign-in', {
  action() {
    mount(Layout, {
      content: <SignIn />
    });
  }
});

FlowRouter.route('/sign-up', {
  action() {
    mount(Layout, {
      content: <SignUp />
    });
  }
});
