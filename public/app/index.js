'use strict';
var React = require('react');
var Router = require('react-router');
var routes = require('./routes.js');

var navActions = require('./actions/navActions.js');
var routeCoverActions = require('./actions/routeCoverActions.js');

var isFirstRun = true;

/**
 * some routes have mananl leaving animation, below are some top level routes
 * that need auto add leaving anition;
 */
var leaveAnimRoutes = ['intro','about','ideas','contact'];
/**
 * some of the routes need to preload a lot of stuff 
 * so we need to proveide longer route transition animation;
 */
var longLoad = ['projects','portfolio'];
var noLoadFromThose = ['portfolioItem'];

var previousRoute;

Router.run(routes,function(Handler,state) {
  if(isFirstRun){
  	React.render(<Handler {...state}/>, document.body );
  	isFirstRun = false;
  	return;
  }
  var routeName = state.routes[ state.routes.length-1 ].name ;
  // console.log(state);
	/**
	* 每当路由改变，这里都会运行一次，可以在这里检查那些需要载入动画，以及关闭侧栏；
	*/
 	navActions.toggle('close');

 	if( longLoad.indexOf( routeName ) > -1 && noLoadFromThose.indexOf(previousRoute) == -1 ){
 		routeCoverActions.start();
 		longLoadInterceptor(function(){

 			routeCoverActions.finish();
			React.render(<Handler {...state}/>, document.body );

 		});
 	}else if( leaveAnimRoutes.indexOf( routeName ) > -1 ){ 
 		document.querySelector('.gf-view').classList.add('fade-out');
 		setTimeout(function(){
 			React.render(<Handler {...state}/>, document.body );
 		},300);
 	}else{

 		React.render(<Handler {...state}/>, document.body );
 	}
  /**
   * record previus route so we can have more controll;
   */
  previousRoute = routeName;
});

function longLoadInterceptor(callback){
	setTimeout(callback,800);
}