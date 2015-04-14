var React = require('react');
var Router = require('react-router');
var request = require('superagent');
var _ = require('lodash');

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
	getInitialState:function(){
		return {
			projectData: this.props.projectData,
		}
	},
	componentDidMount:function(){
		var node = this.getDOMNode();
		setTimeout(function(){
			node.style.opacity = 1;
		},500);	

		var self = this;

		request.get('data/projects/'+self.props.projectData.url+'.html')
		.end(function(req,res){
			var projectData = _.extend( self.props.projectData );
			projectData.content = res.text;
			self.setState({
				projectData: projectData,
			})
		})
	},
	// componentWillUnmount:function(){
		
	// },
	leaveSence:function(){
		// this.elm.dragwraper.style.transform = 'translateX(-'+( that.ui.currentSlide /that.elm.slides.length * 100)+'%)';
		// this.getDOMNode().classList.add('gf-leave');
	},
	render: function(){
		var projectData = this.state.projectData || {};
		return (
			<div id="gf-project">
				<a className="close-btn" href="#/project"></a>
				<div className="container" dangerouslySetInnerHTML={{__html:projectData.content }}></div>
			</div>
		)
	}
});

module.exports = Project;