'use strict';
var React = require('react');
var Router = require('react-router');
var routes = require('./routes.js');

var navActions = require('./actions/navActions.js');

Router.run(routes,function(Handler,state) {
  
  /**
   * 每当路由改变，这里都会运行一次，可以在这里检查那些需要载入动画，以及关闭侧栏；
   */
 	navActions.toggle('close');
  // render page;
  React.render(<Handler {...state}/>, document.body );
});