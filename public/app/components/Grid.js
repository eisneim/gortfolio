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
		
	},
	componentWillUnmount:function(){
		
	},

	render: function(){
		var self = this;
		var items = [];

		this.props.items.forEach(function(item,index){
			var data = self.props.gridData[index] || {};

			var itemStyle = {
				width:  data.width+ 'px',
				height: data.height + 'px',
				top: data.top,
				left: data.left,
			};

			items.push(
				<figure className="gf-grid-item" key={'grid-item'+index} style={itemStyle}>
					<div className="gf-grid-item-inner">
						{item}
					</div>
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