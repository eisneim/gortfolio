var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var React = require('react');
var PropTypes = React.PropTypes;

// -------------------- components ---------
var Navtoggle = require('./components/Navtoggle.js');

var App = React.createClass({
  // propTypes: {
  //   params: PropTypes.object.isRequired,
  //   query: PropTypes.object.isRequired
  // },
  render: function() {
    return (
    	<div id="gf-app">
	    	<div id="gf-main">
	    		<RouteHandler {...this.props}/>
	    	</div>
	    	<div id="gf-route-cover"></div>
	    	<div id="gf-logo">
	    		<img src="img/d5logo.svg" alt="第五维度工作室"/>
	    	</div>
	    	<nav id="gf-nav">
	    		<ul id="gf-nav-main-link">
	    			<li><Link to="intro">Intro</Link></li>
	    			<li><Link to="about">About</Link></li>
	    			<li><Link to="portfolio">Portfolio</Link></li>
	    			<li><Link to="projects">Projects</Link></li>
	    			<li><Link to="ideas">Ideas</Link></li>
	    			<li><a href="http://blog.eisneim.com" target="_blank">Blog</a></li>
	    			<li><Link to="contact">Contact</Link></li>
	    		</ul>
	    		<ul id="gf-nav-social-link">
	    			<li><a href="#">Weibo</a></li>
	    			<li><a href="#">Github</a></li>
	    		</ul>
	    	</nav>
	    	<Navtoggle />
        </div>
    );
  }

});

module.exports = App;