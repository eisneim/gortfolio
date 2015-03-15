var React = require('react');
var Router = require('react-router');

var Project = React.createClass({
	// mixins: [Navigation],
	mixins: [Router.State],
	statics:{
		// scen enter animation
		willTransitionTo: function (transition, params) {

		},
		// leave animation
		willTransitionFrom: function(transition, component ){
			
		},
	},
	getInitialState:function(){
		return {
			// isFullscreen: false,
		}
	},
	componentDidMount:function(){

		
	},
	componentWillUnmount:function(){
		
	},
	leaveSence:function(){
		// this.elm.dragwraper.style.transform = 'translateX(-'+( that.ui.currentSlide /that.elm.slides.length * 100)+'%)';
		// this.getDOMNode().classList.add('gf-leave');
	},
	render: function(){
		return (
			<h1>{this.getParams().projectId}</h1>
		)
	}
});

module.exports = Project;