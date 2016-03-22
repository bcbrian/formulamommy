
FlowRouter.route('/user',{
  action: function() {
    BlazeLayout.render("appLayout", {content: "appHome"});
  }
});
