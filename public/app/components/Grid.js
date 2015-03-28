var React = require('react');


var Grid = React.createClass({
	propTypes:{
		gridData: React.PropTypes.array.isRequired,
	},
	getDefaultProps:function(){
		return {
			gridData: [],
		}
	},
	// getInitialState:function(){
		
	// },
	componentWillMount: function(){
		
	},
	componentDidMount: function(){
		var wraper = this.getDOMNode();
		wraper.style.marginLeft="10px";
		wraper.style.width = (window.innerWidth - 20)+'px';
	},
	componentWillUnmount:function(){
		
	},

	render: function(){
		var self = this;
		var items = [];
		// var selectedItem = this.props.routeParams.itemName;

		this.props.items.forEach(function(item,index){
			var data = self.props.gridData[index] || {};

			var itemStyle = {
				width:  data.width+ 'px',
				height: data.height + 'px',
				top: data.top,
				left: data.left,
			};
			var isSelected = self.props.selected == index;
			if( isSelected ){
				var trans = 'translate3d(-50%,-'+(window.innerHeight/2)+'px,0)';
				itemStyle = {
					width:  '100%',
					height: window.innerHeight+ 'px',
					top: '0',
					left: '0',
					WebkitTransform: trans,
					MozTransform: trans,
					msTransform: trans,
					OTransform: trans,
					transform: trans,
					marginTop: (window.innerHeight/2)+'px',
				}
			}

			var classname = 'gf-grid-item '+ (isSelected?'full-screen':'');

			items.push(
				<figure className={classname} key={'grid-item'+index} style={itemStyle}>
					{item}
				</figure>
			)

		});

		return (
			<div className="gf-grid">
				{items}
			</div>
		)
	}

});

module.exports = Grid;