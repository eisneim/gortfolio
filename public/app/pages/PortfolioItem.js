var React = require('react');
var Router = require('react-router');

var Item = React.createClass({
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
	componentWillMount:function(){
	},
	componentDidMount:function(){

		
	},
	componentWillUnmount:function(){
		
	},
	leaveScene:function(){
		// this.elm.dragwraper.style.transform = 'translateX(-'+( that.ui.currentSlide /that.elm.slides.length * 100)+'%)';
		// this.getDOMNode().classList.add('gf-leave');
	},
	render: function(){
		return (
			<h1>the portfolio item is: {this.getParams().itemName}</h1>
		)
	}
});

module.exports = Item;