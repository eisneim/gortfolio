'use strict';
var React = require('react');
var Router = require('react-router');
var routes = require('./routes.js');

var navActions = require('./actions/navActions.js');
var routeCoverActions = require('./actions/routeCoverActions.js');

var isFirstRun = true;

Router.run(routes,function(Handler,state) {
  if(isFirstRun){
  	React.render(<Handler {...state}/>, document.body );
  	isFirstRun = false;
  	return;
  }

	/**
	* 每当路由改变，这里都会运行一次，可以在这里检查那些需要载入动画，以及关闭侧栏；
	*/
 	navActions.toggle('close');
 	routeCoverActions.start();
 	setTimeout(function(){
 		routeCoverActions.finish();

 		React.render(<Handler {...state}/>, document.body );
 	}, 1500);
  // render page;
  
});