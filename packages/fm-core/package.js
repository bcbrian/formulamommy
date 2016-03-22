Package.describe({
  name: 'fm-core',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use([
    'accounts-password',
    'accounts-ui',
    'bcbrian:react-blog',
    'blaze-html-templates',
    'ecmascript',
    'es5-shim',
    'jquery',
    'kadira:blaze-layout',
    'kadira:flow-router',
    'meteor-base',
    'mobile-experience',
    'mongo',
    'session',
    'standard-minifiers',
    'tracker',
    'twbs:bootstrap'
  ]);

  api.addFiles([
    'fm-core.js',
    'fm-core.css',
    'fm-core.html'
  ]);
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('fm-core');
  api.addFiles('fm-core-tests.js');
});
