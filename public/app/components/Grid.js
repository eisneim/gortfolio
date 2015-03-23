var React = require('react');
var _ = require('lodash'); // for debounce

/**
 * 	  		Grid item type
 *   ----  --------  ----   --------
 *   |	 | |	   | | 	 | 	|		|	
 *   |	 | |	   | | 	 |	|		|
 *   				 |	 |	|		|
 *   				 |	 |	|		|
 *     1 		2  	   3 		4
 * 1.base squre
 * 2.width>height, width == 2*base
 * 3.height>width,
 * 4. width == 2*base, height == 2*base
 */



var Grid = React.createClass({
	propTypes:{
		items: React.PropTypes.array.isRequired,
	},
	getDefaultProps:function(){
		return {
			minItemWidth: 200,
			gridWidth: window.innerWidth,
			gutter: 10,
		}
	},
	getInitialState:function(){
		this.gridData = {};
		this.gridData.columns = Math.floor(this.props.gridWidth / this.props.minItemWidth );

		return {
			baseWidth: this.props.gridWidth / this.gridData.columns  - this.props.gutter,
		}
	},
	componentWillMount: function(){
		

	},
	componentDidMount: function(){
		var self = this;
		// add resize listern
		window.addEventListener('resize', self.onWindowResize );
	},
	componentWillUnmount:function(){
		var self = this;
		// remove resize listern	
		window.removeEventListener('resize', self.onWindowResize );
	},
	onWindowResize:_.debounce( function(){
		this.props.gridWidth = window.innerWidth;
		this.gridData.columns = Math.floor(this.props.gridWidth / this.props.minItemWidth );
		var baseWidth = this.props.gridWidth / this.gridData.columns  - this.props.gutter;
		console.log('should reRender');
		this.setState({baseWidth: baseWidth });

	}, 200 ),	
	setUp:function(){
		/**
		 * setting up the virtual grid
		 */
		this.gridData.virtual = [];
		var row = Math.ceil( this.props.items.length * 4 / this.gridData.columns );
		for(var ii = 0; ii<row; ii++ ){
			var rowOfItems = [];
			for(var jj=0; jj<this.gridData.columns; jj++ ){
				rowOfItems.push({
					top: ii*(this.state.baseWidth + this.props.gutter), // y value
					left: jj*( this.state.baseWidth + this.props.gutter), // x value
					isOccupied: false,
				});
			}
			this.gridData.virtual.push(rowOfItems);
		};// end of outter for loop
		// pointer of virtual grid 
		this.gridData.currentRow = 0;
		this.gridData.currentColumn = 0;
		this.gridData.currentType = 1;

		console.log('total colums:'+ this.gridData.columns );
		console.log('baseWidth:'+ this.state.baseWidth );
	},
	isThisTypeFitIn:function( type, col ){
		if(type == 2 ||  type == 4 ){
			var isOutofEdge = (col+1) > this.gridData.columns;
			var isCoverOther = true;
			if( (col+1) < this.gridData.columns){
				isCoverOther = this.gridData.virtual[this.gridData.currentRow][col+1].isOccupied;
			}

			return !isOutofEdge && !isCoverOther;
			
		}else{
			return true;
		}
	},
	/**
	 * update virtual grid pointer and return current virtual gird;
	 * @return {object} virtualItem
	 */
	walkVirtualGrid:function( ){
		var col = this.gridData.currentColumn;
		var row = this.gridData.currentRow ;
		var totalCol = this.gridData.columns;

		// first check if this one is occupied
		while ( this.gridData.virtual[row][col].isOccupied ) {
			col++;
			if( col >= this.gridData.columns ){
				col = 0;
				row ++;
			}
			// console.log('col:'+col);
			// console.log('row:'+row);
		}
		// check if this item fit in;
		while( !this.isThisTypeFitIn( this.gridData.currentType , col ) ) {
			this.gridData.currentType = Math.ceil(Math.random()*2 )*2 - 1; // 1, 3

			// console.log('currentType is:'+ this.gridData.currentType );
		}

		var itemType = this.gridData.currentType;

		var startVirtualItem = this.gridData.virtual[row ][ col ];

		switch(itemType){
			case 1: 
				this.gridData.virtual[row][col].isOccupied = true;
				col ++;
				break;
			case 2: 
				this.gridData.virtual[row][col].isOccupied = true;
				this.gridData.virtual[row][col+1].isOccupied = true;
				col += 2;
				break;
			case 3: 
				this.gridData.virtual[row][col].isOccupied = true;
				this.gridData.virtual[row+1][col].isOccupied = true;

				col ++;
				break;
			case 4: 
				this.gridData.virtual[row][col].isOccupied = true;
				this.gridData.virtual[row][col+1].isOccupied = true;
				this.gridData.virtual[row+1][col].isOccupied = true;
				this.gridData.virtual[row+1][col+1].isOccupied = true;

				col += 2 ;
				break;
		};

		if( col >= this.gridData.columns ){
			col = 0;
			row ++;
		}

		// console.log('__________')
		// console.log('col:'+col);
		// console.log('row:'+row);		


		this.gridData.currentColumn = col;
		this.gridData.currentRow = row;

		return startVirtualItem;
	},
	positionOneItem:function(  ){
		this.gridData.currentType = Math.ceil( Math.random()*4 );

		var virtualItem = this.walkVirtualGrid(  );

		// console.log(virtualItem);

		return {
			top: virtualItem.top ,
			left: virtualItem.left ,
		}
	},
	render: function(){
		var self = this;

		this.setUp();

		var items = [];
		this.props.items.forEach(function(item,index){
			var pos = self.positionOneItem();

			var width,height;
			switch( self.gridData.currentType ){
				case 1:
					width = self.state.baseWidth;
					height = self.state.baseWidth;
					break;
				case 2:
					width =  self.state.baseWidth * 2 + self.props.gutter;
					height = self.state.baseWidth;
					break;
				case 3:
					width = self.state.baseWidth;
					height = self.state.baseWidth * 2 + self.props.gutter;
					break;
				case 4:
					width = self.state.baseWidth * 2 + self.props.gutter;
					height = self.state.baseWidth*2 + self.props.gutter;
					break;
			}	

			var itemStyle = {
				width:  width+ 'px',
				height: height + 'px',
				top: pos.top,
				left: pos.left,
			};

			items.push(
				<figure className="gf-grid-item" key={'grid-item'+index} style={itemStyle}>
					<div className="gf-grid-item-inner">
						{item}
					</div>
				</figure>
			)
		});

		// console.log('should start render');

		return (
			<div className="gf-grid">
				{items}
			</div>
		)
	}

});

module.exports = Grid;