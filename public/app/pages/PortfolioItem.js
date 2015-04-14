var React = require('react');
var Router = require('react-router');
var _ = require('lodash');
var request = require('superagent');

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
			item: this.props.item,
		}
	},
	componentWillMount:function(){
	},
	componentDidMount:function(){
		var self = this;

		request.get('data/portfolio/'+self.props.item.url+'.html')
		.end(function(req,res){
			var item = _.extend( self.props.item );
			item.content = res.text;
			self.setState({
				item: item,
			})
		})

	},
	componentWillUnmount:function(){
		
	},
	leaveScene:function(){
		// this.elm.dragwraper.style.transform = 'translateX(-'+( that.ui.currentSlide /that.elm.slides.length * 100)+'%)';
		// this.getDOMNode().classList.add('gf-leave');
	},
	render: function(){
		var item = this.state.item || {};
		var headerStyle = {
			backgroundImage: 'url('+item.cover+')',
			width:100+'%',
			height: 100+'vh',
		}

		return (
			<div className="clearfix" className="gf-portfolio-item-wrap">
				<header style={headerStyle}></header>
				<div role="main" className="portfolio-content clearfix container">
					<div dangerouslySetInnerHTML={{__html: item.content }} ></div>
				</div>
			</div>
		)
	}
});

module.exports = Item;