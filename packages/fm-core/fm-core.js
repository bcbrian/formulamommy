
FlowRouter.route('/',{
  action: function() {
    BlazeLayout.render("layout", {content: "home"});
  }
});

Blog.config({
  title: "Meteor Blog Example",
  syntaxHighlighting: true,
  syntaxHighlightingTheme: 'github',
  blogIndexTemplate: 'blog',
  blogShowTemplate: 'show',
  comments: {
    disqusShortname: 'blogpackage'
  },
  rss: {
    title: 'Example Blog App',
    description: 'This is an example application for meteor-blog package'
  }
});