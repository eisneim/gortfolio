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
		var item = this.props.item || {};
		var headerStyle = {
			backgroundImage: 'url('+item.cover+')',
			width:100+'%',
			height: 100+'vh',
		}

		return (
			<div className="clearfix" className="gf-portfolio-item-wrap">
				<header style={headerStyle}></header>
				<div role="main" className="portfolio-content clearfix">
					<div dangerouslySetInnerHTML={{__html: item.content }} ></div>
				</div>
			</div>
		)
	}
});

module.exports = Item;