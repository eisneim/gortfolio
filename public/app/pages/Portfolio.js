var React = require('react');
var Grid = require('../components/Grid.js');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var gridSvc = require('../service/gridSvc.js');
var _ = require('lodash');
var request = require('superagent');


var Portfolio = React.createClass({
	mixins: [ 
		Router.Navigation,
		Router.State 
	],
	getInitialState: function(){
		var items = this.props.preload;

		this.grid = gridSvc({
			gridWidth: window.innerWidth - 40,
			minItemWidth:280,
			itemLength: items.length,
		});

		var gridData =  this.grid.fill();
		return {
			items: items,
			gridData: gridData,
		}
	},
	componentWillMount: function(){

	},
	componentDidMount:function(){
		var self = this;
		this.debouncedFill = _.debounce( this.refill , 200);
		// add window resize event listener
		window.addEventListener('resize', this.debouncedFill );

		this.elms = {
			self: this.getDOMNode(),
			portfolioItem: document.getElementById('gf-portfolio-item'),
		}
	},
	componentWillUnmount:function(){
		// remove grid resize listener
		window.removeEventListener('resize',this.debouncedFill  );

	},
	refill:function(){
		var gridData = this.grid.refill();


		this.setState({
			gridData: gridData,
		});
	},
	/**
	 * when portfolio item is selected, page will scroll to top
	 * @return void
	 */
	scrollPosition:function(){
		var self = this;
		if(!this.elms || !this.elms.self) return;
		if(this.lastScrollPosition && this.lastScrollPosition > 200){
			setTimeout(function(){
				self.elms.self.scrollTop = self.lastScrollPosition;
				console.log( self.lastScrollPosition );
			},100);
		}
		
		if(this.elms.self.scrollTop >= 200){
			this.lastScrollPosition = this.elms.self.scrollTop;
		}

	},
	render: function(){
		// this.scrollPosition();

		var sectionClasses = 'gf-view';
		var itemWraperClass = '';

		var items = [],selected, selectedItem = this.getParams().itemName;
		if( selectedItem ){
			sectionClasses+= ' showItem';
			itemWraperClass += ' show';
		}

		this.state.items.forEach(function(item,index){
			var style = {
				backgroundImage: 'url('+item.thumbnail+')',
			};
			if(item.url == selectedItem) selected = index;
			var itemid = 'gf-'+item.url;

			items.push(
				<figcaption id={itemid} className="portfolio-item" style={style} >
					<div className="item-info-wraper">
						<h2>{item.name}</h2>
						<p>{item.description}</p>
					</div>
					<a href={'#/portfolio/'+item.url}></a>
				</figcaption>
			)
		});

		return (
			<section className={sectionClasses} id="gf-portfolio">
				<Grid items={items} gridData={this.state.gridData}  selected={selected}/>
				<div id="gf-portfolio-item" className={itemWraperClass}>
					<RouteHandler {...this.props} item={this.state.items[selected]}/>
					<a className="close-btn" href="#/portfolio"></a>
				</div>
			</section>
		);
	}
}); // createClass


module.exports = Portfolio;