var React = require('react');
var Router = require('react-router');

var Project = React.createClass({
	// mixins: [Navigation],
	mixins: [Router.State],
	// statics:{
	// 	// scen enter animation
	// 	willTransitionTo: function (transition, params) {
			
	// 	},
	// 	// leave animation
	// 	willTransitionFrom: function(transition, component ){
			
	// 	},
	// },
	// getInitialState:function(){
	// 	return {
	// 		// isFullscreen: false,
	// 	}
	// },
	componentDidMount:function(){
		var node = this.getDOMNode();
		setTimeout(function(){
			node.style.opacity = 1;
		},100);

	},
	// componentWillUnmount:function(){
		
	// },
	leaveSence:function(){
		// this.elm.dragwraper.style.transform = 'translateX(-'+( that.ui.currentSlide /that.elm.slides.length * 100)+'%)';
		// this.getDOMNode().classList.add('gf-leave');
	},
	render: function(){
		var projectData = this.props.projectData || {};
		return (
			<div id="gf-project">
				<a className="close-btn" href="#/project"></a>
				<div className="container" dangerouslySetInnerHTML={{__html:projectData.content }}></div>
			</div>
		)
	}
});

module.exports = Project;