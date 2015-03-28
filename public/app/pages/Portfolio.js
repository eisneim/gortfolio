var React = require('react');
var Grid = require('../components/Grid.js');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var gridSvc = require('../service/gridSvc.js');
var _ = require('lodash');


var Portfolio = React.createClass({
	mixins: [ 
		Router.Navigation,
		Router.State 
	],
	getInitialState: function(){
		var items = [
				{
					name:'1th item',
					url:"item1",
					img:'http://placehold.it/200x320/227DAC/fff',
				},
				{
					name:'2th item',
					url:"item2",
					img:'http://placehold.it/200x320/A3BB7E/fff',
				},
				{
					name:'3th item',
					url:"item3",
					img:'http://placehold.it/200x320/636aBC/fff',
				},
				{
					name:'4th item',
					url:"item4",
					img:'http://placehold.it/400x320/CC7B5D/fff',
				},
				{
					name:'5th item',
					url:"item5",
					img:'http://placehold.it/400x320/816F7C/fff',
				},
				{
					name:'6th item',
					url:"item6",
					img:'http://placehold.it/500x320/936aBC/fff',
				},
				{
					name:'7th item',
					url:"item7",
					img:'http://placehold.it/200x420/93aFBC/fff',
				},
				{
					name:'8th item',
					url:"item8",
					img:'http://placehold.it/200x420/136FBC/fff',
				},
				{
					name:'9th item',
					url:"item9",
					img:'http://placehold.it/400x320/936FBC/fff',
				},
				{
					name:'10th item',
					url:"item10",
					img:'http://placehold.it/600x320/936FBC/fff',
				},
				{
					name:'11th item',
					url:"item11",
					img:'http://placehold.it/200x550/63D5E7/fff',
				},
				{
					name:'12th item',
					url:"item12",
					img:'http://placehold.it/300x220/236FBC/fff',
				},
				{
					name:'13th item',
					url:"item13",
					img:'http://placehold.it/200x320/EBC575/fff',
				}
			];

		this.grid = gridSvc({
			gridWidth: window.innerWidth - 40,
			minItemWidth:280,
			itemLength: items.length,
		});

		var gridData =  this.grid.fill();

		return {
			items: items,
			gridData:gridData,
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
	 * when portfolio item is selected, route will change and this.render() will fire
	 * in this function we need to do:
	 * 1. grab which item is clicked by match the routeParams
	 * 2. start to load item
	 * 3. animate the grid item inner wraper to take the whole screen
	 * 4. fade in the portfoli item
	 * @return void
	 */
	handleSelect:function(){

	},
	render: function(){
		// this.handleSelect();
		var sectionClasses = 'gf-view';
		var itemWraperClass = '';

		var items = [],selected, selectedItem = this.getParams().itemName;
		if( selectedItem ){
			sectionClasses+= ' showItem';
			itemWraperClass += ' show';
		}

		this.state.items.forEach(function(item,index){
			var style = {
				backgroundImage: 'url('+item.img+')',
			};
			if(item.url == selectedItem) selected = index;
			var itemid = 'gf-'+item.url;

			items.push(
				<a id={itemid}  href={'#/portfolio/'+item.url} className="portfolio-item" style={style} >
					<span>{item.name}</span>
				</a>
			)
		});

		return (
			<section className={sectionClasses} id="gf-portfolio">
				<Grid items={items} gridData={this.state.gridData}  selected={selected}/>
				<div id="gf-portfolio-item" className={itemWraperClass}>
					<RouteHandler {...this.props}/>
					<a className="close-btn" href="#/portfolio"></a>
				</div>
			</section>
		);
	}
}); // createClass


module.exports = Portfolio;